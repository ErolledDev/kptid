import React from 'react';
import { BusinessCardGenerator } from './components/BusinessCardGenerator';
import { Hero } from './components/ui/hero';
import { Icons } from './components/ui/icons';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Hero
        pill={{
          text: "Official INC ID Generator",
          icon: <Icons.logo className="h-4 w-4" />,
          variant: "default",
          size: "md",
        }}
        content={{
          title: "Create your INC",
          titleHighlight: "ID Card",
          description:
            "Generate official Iglesia Ni Cristo identification cards with our professional ID generator. Features QR code integration and official INC design standards.",
          primaryAction: {
            href: "#generator",
            text: "Create ID Card",
            icon: <Icons.component className="h-4 w-4" />,
          },
        }}
      />
      
      <section id="generator" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <BusinessCardGenerator />
        </div>
      </section>
    </div>
  );
}

export default App;