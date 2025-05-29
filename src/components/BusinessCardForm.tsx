import React, { useState } from 'react';
import { CardData } from '../types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { QrScanner } from './QrScanner';
import { Camera, Image as ImageIcon, Upload, X } from 'lucide-react';

interface BusinessCardFormProps {
  cardData: CardData;
  onInputChange: (name: keyof CardData, value: string) => void;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BusinessCardForm: React.FC<BusinessCardFormProps> = ({ 
  cardData, 
  onInputChange,
  onPhotoUpload
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [bgOption, setBgOption] = useState<'default' | 'blank' | 'custom'>('default');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'number') {
      const formattedValue = value.replace(/\s/g, '').replace(/(.{3})/g, '$1 ').trim();
      onInputChange(name as keyof CardData, formattedValue);
    } else {
      onInputChange(name as keyof CardData, value);
    }
  };

  const handleBgOptionChange = (option: 'default' | 'blank' | 'custom') => {
    setBgOption(option);
    if (option === 'blank') {
      onInputChange('photoUrl', '');
    } else if (option === 'default') {
      onInputChange('photoUrl', 'default');
    }
  };

  const handleScanResult = (result: string) => {
    if (result) {
      onInputChange('qrText', result);
      setShowScanner(false);
    }
  };
  
  const formFields = [
    {
      id: 'fullName',
      label: 'Full Name',
      placeholder: 'JOHN DOE',
      value: cardData.fullName,
      maxLength: 50
    },
    {
      id: 'number',
      label: 'ID Number',
      placeholder: '123 456 789 012',
      value: cardData.number,
      maxLength: 15
    },
    {
      id: 'locale',
      label: 'Locale',
      placeholder: 'ENTER YOUR LOCALE',
      value: cardData.locale,
      maxLength: 20
    },
    {
      id: 'district',
      label: 'District',
      placeholder: 'ENTER YOUR DISTRICT',
      value: cardData.district,
      maxLength: 20
    },
    {
      id: 'group',
      label: 'Purok/Group',
      placeholder: 'ENTER YOUR GROUP',
      value: cardData.group,
      maxLength: 20
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-6">
        Enter Your Information
      </h2>
      
      <form className="space-y-5">
        {formFields.map((field, index) => (
          <motion.div 
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <label htmlFor={field.id} className="label group-focus-within:text-[#009246] transition-colors duration-200">
              {field.label}
            </label>
            <input
              type="text"
              id={field.id}
              name={field.id}
              value={field.value}
              onChange={handleChange}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              className="input-field group-focus-within:border-[#009246] group-focus-within:ring-[#009246]/20 uppercase"
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: formFields.length * 0.1 }}
          className="group"
        >
          <label className="label group-focus-within:text-[#009246] transition-colors duration-200">
            QR Code Text
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="qrText"
              value={cardData.qrText}
              onChange={handleChange}
              placeholder="ENTER TEXT OR SCAN QR CODE"
              className="input-field group-focus-within:border-[#009246] group-focus-within:ring-[#009246]/20 uppercase flex-1"
            />
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="px-3 py-2 bg-[#009246] text-white rounded-lg hover:bg-[#008240] transition-colors duration-200 hover:shadow-md"
              title="Scan QR Code"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (formFields.length + 1) * 0.1 }}
          className="pt-2"
        >
          <label className="label mb-3">Background Image</label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleBgOptionChange('default')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                bgOption === 'default'
                  ? 'border-[#009246] bg-[#009246]/5'
                  : 'border-slate-200 hover:border-[#009246]/50'
              }`}
            >
              <ImageIcon className={`h-6 w-6 mb-2 ${bgOption === 'default' ? 'text-[#009246]' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${bgOption === 'default' ? 'text-[#009246]' : 'text-slate-600'}`}>
                Default
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => handleBgOptionChange('blank')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                bgOption === 'blank'
                  ? 'border-[#009246] bg-[#009246]/5'
                  : 'border-slate-200 hover:border-[#009246]/50'
              }`}
            >
              <X className={`h-6 w-6 mb-2 ${bgOption === 'blank' ? 'text-[#009246]' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${bgOption === 'blank' ? 'text-[#009246]' : 'text-slate-600'}`}>
                Blank
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => handleBgOptionChange('custom')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 ${
                bgOption === 'custom'
                  ? 'border-[#009246] bg-[#009246]/5'
                  : 'border-slate-200 hover:border-[#009246]/50'
              }`}
            >
              <Upload className={`h-6 w-6 mb-2 ${bgOption === 'custom' ? 'text-[#009246]' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${bgOption === 'custom' ? 'text-[#009246]' : 'text-slate-600'}`}>
                Upload
              </span>
            </button>
          </div>

          {bgOption === 'custom' && (
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoUpload}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#009246]/10 file:text-[#009246] hover:file:bg-[#009246]/20 focus:outline-none"
            />
          )}
        </motion.div>
      </form>
      
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Scan QR Code</h3>
                <button
                  onClick={() => setShowScanner(false)}
                  className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 p-1 rounded-full transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <QrScanner onResult={handleScanResult} onClose={() => setShowScanner(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-8 bg-[#009246]/5 rounded-lg p-4 border border-[#009246]/10">
        <h3 className="font-medium text-[#009246] mb-2">Tips:</h3>
        <ul className="text-sm text-slate-700 space-y-1.5 pl-5 list-disc marker:text-[#009246]">
          <li>Fill in all fields for a complete identification card</li>
          <li>ID numbers are automatically formatted (123 456 789 012)</li>
          <li>Choose from default, blank, or custom background</li>
          <li>Scan QR codes using your device's camera</li>
          <li>All text will be automatically converted to uppercase</li>
          <li>Download your card when finished</li>
        </ul>
      </div>
    </div>
  );
};