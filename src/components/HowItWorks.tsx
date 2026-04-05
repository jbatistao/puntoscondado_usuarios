import React from 'react';
import Image from 'next/image';
import { UserPlus, CircleDollarSign, Award, Percent, Clock, QrCode, Gift, Coins, Zap } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
          <UserPlus className="text-brand-primary" size={32} strokeWidth={1.5} />
        </div>
      ),
      title: 'Regístrate',
      description: 'Regístrate gratis en minutos y empieza a disfrutar de todos los beneficios de forma inmediata.'
    },
    {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6">
          <CircleDollarSign className="text-brand-accent" size={32} strokeWidth={1.5} />
        </div>
      ),
      title: 'Acumula puntos',
      description: 'Todas tus compras acumulan puntos de forma automática. Solo debes mostrar el código QR de tu cuenta en el comercio.'
    },
    {
      icon: (
        <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6">
          <Award className="text-brand-secondary" size={32} strokeWidth={1.5} />
        </div>
      ),
      title: 'Redime tus puntos',
      description: 'Puedes redimir tus puntos acumulados en cualquiera de los productos o servicios de nuestras comercios afiliados.'
    }
  ];

  return (
    <>
      <section id="como-funciona" className="py-24 relative overflow-hidden bg-brand-primary">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-secondary/30 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary-light/40 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
              Acumula puntos, redímelos en los comercios de nuestra red y disfruta beneficios exclusivos cerquita de ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="bg-white dark:bg-[#111827] px-6 py-8 lg:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none border border-transparent dark:border-gray-800 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] dark:hover:border-brand-primary/50 transition-all duration-300 flex flex-col items-start h-full">
                {step.icon}
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight tracking-tight min-h-[56px] flex items-start">{step.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tus Beneficios */}
      <section id="beneficios" className="py-24 relative overflow-hidden bg-[#101828]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-white/80 font-bold tracking-wide uppercase text-sm mb-3">Tus Beneficios</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">
              Más valor por tu dinero
            </h3>
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed drop-shadow-sm">
              Descubre algunas las ventajas de ser miembro del programa de lealtad exclusivo de Condado Del Rey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pb-10">
            {[
              {
                icon: <Percent className="text-emerald-400" size={32} strokeWidth={1.5} />,
                title: "Descuentos semanales",
                desc: "Accede a ofertas únicas que se renuevan cada semana exclusivamente para miembros.",
                color: "from-emerald-500/20 to-emerald-500/0"
              },
              {
                icon: <Clock className="text-blue-400" size={32} strokeWidth={1.5} />,
                title: "Puntos duraderos",
                desc: "Tus puntos demoran mucho más en vencer. Acumula a tu propio ritmo sin preocuparte por perderlos.",
                color: "from-blue-500/20 to-blue-500/0"
              },
              {
                icon: <QrCode className="text-indigo-400" size={32} strokeWidth={1.5} />,
                title: "Un solo código",
                desc: "Muestra tu QR y listo. Un único código para acumular y redimir en todo Condado Del Rey.",
                color: "from-indigo-500/20 to-indigo-500/0"
              },
              {
                icon: <Gift className="text-pink-400" size={32} strokeWidth={1.5} />,
                title: "Regalos de cumpleaños",
                desc: "Disfruta de sorpresas y beneficios exclusivos durante todo el mes de tu cumpleaños.",
                color: "from-pink-500/20 to-pink-500/0"
              },
              {
                icon: <Coins className="text-amber-400" size={32} strokeWidth={1.5} />,
                title: "Canje flexible",
                desc: "Redime tus puntos en cualquier marca o producto de nuestra red sin restricciones.",
                color: "from-amber-500/20 to-amber-500/0"
              },
              {
                icon: <Zap className="text-purple-400" size={32} strokeWidth={1.5} />,
                title: "Multiplicador de puntos",
                desc: "Gana puntos dobles, triples o hasta cuádruples según tu nivel de lealtad.",
                color: "from-purple-500/20 to-purple-500/0"
              }
            ].map((benefit, i) => (
              <div key={i} className="group relative bg-[#1A2333]/60 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 overflow-hidden hover:-translate-y-2 transition-all duration-300">
                <div className={`absolute -inset-px rounded-[2rem] bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                <div className="w-16 h-16 rounded-2xl bg-[#0F172A] border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10 group-hover:scale-105 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="text-2xl font-bold text-white mb-3 relative z-10">{benefit.title}</h4>
                <p className="text-gray-400 leading-relaxed font-medium relative z-10">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-6 pb-8">
            <button className="bg-brand-primary text-white py-4 px-10 mb-4 rounded-full font-bold text-lg hover:bg-brand-primary-hover shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_45px_rgba(20,184,166,0.5)]">
              Ver catálogo de recompensas
            </button>
          </div> */}

        </div>
      </section>
    </>
  );
}
