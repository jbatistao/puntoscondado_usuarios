'use client';

import React, { useState } from 'react';
import { 
  X, 
  Gift, 
  Zap, 
  Ticket, 
  ChevronRight, 
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  Plus,
  Trophy,
  Stamp
} from 'lucide-react';

interface MerchantPromotionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: {
    id: string | number;
    name: string;
  } | null;
}

type PromoFeature = 'welcome' | 'boost' | 'coupons' | 'challenge_own' | 'stamps' | null;

export default function MerchantPromotionsModal({ isOpen, onClose, merchant }: MerchantPromotionsModalProps) {
  const [selectedFeature, setSelectedFeature] = useState<PromoFeature>(null);

  if (!isOpen) return null;

  const features = [
    {
      id: 'welcome',
      title: 'Bono de Bienvenida',
      description: 'Otorga puntos automáticos a nuevos usuarios que se registren o sigan tu comercio.',
      icon: Gift,
      color: 'text-violet-500',
      bg: 'bg-violet-500/10'
    },
    {
      id: 'boost',
      title: 'Acumulación Acelerada',
      description: 'Define fechas especiales donde los usuarios ganan 2x o 3x puntos de lo normal.',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    },
    {
      id: 'coupons',
      title: 'Cupones Promocionales',
      description: 'Crea códigos de descuento que los usuarios pueden canjear usando sus puntos.',
      icon: Ticket,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      id: 'challenge_own',
      title: 'Activar Reto',
      description: 'Crea desafíos exclusivos para tu negocio (ej. "Completa 5 visitas" para un premio especial).',
      icon: Trophy,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      id: 'stamps',
      title: 'Tarjeta de Sellos',
      description: 'Fomenta visitas recurrentes. El cliente marca sus visitas y al completar el cartón recibe un beneficio especial.',
      icon: Stamp,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10'
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111827] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
              <Gift size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Funciones Especiales</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{merchant?.name}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-8">
            Selecciona una funcionalidad para habilitar nuevas estrategias de fidelización en tu negocio.
          </p>

          <div className="space-y-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id as PromoFeature)}
                className={`w-full p-6 bg-slate-50 dark:bg-white/5 rounded-3xl border-2 transition-all flex items-start gap-5 text-left group hover:shadow-xl hover:-translate-y-1 ${
                  selectedFeature === feature.id 
                    ? 'border-brand-primary shadow-lg shadow-brand-primary/10 ring-4 ring-brand-primary/5' 
                    : 'border-transparent border-dashed hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center shrink-0`}>
                  <feature.icon size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 dark:text-white text-lg mb-1 flex items-center gap-2">
                    {feature.title}
                    {selectedFeature === feature.id && <CheckCircle2 size={18} className="text-brand-primary" />}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div className="self-center">
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-brand-primary/5 rounded-2xl flex items-start gap-3 border border-brand-primary/10">
            <Info size={18} className="text-brand-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-brand-primary/80 font-bold leading-relaxed">
              * Estas funcionalidades son premium. Al habilitarlas podrías ver cambios en la visibilidad de tu comercio en el directorio principal.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-0 flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-5 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black text-sm transition-all"
          >
            Cancelar
          </button>
          <button 
            onClick={() => {
              // Action logic here in the future
              onClose();
            }}
            disabled={!selectedFeature}
            className="flex-1 py-5 rounded-3xl bg-brand-primary text-white font-black text-sm shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            Configurar
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

// Simple ArrowRight icon was missing from imports
function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
