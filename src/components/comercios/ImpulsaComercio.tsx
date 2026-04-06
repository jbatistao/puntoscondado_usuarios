import React from 'react';
import Link from 'next/link';
import { Store, TrendingUp, Users } from 'lucide-react';

export default function ImpulsaComercio() {
  const businessBenefits = [
    {
      icon: <Users size={28} className="text-brand-primary" />,
      title: "Atrae nuevos clientes",
      desc: "Llega a miles de residentes de Condado del Rey."
    },
    {
      icon: <TrendingUp size={28} className="text-brand-secondary" />,
      title: "Aumenta tus ventas",
      desc: "Programa estructurado para incrementar la frecuencia de compra."
    },
    {
      icon: <Store size={28} className="text-brand-accent" />,
      title: "Marketing local",
      desc: "Destaca tu negocio en nuestra red de miembros activos."
    }
  ];

  return (
    <section id="impulsa-comercios" className="py-24 bg-gray-50 dark:bg-[#030712] border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
          <div className="flex flex-col">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Para Negocios</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
                Impulsa tu comercio <br className="hidden md:block" /> localmente
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                Únete como comercio afiliado y sé parte de la red comercial más grande de Condado Del Rey. Implementación rápida, sin suscripciones confusas y sin hardware costoso.
              </p>
              
              <div className="mt-12 hidden lg:block">
                <Link 
                  href="/login?intent=comercio"
                  className="inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  Registrar mi Comercio
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {businessBenefits.map((b, i) => (
              <div key={i} className="flex gap-6 items-center p-8 rounded-[2rem] border border-gray-200 dark:border-gray-800 hover:border-brand-primary/40 dark:hover:border-brand-primary/40 transition-colors group bg-white dark:bg-card shadow-sm hover:shadow-xl duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800/80 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  {b.icon}
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center lg:hidden lg:mt-0">
            <Link 
              href="/login?intent=comercio"
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg active:scale-95 text-center"
            >
              Registrar mi Comercio
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
