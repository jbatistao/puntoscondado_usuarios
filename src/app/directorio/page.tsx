'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Search, 
  Store, 
  Coffee, 
  Utensils, 
  Dumbbell, 
  Scissors, 
  ShoppingBag, 
  MapPin, 
  Loader2,
  Pizza,
  Building2,
  LayoutGrid,
  X,
  Phone,
  Instagram,
  Facebook,
  Globe,
  MessageCircle,
  Clock,
  ExternalLink,
  Users,
  ArrowRight,
  Info,
  Ticket
} from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


interface BaseEntity {
  id: string;
  name: string;
  logo?: string | null;
  address?: string;
  description?: string;
  phone_number?: string;
  whatsapp_number?: string;
  instagram_handle?: string;
  facebook_url?: string;
  website_url?: string;
  created_at?: string;
}

interface Merchant extends BaseEntity {
  category: string;
  user_points?: number;
  internal_domain?: string;
}

interface Coupon {
  id: string;
  title: string;
  description: string;
  original_price: string;
  offer_price_cash: string;
  offer_price_points: number;
  image?: string;
}

interface Community extends BaseEntity {
  total_units?: number;
}
interface Mall extends BaseEntity {
  website?: string;
}

const CATEGORIES = [
  { name: 'Todos', icon: Store },
  { name: 'Cafetería', icon: Coffee },
  { name: 'Restaurante', icon: Utensils },
  { name: 'Gimnasio', icon: Dumbbell },
  { name: 'Salud y Belleza', icon: Scissors },
  { name: 'Supermercado', icon: ShoppingBag },
];

type TabType = 'comercios' | 'comunidades' | 'malls';

