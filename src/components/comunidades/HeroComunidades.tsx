import React from 'react';
import Image from 'next/image';

export default function HeroComunidades() {
  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden bg-slate-900">
      {/* Background with darker overlay for communities */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/2_community.png"
          alt="Comunidades y Edificios"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-3xl">
          <h2 className="text-brand-secondary font-bold tracking-widest uppercase text-sm mb-4">
            PARA RESIDENCIAS Y PH
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Fortalece tu <span className="text-brand-secondary">Comunidad</span> y Edificios
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed font-medium">
            La plataforma definitiva para incentivar el pago puntual, mejorar la convivencia y ofrecer beneficios exclusivos a tus residentes en Condado Del Rey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/login?intent=comunidad" className="bg-brand-primary hover:bg-brand-primary-hover text-white px-10 py-5 rounded-[2.5rem] font-extrabold text-xl transition-all shadow-xl hover:shadow-2xl text-center">
              Registrar mi Edificio
            </a>
            <a href="#como-funciona-comunidades" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-[2.5rem] font-extrabold text-xl transition-all text-center">
              Saber más
            </a>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-brand-secondary/10 blur-[120px] rounded-full z-10" />
    </section>
  );
}
