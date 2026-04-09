'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  X, 
  QrCode, 
  Ticket, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  User as UserIcon,
  Store,
  Wallet,
  Coins,
  ChevronRight,
  Info
} from 'lucide-react';
import { useSession } from 'next-auth/react';

interface PointRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: {
    id: number;
    name: string;
    redemption_cap?: string;
  } | null;
  onSuccess?: () => void;
}

type Step = 'bill_amount' | 'scan' | 'redemption_details' | 'success';

export default function PointRedemptionModal({ isOpen, onClose, merchant, onSuccess }: PointRedemptionModalProps) {
  const { data: session } = useSession();
  const [step, setStep] = useState<Step>('bill_amount');
  const [billAmount, setBillAmount] = useState<string>('');
  const [userToken, setUserToken] = useState<string>('');
  const [availability, setAvailability] = useState<any>(null);
  const [pointsToRedeem, setPointsToRedeem] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const regionId = "redemption-qr-reader";

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

  const handleScanSuccess = async (decodedText: string) => {
    setUserToken(decodedText);
    if (navigator.vibrate) navigator.vibrate(200);
    stopScanner();
    fetchAvailability(decodedText);
  };

  const fetchAvailability = async (token: string) => {
    if (!merchant || !billAmount) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/rewards/actions/?merchant_id=${merchant.id}&user_token=${token}&total_bill=${billAmount}`, {
        headers: {
          'Authorization': `Bearer ${(session as any)?.user?.accessToken}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setAvailability(data);
        setStep('redemption_details');
      } else {
        setError(data.error || 'Error al verificar puntos del cliente');
        setStep('scan'); // Retry scan
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
      setStep('scan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedeemPoints = async () => {
    if (!merchant || !pointsToRedeem || !userToken || !billAmount) return;
    
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
          type: 'REDEEM',
          merchant_id: merchant.id,
          amount_cash: billAmount,
          user_token: userToken,
          points_to_redeem: pointsToRedeem
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setStep('success');
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || 'Error al aplicar el canje');
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
    // Reset state after animation
    setTimeout(() => {
      setStep('bill_amount');
      setBillAmount('');
      setUserToken('');
      setAvailability(null);
      setPointsToRedeem('');
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
            <div className="w-10 h-10 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <Ticket size={20} />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">{merchant?.name || 'Comercio'}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Canje de Puntos</p>
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
          {availability?.customer_name && step !== 'success' && step !== 'bill_amount' && (
            <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
               <UserIcon size={14} className="text-slate-400" />
               <p className="text-xs font-bold text-slate-600 dark:text-slate-300">Cliente: <span className="text-slate-900 dark:text-white">{availability.customer_name}</span></p>
            </div>
          )}
          {/* STEP 1: BILL AMOUNT (Necessary for Capping Rules) */}
          {step === 'bill_amount' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2 mb-8">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-slate-400 mx-auto">
                    <Store size={32} />
                </div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Monto de la Venta</h4>
                <p className="text-sm text-slate-500 font-medium whitespace-pre-wrap">Ingrese el total de la factura para calcular el límite de canje.</p>
              </div>
              
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-400">$</span>
                <input 
                  type="number" 
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl py-6 pl-12 pr-6 text-3xl font-black focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300 text-slate-900 dark:text-white"
                  autoFocus
                />
              </div>

              <button 
                onClick={() => billAmount && setStep('scan')}
                disabled={!billAmount}
                className="w-full py-5 rounded-3xl bg-emerald-500 text-white font-black text-base shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                Escanear Cliente
                <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: SCAN */}
          {step === 'scan' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-1 mb-4">
                <h4 className="text-xl font-black text-slate-900 dark:text-white">Escaneando Cliente</h4>
                <p className="text-xs text-slate-500 font-medium">Capture el QR del cliente para ver sus puntos.</p>
              </div>

              <div className="relative aspect-square w-full bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-slate-100 dark:border-slate-800 shadow-inner group">
                {isLoading ? (
                  <div className="absolute inset-0 z-10 bg-slate-900/80 flex flex-col items-center justify-center text-white">
                    <Loader2 size={40} className="animate-spin text-emerald-500 mb-4" />
                    <p className="text-sm font-bold">Verificando puntos...</p>
                  </div>
                ) : (
                  <>
                    <div id={regionId} className="w-full h-full" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-52 h-52 border-2 border-emerald-500/50 rounded-2xl relative">
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-xs font-bold leading-relaxed">
                  <AlertCircle size={24} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              <button 
                onClick={() => setStep('bill_amount')}
                className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm"
              >
                Atrás: Corregir Monto
              </button>
            </div>
          )}

          {/* STEP 3: REDEMPTION DETAILS */}
          {step === 'redemption_details' && availability && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-5">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400">
                      <Store size={18} />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] font-black uppercase text-slate-400">Puntos Leales (Este Comercio)</p>
                      <div className="flex justify-between items-baseline">
                        <p className="text-xl font-black text-slate-900 dark:text-white">{availability.local_points.toLocaleString()}</p>
                        <p className="text-xs font-bold text-emerald-500">${(availability.local_points / 100).toFixed(2)}</p>
                      </div>
                   </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800" />
                
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-slate-400">
                      <Wallet size={18} />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-[10px] font-black uppercase text-slate-400">Puntos de Red (Otros comercios)</p>
                        <div className="flex items-center gap-1 group relative">
                           <Info size={12} className="text-slate-300" />
                           <div className="absolute bottom-full right-0 mb-2 w-32 p-2 bg-slate-900 text-[8px] text-white rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                             Redención limitada al {merchant?.redemption_cap}% de la venta.
                           </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <p className="text-xl font-black text-slate-900 dark:text-white">
                          {availability.network_points_usable.toLocaleString()} 
                          <span className="text-[10px] text-slate-400 font-bold ml-1 italic"> (de {availability.network_points_total.toLocaleString()})</span>
                        </p>
                        <p className="text-xs font-bold text-slate-500">${(availability.network_points_usable / 100).toFixed(2)}</p>
                      </div>
                   </div>
                </div>

                <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                   <p className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 mb-1">Total Disponible hoy</p>
                   <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 italic">
                      ${availability.total_usable_cash} <span className="text-sm">({availability.total_usable_points.toLocaleString()} pts)</span>
                   </p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest block ml-2">Puntos a Redimir</label>
                <div className="relative group">
                  <Coins className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input 
                    type="number" 
                    max={availability.total_usable_points}
                    value={pointsToRedeem}
                    onChange={(e) => setPointsToRedeem(e.target.value)}
                    placeholder="0"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-5 pl-14 pr-20 font-black text-xl text-slate-900 dark:text-white focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
                  />
                  <button 
                    onClick={() => setPointsToRedeem(availability.total_usable_points.toString())}
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-black rounded-xl hover:bg-emerald-600 transition-colors"
                  >
                    MAX
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-bold text-right mr-2">
                   Valor: ${((parseFloat(pointsToRedeem) || 0) / 100).toFixed(2)}
                </p>
              </div>

              {/* Resumen de Pago */}
              <div className="p-6 bg-slate-900 dark:bg-white rounded-3xl text-white dark:text-slate-900 space-y-3">
                <div className="flex justify-between items-center text-xs opacity-70 font-bold">
                  <span>Monto de la Venta</span>
                  <span>${billAmount}</span>
                </div>
                <div className="flex justify-between items-center text-xs opacity-70 font-bold">
                  <span>Descuento Aplicado</span>
                  <span className="text-emerald-400 dark:text-emerald-600">-${((parseFloat(pointsToRedeem) || 0) / 100).toFixed(2)}</span>
                </div>
                <div className="h-px bg-white/10 dark:bg-slate-200" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black uppercase tracking-tight">Total a Pagar</span>
                  <span className="text-2xl font-black">
                    ${Math.max(0, (parseFloat(billAmount) || 0) - ((parseFloat(pointsToRedeem) || 0) / 100)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center gap-3 text-xs font-bold font-sans">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              <button 
                onClick={handleRedeemPoints}
                disabled={isLoading || !pointsToRedeem || parseInt(pointsToRedeem) > availability.total_usable_points}
                className="w-full py-5 rounded-3xl bg-emerald-500 text-white font-black text-base shadow-xl shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Aplicar Canje'}
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
                  <h4 className="text-2xl font-black text-slate-900 dark:text-white">¡Canje Exitoso!</h4>
                  <p className="text-sm text-slate-500 font-medium max-w-[200px] mx-auto">
                    Se han descontado <span className="text-emerald-500 font-bold">{parseInt(pointsToRedeem).toLocaleString()} pts</span> de la cuenta de <span className="text-slate-900 dark:text-white font-bold">{availability?.customer_name || 'cliente'}</span>.
                  </p>
               </div>

               <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 inline-block">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-1">Ahorro Aplicado</p>
                  <p className="text-3xl font-black text-emerald-500">
                    -${(parseFloat(pointsToRedeem) / 100).toFixed(2)} <span className="text-xs">USD</span>
                  </p>
               </div>

               <button 
                onClick={handleClose}
                className="w-full py-5 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-base transition-all"
               >
                Cerrar
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
