import React from 'react';
import { UserPlus, Gift, Building2 } from 'lucide-react';

export default function HowItWorksMalls() {
  const steps = [
    {
      icon: Building2,
      color: "text-brand-primary",
      title: "Alianza Estratégica",
      desc: "Inscribimos tu mall y locales en el ecosistema digital de Puntos Condado."
    },
    {
      icon: Gift,
      color: "text-brand-secondary",
      title: "Fidelización",
      desc: "Los usuarios actuales de la red reciben beneficios especiales por visitar tu mall."
    },
    {
      icon: UserPlus,
      color: "text-brand-accent",
      title: "Crecimiento",
      desc: "Aumentamos el ticket promedio y la recurrencia mediante data y recompensas."
    }
  ];

  return (
    <section id="como-funciona-malls" className="py-24 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3">EL PROCESO</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight">
            Digitaliza tu <span className="text-brand-secondary">Centro Comercial</span>
          </h3>
          <div className="w-24 h-1.5 bg-brand-secondary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-transparent group-hover:border-brand-primary/20">
                <step.icon size={40} className={step.color} />
              </div>
              <h4 className="text-2xl font-bold text-slate-950 mb-4 group-hover:text-brand-primary transition-colors">{step.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
