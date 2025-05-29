import React from 'react';
import QRCode from 'react-qr-code';
import { CardData } from '../types/types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Download } from 'lucide-react';

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
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [53.98, 85.60]
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, 85.60, 53.98, '', 'FAST');
    pdf.save('inc-identification-card.pdf');
  };
  
  return (
    <div className="sticky top-8 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Preview</h2>
        <button
          onClick={handleDownloadPDF}
          className="inline-flex items-center px-4 py-2 bg-[#009246] text-white rounded-lg hover:bg-[#008240] transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Card
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Front Card */}
        <div 
          id="business-card" 
          className="w-[342.4px] h-[215.92px] rounded-xl overflow-hidden card-shadow relative bg-white"
          style={{
            backgroundImage: photoUrl ? `linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(${photoUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-3 bg-[#009246]" />
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[#CE2B37]" />
          
          <div className="h-full p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="text-xs font-medium text-slate-500 block mb-1 uppercase tracking-wider">Kapatid na:</span>
                <h2 className="text-2xl font-bold text-slate-800 truncate mb-4 uppercase tracking-wider">
                  {fullName || 'YOUR NAME'}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-500 block mb-1 uppercase tracking-wider">Locale</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider truncate">
                    {locale || '-'}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-500 block mb-1 uppercase tracking-wider">District</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider truncate">
                    {district || '-'}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-500 block mb-1 uppercase tracking-wider">Purok/Group</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider truncate">
                    {group || '-'}
                  </div>
                </div>
                
                <div className="min-w-0">
                  <span className="text-xs font-medium text-slate-500 block mb-1 uppercase tracking-wider">ID Number</span>
                  <div className="font-medium text-sm text-slate-800 uppercase tracking-wider truncate">
                    {number || '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Card */}
        <div className="w-[342.4px] h-[215.92px] rounded-xl overflow-hidden card-shadow relative bg-white">
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