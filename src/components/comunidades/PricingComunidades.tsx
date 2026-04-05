import React from 'react';
import { CheckCircle2, TrendingDown, Repeat } from 'lucide-react';

export default function PricingComunidades() {
  return (
    <section id="pricing-comunidades" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-3">LA INVERSIÓN</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Costo <span className="text-brand-secondary">Zero</span> para su Administración
          </h3>
          <div className="w-24 h-1.5 bg-brand-secondary mx-auto mt-6 rounded-full" />
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-[3.rem] p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden group transition-all duration-500">
          <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full -translate-y-1/2 -translate-x-1/2 group-hover:bg-brand-primary/10 transition-all" />
          
          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-2/3">
              <p className="text-2xl text-gray-300 mb-10 leading-relaxed font-medium">
                Puntos Condado es una alianza estratégica que no requiere desembolsos del presupuesto de mantenimiento del PH. Integración gratuita y sin costos operativos mensuales.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-4 items-start bg-white/10 p-6 rounded-2xl shadow-sm border border-white/5">
                  <CheckCircle2 className="text-brand-secondary h-8 w-8 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Totalmente Gratis</h4>
                    <p className="text-gray-400">Sin costos de implementación ni mensualidades por el uso de la plataforma.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start bg-white/10 p-6 rounded-2xl shadow-sm border border-white/5">
                  <TrendingDown className="text-brand-primary h-8 w-8 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">Optimiza Recursos</h4>
                    <p className="text-gray-400">Mejora la recaudación y comunicación sin aumentar los gastos administrativos.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 w-full bg-brand-primary p-10 rounded-[2.5rem] shadow-2xl text-center flex flex-col items-center">
              <span className="text-white/80 font-bold uppercase text-sm mb-2">INVERSIÓN MENSUAL</span>
              <div className="flex items-center justify-center gap-2 mb-6 text-white">
                <span className="text-4xl font-bold opacity-80">$</span>
                <span className="text-8xl font-black tracking-tighter">0</span>
              </div>
              <div className="text-white/90 text-lg mb-8 font-medium">
                <p>Costo por Suscripción</p>
              </div>

              <div className="w-full bg-white/10 text-white/50 px-6 py-4 rounded-full font-bold text-lg cursor-not-allowed select-none border border-white/20 text-center">
                Próximamente 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
