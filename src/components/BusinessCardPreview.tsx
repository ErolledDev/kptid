import React from 'react';
import QRCode from 'react-qr-code';
import { CardData } from '../types/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface BusinessCardPreviewProps {
  cardData: CardData;
}

export const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({ cardData }) => {
  const { fullName, number, locale, district, group, qrText, photoUrl } = cardData;
  
  const handleDownloadPDF = async () => {
    const cardElement = document.getElementById('business-card');
    if (!cardElement) return;

    const canvas = await html2canvas(cardElement, {
      scale: 4,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // ATM card dimensions in mm (85.60 × 53.98)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [53.98, 85.60]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, 85.60, 53.98, '', 'FAST');
    pdf.save('identification-card.pdf');
  };
  
  return (
    <div className="sticky top-8 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Preview</h2>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
        >
          Download Card
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Front Card */}
        <div 
          id="business-card" 
          className="w-[342.4px] h-[215.92px] rounded-xl overflow-hidden card-shadow relative bg-gradient-to-br from-slate-50 to-white"
          style={{
            backgroundImage: photoUrl ? `linear-gradient(to right, rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${photoUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-500" />
          
          <div className="h-full p-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 truncate mb-2">
                  {fullName || 'Your Name'}
                </h2>
                <div className="h-0.5 w-16 bg-blue-600" />
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <span className="text-sm text-slate-500 block mb-1">Locale</span>
                  <div className="font-medium text-slate-800">{locale || '-'}</div>
                </div>
                
                <div>
                  <span className="text-sm text-slate-500 block mb-1">District</span>
                  <div className="font-medium text-slate-800">{district || '-'}</div>
                </div>
                
                <div>
                  <span className="text-sm text-slate-500 block mb-1">Puro/Group</span>
                  <div className="font-medium text-slate-800">{group || '-'}</div>
                </div>
                
                <div>
                  <span className="text-sm text-slate-500 block mb-1">ID Number</span>
                  <div className="font-medium text-slate-800">{number || '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Card */}
        <div className="w-[342.4px] h-[215.92px] rounded-xl overflow-hidden card-shadow relative bg-gradient-to-br from-slate-50 to-white">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-500" />
          
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
              <QRCode
                value={qrText || number || 'https://example.com'}
                size={120}
                level="H"
                fgColor="#1E293B"
                bgColor="#FFFFFF"
              />
            </div>
            
            {number && (
              <div className="text-center">
                <span className="font-medium text-slate-700 tracking-wide">{number}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};