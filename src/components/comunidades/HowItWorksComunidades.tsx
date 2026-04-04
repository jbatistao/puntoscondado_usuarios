import React from 'react';
import { UserCheck, Wallet, Trophy } from 'lucide-react';

export default function HowItWorksComunidades() {
  const steps = [
    {
      icon: <UserCheck size={32} className="text-brand-secondary" />,
      title: "Incentiva el pago",
      desc: "Premia a los residentes que pagan sus cuotas de mantenimiento a tiempo con puntos canjeables por servicios y compras."
    },
    {
      icon: <Wallet size={32} className="text-brand-primary" />,
      title: "Recursos para el edificio",
      desc: "Obtén beneficios grupales exclusivos para las mejoras del área social y mantenimiento preventivo por ser parte de Puntos Condado."
    },
    {
      icon: <Trophy size={32} className="text-brand-accent" />,
      title: "Comunidad conectada",
      desc: "Fortalece el vínculo entre vecinos con acceso a eventos y programas locales diseñados para los residentes de Condado."
    }
  ];

  return (
    <section id="como-funciona-comunidades" className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3">EL PROCESO</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight">
            ¿Cómo mejora tu <span className="text-brand-secondary">Comunidad</span>?
          </h3>
          <div className="w-24 h-1.5 bg-brand-secondary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 bg-gray-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300 border border-gray-100 dark:border-gray-800 group-hover:border-brand-secondary/40">
                {step.icon}
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-4">{step.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
