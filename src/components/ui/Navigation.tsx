import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, BookOpen, X } from 'lucide-react';

export const Navigation = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <>
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
            <button
              onClick={() => setShowAboutModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-inc-green hover:bg-inc-green/10 transition-colors duration-200"
            >
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">About</span>
            </button>
            <a
              href="https://directory.iglesianicristo.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-inc-green hover:bg-inc-green/10 transition-colors duration-200"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Directory</span>
            </a>
          </nav>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAboutModal && (
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
              className="bg-white rounded-xl max-w-lg w-full mx-auto shadow-xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-slate-800">About Me</h3>
                  <button
                    onClick={() => setShowAboutModal(false)}
                    className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex flex-col items-center text-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mb-4 ring-4 ring-inc-green/20"
                  />
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">John Doe</h4>
                  <p className="text-slate-600 mb-4">Web Developer & INC Member</p>
                  <p className="text-slate-600 leading-relaxed">
                    I created this ID generator tool to help fellow church members create professional-looking identification cards. 
                    While this is not an official INC tool, it's made with love and respect for our church community.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <h5 className="font-medium text-slate-800 mb-2">Disclaimer</h5>
                  <p className="text-sm text-slate-600">
                    This ID generator is a fan-made tool and is not officially affiliated with or endorsed by Iglesia Ni Cristo. 
                    All data remains in your browser and is not stored or transmitted.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};