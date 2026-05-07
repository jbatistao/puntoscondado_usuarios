'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Zap, Loader2, ChevronRight, Store, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Merchant {
  id: number;
  name: string;
  logo: string;
  active_multiplier: number;
  mall_name?: string;
  start_time: string;
  end_time: string;
  is_currently_active: boolean;
}

export default function AcceleratedPointsList() {
  const { data: session } = useSession();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivePromos = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/rewards/merchants/active-accelerated/`, {
          headers: {
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMerchants(data);
        }
      } catch (error) {
        console.error('Error fetching accelerated merchants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePromos();
  }, [session]);

  if (loading) {
// ... loading state ...
    return (
      <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 animate-pulse">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-8" />
        <div className="space-y-4">
          <div className="h-24 bg-slate-100 dark:bg-slate-800/50 rounded-3xl" />
          <div className="h-24 bg-slate-100 dark:bg-slate-800/50 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (merchants.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative group">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-700" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap size={22} className="text-amber-500 fill-amber-500 animate-pulse" />
                Acumulación Acelerada
            </h2>
            <p className="text-[10px] text-amber-600 dark:text-amber-500 font-bold uppercase tracking-widest mt-1">Beneficios de hoy</p>
        </div>
        <Link href="/dashboard/puntos-extra" className="text-xs font-black text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 group/link">
            Ver todos
            <ChevronRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="space-y-4 relative z-10">
        {merchants.map((merchant) => (
          <div 
            key={merchant.id}
            className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-900/50 transition-all group/item overflow-hidden relative"
          >
            {/* Multiplier Badge Overlay */}
            <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-1">
                <div className="bg-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
                    {merchant.active_multiplier}x
                </div>
                {merchant.is_currently_active && (
                   <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                      En vivo
                   </span>
                )}
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center p-2 border border-slate-100 dark:border-slate-700 shadow-sm shrink-0">
              {merchant.logo ? (
                <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-contain" />
              ) : (
                <Store size={24} className="text-slate-300" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 pr-16">
              <h3 className="font-bold text-slate-900 dark:text-white truncate">{merchant.name}</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-tight mb-1">
                {merchant.start_time} - {merchant.end_time}
              </p>
              <div className="flex items-center gap-2">
                 <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Acumula nivel rápido</span>
              </div>
            </div>

            <ChevronRight size={18} className="text-slate-300 group-hover/item:text-amber-500 group-hover/item:translate-x-1 transition-all" />
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
        <div className="flex -space-x-2">
            {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-[#111827] bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600" />
                </div>
            ))}
        </div>
        <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium leading-tight">
            Únete a otros <span className="font-black text-slate-900 dark:text-white">1,200 usuarios</span> aprovechando los puntos extra hoy.
        </p>
      </div>
    </div>
  );
}
