import React from 'react';
import { ShieldCheck, Users, Smartphone, Zap } from 'lucide-react';

const benefits = [
  {
    name: 'Gestión Inteligente',
    description: 'Automatiza procesos de comunicación con tus residentes de forma fácil.',
    icon: Zap,
  },
  {
    name: 'Sin Costos Ocultos',
    description: 'Integración gratuita para edificios y PH de Condado Del Rey.',
    icon: ShieldCheck,
  },
  {
    name: 'Más Participación',
    description: 'Fomenta la asistencia a asambleas y reuniones vecinales.',
    icon: Users,
  },
  {
    name: 'App Exclusiva',
    description: 'Herramientas digitales a la medida de tu edificio.',
    icon: Smartphone,
  },
];

export default function BenefitsComunidades() {
  return (
    <section id="beneficios-comunidades" className="py-24 bg-gray-50 dark:bg-[#030712]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3">BENEFICIOS</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 leading-tight">
            Valor Agregado para su <span className="text-brand-secondary">Propiedad</span>
          </h3>
          <div className="w-24 h-1.5 bg-brand-primary mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit) => (
            <div key={benefit.name} className="relative p-8 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-card shadow-sm hover:shadow-xl hover:border-brand-secondary/30 transition-all duration-300 group">
              <div className="flex gap-6 items-center">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center p-4 rounded-2xl bg-brand-secondary/10 text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300">
                    <benefit.icon className="h-8 w-8" aria-hidden="true" />
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-lg">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
