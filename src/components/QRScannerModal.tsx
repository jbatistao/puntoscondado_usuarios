'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { X, Camera, RefreshCw, AlertCircle, CheckCircle2, Zap } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
  merchantName: string;
}

export default function QRScannerModal({ isOpen, onClose, onScan, merchantName }: QRScannerModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const regionId = "qr-reader-region";

  useEffect(() => {
    if (isOpen && !isScanning && !scannedData) {
      startScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen, scannedData]);

  const startScanner = async () => {
    try {
      setIsScanning(true);
      setError(null);
      
      const html5QrCode = new Html5Qrcode(regionId);
      scannerRef.current = html5QrCode;

      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleSuccess(decodedText);
        },
        (errorMessage) => {
          // Ignore verbose errors
        }
      );
    } catch (err) {
      console.error("Error starting QR scanner:", err);
      setError("No pudimos acceder a la cámara. Por favor, verifica los permisos.");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const handleSuccess = (data: string) => {
    setScannedData(data);
    stopScanner();
    // Vibrate if supported
    if (navigator.vibrate) navigator.vibrate(200);
    
    // Auto-confirm after a delay or pass back
    setTimeout(() => {
        onScan(data);
    }, 1500);
  };

  const handleClose = async () => {
    await stopScanner();
    onClose();
    // Reset state for next time
    setScannedData(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Canjear Puntos</h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">{merchantName}</p>
          </div>
          <button 
            onClick={handleClose}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          <div className="relative aspect-square w-full bg-slate-900 rounded-3xl overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-inner group">
            
            {/* The Scanner Region */}
            <div id={regionId} className="w-full h-full" />

            {/* Scanning Overlay (only when scanning) */}
            {isScanning && !scannedData && (
              <>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Scanner Frame */}
                  <div className="w-64 h-64 border-2 border-brand-primary/50 rounded-2xl relative">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-brand-primary rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-brand-primary rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-brand-primary rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-brand-primary rounded-br-lg" />
                  </div>
                </div>
                
                {/* Horizontal Scan Beam */}
                <div className="absolute left-0 right-0 h-[2px] bg-brand-primary shadow-[0_0_15px_rgba(37,99,235,0.8)] animate-scan-beam top-0 pointer-events-none" />
              </>
            )}

            {/* Success Overlay */}
            {scannedData && (
              <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-emerald-500 shadow-xl scale-in duration-300">
                    <CheckCircle2 size={40} />
                </div>
                <h4 className="text-xl font-black mb-2">¡Código Leído!</h4>
                <p className="text-sm font-bold opacity-90 truncate max-w-full">{scannedData}</p>
              </div>
            )}

            {/* Error Overlay */}
            {error && (
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center text-white p-6 text-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <p className="text-sm font-bold">{error}</p>
                <button 
                  onClick={startScanner}
                  className="mt-4 flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold text-xs"
                >
                  <RefreshCw size={14} /> Reintentar
                </button>
              </div>
            )}

            {/* Placeholder / Loading */}
            {!isScanning && !scannedData && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <Camera size={48} className="mb-4 opacity-20" />
                <p className="text-sm font-bold opacity-50">Iniciando cámara...</p>
              </div>
            )}
          </div>
        </div>

        {/* Info / Permissions Footer */}
        <div className="px-6 pb-8 text-center">
          {!scannedData ? (
             <div className="flex flex-col items-center gap-4">
               <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Escanea el código QR del cliente para procesar su beneficio.
               </p>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <Zap size={10} className="text-yellow-500" /> Cámara posterior activa
               </div>
             </div>
          ) : (
            <div className="h-10 flex items-center justify-center">
                <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-progress-fast" />
                </div>
            </div>
          )}
        </div>

      </div>

      <style jsx>{`
        @keyframes scan-beam {
          0% { top: 10%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
        .animate-scan-beam {
          animation: scan-beam 2s ease-in-out infinite;
        }
        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes progress-fast {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress-fast {
          animation: progress-fast 1.5s linear forwards;
        }
      `}</style>
    </div>
  );
}
