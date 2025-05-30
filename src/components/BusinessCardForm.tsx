import React, { useState } from 'react';
import { CardData } from '../types/types';
import { motion, AnimatePresence } from 'framer-motion';
import { QrScanner } from './QrScanner';
import { Camera, Image as ImageIcon, Upload, X, ChevronRight } from 'lucide-react';

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
  const [bgOption, setBgOption] = useState<'default' | 'blank' | 'custom'>('blank');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'number') {
      // Limit to 12 characters and format
      const cleanValue = value.replace(/\s/g, '').slice(0, 12);
      const formattedValue = cleanValue.replace(/(.{3})/g, '$1 ').trim();
      onInputChange(name as keyof CardData, formattedValue);
    } else if (name === 'group') {
      // Limit to 4 characters
      const limitedValue = value.slice(0, 4);
      onInputChange(name as keyof CardData, limitedValue);
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
      placeholder: 'JUAN DELA CRUZ',
      value: cardData.fullName,
      maxLength: 50,
      icon: <ChevronRight className="h-4 w-4" />
    },
    {
      id: 'locale',
      label: 'Lokal',
      placeholder: 'ENTER YOUR LOKAL',
      value: cardData.locale,
      maxLength: 20,
      icon: <ChevronRight className="h-4 w-4" />
    },
    {
      id: 'district',
      label: 'Distrito',
      placeholder: 'ENTER YOUR DISTRITO',
      value: cardData.district,
      maxLength: 20,
      icon: <ChevronRight className="h-4 w-4" />
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-inc-green/10 flex items-center justify-center">
          <Camera className="h-6 w-6 text-inc-green" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Enter Your Information
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Fill in the details for your INC ID card
          </p>
        </div>
      </div>
      
      <form className="space-y-5">
        {formFields.map((field, index) => (
          <motion.div 
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group relative"
          >
            <label htmlFor={field.id} className="label group-focus-within:text-inc-green transition-colors duration-200">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="text"
                id={field.id}
                name={field.id}
                value={field.value}
                onChange={handleChange}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                className="input-field pl-4 pr-10 group-focus-within:border-inc-green group-focus-within:ring-inc-green/20 uppercase"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-inc-green transition-colors duration-200">
                {field.icon}
              </div>
            </div>
          </motion.div>
        ))}

        {/* ID Number and Purok at Group in one row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: formFields.length * 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="group">
            <label htmlFor="number" className="label group-focus-within:text-inc-green transition-colors duration-200">
              ID Number <span className="text-slate-400 text-xs">(12 chars)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="number"
                name="number"
                value={cardData.number}
                onChange={handleChange}
                placeholder="123 456 789 012"
                maxLength={14}
                className="input-field pl-4 pr-10 group-focus-within:border-inc-green group-focus-within:ring-inc-green/20 uppercase"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-inc-green transition-colors duration-200">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="group">
            <label htmlFor="group" className="label group-focus-within:text-inc-green transition-colors duration-200">
              Purok at Group <span className="text-slate-400 text-xs">(4 chars)</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="group"
                name="group"
                value={cardData.group}
                onChange={handleChange}
                placeholder="4-2"
                maxLength={4}
                className="input-field pl-4 pr-10 group-focus-within:border-inc-green group-focus-within:ring-inc-green/20 uppercase"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-inc-green transition-colors duration-200">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (formFields.length + 1) * 0.1 }}
          className="group"
        >
          <label className="label group-focus-within:text-inc-green transition-colors duration-200">
            QR Code Text
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                name="qrText"
                value={cardData.qrText}
                onChange={handleChange}
                placeholder="ENTER TEXT OR SCAN QR CODE"
                className="input-field pl-4 pr-10 group-focus-within:border-inc-green group-focus-within:ring-inc-green/20 uppercase w-full"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-inc-green transition-colors duration-200">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowScanner(true)}
              className="px-3 py-2 bg-inc-green text-white rounded-lg hover:bg-inc-green-dark transition-colors duration-200 hover:shadow-md flex items-center justify-center"
              title="Scan QR Code"
            >
              <Camera className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: (formFields.length + 2) * 0.1 }}
          className="pt-2"
        >
          <label className="label mb-3">Background Image</label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button
              type="button"
              onClick={() => handleBgOptionChange('default')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                bgOption === 'default'
                  ? 'border-inc-green bg-inc-green/5 shadow-inc-green/10'
                  : 'border-slate-200 hover:border-inc-green/50 hover:bg-inc-green/5'
              }`}
            >
              <ImageIcon className={`h-6 w-6 mb-2 ${bgOption === 'default' ? 'text-inc-green' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${bgOption === 'default' ? 'text-inc-green' : 'text-slate-600'}`}>
                Default
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => handleBgOptionChange('blank')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                bgOption === 'blank'
                  ? 'border-inc-green bg-inc-green/5 shadow-inc-green/10'
                  : 'border-slate-200 hover:border-inc-green/50 hover:bg-inc-green/5'
              }`}
            >
              <X className={`h-6 w-6 mb-2 ${bgOption === 'blank' ? 'text-inc-green' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${bgOption === 'blank' ? 'text-inc-green' : 'text-slate-600'}`}>
                Blank
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => handleBgOptionChange('custom')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 ${
                bgOption === 'custom'
                  ? 'border-inc-green bg-inc-green/5 shadow-inc-green/10'
                  : 'border-slate-200 hover:border-inc-green/50 hover:bg-inc-green/5'
              }`}
            >
              <Upload className={`h-6 w-6 mb-2 ${bgOption === 'custom' ? 'text-inc-green' : 'text-slate-600'}`} />
              <span className={`text-sm font-medium ${bgOption === 'custom' ? 'text-inc-green' : 'text-slate-600'}`}>
                Upload
              </span>
            </button>
          </div>

          {bgOption === 'custom' && (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={onPhotoUpload}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0
                  file:text-sm file:font-semibold file:bg-inc-green/10
                  file:text-inc-green hover:file:bg-inc-green/20
                  focus:outline-none cursor-pointer"
              />
            </div>
          )}
        </motion.div>
      </form>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: (formFields.length + 3) * 0.1 }}
        className="mt-8 bg-blue-50 rounded-lg p-4 flex items-start gap-3"
      >
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
          <Camera className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-blue-900">Tips for Best Results</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-blue-800">
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-blue-500" />
              Fill in all fields for a complete identification card
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-blue-500" />
              ID numbers are automatically formatted (123 456 789 012)
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-blue-500" />
              Choose from default, blank, or custom background
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-blue-500" />
              All text will be automatically converted to uppercase
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-3 w-3 text-blue-500" />
              Print the ID card wallet size
            </li>
          </ul>
        </div>
      </motion.div>
      
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
    </div>
  );
};