import React, { useState } from 'react';
import { BusinessCardForm } from './BusinessCardForm';
import { BusinessCardPreview } from './BusinessCardPreview';
import { CardData } from '../types/types';
import { motion } from 'framer-motion';

export const BusinessCardGenerator: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    fullName: '',
    number: '',
    locale: '',
    group: '',
    qrText: '',
    photoUrl: ''
  });
  
  const handleInputChange = (name: keyof CardData, value: string) => {
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card-shadow bg-white rounded-xl p-6"
      >
        <BusinessCardForm 
          cardData={cardData} 
          onInputChange={handleInputChange}
          onPhotoUpload={handlePhotoUpload}
        />
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-8"
      >
        <BusinessCardPreview cardData={cardData} />
      </motion.div>
    </div>
  );
};