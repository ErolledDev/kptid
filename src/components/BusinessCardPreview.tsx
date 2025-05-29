import React from 'react';
import QRCode from 'react-qr-code';
import { CardData } from '../types/types';
import { Smartphone, MapPin, Briefcase } from 'lucide-react';

interface BusinessCardPreviewProps {
  cardData: CardData;
}

export const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({ cardData }) => {
  const { fullName, number, locale, group, qrText, photoUrl } = cardData;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Front Card */}
      <div className="w-full aspect-[1.586/1] rounded-xl overflow-hidden card-shadow bg-gradient-to-br from-slate-900 to-blue-900 text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <div className="h-full grid grid-cols-2">
          {/* Left side - Information */}
          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {fullName || 'Your Name'}
            </h2>
            
            <div className="space-y-4">
              {number && (
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                    <Smartphone size={16} className="text-blue-200" />
                  </div>
                  <span className="text-sm text-blue-50">{number}</span>
                </div>
              )}
              
              {locale && (
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                    <MapPin size={16} className="text-blue-200" />
                  </div>
                  <span className="text-sm text-blue-50">Locale: {locale}</span>
                </div>
              )}
              
              {group && (
                <div className="flex items-center gap-3 group">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-200">
                    <Briefcase size={16} className="text-blue-200" />
                  </div>
                  <span className="text-sm text-blue-50">Group: {group}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right side - QR Code */}
          <div className="flex items-center justify-center bg-white/5 backdrop-blur-sm">
            <div className="bg-white p-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              <QRCode
                value={qrText || 'https://example.com'}
                size={130}
                level="H"
                fgColor="#1E40AF"
                bgColor="#FFFFFF"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Back Card */}
      <div className="w-full aspect-[1.586/1] rounded-xl overflow-hidden card-shadow relative group">
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
          style={{
            backgroundImage: photoUrl 
              ? `url(${photoUrl})` 
              : 'linear-gradient(135deg, #f6f6f7 0%, #e9ebee 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {!photoUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Upload photo for background
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};