'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Smile, Store, Building2, LayoutGrid } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isComercios = pathname === '/comercios';
  const isComunidades = pathname === '/comunidades';
  const isMalls = pathname === '/malls';

  const navLinks = isComercios ? [
    { name: 'Cómo Funciona', href: '#como-funciona-comercios' },
    { name: 'Beneficios', href: '#beneficios-comercios' },
    { name: 'Precio', href: '#precio-comercios' },
    { name: 'Impulsa tu Negocio', href: '#impulsa-comercios' },
    { name: 'Contacto', href: '#contacto-comercios' },
  ] : isComunidades ? [
    { name: 'El Proceso', href: '#como-funciona-comunidades' },
    { name: 'Impulsa tu Comunidad', href: '#impulsa-comunidades' },
    { name: 'Beneficios', href: '#beneficios-comunidades' },
    { name: 'La Inversión', href: '#pricing-comunidades' },
    { name: 'Contacto', href: '#contacto-comunidades' },
  ] : isMalls ? [
    { name: 'El Proceso', href: '#como-funciona-malls' },
    { name: 'Impulsa tu Mall', href: '#impulsa-malls' },
    { name: 'Beneficios', href: '#beneficios-malls' },
    { name: 'Inversión', href: '#pricing-malls' },
    { name: 'Contacto', href: '#contacto-malls' },
  ] : [
    { name: 'Cómo Funciona', href: '#como-funciona' },
    { name: 'Beneficios', href: '#beneficios' },
    { name: 'Ver Comercios', href: '#comercios' },
  ];

  const icons = [
    { id: 'comercios', title: 'Comercios', href: '/comercios', icon: Store, bg: 'bg-emerald-200', hover: 'hover:bg-emerald-300', border: 'border-emerald-300/50' },
    { id: 'usuarios', title: 'Usuarios', href: '/', icon: Smile, bg: 'bg-violet-200', hover: 'hover:bg-violet-300', border: 'border-violet-300/50' },
    { id: 'comunidades', title: 'Comunidades', href: '/comunidades', icon: Building2, bg: 'bg-amber-200', hover: 'hover:bg-amber-300', border: 'border-amber-300/50' },
    { id: 'malls', title: 'Centros Comerciales', href: '/malls', icon: LayoutGrid, bg: 'bg-sky-200', hover: 'hover:bg-sky-300', border: 'border-sky-300/50' },
  ];

  const visibleIcons = icons.filter(icon => pathname !== icon.href);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Image 
              src="/images/logo_icon_mono.png" 
              alt="Logo Puntos Condado" 
              width={40} 
              height={40} 
              className="rounded-xl"
            />
            <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-800 dark:text-white">Puntos Condado</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-slate-800 dark:text-slate-200 hover:text-brand-primary font-semibold transition-colors">{link.name}</a>
            ))}
            
            <div className="flex items-center space-x-4 ml-4">
              <a 
                href={
                  isComercios ? "/login?intent=comercio" : 
                  isComunidades ? "/login?intent=comunidad" : 
                  isMalls ? "/login?intent=mall" : "/login"
                } 
                className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                {isComercios ? "Registrar mi Comercio" : isComunidades ? "Registrar PH" : isMalls ? "Registrar Mall" : "Ingresa Gratis"}
              </a>
              <div className="flex items-center space-x-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                {visibleIcons.map((icon) => (
                  <a 
                    key={icon.id}
                    href={icon.href} 
                    title={icon.title} 
                    className={`w-[38px] h-[38px] rounded-xl ${icon.bg} ${icon.hover} transition-colors flex items-center justify-center text-gray-800 shadow-sm border ${icon.border}`}
                  >
                    <icon.icon size={20} strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass absolute top-20 left-0 w-full border-t border-gray-200/20 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">{link.name}</a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a 
                href={
                  isComercios ? "/login?intent=comercio" : 
                  isComunidades ? "/login?intent=comunidad" : 
                  isMalls ? "/login?intent=mall" : "/login"
                } 
                className="w-full text-center bg-brand-primary text-white py-3 rounded-full font-medium shadow-md transition-transform hover:-translate-y-0.5"
              >
                {isComercios ? "Registrar mi Comercio" : isComunidades ? "Registrar PH" : isMalls ? "Registrar Mall" : "Ingresa Gratis"}
              </a>
              <div className={`grid gap-2 pt-2 ${visibleIcons.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                {visibleIcons.map((icon) => (
                  <a 
                    key={icon.id}
                    href={icon.href} 
                    className={`flex flex-col items-center justify-center gap-1 ${icon.bg} ${icon.hover} text-gray-800 py-3 rounded-xl font-medium shadow-sm transition-colors border ${icon.border} text-xs text-center`}
                  >
                    <icon.icon size={20} strokeWidth={2} />
                    <span>{icon.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

