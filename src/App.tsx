import React from 'react';
import { BusinessCardGenerator } from './components/BusinessCardGenerator';
import { ArrowRight, CreditCard, Download, QrCode, Shield } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-[#009246] text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Iglesia Ni Cristo ID Generator
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-8">
              Create official identification cards for Iglesia Ni Cristo members with our professional generator
            </p>
            <a
              href="#generator"
              className="inline-flex items-center px-6 py-3 bg-white text-[#009246] rounded-full font-semibold hover:bg-green-50 transition-colors duration-200"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-[#009246]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Official Design</h3>
              <p className="text-slate-600">INC-approved card design with official color scheme</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-[#009246]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Code Integration</h3>
              <p className="text-slate-600">Quick verification with built-in QR code system</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-[#009246]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Export</h3>
              <p className="text-slate-600">Download your ID card in high-quality PDF format</p>
            </div>
          </div>
        </div>
      </div>

      {/* Generator Section */}
      <div id="generator" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BusinessCardGenerator />
        </div>
      </div>
      
      <footer className="bg-[#009246] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <p>© {new Date().getFullYear()} Iglesia Ni Cristo ID Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;