'use client';

import React from 'react';
import { Check, Info, CreditCard, RefreshCcw } from 'lucide-react';

export default function PricingComercios() {
  return (
    <section id="precio-comercios" className="py-24 bg-gray-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-secondary font-bold tracking-wide uppercase text-sm mb-3">Modelo de Inversión</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-6 leading-tight tracking-tight">
            Crecimiento sin flujo de caja negativo
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium italic">
            &quot;Olvídate de las facturas mensuales en efectivo. Nuestro modelo es 100% colaborativo.&quot;
          </p>
        </div>

        <div className="relative">
          {/* Main Pricing Card */}
          <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-12 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-gray-800 text-center relative z-10 overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-8">
                <RefreshCcw size={40} />
              </div>
              
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Plan Afiliado Único</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-6xl md:text-7xl font-extrabold text-slate-950 dark:text-white">$30</span>
                <span className="text-xl font-medium text-gray-500">/ mes</span>
              </div>
              
              <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide mb-12 border border-emerald-100 dark:border-emerald-800">
                Modalidad de Canje
              </div>

              <div className="max-w-lg mx-auto mb-12">
                <div className="flex items-start gap-4 text-left group">
                  <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-brand-secondary" />
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    El costo mensual es el equivalente a <span className="font-bold text-slate-900 dark:text-white">$30 en asignaciones de consumo</span>.
                  </p>
                </div>
                <div className="h-px bg-gray-100 dark:bg-gray-800 my-6" />
                <div className="flex items-start gap-4 text-left">
                  <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-brand-secondary" />
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="font-bold text-slate-900 dark:text-white">Cero pago en efectivo</span> para la mensualidad. Úsalo como una potente herramienta de marketing.
                  </p>
                </div>
              </div>

              <div className="w-full bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-12 py-5 rounded-[2rem] font-extrabold text-xl cursor-not-allowed select-none text-center border border-slate-200 dark:border-slate-800">
                Próximamente 2026
              </div>
            </div>
          </div>

          {/* Info Badge */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 text-gray-500 dark:text-gray-400 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-brand-primary" />
              <span>Sujeto a validación según giro del negocio</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <CreditCard size={16} />
              <span>Sin contratos forzosos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
