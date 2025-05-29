import React from 'react';
import { CardData } from '../types/types';
import { motion } from 'framer-motion';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onInputChange(name as keyof CardData, value);
  };
  
  const formFields = [
    {
      id: 'fullName',
      label: 'Full Name',
      placeholder: 'John Doe',
      value: cardData.fullName,
      maxLength: 50
    },
    {
      id: 'number',
      label: '12 Digits Number',
      placeholder: '123456789012',
      value: cardData.number,
      maxLength: 12
    },
    {
      id: 'locale',
      label: 'Locale #',
      placeholder: 'LOC-123',
      value: cardData.locale,
      maxLength: 20
    },
    {
      id: 'group',
      label: 'Group #',
      placeholder: 'GRP-456',
      value: cardData.group,
      maxLength: 20
    },
    {
      id: 'qrText',
      label: 'QR Code Text',
      placeholder: 'Enter text to generate QR code',
      value: cardData.qrText,
      maxLength: 100
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
            <label htmlFor={field.id} className="label group-focus-within:text-blue-600 transition-colors duration-200">
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
              className="input-field group-focus-within:border-blue-600 group-focus-within:ring-blue-100"
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: formFields.length * 0.1 }}
          className="pt-2"
        >
          <label className="label mb-2">Background Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoUpload}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none"
          />
        </motion.div>
      </form>
      
      <div className="mt-8 bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">Tips:</h3>
        <ul className="text-sm text-blue-800 space-y-1.5 pl-5 list-disc marker:text-blue-400">
          <li>Fill in all fields for a complete business card</li>
          <li>Upload a photo for the card background</li>
          <li>The QR code will be generated automatically</li>
          <li>Use high-resolution images for best results</li>
        </ul>
      </div>
    </div>
  );
};