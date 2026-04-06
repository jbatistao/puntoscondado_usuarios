'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Home, 
  History, 
  Gift, 
  User, 
  LogOut, 
  Bell, 
  QrCode, 
  ChevronRight, 
  Star, 
  CreditCard,
  Search,
  Store,
  Wallet,
  Loader2
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Invalidate on Backend
      const refreshToken = (session?.user as any)?.refreshToken;
      if (refreshToken) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          },
          body: JSON.stringify({ refresh: refreshToken })
        });
      }
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      // 2. Sign out from NextAuth
      signOut({ callbackUrl: '/' });
    }
  };

  const transactions = [
    { id: 1, merchant: "Cafetería Artisan", points: "+45", date: "Hoy, 10:30 AM", type: "earn" },
    { id: 2, merchant: "Farmacias del Rey", points: "-150", date: "Ayer, 4:20 PM", type: "redeem" },
    { id: 3, merchant: "Supermercado Condado", points: "+120", date: "2 de abril", type: "earn" },
    { id: 4, merchant: "Pizzería Italia", points: "+85", date: "31 de marzo", type: "earn" },
  ];

  const partners = [
    { id: 1, name: "Artisan Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop", promo: "2x1 en capuchinos" },
    { id: 2, name: "Fitness Zone", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop", promo: "100 pts por visita" },
    { id: 3, name: "Pet Shop Condado", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop", promo: "15% dto. en juguetes" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col text-slate-800 dark:text-slate-100">
      
      {/* (1) Top Nav - Full Width */}
      <div className="flex-grow flex flex-col h-full bg-[#f8fafc] dark:bg-[#030712]">
        
        {/* Full Width Header */}
        <header className="sticky top-0 z-30 w-full bg-white dark:bg-[#030712] border-b border-slate-200 dark:border-slate-800 py-4 px-4 sm:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-6">
               <Link href="/" className="flex items-center gap-2">
                  <Image src="/images/logo_icon_mono.png" alt="Logo" width={40} height={40} className="rounded-xl" />
                  <span className="font-bold text-xl dark:text-white hidden sm:block">Puntos Condado</span>
               </Link>

               {/* Desktop Navigation Links */}
               <nav className="hidden lg:flex items-center gap-1 ml-4">
                  {[
                    { id: 'home', icon: Home, label: 'Inicio' },
                    { id: 'history', icon: History, label: 'Actividad' },
                    { id: 'rewards', icon: Gift, label: 'Premios' },
                    { id: 'wallet', icon: Wallet, label: 'Billetera' },
                  ].map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                        activeTab === item.id 
                        ? 'bg-brand-primary/10 text-brand-primary' 
                        : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
               </nav>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
              <div className="hidden md:flex relative max-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar..."
                  className="w-full bg-slate-100 dark:bg-[#111827] border-slate-200 dark:border-slate-800 py-2 pl-10 pr-4 rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/30 dark:text-white text-xs font-medium transition-all"
                />
              </div>

              <button className="relative w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-[#111827] rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-accent rounded-full ring-2 ring-white dark:ring-[#030712]"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {session?.user?.name || 'Usuario'}
                  </p>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-brand-gold">Miembro Gold</p>
                </div>
                <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md border-2 border-brand-primary/20 relative cursor-pointer">
                  <Image src={`https://i.pravatar.cc/150?u=${session?.user?.email || 'user'}`} alt="User" layout="fill" objectFit="cover" />
                </div>
              </div>

              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="lg:flex hidden items-center justify-center w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50" 
                title="Cerrar Sesión"
              >
                {isLoggingOut ? <Loader2 size={20} className="animate-spin" /> : <LogOut size={20} />}
              </button>
            </div>
          </div>
        </header>

        {/* (2) Main Content - Centered */}
        <main className="flex-grow p-4 sm:p-8 lg:py-12 mx-auto w-full max-w-7xl mb-20 lg:mb-0">
          
          {/* Top Priority Section: QR, Points, Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            {/* 1. QR Code Card */}
            <div className="bg-white dark:bg-[#111827] rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-xl transition-all duration-300">
               <div className="bg-slate-50 dark:bg-[#1A2333] p-4 rounded-3xl mb-4 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform duration-500">
                  <QrCode className="text-slate-900 dark:text-white" size={100} strokeWidth={1.5} />
               </div>
               <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  Mi Código QR
                  <ChevronRight size={14} className="text-brand-primary" />
               </h3>
               <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">Muestra este código para acumular puntos</p>
            </div>

            {/* 2. Points Balance Card */}
            <div className="md:col-span-1 bg-gradient-to-br from-brand-primary to-[#5b61ff] rounded-[2rem] p-8 shadow-xl shadow-brand-primary/20 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <p className="text-white/70 font-bold uppercase tracking-widest text-[10px] mb-2">Saldo de Puntos</p>
               <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-black text-white tracking-tight">2,540</span>
                  <span className="text-sm font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-lg mb-1 backdrop-blur-md">PTS</span>
               </div>
               <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <div className="flex flex-col">
                     <span className="text-white/60 text-[9px] uppercase font-bold tracking-tighter">Ahorro estimado</span>
                     <span className="font-extrabold text-white text-sm">$25.40</span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex flex-col">
                     <span className="text-white/60 text-[9px] uppercase font-bold tracking-tighter">Por vencer</span>
                     <span className="font-extrabold text-brand-secondary-light text-sm">45 pts</span>
                  </div>
               </div>
            </div>

            {/* 3. Loyalty Level Card */}
            <div className="bg-white dark:bg-[#111827] rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-center relative overflow-hidden">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">Nivel Actual</p>
                     <h3 className="text-2xl font-black text-brand-gold tracking-tight">MIEMBRO GOLD</h3>
                  </div>
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center border border-brand-gold/20">
                     <Star className="text-brand-gold fill-brand-gold" size={24} />
                  </div>
               </div>
               <p className="text-slate-600 dark:text-slate-400 font-bold text-xs mb-4">
                  Faltan <span className="text-slate-900 dark:text-white">460 pts</span> para Platinum
               </p>
               <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
                  <div className="bg-brand-accent h-full rounded-full w-[65%] shadow-[0_0_10px_rgba(255,152,3,0.4)]" />
               </div>
               <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>Inicia</span>
                  <span>Meta</span>
               </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Activity */}
            <div className="lg:col-span-7 space-y-8">
              {/* Transactions Section */}
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <History size={22} className="text-brand-primary" />
                    Actividad Reciente
                  </h2>
                  <Link href="#" className="text-sm font-bold text-brand-primary hover:text-brand-primary-light transition-colors">Ver todo</Link>
                </div>
                <div className="space-y-6">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between group hover:opacity-80 cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'earn' ? 'bg-brand-secondary/10 text-brand-secondary' : 'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400'}`}>
                          {tx.type === 'earn' ? <CreditCard size={22} /> : <Gift size={22} />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{tx.merchant}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">{tx.date}</p>
                        </div>
                      </div>
                      <div className={`font-black text-lg ${tx.type === 'earn' ? 'text-brand-secondary' : 'text-slate-400'}`}>
                        {tx.points}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Discover */}
            <div className="lg:col-span-5 space-y-8">
              {/* Top Merchants / Promos */}
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-8 font-bold text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                  <Store size={22} className="text-brand-secondary" />
                  Descubrir
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {partners.map((partner) => (
                     <div key={partner.id} className="relative group rounded-3xl overflow-hidden h-32 cursor-pointer">
                        <Image src={partner.image} alt={partner.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-50" />
                        <div className="absolute inset-0 p-5 flex flex-col justify-end">
                           <p className="text-white font-black text-base">{partner.name}</p>
                           <p className="text-brand-secondary-light font-bold text-[11px] flex items-center gap-1">
                              {partner.promo} <ChevronRight size={12} />
                           </p>
                        </div>
                     </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm hover:bg-brand-primary hover:text-white transition-all">Ver mapa de comercios</button>
              </div>
            </div>

          </div>
          
        </main>

        {/* (4) Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 px-6 py-3 lg:hidden flex justify-between items-center z-50 shadow-2xl">
           {[
            { id: 'home', icon: Home, label: 'Inicio' },
            { id: 'history', icon: History, label: 'Actividad' },
            { id: 'qr', icon: QrCode, label: 'Escanear', special: true },
            { id: 'rewards', icon: Gift, label: 'Premios' },
            { id: 'profile', icon: User, label: 'Perfil' },
          ].map((item) => (
             <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                item.special 
                ? 'bg-brand-primary text-white w-14 h-14 -mt-10 rounded-full shadow-2xl border-4 border-white dark:border-[#030712] flex items-center justify-center transition-transform hover:scale-110 active:scale-95' 
                : activeTab === item.id 
                  ? 'text-brand-primary' 
                  : 'text-slate-400'
              }`}
             >
                <item.icon size={item.special ? 28 : 24} strokeWidth={item.special ? 2.5 : 2} />
                {!item.special && <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>}
             </button>
          ))}
        </nav>

      </div>
    </div>
  );
}
