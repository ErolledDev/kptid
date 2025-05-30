import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, BookOpen } from 'lucide-react';

export const Navigation = () => {
  return (
    <div className="flex justify-center w-full py-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="flex items-center gap-2 p-2 rounded-full backdrop-blur-md bg-white/70 border border-white/20 shadow-lg shadow-black/[0.03]">
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-inc-green hover:bg-inc-green/10 transition-colors duration-200"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-inc-green hover:bg-inc-green/10 transition-colors duration-200"
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">About</span>
          </a>
          <a
            href="#directory"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-inc-green hover:bg-inc-green/10 transition-colors duration-200"
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Directory</span>
          </a>
        </nav>
      </motion.div>
    </div>
  );
};