import React from 'react';
import { BusinessCardGenerator } from './components/BusinessCardGenerator';
import { ArrowRight, CreditCard, Download, QrCode, Shield, ChevronDown } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-gradient-to-br from-inc-green to-inc-green-dark text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h20v20H0z%22 fill=%22%23fff%22 fill-opacity=%22.05%22/%3E%3C/svg%3E')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Iglesia Ni Cristo ID Generator
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-slide-up leading-relaxed">
              Create official identification cards for Iglesia Ni Cristo members with our professional generator
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#generator"
                className="btn btn-secondary inline-flex items-center px-8 py-4 text-lg"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce mt-12 text-white/50">
          <ChevronDown className="h-8 w-8" />
        </div>
      </header>

      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CreditCard,
                title: "Official Design",
                description: "INC-approved card design with official color scheme and branding guidelines"
              },
              {
                icon: QrCode,
                title: "QR Code Integration",
                description: "Secure verification system with built-in QR code scanning technology"
              },
              {
                icon: Download,
                title: "Easy Export",
                description: "Download your ID card in high-quality PDF format ready for printing"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-inc-green" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="generator" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <BusinessCardGenerator />
        </div>
      </section>
      
      <footer className="bg-gradient-to-br from-inc-green to-inc-green-dark text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <p className="mb-3 text-white/90">© {new Date().getFullYear()} Iglesia Ni Cristo ID Generator. All rights reserved.</p>
          <p className="text-sm text-white/75">This is an unofficial tool and is not affiliated with Iglesia Ni Cristo.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;