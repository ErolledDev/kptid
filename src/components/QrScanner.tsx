import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, ShieldAlert } from 'lucide-react';

interface QrScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onResult, onClose }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2
      },
      false
    );

    scanner.render((decodedText) => {
      onResult(decodedText);
      scanner.clear();
    }, (error) => {
      console.warn(error);
    });

    // Customize scanner UI after render
    const styleScanner = () => {
      const permissionButton = document.querySelector('#html5-qrcode-button-camera-permission');
      const selectElement = document.querySelector('#qr-reader select');
      
      if (permissionButton) {
        permissionButton.className = 'flex items-center justify-center gap-2 w-full px-4 py-3 bg-inc-green text-white rounded-lg hover:bg-inc-green-dark transition-colors duration-200 font-medium shadow-sm hover:shadow-md';
        permissionButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>
            <path d="M12 4V2"/>
            <path d="M12 22v-2"/>
            <path d="M20 12h2"/>
            <path d="M2 12h2"/>
          </svg>
          Request Camera Permission
        `;
      }
      
      if (selectElement) {
        selectElement.className = 'w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-inc-green focus:ring-2 focus:ring-inc-green/20 outline-none';
      }
    };

    // Apply styles after a short delay to ensure elements are rendered
    setTimeout(styleScanner, 100);

    return () => {
      scanner.clear();
    };
  }, [onResult]);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-inc-green/10 rounded-full mb-4">
          <Camera className="h-8 w-8 text-inc-green" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Scan QR Code</h3>
        <p className="text-slate-600 text-sm">
          Position the QR code within the frame to scan
        </p>
      </div>

      <div 
        id="qr-reader" 
        className="w-full rounded-lg overflow-hidden shadow-sm border border-slate-200"
        style={{
          '--border-color': '#e2e8f0',
          '--primary-color': '#009246',
        } as React.CSSProperties}
      />

      <div className="mt-6 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-700 mb-1">Camera Permission Required</p>
          <p className="text-sm text-blue-600">
            Please allow camera access when prompted. This is required for QR code scanning and is only used within your browser.
          </p>
        </div>
      </div>
    </div>
  );
};