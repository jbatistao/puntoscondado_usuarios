'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { Zap, ArrowLeft, ChevronRight, Store, Calendar, Clock, Star } from 'lucide-react';
import Link from 'next/link';

interface WeeklyPromo {
  id: number;
  name: string;
  logo: string;
  mall_name?: string;
  schedule: {
    id: number;
    day_of_week: number;
    day_display: string;
    start_time: string;
    end_time: string;
    multiplier: number;
  };
}

const DAYS = [
  { id: 0, name: 'Lun' },
  { id: 1, name: 'Mar' },
  { id: 2, name: 'Mié' },
  { id: 3, name: 'Jue' },
  { id: 4, name: 'Vie' },
  { id: 5, name: 'Sáb' },
  { id: 6, name: 'Dom' },
];

export default function WeeklyAcceleratedPointsPage() {
  const { data: session } = useSession();
  const [promos, setPromos] = useState<WeeklyPromo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDayFilter, setActiveDayFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/rewards/merchants/weekly-accelerated/`, {
          headers: {
            'Authorization': session?.user ? `Bearer ${(session?.user as any).accessToken}` : ''
          }
        });
        if (response.ok) {
          const data = await response.json();
          setPromos(data);
        }
      } catch (error) {
        console.error('Error fetching weekly promos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, [session]);

  const filteredPromos = activeDayFilter !== null 
    ? promos.filter(p => p.schedule.day_of_week === activeDayFilter)
    : promos;

  // Group by day for the display
  const promosByDay = DAYS.map(day => ({
    ...day,
    items: promos.filter(p => p.schedule.day_of_week === day.id)
  })).filter(day => {
    if (activeDayFilter !== null) {
      return day.id === activeDayFilter && day.items.length > 0;
    }
    return day.items.length > 0;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col text-slate-800 dark:text-slate-100 pb-20">
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
             <Link 
              href="/dashboard" 
              className="flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-4 group"
             >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Volver al Dashboard</span>
             </Link>
             <h1 className="text-4xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                    <Zap size={28} className="text-amber-500 fill-amber-500" />
                </div>
                Puntos Extra Semanal
             </h1>
             <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Descubre cuándo y dónde puedes multiplicar tus recompensas cada semana.
             </p>
          </div>
          
          <div className="flex gap-2 bg-white dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
            <button 
                onClick={() => setActiveDayFilter(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeDayFilter === null 
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
            >
                Todos
            </button>
            {DAYS.map(day => (
                <button 
                    key={day.id}
                    onClick={() => setActiveDayFilter(day.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        activeDayFilter === day.id 
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' 
                        : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                >
                    {day.name}
                </button>
            ))}
          </div>
        </div>

        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-64 bg-white dark:bg-slate-900 rounded-[2.5rem] animate-pulse border border-slate-200 dark:border-slate-800" />
                ))}
             </div>
        ) : promosByDay.length > 0 ? (
            <div className="space-y-16">
                {promosByDay.map(day => (
                    <section key={day.id}>
                        <div className="flex items-center gap-3 mb-8">
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">{day.name}</h2>
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{day.items.length} Promociones</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {day.items.map((promo) => (
                                <div 
                                    key={promo.schedule.id}
                                    className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-xl hover:border-amber-200 dark:hover:border-amber-900/40 transition-all group overflow-hidden relative"
                                >
                                    {/* Multiplier Badge */}
                                    <div className="absolute top-0 right-0 p-6">
                                        <div className="bg-amber-500 text-white text-sm font-black px-4 py-2 rounded-2xl shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
                                            {promo.schedule.multiplier}x
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 p-2 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                                            {promo.logo ? (
                                                <img src={promo.logo} alt={promo.name} className="w-full h-full object-contain" />
                                            ) : (
                                                <Store className="text-slate-300" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{promo.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                {promo.mall_name || 'Comercio Asociado'}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-white/5">
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                            <Calendar size={16} className="text-brand-primary" />
                                            <span className="text-sm font-bold">{day.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                            <Clock size={16} className="text-amber-500" />
                                            <span className="text-sm font-bold">{promo.schedule.start_time} - {promo.schedule.end_time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-emerald-500">
                                            <Star size={16} className="fill-emerald-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Suma para subir de nivel</span>
                                        </div>
                                    </div>
                                    
                                    <Link 
                                        href={`/directorio?merchant=${promo.id}`}
                                        className="mt-8 w-full py-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        Ver comercio
                                        <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center mb-6 text-slate-300 dark:text-slate-700">
                    <Zap size={48} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No hay promociones semanales</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                    {activeDayFilter !== null 
                        ? `Aún no hay promociones configuradas para los días ${DAYS.find(d => d.id === activeDayFilter)?.name}.`
                        : 'Vuelve pronto para descubrir nuevas oportunidades de ganar puntos extra.'}
                </p>
                <Link href="/dashboard" className="mt-8 text-brand-primary font-bold hover:underline">
                    Regresar al Dashboard
                </Link>
            </div>
        )}
      </main>
    </div>
  );
}
