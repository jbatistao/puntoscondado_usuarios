'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home, History, Gift, Wallet, LogOut, X, Menu, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function NavbarTest() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('touchstart', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [isMenuOpen]);

  const avatarSrc = `https://i.pravatar.cc/150?u=${session?.user?.email || 'user'}`;

  const menuItems = [
    { icon: Home, label: 'Inicio', href: '/dashboard' },
    { icon: History, label: 'Actividad', href: '/dashboard' },
    { icon: Gift, label: 'Premios', href: '/dashboard' },
    { icon: Wallet, label: 'Billetera', href: '/dashboard' },
    { icon: User, label: 'Perfil', href: '/dashboard' },
  ];

  const handleLogout = async () => {
    setIsMenuOpen(false);
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

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Image src="/images/logo_icon_mono.png" alt="Logo" width={40} height={40} className="rounded-xl" />
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">Puntos Condado</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border-2 border-brand-primary/20 relative">
                  <Image src={avatarSrc} alt="Avatar" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="hidden lg:block text-left pr-2">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {session?.user?.name || 'Usuario'}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-brand-gold">Miembro Gold</p>
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-[#111827] rounded-[1.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 py-2 overflow-hidden origin-top-right">
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 lg:hidden">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {session?.user?.name || 'Usuario'}
                    </p>
                    <p className="text-[10px] uppercase font-bold text-brand-gold">Miembro Gold</p>
                  </div>

                  <div className="p-2 space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 font-bold text-sm transition-colors"
                      >
                        <item.icon size={18} />
                        {item.label}
                      </Link>
                    ))}
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
        </div>
      </div>
    </nav>
  );
}
