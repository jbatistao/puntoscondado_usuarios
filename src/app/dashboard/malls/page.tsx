'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  LayoutGrid, 
  Plus, 
  Search, 
  MapPin, 
  ArrowRight,
  Globe,
  Store,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Mall {
  id: string;
  name: string;
  address: string;
  website: string;
  created_at: string;
}

export default function MallListPage() {
  const { data: session } = useSession();
  const [malls, setMalls] = useState<Mall[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMalls = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/malls/`, {
          headers: {
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMalls(data);
        }
      } catch (error) {
        console.error('Error fetching malls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMalls();
  }, [session]);

  const filtered = malls.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col pt-32 items-center">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Mis Malls</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Gestión de centros comerciales y plazas.</p>
            </div>
            <button 
              className="bg-brand-primary opacity-50 cursor-not-allowed text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
              disabled
            >
              <Plus size={20} />
              Registrar Plaza / Mall
            </button>
          </div>

          {malls.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar Mall..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/30 text-sky-500 flex items-center justify-center">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Activos</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{malls.length}</p>
                </div>
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((mall) => (
                <div 
                  key={mall.id}
                  className="group bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col h-full overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center border-2 border-sky-500/10 shadow-inner">
                      <LayoutGrid size={28} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight relative z-10">{mall.name}</h3>
                  
                  <div className="space-y-4 mb-8 flex-grow relative z-10">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <MapPin size={16} className="text-slate-400" />
                      <p className="text-xs font-medium line-clamp-1">{mall.address || 'Condado del Rey'}</p>
                    </div>
                    {mall.website && (
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <Globe size={16} className="text-slate-400" />
                        <p className="text-xs font-medium truncate">{mall.website}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        <Store size={12} className="text-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        0
                      </div>
                    </div>
                    <button className="text-brand-primary font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Ver Comercios
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-[#111827] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-700">
                <LayoutGrid size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Aún no hay malls registrados</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 font-medium">
                Próximamente los centros comerciales podrán gestionar sus locales y promociones de red.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
