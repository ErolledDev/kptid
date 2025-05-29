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
    if (name === 'number') {
      // Format the number with spaces after every 3 digits
      const formattedValue = value.replace(/\s/g, '').replace(/(.{3})/g, '$1 ').trim();
      onInputChange(name as keyof CardData, formattedValue);
    } else {
      onInputChange(name as keyof CardData, value);
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
      label: 'Puro/Group',
      placeholder: 'ENTER YOUR GROUP',
      value: cardData.group,
      maxLength: 20
    },
    {
      id: 'qrText',
      label: 'QR Code Text',
      placeholder: 'ENTER TEXT TO GENERATE QR CODE',
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
          className="pt-2"
        >
          <label className="label mb-2">Background Image (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoUpload}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#009246]/10 file:text-[#009246] hover:file:bg-[#009246]/20 focus:outline-none"
          />
          <p className="mt-2 text-xs text-slate-500">For best results, use a light-colored or low-opacity image</p>
        </motion.div>
      </form>
      
      <div className="mt-8 bg-[#009246]/5 rounded-lg p-4 border border-[#009246]/10">
        <h3 className="font-medium text-[#009246] mb-2">Tips:</h3>
        <ul className="text-sm text-slate-700 space-y-1.5 pl-5 list-disc marker:text-[#009246]">
          <li>Fill in all fields for a complete identification card</li>
          <li>ID numbers are automatically formatted (123 456 789 012)</li>
          <li>Optional background image for customization</li>
          <li>All text will be automatically converted to uppercase</li>
          <li>Download your card when finished</li>
        </ul>
      </div>
    </div>
  );
};