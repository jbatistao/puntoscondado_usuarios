'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Gift, ChevronRight, Loader2, Sparkles, CheckCircle2, ArrowLeft, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Merchant {
  id: string;
  name: string;
  logo: string | null;
  welcome_bonus_points: number;
  is_selected?: boolean;
}

export default function WelcomeBonusesPage() {
  const { data: session } = useSession();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectionCount, setSelectionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchAllBonuses = async () => {
    if (!session?.user) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/welcome-bonus/?all=true`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMerchants(data.merchants);
        setSelectionCount(data.selection_count);
      }
    } catch (error) {
      console.error('Error fetching welcome bonuses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBonuses();
  }, [session]);

  const handleToggle = async (merchant: Merchant) => {
    if (processingId) return;
    
    const isSelecting = !merchant.is_selected;
    
    if (isSelecting && selectionCount >= 3) {
      alert('Ya has alcanzado el límite de 3 bonos.');
      return;
    }

    setProcessingId(merchant.id);
    try {
      const method = isSelecting ? 'POST' : 'DELETE';
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/welcome-bonus/`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ merchant_id: merchant.id })
      });
      
      if (response.ok) {
        await fetchAllBonuses();
      } else {
        const data = await response.json();
        alert(data.error || 'Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error toggling bonus:', error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col text-slate-800 dark:text-slate-100">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-primary transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Volver al Inicio
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                <Gift className="text-violet-500" size={36} />
                Tus Obsequios
              </h1>
              <p className="text-slate-500 dark:text-slate-400 font-bold">
                Gestiona tus 3 bonos de bienvenida. Puedes cambiarlos en cualquier momento.
              </p>
            </div>
            
            <div className="bg-white dark:bg-[#111827] p-4 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-6">
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Seleccionados</p>
                    <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                            <div 
                                key={i} 
                                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                                    i <= selectionCount 
                                    ? 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.6)]' 
                                    : 'bg-slate-200 dark:bg-slate-800'
                                }`}
                            />
                        ))}
                    </div>
                </div>
                <div className="h-10 w-px bg-slate-100 dark:bg-slate-800" />
                <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cupos Libres</p>
                    <p className="text-xl font-black text-violet-600">{3 - selectionCount}</p>
                </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-violet-500 mb-4" size={48} />
            <p className="font-bold text-slate-500">Cargando bonos disponibles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map((merchant) => (
              <div 
                key={merchant.id}
                className={`bg-white dark:bg-[#111827] rounded-[2.5rem] p-6 shadow-sm border transition-all duration-500 relative overflow-hidden group ${
                  merchant.is_selected 
                    ? 'border-violet-500 ring-4 ring-violet-500/10' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-violet-500/30'
                }`}
              >
                {/* Selected Ribbon */}
                {merchant.is_selected && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-violet-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-violet-500/30 animate-in zoom-in-50 duration-300">
                      Seleccionado
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0 transition-all duration-300 ${merchant.is_selected ? 'scale-110 shadow-lg' : ''}`}>
                    {merchant.logo ? (
                      <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-cover" />
                    ) : (
                      <Sparkles size={28} className="text-violet-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 pr-16">
                    <h3 className="font-black text-slate-900 dark:text-white text-lg truncate leading-tight">{merchant.name}</h3>
                    <p className="text-xs font-bold text-violet-500 uppercase tracking-widest mt-1">Bono por registro</p>
                  </div>
                </div>

                <div className="flex items-end justify-between bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Valor del Bono</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">
                                {merchant.welcome_bonus_points}
                            </span>
                            <span className="text-sm font-bold text-slate-500">PTS</span>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => handleToggle(merchant)}
                        disabled={processingId !== null}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                            merchant.is_selected 
                            ? 'bg-red-50 text-red-500 hover:bg-red-500 hover:text-white' 
                            : selectionCount >= 3
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-600/20'
                        }`}
                    >
                        {processingId === merchant.id ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : merchant.is_selected ? (
                            <Trash2 size={20} />
                        ) : (
                            <Plus size={24} />
                        )}
                    </button>
                </div>
                
                {merchant.is_selected && (
                  <p className="mt-4 text-[10px] text-center text-slate-400 font-medium">
                    Toca el icono de papelera para desvincular este bono
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Info Card */}
        <div className="mt-12 bg-violet-600 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-violet-600/20">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-50" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
              <Sparkles />
              ¿Cómo funcionan los bonos?
            </h2>
            <div className="space-y-4 text-violet-100 font-medium text-sm md:text-base leading-relaxed">
              <p>• Los puntos de bienvenida son exclusivos para el comercio donde los seleccionas.</p>
              <p>• Puedes cambiar tu selección en cualquier momento, siempre que no hayas consumido los puntos.</p>
              <p>• Solo puedes tener activos hasta 3 bonos de manera simultánea.</p>
              <p>• Al desmarcar un bono, los puntos correspondientes se retirarán de tu balance para ese comercio.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
