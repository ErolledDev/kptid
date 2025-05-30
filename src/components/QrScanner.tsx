import React, { useEffect } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Camera, ShieldAlert, X } from 'lucide-react';

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
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA
        ]
      },
      false
    );

    scanner.render((decodedText) => {
      onResult(decodedText);
      scanner.clear();
    }, (errorMessage) => {
      // Only log critical errors, not normal "no QR code found" messages
      if (!errorMessage.includes('NotFoundException')) {
        console.error(errorMessage);
      }
    });

    // Customize scanner UI after render
    const styleScanner = () => {
      const permissionButton = document.querySelector('#html5-qrcode-button-camera-permission');
      const torchButton = document.querySelector('#html5-qrcode-button-torch');
      const stopButton = document.querySelector('#html5-qrcode-button-camera-stop');
      const fileButton = document.querySelector('#html5-qrcode-anchor-scan-type-change');
      
      if (permissionButton instanceof HTMLElement) {
        permissionButton.className = 'w-full px-6 py-3 bg-inc-green text-white rounded-lg hover:bg-inc-green-dark transition-colors duration-200 font-medium shadow-sm hover:shadow-md mb-4 flex items-center justify-center gap-2';
        permissionButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 8h.01"/>
            <rect width="16" height="12" x="4" y="6" rx="2"/>
            <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
            <path d="M4 12v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>
          </svg>
          Start Camera
        `;
      }

      // Style torch button if it exists
      if (torchButton instanceof HTMLElement) {
        torchButton.className = 'px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200 font-medium mb-2 flex items-center justify-center gap-2';
      }

      // Style stop button if it exists
      if (stopButton instanceof HTMLElement) {
        stopButton.className = 'px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200 font-medium mb-2 flex items-center justify-center gap-2';
      }

      // Hide file selection button
      if (fileButton instanceof HTMLElement) {
        fileButton.style.display = 'none';
      }
    };

    // Apply styles after a short delay to ensure elements are rendered
    setTimeout(styleScanner, 100);

    return () => {
      scanner.clear().catch(console.error);
    };
  }, [onResult]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-inc-green/10 rounded-full flex items-center justify-center">
            <Camera className="h-5 w-5 text-inc-green" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Scan QR Code</h3>
            <p className="text-sm text-slate-600">Point your camera at a QR code</p>
          </div>
        </div>
      </div>

      <div 
        id="qr-reader" 
        className="w-full rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-white p-4"
      />

      <div className="mt-6 bg-blue-50 rounded-lg p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-blue-700">Camera Access Required</p>
          <p className="text-sm text-blue-600 mt-1">
            Please allow camera access when prompted. This is required for QR code scanning and is only used within your browser.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};