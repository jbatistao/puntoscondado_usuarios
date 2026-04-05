import React from 'react';
import { ShoppingBag, Users, Zap } from 'lucide-react';

export default function ImpulsaMalls() {
  const mallBenefits = [
    {
      icon: <Users size={28} className="text-brand-primary" />,
      desc: "Atrae el ecosistema de más de 20,000 usuarios de Puntos Condado a tu centro comercial."
    },
    {
      icon: <ShoppingBag size={28} className="text-brand-secondary" />,
      desc: "Apoya el crecimiento de tus inquilinos con herramientas digitales de última generación."
    },
    {
      icon: <Zap size={28} className="text-brand-accent" />,
      desc: "Crea campañas de impacto masivo para eventos especiales o cambios de temporada."
    }
  ];

  return (
    <section id="impulsa-malls" className="py-24 bg-slate-950 relative overflow-hidden text-white">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
          <div className="flex flex-col">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-brand-secondary font-bold tracking-wide uppercase text-sm mb-3">Impulsa tu Mall</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                El motor digital de tu <br className="hidden md:block" /> Centro Comercial
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                Puntos Condado es el aliado perfecto para la gerencia de mercadeo que busca maximizar el retorno de inversión y la fidelidad de sus clientes.
              </p>
              
              <div className="mt-12 hidden lg:block">
                <div className="inline-flex items-center justify-center gap-2 bg-white/10 text-white/50 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed select-none border border-white/20">
                  Próximamente 2026
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {mallBenefits.map((b, i) => (
              <div key={i} className="flex gap-6 items-center p-8 rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-brand-primary/30 transition-all group duration-300">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  {b.icon}
                </div>
                <p className="text-gray-300 font-medium text-lg leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center lg:hidden lg:mt-0">
            <div className="w-full inline-flex items-center justify-center gap-2 bg-white/10 text-white/50 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed select-none border border-white/20">
              Próximamente 2026
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
