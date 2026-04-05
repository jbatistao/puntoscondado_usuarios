import React from "react";
import { Calendar, Rocket, Clock } from "lucide-react";

export default function LaunchAnnouncement() {
  return (
    <section className="relative overflow-hidden py-24 px-4 bg-linear-to-b from-background via-brand-primary/[0.02] to-background">
      {/* Elementos decorativos de fondo potenciados */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          {/* Bordes con degradado animado más sutil pero elegante */}
          <div className="absolute -inset-px bg-gradient-to-r from-brand-primary/40 via-brand-secondary/40 to-brand-primary/40 rounded-[2.5rem] blur-sm opacity-20 group-hover:opacity-60 transition duration-1000"></div>
          
          <div className="relative bg-[#030712] dark:bg-black rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(63,66,255,0.1)]">
            {/* Contenido de texto */}
            <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary/20 text-white font-bold text-xs uppercase tracking-[0.2em] border border-white/10 shadow-sm">
                <Rocket size={16} className="text-brand-secondary animate-bounce" />
                <span>Hoja de Ruta 2026</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.05]">
                Estamos preparando <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-primary-light via-brand-secondary to-brand-secondary-light">
                  algo extraordinario
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Puntos Condado está en fase de desarrollo intensivo. Construimos una infraestructura de vanguardia para conectar a la comunidad como nunca antes.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-brand-secondary shadow-inner border border-white/10">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg leading-none">Confirmado</p>
                    <p className="text-sm text-white/50">Lanzamiento oficial</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de Fecha - Más llamativa */}
            <div className="w-full lg:w-auto relative z-10">
              <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
                <div className="bg-linear-to-br from-brand-primary to-brand-primary-light p-12 rounded-[3.5rem] shadow-[0_20px_50px_rgba(63,66,255,0.4)] flex flex-col items-center text-white transform transition-all duration-700 hover:scale-105 hover:-rotate-1 group-hover:shadow-[0_20px_70px_rgba(63,66,255,0.6)] border border-white/20">
                  <Calendar size={64} className="mb-8 drop-shadow-2xl text-white/90" />
                  <div className="text-center">
                    <span className="block text-sm font-black uppercase tracking-[0.4em] text-white/80 mb-3">Programado para la</span>
                    <span className="block text-4xl font-extrabold mb-2 text-white">Segunda Mitad</span>
                    <span className="block text-8xl font-black tracking-tighter text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                      2026
                    </span>
                  </div>
                  
                  {/* Decorative dot */}
                  <div className="absolute top-10 right-10 w-4 h-4 bg-brand-secondary rounded-full shadow-[0_0_20px_#00cc96]">
                    <div className="absolute inset-0 bg-brand-secondary rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
