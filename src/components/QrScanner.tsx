import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera } from 'lucide-react';

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
      const selectElement = document.querySelector('#qr-reader select');
      if (selectElement) {
        selectElement.classList.add('rounded-lg', 'border', 'border-slate-200', 'px-3', 'py-2', 'text-sm');
      }
    };

    setTimeout(styleScanner, 100);

    return () => {
      scanner.clear();
    };
  }, [onResult]);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[#009246]/10 rounded-full mb-3">
          <Camera className="h-6 w-6 text-[#009246]" />
        </div>
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

      <div className="mt-4 bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          Make sure your camera has permission and there's good lighting for best results.
        </p>
      </div>
    </div>
  );
};