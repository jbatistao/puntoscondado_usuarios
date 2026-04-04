import React from 'react';
import { Coffee, Dumbbell, Pizza, Scissors, ShoppingBag, Utensils } from 'lucide-react';

export default function Partners() {
  const partners = [
    { name: "Café Condado", icon: Coffee },
    { name: "Fit Zone", icon: Dumbbell },
    { name: "Pizza Roma", icon: Pizza },
    { name: "Glam Salón", icon: Scissors },
    { name: "Mega Super", icon: ShoppingBag },
    { name: "Gourmet Grill", icon: Utensils },
  ];

  return (
    <section id="comercios" className="py-24 bg-white dark:bg-[#030712] border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Comercios Afiliados</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Nuestros socios comerciales
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed drop-shadow-sm">
            Marcas locales que ya confían en nosotros y forman parte del ecosistema en Condado Del Rey.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20">
          {partners.map((Partner, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center gap-4 opacity-70 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 cursor-default grayscale hover:grayscale-0"
            >
              <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-gray-800/50 group-hover:bg-brand-primary/10 flex items-center justify-center transition-colors shadow-sm">
                <Partner.icon className="text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors" size={36} strokeWidth={1.5} />
              </div>
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand-primary tracking-tight transition-colors">
                {Partner.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
