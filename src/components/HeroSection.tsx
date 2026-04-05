import React from 'react';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image absolute */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/1.png" 
          alt="Usuario Puntos Condado" 
          fill
          className="object-cover object-[65%_center] lg:object-right"
          quality={100}
          priority
        />
        {/* Un sutil degradado oscuro solo del lado izquierdo (en móvil completo) para garantizar que el texto sea siempre legible sin opacar a la chica a la derecha */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30 lg:bg-gradient-to-r lg:from-background/95 lg:via-background/50 lg:to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Solo una columna a la izquierda para el texto, dejando la derecha vacía para la chica */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 text-white font-medium text-sm mb-6 border border-brand-primary/30 backdrop-blur-md">
            <Star size={16} className="fill-brand-gold text-brand-gold" />
            <span>El programa #1 de Condado del Rey</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            Regístrate, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-light to-brand-secondary">
              Acumula y Disfruta
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl font-medium drop-shadow-lg">
            Convierte tus compras diarias en increíbles recompensas. Únete al programa de lealtad multicomercios exclusivo de Condado Del Rey y empieza a ganar hoy mismo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="bg-slate-400 dark:bg-slate-700 text-white/90 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed opacity-60 shadow-none flex items-center justify-center gap-2 select-none border border-white/10">
              Próximamente 2026
              <ArrowRight size={20} className="opacity-50" />
            </div>
            <a href="#como-funciona" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center shadow-lg hover:-translate-y-1">
              Ver más
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-white/90 font-medium bg-black/30 backdrop-blur-md py-3 px-6 rounded-full border border-white/20 shadow-lg">
            <div className="flex -space-x-3">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background/20 bg-gray-200 overflow-hidden relative shadow-sm">
                   <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
            <p>Más de <span className="font-bold text-white">5,000</span> miembros felices</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
