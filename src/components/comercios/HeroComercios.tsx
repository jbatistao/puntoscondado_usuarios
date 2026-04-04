import React from 'react';
import Image from 'next/image';
import { ArrowRight, TrendingUp } from 'lucide-react';

export default function HeroComercios() {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Image absolute */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/1_merchant.png" 
          alt="Socios Comerciales Puntos Condado" 
          fill
          className="object-cover object-[65%_center] lg:object-right"
          quality={100}
          priority
        />
        {/* Sutil degradado oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30 lg:bg-gradient-to-r lg:from-background/95 lg:via-background/50 lg:to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Columna a la izquierda para el texto */}
        <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/20 text-white font-medium text-sm mb-6 border border-brand-secondary/30 backdrop-blur-md">
            <TrendingUp size={16} />
            <span>Haz crecer tus ventas hoy</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            Suma tu negocio a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary-light to-brand-secondary">
              Puntos Condado
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl font-medium drop-shadow-lg leading-relaxed">
            Únete a la red de aliados más importante de Condado Del Rey. Fideliza a tus clientes premiando sus compras y atrae a nuevos usuarios constantemente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#" className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-brand-primary/50 flex items-center justify-center gap-2 hover:-translate-y-1">
              Afiliar mi comercio
              <ArrowRight size={20} />
            </a>
            <a href="#como-funciona-comercios" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center shadow-lg hover:-translate-y-1">
              Ver más detalles
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4 text-sm text-white/90 font-medium bg-black/30 backdrop-blur-md py-3 px-6 rounded-full border border-white/20 shadow-lg">
            <div className="flex -space-x-3">
              {[5,6,7,8].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background/20 bg-gray-200 overflow-hidden relative shadow-sm">
                   <Image src={`https://i.pravatar.cc/100?img=${i+20}`} alt="Merchant" layout="fill" objectFit="cover" />
                </div>
              ))}
            </div>
            <p>Más de <span className="font-bold text-white">200</span> comercios afiliados</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

