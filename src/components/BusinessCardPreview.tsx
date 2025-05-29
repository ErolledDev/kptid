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
      // Create a temporary container for screenshots
      const screenshotContainer = document.createElement('div');
      screenshotContainer.style.position = 'absolute';
      screenshotContainer.style.left = '-9999px';
      screenshotContainer.style.top = '-9999px';
      document.body.appendChild(screenshotContainer);

      // Clone the cards for screenshot
      const frontCard = document.getElementById('front-card');
      const backCard = document.getElementById('back-card');
      
      if (!frontCard || !backCard) {
        throw new Error('Card elements not found');
      }

      // Clone and prepare cards for screenshot
      const frontClone = frontCard.cloneNode(true) as HTMLElement;
      const backClone = backCard.cloneNode(true) as HTMLElement;
      
      [frontClone, backClone].forEach(card => {
        card.style.transform = 'none';
        card.style.position = 'relative';
        screenshotContainer.appendChild(card);
      });

      // Wait for background images to load
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture both sides
      const canvasOptions = {
        scale: 4,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: true,
        allowTaint: true,
        foreignObjectRendering: true
      };

      const frontCanvas = await html2canvas(frontClone, canvasOptions);
      const backCanvas = await html2canvas(backClone, canvasOptions);

      // Create download links
      const frontLink = document.createElement('a');
      frontLink.download = 'inc-id-front.png';
      frontLink.href = frontCanvas.toDataURL('image/png', 1.0);
      
      const backLink = document.createElement('a');
      backLink.download = 'inc-id-back.png';
      backLink.href = backCanvas.toDataURL('image/png', 1.0);

      // Clean up
      document.body.removeChild(screenshotContainer);

      // Trigger downloads
      frontLink.click();
      setTimeout(() => backLink.click(), 100);
    } catch (error) {
      console.error('Error generating images:', error);
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
          <div className="h-full p-6 relative z-20">
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block mb-1 uppercase tracking-wider">Kapatid na:</span>
                <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider leading-tight line-clamp-2">
                  {fullName || 'YOUR NAME'}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div className="min-w-0">
                  <span className="text-[10px] font-medium text-slate-500 block mb-0.5 uppercase tracking-wider">Lokal ng: </span>
                  <div className="font-medium text-[12px] text-slate-800 uppercase tracking-wider line-clamp-2">
                    {locale || '-'}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <span className="text-[10px] font-medium text-slate-500 block mb-0.5 uppercase tracking-wider">Distrito ng:</span>
                  <div className="font-medium text-[12px] text-slate-800 uppercase tracking-wider line-clamp-2">
                    {district || '-'}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <span className="text-[10px] font-medium text-slate-500 block mb-0.5 uppercase tracking-wider">Purok at Grupo:</span>
                  <div className="font-medium text-[12px] text-slate-800 uppercase tracking-wider line-clamp-2">
                    {group || '-'}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <span className="text-[10px] font-medium text-slate-500 block mb-0.5 uppercase tracking-wider">ID Number</span>
                  <div className="font-medium text-[12px] text-slate-800 uppercase tracking-wider line-clamp-2">
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