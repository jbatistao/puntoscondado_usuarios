import React from 'react';
import { Store, QrCode, TrendingUp, BarChart3 } from 'lucide-react';

export default function HowItWorksComercios() {
  const steps = [
    {
      icon: <Store className="text-emerald-700 dark:text-emerald-400" size={32} strokeWidth={2} />,
      title: 'Afilia tu negocio',
      description: 'Completa tus datos comerciales y forma parte de nuestra red en tiempo récord. Obtén visibilidad inmediata.'
    },
    {
      icon: <QrCode className="text-emerald-700 dark:text-emerald-400" size={32} strokeWidth={2} />,
      title: 'Asigna puntos',
      description: 'Premia a tus clientes al instante por cada compra usando nuestra herramienta para comercios, sólo con su número de celular.'
    },
    {
      icon: <TrendingUp className="text-emerald-700 dark:text-emerald-400" size={32} strokeWidth={2} />,
      title: 'Aumenta tus ventas',
      description: 'Tus clientes regresarán más a menudo a tu comercio para redimir sus puntos u obtener recompensas exclusivas.'
    },
    {
      icon: <BarChart3 className="text-emerald-700 dark:text-emerald-400" size={32} strokeWidth={2} />,
      title: 'Monitorea el éxito',
      description: 'Accede a tu panel en tiempo real con estadísticas clave de tus clientes y el crecimiento de tus ingresos.'
    }
  ];

  return (
    <section id="como-funciona-comercios" className="py-24 relative overflow-hidden bg-brand-secondary/90 dark:bg-emerald-950">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
            Un ecosistema fácil de usar
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
            Crea clientes habituales conectando tu negocio de forma rápida a la plataforma Puntos Condado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white dark:bg-[#111827] px-6 py-8 lg:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-transparent dark:border-emerald-900 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] transition-all duration-300 flex flex-col items-start h-full">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center rounded-2xl mb-5 shadow-sm border border-emerald-200/50 dark:border-emerald-800">
                {step.icon}
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight tracking-tight min-h-[56px] flex items-start">{step.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
