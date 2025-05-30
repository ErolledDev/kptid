import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Camera, ShieldAlert, Flashlight, StopCircle } from 'lucide-react';

interface QrScannerProps {
  onResult: (result: string) => void;
  onClose: () => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onResult, onClose }) => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    const newScanner = new Html5QrcodeScanner(
      "qr-reader",
      { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        showTorchButtonIfSupported: false,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA,
          Html5QrcodeScanType.SCAN_TYPE_FILE
        ]
      },
      false
    );

    setScanner(newScanner);

    newScanner.render((decodedText) => {
      onResult(decodedText);
      if (newScanner) {
        newScanner.clear();
      }
    }, console.error);

    // Customize scanner UI after render
    const styleScanner = () => {
      const permissionButton = document.querySelector('#html5-qrcode-button-camera-permission');
      const selectElement = document.querySelector('#qr-reader select');
      const fileButton = document.querySelector('#html5-qrcode-button-file-selection');
      
      if (permissionButton) {
        permissionButton.className = 'w-full px-6 py-3 bg-inc-green text-white rounded-lg hover:bg-inc-green-dark transition-colors duration-200 font-medium shadow-sm hover:shadow-md mb-4 flex items-center justify-center gap-2';
        permissionButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/>
            <path d="M12 4V2"/>
            <path d="M12 22v-2"/>
            <path d="M20 12h2"/>
            <path d="M2 12h2"/>
          </svg>
          Start Camera Scan
        `;
      }
      
      if (selectElement) {
        selectElement.className = 'w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:border-inc-green focus:ring-2 focus:ring-inc-green/20 outline-none mb-4';
      }

      if (fileButton) {
        fileButton.className = 'w-full px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 mb-4';
        fileButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
            <circle cx="9" cy="9" r="2"/>
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
          Scan from Image
        `;
      }

      // Add custom controls
      const controlsContainer = document.createElement('div');
      controlsContainer.className = 'flex gap-2 mt-4';
      
      // Torch button
      const torchButton = document.createElement('button');
      torchButton.className = 'flex-1 px-4 py-2.5 bg-inc-green text-white rounded-lg hover:bg-inc-green-dark transition-colors duration-200 font-medium flex items-center justify-center gap-2';
      torchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10 16l4-4"/>
          <path d="M12 12 8 8"/>
          <path d="M12 12l4 4"/>
          <path d="M12 12l4-4"/>
        </svg>
        Toggle Torch
      `;
      torchButton.onclick = async () => {
        if (scanner) {
          try {
            await scanner.toggleFlash();
            setIsTorchOn(!isTorchOn);
          } catch (error) {
            console.error('Error toggling torch:', error);
          }
        }
      };
      
      // Stop button
      const stopButton = document.createElement('button');
      stopButton.className = 'flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium flex items-center justify-center gap-2';
      stopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <rect x="9" y="9" width="6" height="6"/>
        </svg>
        Stop Scan
      `;
      stopButton.onclick = () => {
        if (scanner) {
          scanner.stop();
          setIsScanning(false);
        }
      };

      controlsContainer.appendChild(torchButton);
      controlsContainer.appendChild(stopButton);

      const qrReader = document.getElementById('qr-reader');
      if (qrReader) {
        qrReader.appendChild(controlsContainer);
      }
    };

    setTimeout(styleScanner, 100);

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [onResult, isTorchOn]);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-inc-green/10 rounded-full mb-4">
          <Camera className="h-8 w-8 text-inc-green" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Scan QR Code</h3>
        <p className="text-slate-600 text-sm">
          Use your camera to scan a QR code or upload an image
        </p>
      </div>

      <div 
        id="qr-reader" 
        className="w-full rounded-lg overflow-hidden shadow-sm border border-slate-200 bg-white p-4"
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
          <p className="text-sm font-medium text-blue-700 mb-1">Camera Access Required</p>
          <p className="text-sm text-blue-600">
            Please allow camera access when prompted. This is required for QR code scanning and is only used within your browser.
          </p>
        </div>
      </div>
    </div>
  );
};