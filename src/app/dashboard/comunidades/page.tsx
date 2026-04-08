'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Users,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Community {
  id: string;
  name: string;
  address: string;
  total_units: number;
  created_at: string;
}

export default function CommunityListPage() {
  const { data: session } = useSession();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCommunities = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/communities/`, {
          headers: {
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setCommunities(data);
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [session]);

  const filtered = communities.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
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
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Mis Comunidades</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Gestiona los residenciales y edificios afiliados.</p>
            </div>
            <button 
              className="bg-brand-primary opacity-50 cursor-not-allowed text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2"
              disabled
            >
              <Plus size={20} />
              Registrar Nueva Comunidad
            </button>
          </div>

          {communities.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar PH..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-500 flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Activas</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">{communities.length}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Nivel Red</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white">PH-GOLD</p>
                </div>
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((community) => (
                <div 
                  key={community.id}
                  className="group bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col h-full overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-violet-500/10 text-violet-500 flex items-center justify-center border-2 border-violet-500/10 shadow-inner">
                      <Building2 size={28} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full">
                      P.H.
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight relative z-10">{community.name}</h3>
                  
                  <div className="space-y-4 mb-8 flex-grow relative z-10">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <MapPin size={16} className="text-slate-400" />
                      <p className="text-xs font-medium line-clamp-1">{community.address || 'Condado del Rey'}</p>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <Users size={16} className="text-slate-400" />
                      <p className="text-xs font-medium italic">{community.total_units} Unidades Residenciales</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                    <div className="flex items-center -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        <Users size={12} className="text-slate-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        0
                      </div>
                    </div>
                    <button className="text-brand-primary font-black text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Ver Recinto
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-[#111827] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-700">
                <Building2 size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Aún no hay comunidades</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 font-medium">
                Próximamente podrás registrar tu P.H. o comunidad para centralizar beneficios residenciales.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
