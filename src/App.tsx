import React from 'react';
import { BusinessCardGenerator } from './components/BusinessCardGenerator';
import { Hero } from './components/ui/hero';
import { Icons } from './components/ui/icons';
import { AlertTriangle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      <main className="flex-1">
        <Hero
          pill={{
            text: "Unofficial INC ID Generator",
            icon: <AlertTriangle className="h-4 w-4" />,
            variant: "default",
            size: "md",
          }}
          content={{
            title: "Create your",
            titleHighlight: "INC ID Card",
            description:
              "Generate unofficial Iglesia Ni Cristo identification cards with our professional ID generator. This is a fan-made tool and is not officially affiliated with or endorsed by Iglesia Ni Cristo.",
            primaryAction: {
              href: "#generator",
              text: "Create ID Card",
              icon: <Icons.component className="h-4 w-4" />,
            },
          }}
        />
        
        <section id="generator" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto">
            <BusinessCardGenerator />
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Disclaimer</h3>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                This ID generator is a fan-made tool and is not officially affiliated with or endorsed by Iglesia Ni Cristo. 
                The INC logo and name are trademarks of Iglesia Ni Cristo and are used here for identification purposes only.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">About</h3>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                Made with ❤️ for the INC community. This tool helps generate QR-enabled identification cards 
                for personal use. All data remains in your browser and is not stored or transmitted.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-center text-sm text-slate-500">
              © {new Date().getFullYear()} INC ID Generator. Not affiliated with Iglesia Ni Cristo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;