export default function DirectorioPage() {
  const [activeTab, setActiveTab] = useState<TabType>('comercios');
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [malls, setMalls] = useState<Mall[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState<BaseEntity | null>(null);
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const headers: Record<string, string> = {};
        if (session?.user) {
          headers['Authorization'] = `Bearer ${(session.user as any).accessToken}`;
        }

        const [mRes, cRes, mallRes] = await Promise.all([
          fetch(`${backendUrl}/api/rewards/merchants/public_list/`, { headers }),
          fetch(`${backendUrl}/api/rewards/communities/public_list/`, { headers }),
          fetch(`${backendUrl}/api/rewards/malls/public_list/`, { headers })
        ]);

        if (mRes.ok) setMerchants(await mRes.json());
        if (cRes.ok) setCommunities(await cRes.json());
        if (mallRes.ok) setMalls(await mallRes.json());
      } catch (error) {
        console.error('Error fetching directory data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [backendUrl, session]);

  const getIcon = (category?: string) => {
    if (activeTab === 'comunidades') return Building2;
    if (activeTab === 'malls') return LayoutGrid;
    
    switch (category) {
      case 'Cafetería': return Coffee;
      case 'Restaurante': return Utensils;
      case 'Gimnasio': return Dumbbell;
      case 'Salud y Belleza': return Scissors;
      case 'Supermercado': return ShoppingBag;
      case 'Pizza': return Pizza;
      default: return Store;
    }
  };

  const getFilteredData = () => {
    let data: BaseEntity[] = [];
    if (activeTab === 'comercios') data = merchants;
    else if (activeTab === 'comunidades') data = communities;
    else if (activeTab === 'malls') data = malls;

    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeTab !== 'comercios' || selectedCategory === 'Todos' || (item as Merchant).category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const fetchCoupons = async (merchantId: string) => {
    setLoadingCoupons(true);
    try {
      const resp = await fetch(`${backendUrl}/api/rewards/coupons/?merchant_id=${merchantId}`);
      if (resp.ok) {
        const data = await resp.json();
        setActiveCoupons(data);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoadingCoupons(false);
    }
  };

  useEffect(() => {
    if (selectedItem && activeTab === 'comercios') {
      fetchCoupons(selectedItem.id);
    } else {
      setActiveCoupons([]);
    }
  }, [selectedItem, activeTab]);

  const filteredItems = getFilteredData();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-[#030712]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 overflow-hidden">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto mb-16 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full -z-10" />
          
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
              Nuestro <span className="text-brand-primary">Directorio</span>
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
              Tu guía local en Condado del Rey. Encuentra todo lo que necesitas a un clic de distancia.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex justify-center p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] w-fit mx-auto shadow-sm">
            {[
              { id: 'comercios', label: 'Comercios', icon: Store },
              { id: 'comunidades', label: 'Comunidades', icon: Building2 },
              { id: 'malls', label: 'Malls', icon: LayoutGrid },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as TabType); setSelectedCategory('Todos'); }}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all
                  ${activeTab === tab.id 
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30' 
                    : 'text-slate-500 hover:text-brand-primary dark:text-slate-400'}
                `}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto mb-12 space-y-8">
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-brand-primary/20 blur-2xl group-focus-within:bg-brand-primary/30 transition-all duration-500 opacity-50" />
            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-2 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary/20 focus-within:border-brand-primary">
              <Search className="ml-5 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder={`Buscar ${activeTab === 'comercios' ? 'el comercio' : activeTab === 'comunidades' ? 'la comunidad' : 'el mall'} ideal...`}
                className="w-full bg-transparent px-5 py-4 text-lg font-bold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {activeTab === 'comercios' && (
            <div className="flex flex-wrap justify-center gap-3 animate-in fade-in zoom-in-95 duration-500">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all
                    ${selectedCategory === cat.name 
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/30 scale-105' 
                      : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-brand-primary hover:text-brand-primary'}
                  `}
                >
                  <cat.icon size={18} />
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Data Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 className="animate-spin text-brand-primary mb-4" size={48} />
              <p className="font-black uppercase tracking-widest text-sm">Cargando directorio...</p>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item, index) => {
                const Icon = getIcon((item as Merchant).category);
                const isMerchant = activeTab === 'comercios';

                const cardContent = (
                  <div className="bg-[#F8FAFC] dark:bg-slate-950 rounded-[2.2rem] p-6 h-full flex flex-col relative overflow-hidden w-full">
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    
                    <div className="flex flex-col items-center text-center flex-grow">
                      <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center mb-6 p-1 group-hover:scale-110 transition-transform duration-500 relative">
                        {item.logo ? (
                          <div className="relative w-full h-full rounded-[1.8rem] overflow-hidden">
                            <Image src={item.logo} alt={item.name} fill className="object-cover" />
                          </div>
                        ) : (
                          <Icon size={40} className="text-slate-400 group-hover:text-brand-primary transition-colors duration-300" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
                        {item.name}
                      </h3>

                      {activeTab === 'comercios' && (
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full mb-4">
                          {(item as Merchant).category}
                        </span>
                      )}

                      {activeTab === 'comercios' && (item as Merchant).user_points !== undefined && Number((item as Merchant).user_points) > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 rounded-2xl text-white mb-4 shadow-lg shadow-emerald-500/20 animate-in zoom-in duration-300">
                           <Ticket size={14} className="animate-pulse" />
                           <span className="text-xs font-black">{Number((item as Merchant).user_points).toLocaleString()} <span className="text-[9px] opacity-80 uppercase">PTS</span></span>
                        </div>
                      )}

                      {activeTab !== 'comercios' && item.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 px-4 italic">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 text-xs font-medium mb-2 mt-auto">
                        <MapPin size={14} className="text-brand-primary/60" />
                        <span className="line-clamp-1">{item.address || 'Condado del Rey, Panamá'}</span>
                      </div>
                    </div>
                  </div>
                );

                if (isMerchant) {
                  return (
                    <Link
                      key={item.id}
                      href={`/directorio/${(item as Merchant).internal_domain || item.id}`}
                      className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-1 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95 text-left flex flex-col"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {cardContent}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-1 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95 text-left flex flex-col w-full"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {cardContent}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <Store size={64} className="mx-auto text-slate-200 dark:text-slate-800 mb-6" />
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Sin coincidencias</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium">
                Prueba con otros términos de búsqueda o filtros.
              </p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }} className="text-brand-primary font-black uppercase tracking-widest text-sm hover:underline">
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setSelectedItem(null)} />
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            {/* Header / Info */}
            <div className="p-8 pb-4 relative">
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all z-20"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 dark:bg-slate-950 flex items-center justify-center relative flex-shrink-0 shadow-inner border border-slate-100 dark:border-slate-800 overflow-hidden">
                  {selectedItem.logo ? (
                    <Image src={selectedItem.logo} alt={selectedItem.name} fill className="object-cover" />
                  ) : (
                    React.createElement(getIcon(activeTab === 'comercios' ? (selectedItem as Merchant).category : undefined), { 
                      size: 48, 
                      className: "text-slate-300" 
                    })
                  )}
                </div>

                <div className="flex-grow pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedItem.name}
                    </h2>
                    {activeTab === 'comercios' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-brand-primary text-white px-3 py-1 rounded-full">
                          {(selectedItem as Merchant).category}
                        </span>
                        {Number((selectedItem as Merchant).user_points) > 0 && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white rounded-full shadow-lg shadow-emerald-500/20">
                            <Ticket size={12} />
                            <span className="text-[10px] font-black">{Number((selectedItem as Merchant).user_points).toLocaleString()} PTS</span>
                          </div>
                        )}

                      </div>
                    )}

                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium mb-6">
                    <MapPin size={18} className="text-brand-primary" />
                    <span>{selectedItem.address || 'Condado del Rey, Ciudad de Panamá'}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedItem.phone_number && (
                      <a href={`tel:${selectedItem.phone_number}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-brand-primary transition-colors font-bold text-xs uppercase">
                        <Phone size={14} /> {selectedItem.phone_number}
                      </a>
                    )}
                    {selectedItem.whatsapp_number && (
                      <a href={`https://wa.me/${selectedItem.whatsapp_number}`} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white transition-all font-bold text-xs uppercase">
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Coupons Section */}
            {activeTab === 'comercios' && (activeCoupons.length > 0 || loadingCoupons) && (
              <div className="px-8 py-4">
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 ml-2">
                  <Ticket size={14} className="text-brand-primary" /> Ofertas Exclusivas
                </h4>
                
                {loadingCoupons ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-brand-primary" size={24} />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeCoupons.map((coupon) => (
                      <div key={coupon.id} className="group relative bg-[#F8FAFC] dark:bg-slate-950/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-all">
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start mb-3">
                            <h5 className="font-black text-slate-900 dark:text-white text-sm leading-tight group-hover:text-brand-primary transition-colors">
                              {coupon.title}
                            </h5>
                            <span className="text-[9px] font-black bg-brand-secondary/10 text-brand-secondary px-2 py-1 rounded-lg uppercase">
                              -{(100 - (Number(coupon.offer_price_cash) * 100 / Number(coupon.original_price))).toFixed(0)}% OFF
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-slate-500 dark:text-slate-500 mb-4 line-clamp-2">
                            {coupon.description}
                          </p>
                          
                          <div className="mt-auto pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[9px] font-bold text-slate-400 line-through">${coupon.original_price}</span>
                              <span className="text-sm font-black text-slate-900 dark:text-white">${coupon.offer_price_cash}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[9px] font-bold text-slate-400 uppercase">O por</span>
                              <div className="flex items-center gap-1 text-brand-primary">
                                <span className="text-xs font-black">{coupon.offer_price_points.toLocaleString()}</span>
                                <span className="text-[8px] font-black">PTS</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Description / Extra Info */}
            <div className="p-8 pt-4 space-y-8">
              {selectedItem.description && (
                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800">
                  <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    <Info size={14} /> Acerca de
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Social Links */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Redes y Web</h4>
                  <div className="flex flex-col gap-2">
                    {selectedItem.instagram_handle && (
                      <a href={`https://instagram.com/${selectedItem.instagram_handle.replace('@', '')}`} target="_blank" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:translate-x-1 transition-all">
                        <div className="flex items-center gap-3 font-bold text-sm">
                          <Instagram size={18} className="text-pink-500" /> Instagram
                        </div>
                        <span className="text-xs text-slate-400">@{selectedItem.instagram_handle.replace('@', '')}</span>
                      </a>
                    )}
                    {selectedItem.facebook_url && (
                      <a href={selectedItem.facebook_url} target="_blank" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:translate-x-1 transition-all">
                        <div className="flex items-center gap-3 font-bold text-sm">
                          <Facebook size={18} className="text-blue-600" /> Facebook
                        </div>
                        <ExternalLink size={14} className="text-slate-400" />
                      </a>
                    )}
                    {(selectedItem.website_url || (selectedItem as Mall).website) && (
                      <a href={selectedItem.website_url || (selectedItem as Mall).website} target="_blank" className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:translate-x-1 transition-all">
                        <div className="flex items-center gap-3 font-bold text-sm">
                          <Globe size={18} className="text-brand-primary" /> Sitio Web
                        </div>
                        <ExternalLink size={14} className="text-slate-400" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Additional Stats */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Información Extra</h4>
                  <div className="flex flex-col gap-2 line-height-tight">
                    <div className="flex flex-col p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Ubicación</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Condado del Rey, Panamá</span>
                    </div>
                    {activeTab === 'comunidades' && (selectedItem as Community).total_units && (
                      <div className="flex flex-col p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/10">
                        <span className="text-[10px] font-bold text-brand-primary uppercase">Unidades Totales</span>
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-brand-primary" />
                          <span className="text-sm font-black text-brand-primary">{(selectedItem as Community).total_units} Apartamentos</span>
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Miembro desde</span>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {selectedItem.created_at ? new Date(selectedItem.created_at).getFullYear() : '2024'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer / CTA */}
            <div className="p-8 pt-0 mt-4">
              <Link 
                href="/login"
                className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-brand-primary/20"
              >
                {activeTab === 'comercios' ? '¡Quiero acumular puntos aquí!' : 'Unirme a esta red'}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
