'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Store, 
  Plus, 
  Search, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
  Loader2,
  Pencil,
  Trash2,
  UserPlus,
  Ticket,
  ChevronRight,
  CircleDollarSign,
  Gift
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import PointRegistrationModal from '@/components/comercios/PointRegistrationModal';
import PointRedemptionModal from '@/components/comercios/PointRedemptionModal';

interface Merchant {
  id: string;
  name: string;
  category: string;
  address: string;
  redemption_cap: string;
  logo: string | null;
  created_at: string;
}

export default function MerchantListPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [selectedRedeemMerchant, setSelectedRedeemMerchant] = useState<any>(null);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [selectedPointMerchant, setSelectedPointMerchant] = useState<any>(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/`, {
          headers: {
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMerchants(data);
        }
      } catch (error) {
        console.error('Error fetching merchants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, [session]);

  const openRedeemModal = (merchant: Merchant) => {
    setSelectedRedeemMerchant({ ...merchant, id: parseInt(merchant.id) });
    setIsRedeemModalOpen(true);
  };

  const filteredMerchants = merchants.filter(m => 
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
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Mis Comercios</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Gestiona tus locales afiliados y su lealtad.</p>
            </div>
            <Link 
              href="/dashboard/comercios/nuevo"
              className="bg-brand-primary hover:bg-brand-primary-hover text-white px-8 py-4 rounded-2xl font-black transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 active:scale-95 whitespace-nowrap"
            >
              <Plus size={20} />
              Registrar Nuevo Comercio
            </Link>
          </div>

          {/* Filters and Stats */}
          {merchants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 items-stretch">
              <div className="md:col-span-3 relative flex">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar comercio..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary shadow-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm md:col-span-1 min-h-[60px]">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center shrink-0">
                  <Store size={20} />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest leading-none mb-1">Activos</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white leading-none">{merchants.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* List Content */}
          {filteredMerchants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMerchants.map((merchant) => (
                <div 
                  key={merchant.id}
                  className="group bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all flex flex-col h-full overflow-hidden relative"
                >
                  {/* Decorative Gradient Overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-bl-[100px] -mr-10 -mt-10 group-hover:scale-110 transition-transform" />

                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center overflow-hidden relative">
                      {merchant.logo ? (
                        <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-cover" />
                      ) : (
                        <Store size={32} />
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full">
                        Activo
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 leading-tight relative z-10">{merchant.name}</h3>
                  <div className="flex items-center gap-2 mb-6 relative z-10">
                    <span className="text-xs font-bold text-brand-primary bg-brand-primary/5 px-2.5 py-1 rounded-lg">
                      {merchant.category}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8 flex-grow relative z-10">
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <MapPin size={16} className="text-slate-400" />
                      <p className="text-xs font-medium line-clamp-1">{merchant.address || 'Sin dirección'}</p>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <Building2 size={16} className="text-slate-400" />
                      <p className="text-xs font-medium italic">Tope de Canje: {merchant.redemption_cap}%</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center mt-auto relative z-10">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => { e.preventDefault(); router.push(`/dashboard/comercios/${merchant.id}`); }}
                        className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-all flex items-center justify-center"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all flex items-center justify-center"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={(e) => e.preventDefault()}
                        className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center"
                        title="Invitar"
                      >
                        <UserPlus size={18} />
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); openRedeemModal(merchant); }}
                        className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all flex items-center justify-center"
                        title="Canjear"
                      >
                        <Ticket size={18} />
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          router.push(`/dashboard/comercios/${merchant.id}/especiales`);
                        }}
                        className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-500 hover:text-white hover:bg-violet-500 transition-all flex items-center justify-center"
                        title="Funciones Especiales"
                      >
                        <Gift size={18} />
                      </button>
                      <button 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          setSelectedPointMerchant({ ...merchant, id: parseInt(merchant.id) }); 
                          setIsPointModalOpen(true); 
                        }}
                        className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary hover:text-white hover:bg-brand-primary transition-all flex items-center justify-center"
                        title="Registrar Puntos"
                      >
                        <CircleDollarSign size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-[#111827] rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-24 h-24 bg-slate-50 dark:bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-700">
                <Store size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Aún no tienes comercios</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-10 font-medium">
                Los comercios se crean para que los usuarios consumidores acumulen puntos con sus compras y puedan canjear los mismos por recompensas.
              </p>
              <Link 
                href="/dashboard/comercios/nuevo"
                className="inline-flex items-center gap-3 bg-brand-primary hover:bg-brand-primary-hover text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-brand-primary/20 transition-all active:scale-95"
              >
                <Plus size={24} />
                Empezar Registro
              </Link>
            </div>
          )}
        </div>
      </main>

      {selectedRedeemMerchant && (
        <PointRedemptionModal
          isOpen={isRedeemModalOpen}
          onClose={() => setIsRedeemModalOpen(false)}
          merchant={selectedRedeemMerchant}
        />
      )}

      {selectedPointMerchant && (
        <PointRegistrationModal
          isOpen={isPointModalOpen}
          onClose={() => setIsPointModalOpen(false)}
          merchant={selectedPointMerchant}
        />
      )}

    </div>
  );
}
