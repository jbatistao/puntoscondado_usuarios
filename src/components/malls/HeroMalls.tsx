import React from 'react';
import Image from 'next/image';

export default function HeroMalls() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-900">
      {/* Background with darker overlay for malls */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/3_mall.png"
          alt="Shopping centers and Malls"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <h2 className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-4">
            PARA CENTROS COMERCIALES
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Reinventa la experiencia de tu <span className="text-brand-primary">Mall</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-medium">
            Puntos Condado digitaliza la lealtad en tu centro comercial, conectando a tus inquilinos con miles de usuarios activos y aumentando el tráfico peatonal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white/10 text-white/50 px-10 py-5 rounded-[2.5rem] font-extrabold text-xl cursor-not-allowed select-none border border-white/20 text-center flex items-center justify-center">
              Próximamente 2026
            </div>
            <a href="#como-funciona-malls" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-[2.5rem] font-extrabold text-xl transition-all text-center">
              Saber más
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-brand-primary/10 blur-[120px] rounded-full z-10" />
    </section>
  );
}
