'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Smile, Store, Building2, LayoutGrid, Home, History, Gift, Wallet, LogOut, User, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const pathname = usePathname();

  // Public landing pages always show public navbar regardless of auth state
  const publicPages = ['/', '/comercios', '/comunidades', '/malls', '/directorio'];
  const isPublicPage = publicPages.includes(pathname);

  // Show public navbar on public pages; show authenticated navbar only on protected pages
  const showPublicNav = isPublicPage;
  const showAuthNav = isAuthenticated && !isPublicPage;
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close both menus when switching routes
  useEffect(() => {
    setIsProfileOpen(false);
    setIsOpen(false);
  }, [pathname]);

  // Close profile menu when clicking/tapping outside
  useEffect(() => {
    if (!isProfileOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopMenuRef.current?.contains(target);
      const insideMobile = mobileMenuRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setIsProfileOpen(false);
      }
    };
    // Use capture:true so we intercept before any stopPropagation in children
    document.addEventListener('mousedown', handleOutsideClick, true);
    document.addEventListener('touchstart', handleOutsideClick, true);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, true);
      document.removeEventListener('touchstart', handleOutsideClick, true);
    };
  }, [isProfileOpen]);

  const close = () => setIsProfileOpen(false);

  const userType = (session?.user as any)?.user_type;
  const isConsumer = userType === 'CONSUMER' || !userType;

  const handleLogout = async () => {
    close();
    try {
      const refreshToken = (session?.user as any)?.refreshToken;
      if (refreshToken) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`,
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
      }
    } catch (error) {
      console.error('Backend logout failed:', error);
    } finally {
      signOut({ callbackUrl: '/' });
    }
  };

  const isDirectorio = pathname === '/directorio';
  const isComercios = pathname === '/comercios';
  const isComunidades = pathname === '/comunidades';
  const isMalls = pathname === '/malls';

  const navLinks = isDirectorio
    ? [
        { name: 'Directorio', href: '/directorio' },
      ]
    : isComercios
    ? [
        { name: 'Cómo Funciona', href: '#como-funciona-comercios' },
        { name: 'Beneficios', href: '#beneficios-comercios' },
        { name: 'Precio', href: '#precio-comercios' },
        { name: 'Impulsa tu Negocio', href: '#impulsa-comercios' },
        { name: 'Contacto', href: '#contacto-comercios' },
      ]
    : isComunidades
    ? [
        { name: 'El Proceso', href: '#como-funciona-comunidades' },
        { name: 'Impulsa tu Comunidad', href: '#impulsa-comunidades' },
        { name: 'Beneficios', href: '#beneficios-comunidades' },
        { name: 'La Inversión', href: '#pricing-comunidades' },
        { name: 'Directorio', href: '/directorio' },
        { name: 'Contacto', href: '#contacto-comunidades' },
      ]
    : isMalls
    ? [
        { name: 'El Proceso', href: '#como-funciona-malls' },
        { name: 'Impulsa tu Mall', href: '#impulsa-malls' },
        { name: 'Beneficios', href: '#beneficios-malls' },
        { name: 'Inversión', href: '#pricing-malls' },
        { name: 'Directorio', href: '/directorio' },
        { name: 'Contacto', href: '#contacto-malls' },
      ]
    : [
        { name: 'Cómo Funciona', href: '#como-funciona' },
        { name: 'Beneficios', href: '#beneficios' },
        { name: 'Directorio', href: '/directorio' },
      ];

  const icons = [
    { id: 'usuarios', title: 'Usuarios', href: '/', icon: Smile, bg: 'bg-violet-200', hover: 'hover:bg-violet-300', border: 'border-violet-300/50' },
    { id: 'comercios', title: 'Comercios', href: '/comercios', icon: Store, bg: 'bg-emerald-200', hover: 'hover:bg-emerald-300', border: 'border-emerald-300/50' },
    { id: 'comunidades', title: 'Comunidades', href: '/comunidades', icon: Building2, bg: 'bg-amber-200', hover: 'hover:bg-amber-300', border: 'border-amber-300/50' },
    { id: 'malls', title: 'Centros Comerciales', href: '/malls', icon: LayoutGrid, bg: 'bg-sky-200', hover: 'hover:bg-sky-300', border: 'border-sky-300/50' },
  ];

  const visibleIcons = icons.filter((icon) => pathname !== icon.href);

  const profileMenuItems = [
    { id: 'home', icon: Home, label: 'Inicio', href: '/dashboard' },
    { id: 'obsequios', icon: Gift, label: 'Obsequios', href: '/dashboard/obsequios' },
    { id: 'history', icon: History, label: 'Actividad', href: '/dashboard' },
    { id: 'rewards', icon: Gift, label: 'Premios', href: '/dashboard' },
    { id: 'wallet', icon: Wallet, label: 'Billetera', href: '/dashboard' },
    { id: 'profile', icon: User, label: 'Perfil', href: '/dashboard' },
  ];

  const affiliateItems = [
    { id: 'directorio', icon: Search, label: 'Directorio', href: '/directorio' },
    { id: 'comercios', icon: Store, label: 'Comercios', href: '/dashboard/comercios' },
    { id: 'comunidades', icon: Building2, label: 'Comunidades', href: '/dashboard/comunidades' },
    { id: 'malls', icon: LayoutGrid, label: 'Malls', href: '/dashboard/malls' },
  ];

  const authIcons = [
    { id: 'usuarios', title: 'Dashboard', href: '/dashboard', icon: Smile, bg: 'bg-violet-200', hover: 'hover:bg-violet-300', border: 'border-violet-300/50' },
    { id: 'comercios', title: 'Mis Comercios', href: '/dashboard/comercios', icon: Store, bg: 'bg-emerald-200', hover: 'hover:bg-emerald-300', border: 'border-emerald-300/50' },
    { id: 'comunidades', title: 'Comunidades', href: '/dashboard/comunidades', icon: Building2, bg: 'bg-amber-200', hover: 'hover:bg-amber-300', border: 'border-amber-300/50' },
    { id: 'malls', title: 'Malls', href: '/dashboard/malls', icon: LayoutGrid, bg: 'bg-sky-200', hover: 'hover:bg-sky-300', border: 'border-sky-300/50' },
  ];

  const avatarSrc = `https://i.pravatar.cc/150?u=${session?.user?.email || 'user'}`;

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* ── Logo ── */}
            <Link
              href={isAuthenticated ? '/dashboard' : '/'}
              className="flex-shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Image
                src="/images/logo_icon_mono.png"
                alt="Logo Puntos Condado"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-800 dark:text-white">
                Puntos Condado
              </span>
            </Link>

            {/* ── Desktop nav ── */}
            <div className="hidden md:flex items-center space-x-8">
              {showPublicNav &&
                navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-slate-800 dark:text-slate-200 hover:text-brand-primary font-semibold transition-all relative group py-2"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full" />
                  </Link>
                ))}

              {/* Auth links removed from here as per user request */}

              <div className="flex items-center space-x-4 ml-4">
                {/* Public page CTA (always shown on public pages) */}
                {showPublicNav && (
                  <Link
                    href={
                      isAuthenticated
                        ? '/dashboard'
                        : `${isComercios ? '/login?intent=comercio' : isComunidades ? '/login?intent=comunidad' : isMalls ? '/login?intent=mall' : '/login'}`
                    }
                    className="bg-brand-primary hover:bg-brand-primary-hover text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    {isAuthenticated
                      ? 'Ir al Dashboard'
                      : isComercios
                      ? 'Registrar mi Comercio'
                      : isComunidades
                      ? 'Registrar PH'
                      : isMalls
                      ? 'Registrar Mall'
                      : 'Acceder'}
                  </Link>
                )}

                {/* ── Desktop profile dropdown (only on protected pages) ── */}
                {showAuthNav && (
                  <div className="flex items-center gap-4">
                    {/* Quick Access Icons for Auth Users */}
                    <div className="hidden sm:flex items-center space-x-2 pr-4 border-r border-slate-200 dark:border-slate-800">
                      {authIcons.map((icon) => (
                        <Link
                          key={icon.id}
                          href={icon.href}
                          title={icon.title}
                          className={`w-[38px] h-[38px] rounded-xl ${icon.bg} ${icon.hover} transition-all flex items-center justify-center text-gray-800 shadow-sm border ${icon.border} hover:scale-110 active:scale-95`}
                        >
                          <icon.icon size={20} strokeWidth={2} />
                        </Link>
                      ))}
                    </div>

                    <div ref={desktopMenuRef} className="relative" style={{ zIndex: 51 }}>
                      {/* Avatar trigger */}
                      <button
                        onClick={() => setIsProfileOpen((v) => !v)}
                        className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border-2 border-brand-primary/20 relative">
                          <Image src={avatarSrc} alt="User" fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="hidden lg:block text-left pr-2">
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {session?.user?.name || 'Usuario'}
                          </p>
                          <p className="text-[9px] uppercase tracking-wider font-bold text-brand-gold">Miembro Gold</p>
                        </div>
                      </button>

                      {/* Dropdown panel */}
                      {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#111827] rounded-[1.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 py-2 overflow-hidden origin-top-right">
                          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 lg:hidden">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {session?.user?.name || 'Usuario'}
                            </p>
                            <p className="text-[10px] uppercase font-bold text-brand-gold">Miembro Gold</p>
                          </div>

                          <div className="p-2 space-y-1">
                            {profileMenuItems.map((item) => (
                              <Link
                                key={item.id}
                                href={item.href}
                                onClick={close}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-bold text-sm transition-colors"
                              >
                                <item.icon size={18} />
                                {item.label}
                              </Link>
                            ))}

                            <div className="pt-2 mt-2 border-t border-slate-50 dark:border-slate-800">
                              <div className="px-4 py-2 text-[9px] uppercase font-bold text-slate-400 tracking-widest">
                                Afiliaciones
                              </div>
                              {affiliateItems.map((item) => (
                                <Link
                                  key={item.id}
                                  href={item.href}
                                  onClick={close}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-brand-primary hover:bg-brand-primary/5 font-bold text-sm transition-colors"
                                >
                                  <item.icon size={16} />
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div className="p-2 mt-1 border-t border-slate-100 dark:border-slate-800">
                            <button
                              onClick={handleLogout}
                              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 font-bold text-sm transition-colors text-left"
                            >
                              <LogOut size={18} />
                              Cerrar Sesión
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Mobile header right ── */}
            <div className="md:hidden flex items-center">
              {showAuthNav ? (
                <button
                  onClick={() => setIsProfileOpen((v) => !v)}
                  className="w-10 h-10 rounded-xl overflow-hidden shadow-md border-2 border-brand-primary/20 relative"
                >
                  <Image src={avatarSrc} alt="User" fill style={{ objectFit: 'cover' }} />
                </button>
              ) : (
                <button
                  onClick={() => setIsOpen((v) => !v)}
                  className="text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Mobile hamburger menu (unauthenticated) ── */}
        {isOpen && (
          <div className="md:hidden glass absolute top-20 left-0 w-full border-t border-gray-200/20 shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-3 text-base font-semibold text-slate-800 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href={
                    isAuthenticated
                      ? '/dashboard'
                      : `${isComercios ? '/login?intent=comercio' : isComunidades ? '/login?intent=comunidad' : isMalls ? '/login?intent=mall' : '/login'}`
                  }
                  className="w-full text-center bg-brand-primary hover:bg-brand-primary-hover text-white py-3 rounded-full font-bold shadow-lg transition-all"
                >
                  {isAuthenticated
                    ? 'Ir al Dashboard'
                    : isComercios
                    ? 'Registrar mi Comercio'
                    : isComunidades
                    ? 'Registrar PH'
                    : isMalls
                    ? 'Registrar Mall'
                    : 'Acceder'}
                </Link>
                <div className={`grid gap-2 pt-2 ${visibleIcons.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                  {visibleIcons.map((icon) => (
                    <Link
                      key={icon.id}
                      href={icon.href}
                      className={`flex flex-col items-center justify-center gap-1 ${icon.bg} ${icon.hover} text-gray-800 py-3 rounded-xl font-medium shadow-sm transition-colors border ${icon.border} text-xs text-center`}
                    >
                      <icon.icon size={20} strokeWidth={2} />
                      <span>{icon.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile bottom-sheet profile menu (only on protected pages) ── */}
      {showAuthNav && isProfileOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 flex items-end sm:items-center justify-center p-4"
          style={{ zIndex: 60 }}
        >
          {/* Backdrop — clicking it closes the menu */}
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative w-full max-w-sm bg-white dark:bg-[#111827] rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-brand-primary/20 relative">
                  <Image src={avatarSrc} alt="User" fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {session?.user?.name || 'Usuario'}
                  </p>
                  <p className="text-xs uppercase font-bold text-brand-gold">Miembro Gold</p>
                </div>
              </div>
            </div>

            <div className="p-4 grid grid-cols-2 gap-2">
              {profileMenuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={close}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/5 hover:text-brand-primary font-bold text-xs transition-all"
                >
                  <item.icon size={24} />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="px-4 py-2">
              <div className="px-2 pb-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                Afiliaciones
              </div>
              <div className="grid grid-cols-1 gap-2">
                {affiliateItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-brand-primary/5 text-brand-primary font-bold text-xs transition-all"
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-500 font-black text-sm transition-colors flex items-center justify-center gap-2"
              >
                <LogOut size={20} />
                Cerrar Sesión
              </button>
              <button
                onClick={close}
                className="w-full mt-2 py-4 text-slate-400 font-bold text-sm tracking-widest uppercase"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
