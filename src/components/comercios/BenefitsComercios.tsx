import React from 'react';
import { Users, Presentation, ShieldCheck, HeartPulse } from 'lucide-react';

const benefits = [
  {
    name: 'Atrae prospectos',
    description: 'Aparece de manera preferencial en nuestro portal y adquiere visibilidad ante miles de clientes en Condado Del Rey listos para comprar.',
    icon: Users,
  },
  {
    name: 'Mayor retención',
    description: 'Los compradores prefieren marcas que devuelven el favor. Incrementarás altamente la lealtad y reducirás la tasa de abandono.',
    icon: HeartPulse,
  },
  {
    name: 'Exposición Pautada',
    description: 'Impulsa descuentos y promociones en canales exclusivos dentro de nuestro ecosistema para llevar tráfico a tu puerta.',
    icon: Presentation,
  },
  {
    name: 'Operación segura',
    description: 'Tu facturación y la información de los usuarios están resguardadas en todo momento por altos estándares de seguridad.',
    icon: ShieldCheck,
  },
];

export default function BenefitsComercios() {
  return (
    <div id="beneficios-comercios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-secondary font-bold tracking-wide uppercase text-sm mb-3">Valor Asegurado</h2>
          <p className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Todo lo que necesitas para escalar tu comercio
          </p>
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
    </div>
  );
}
