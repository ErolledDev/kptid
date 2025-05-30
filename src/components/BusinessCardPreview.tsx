import React from 'react';
import QRCode from 'react-qr-code';
import { CardData } from '../types/types';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';
import defaultBg from '../assets/default.png';

interface BusinessCardPreviewProps {
  cardData: CardData;
}

export const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({ cardData }) => {
  const { fullName, number, locale, district, group, qrText, photoUrl } = cardData;
  
  const handleDownload = async () => {
    try {
      // Create a temporary container with white background
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.background = '#fff';
      document.body.appendChild(container);

      // Clone the cards
      const frontCard = document.getElementById('front-card');
      const backCard = document.getElementById('back-card');
      
      if (!frontCard || !backCard) {
        throw new Error('Card elements not found');
      }

      // Clone and prepare cards
      const frontClone = frontCard.cloneNode(true) as HTMLElement;
      const backClone = backCard.cloneNode(true) as HTMLElement;
      
      [frontClone, backClone].forEach(card => {
        card.style.transform = 'none';
        card.style.position = 'relative';
        card.style.left = '0';
        card.style.top = '0';
        container.appendChild(card);
      });

      // Pre-load background image if exists
      const bgImage = photoUrl === 'default' ? defaultBg : photoUrl;
      if (bgImage && bgImage !== '') {
        await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = resolve;
          img.onerror = reject;
          img.src = bgImage;
        }).catch(() => console.warn('Background image failed to load'));
      }

      // Canvas options with better quality settings
      const canvasOptions = {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 342.4,
        height: 215.92,
        onclone: (clonedDoc: Document) => {
          return new Promise(resolve => {
            const qrCode = clonedDoc.querySelector('[data-testid="qr-code"]');
            setTimeout(resolve, qrCode ? 500 : 0);
          });
        }
      };

      // Capture both sides with proper timing
      const captureCard = async (element: HTMLElement) => {
        element.style.opacity = '0.99';
        await new Promise(resolve => setTimeout(resolve, 100));
        element.style.opacity = '1';
        
        return html2canvas(element, canvasOptions);
      };

      const [frontCanvas, backCanvas] = await Promise.all([
        captureCard(frontClone),
        captureCard(backClone)
      ]);

      // Download function with proper MIME type
      const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
      };

      // Download both sides
      downloadCanvas(frontCanvas, 'inc-id-front.png');
      await new Promise(resolve => setTimeout(resolve, 100));
      downloadCanvas(backCanvas, 'inc-id-back.png');

      // Cleanup
      document.body.removeChild(container);
    } catch (error) {
      console.error('Error generating images:', error);
      alert('Failed to generate ID cards. Please try again.');
    }
  };

  const getBackgroundImage = () => {
    if (photoUrl === '') return 'none';
    if (photoUrl === 'default' || !photoUrl) return `url(${defaultBg})`;
    return `url(${photoUrl})`;
  };
  
  return (
    <div className="sticky top-8 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Preview</h2>
        <button
          onClick={handleDownload}
          className="inline-flex items-center px-4 py-2 bg-[#009246] text-white rounded-lg hover:bg-[#008240] transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Cards
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Front Card */}
        <div id="front-card" className="w-[342.4px] h-[215.92px] rounded-xl overflow-hidden card-shadow relative bg-white">
          {/* Background Image */}
          <div 
            className="absolute inset-3 rounded-lg overflow-hidden bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: getBackgroundImage(),
              opacity: 0.55
            }}
          />
          
          {/* Borders */}
          <div className="absolute top-0 left-0 w-full h-3 bg-[#009246] z-10" />
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[#CE2B37] z-10" />
          
          {/* Content */}
          <div className="h-full p-5 relative z-20">
            <div className="flex flex-col h-full justify-between">
              <div className="mb-2">
                <span className="text-[11px] font-medium text-slate-500 block uppercase tracking-wider">Kapatid na:</span>
                <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider leading-tight break-words">
                  {fullName || 'YOUR NAME'}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 mb-4 gap-x-4 gap-y-2">
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block uppercase tracking-wider">Lokal ng:</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider break-words">
                    {locale || '-'}
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block uppercase tracking-wider">Distrito ng:</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider break-words">
                    {district || '-'}
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block uppercase tracking-wider">Purok at Grupo:</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider break-words">
                    {group || '-'}
                  </div>
                </div>
                
                <div>
                  <span className="text-[10px] font-medium text-slate-500 block uppercase tracking-wider">ID Number:</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider break-words">
                    {number || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Card */}
        <div id="back-card" className="w-[342.4px] h-[215.92px] rounded-xl overflow-hidden card-shadow relative bg-white">
          <div className="absolute top-0 left-0 w-full h-3 bg-[#009246]" />
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[#CE2B37]" />
          
          <div className="h-full flex flex-col items-center justify-center space-y-4 py-8">
            <div className="p-3 bg-white rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
              <QRCode
                value={qrText || 'Please enter QR code text'}
                size={120}
                level="H"
                fgColor="#1E293B"
                bgColor="#FFFFFF"
                data-testid="qr-code"
              />
            </div>
            
            {number && (
              <div className="text-center">
                <span className="font-medium text-slate-700 tracking-wider uppercase">{number}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};