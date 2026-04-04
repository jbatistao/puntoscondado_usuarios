import React from 'react';
import { BarChart3, Users, Zap, Search, ShieldCheck } from 'lucide-react';

export default function BenefitsMalls() {
  const benefits = [
    {
      icon: <Users size={32} className="text-brand-primary" />,
      desc: "Acceso instantáneo a miles de usuarios activos en la plataforma."
    },
    {
      icon: <BarChart3 size={32} className="text-brand-secondary" />,
      desc: "Análisis de comportamiento de consumo de tus clientes reales."
    },
    {
      icon: <Zap size={32} className="text-brand-accent" />,
      desc: "Herramientas masivas de marketing con impacto directo en locales."
    },
    {
      icon: <Search size={32} className="text-emerald-500" />,
      desc: "Máxima visibilidad digital para cada uno de tus inquilinos."
    },
    {
      icon: <ShieldCheck size={32} className="text-sky-500" />,
      desc: "Alianza segura con la marca líder de beneficios en Condado."
    }
  ];

  return (
    <section id="beneficios-malls" className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3">BENEFICIOS</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight">
            Valor Agregado para su <span className="text-brand-secondary">Mall</span>
          </h3>
          <div className="w-24 h-1.5 bg-brand-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-6 items-center p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 hover:border-brand-primary/40 transition-all group bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl duration-300">
              <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                {benefit.icon}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
