import React from 'react';
import { BusinessCardGenerator } from './components/BusinessCardGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Business Card CV
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Create your professional business card by filling out the form below
          </p>
        </header>
        
        <BusinessCardGenerator />
        
        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Business Card CV Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;