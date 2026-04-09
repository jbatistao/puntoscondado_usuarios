'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  X, 
  QrCode, 
  CircleDollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  User as UserIcon,
  Store,
  ChevronRight
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface PointRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: {
    id: number;
    name: string;
  } | null;
  onSuccess?: () => void;
}

type Step = 'amount' | 'scan' | 'confirm' | 'success';

export default function PointRegistrationModal({ isOpen, onClose, merchant, onSuccess }: PointRegistrationModalProps) {
  const { data: session } = useSession();
  const [step, setStep] = useState<Step>('amount');
  const [amount, setAmount] = useState<string>('');
  const [userToken, setUserToken] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState<{name: string, points?: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const regionId = "merchant-qr-reader";

  useEffect(() => {
    if (step === 'scan' && isOpen) {
      startScanner();
    } else {
      stopScanner();
    }
  }, [step, isOpen]);

  const startScanner = async () => {
    try {
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
          handleScanSuccess(decodedText);
        },
        () => {} // silent error
      );
    } catch (err) {
      console.error("Scanner start error:", err);
      setError("No se pudo iniciar la cámara. Verifica los permisos.");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (err) {
        console.error("Scanner stop error:", err);
      }
    }
  };

  const handleScanSuccess = (decodedText: string) => {
    setUserToken(decodedText);
    if (navigator.vibrate) navigator.vibrate(200);
    setStep('confirm');
    stopScanner();
  };

  const handleRegisterPoints = async () => {
    if (!merchant || !amount || !userToken) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/rewards/actions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session as any)?.user?.accessToken}`
        },
        body: JSON.stringify({
          type: 'EARN',
          merchant_id: merchant.id,
          amount_cash: amount,
          user_token: userToken
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setCustomerInfo({ 
          name: data.customer_name,
          points: data.points
        });
        setStep('success');
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || 'Error al registrar puntos');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    stopScanner();
    onClose();
    // Reset state
    setTimeout(() => {
      setStep('amount');
      setAmount('');
      setUserToken('');
      setCustomerInfo(null);
      setError(null);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
              <Store size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{merchant?.name || 'Comercio'}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asignar Puntos</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          
          {/* STEP 1: AMOUNT */}
          {step === 'amount' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2 mb-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center text-emerald-500 mx-auto">
                    <CircleDollarSign size={32} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Monto de la Compra</h4>
                <p className="text-sm text-slate-500 font-medium">Digita el total de la factura antes de escanear.</p>
              </div>
              
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">$</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl py-6 pl-12 pr-6 text-3xl font-black focus:border-brand-primary outline-none transition-all placeholder:text-slate-300 text-slate-900 dark:text-white"
                  autoFocus
                />
              </div>

              <button 
                onClick={() => amount && setStep('scan')}
                disabled={!amount}
                className="w-full py-5 rounded-3xl bg-brand-primary text-white font-black text-base shadow-xl shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                Siguiente
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: SCAN */}
          {step === 'scan' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Escanear QR</h4>
                <p className="text-xs text-slate-500 font-medium">Escanea el código del cliente.</p>
              </div>

              <div className="relative aspect-square w-full bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-inner group">
                <div id={regionId} className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-52 h-52 border-2 border-brand-primary/50 rounded-2xl relative">
                    <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-brand-primary rounded-tl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-brand-primary rounded-br-lg" />
                  </div>
                </div>
                <div className="absolute left-0 right-0 h-[2px] bg-brand-primary shadow-[0_0_15px_rgba(37,99,235,0.8)] animate-scan-beam top-0 pointer-events-none" />
              </div>

              <button 
                onClick={() => setStep('amount')}
                className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm"
              >
                Atrás: Cambiar Monto
              </button>
            </div>
          )}

          {/* STEP 3: CONFIRM */}
          {step === 'confirm' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-4 mb-6">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-[2rem] flex items-center justify-center text-brand-primary mx-auto">
                    <QrCode size={32} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Confirmar Registro</h4>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">Total Compra</span>
                  <span className="text-xl font-black text-emerald-500">${amount}</span>
                </div>
                <div className="h-px bg-slate-100 dark:bg-slate-800" />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-slate-400">Cliente (ID)</span>
                  <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                    {userToken.substring(0, 8)}...
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-xs font-bold leading-relaxed">
                  <AlertCircle size={24} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              <button 
                onClick={handleRegisterPoints}
                disabled={isLoading}
                className="w-full py-5 rounded-3xl bg-brand-primary text-white font-black text-base shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Registrar Puntos'}
              </button>
              
              <button 
                onClick={() => setStep('scan')}
                disabled={isLoading}
                className="w-full py-4 text-slate-500 font-bold text-sm"
              >
                Volver a escanear
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'success' && (
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
               <div className="relative">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/40 relative z-10 scale-in">
                    <CheckCircle2 size={56} />
                  </div>
                  <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
               </div>

               <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">¡Puntos Registrados!</h4>
                  <p className="text-sm text-slate-500 font-medium max-w-[200px] mx-auto">
                    Los puntos han sido acreditados a <span className="text-slate-900 dark:text-white font-bold">{customerInfo?.name}</span>
                  </p>
               </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 inline-block">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Puntos Generados</p>
                  <p className="text-3xl font-black text-emerald-500">
                    +{customerInfo?.points || Math.round(parseFloat(amount) * 100)} <span className="text-xs">PTS</span>
                  </p>
               </div>

               <button 
                onClick={handleClose}
                className="w-full py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-base transition-all"
               >
                Listo
               </button>
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
          animation: scan-beam 2.5s ease-in-out infinite;
        }
        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}
