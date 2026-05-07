'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  ArrowLeft, 
  Gift, 
  Zap, 
  Ticket, 
  Trophy, 
  Stamp, 
  ChevronRight,
  Info,
  Save,
  Loader2,
  Store,
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

type TabType = 'welcome' | 'boost' | 'coupons' | 'challenge' | 'stamps';

interface Merchant {
  id: string;
  name: string;
  welcome_bonus_active: boolean;
  welcome_bonus_points: number;
}

export default function SpecialFeaturesPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>('welcome');
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const hasFetched = React.useRef(false);
  
  // Welcome Settings State
  const [welcomeActive, setWelcomeActive] = useState(false);
  const [welcomePoints, setWelcomePoints] = useState<string>('250');

  // Boost Settings State
  const [schedules, setSchedules] = useState<any[]>([]);
  const [newSchedule, setNewSchedule] = useState({
    day_of_week: '1',
    start_time: '16:00',
    end_time: '20:00',
    multiplier: '2.0'
  });

  // Coupon Settings State
  const [coupons, setCoupons] = useState<any[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    title: '',
    description: '',
    original_price: '',
    offer_price_cash: '',
    offer_price_points: ''
  });

  const fetchMerchant = async () => {
    if (!session?.user || !params.id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/${params.id}/`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMerchant(data);
        setWelcomeActive(data.welcome_bonus_active);
        const points = data.welcome_bonus_points;
        setWelcomePoints(points && points > 0 ? points.toString() : '250');
      }
    } catch (error) {
      console.error('Error fetching merchant:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoupons = async () => {
    if (!session?.user || !params.id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/coupons/?merchant_id=${params.id}`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const fetchSchedules = async () => {
    if (!session?.user || !params.id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/extra-points/?merchant_id=${params.id}`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleSaveWelcome = async () => {
    if (!session?.user || !params.id) return;
    setSaving(true);
    try {
      const payload = {
        welcome_bonus_active: welcomeActive,
        welcome_bonus_points: parseInt(welcomePoints) || 0
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/${params.id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        setMerchant(data);
        alert('Bono de bienvenida actualizado con éxito');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddSchedule = async () => {
    if (!session?.user || !params.id) return;
    setSaving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/extra-points/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          merchant: params.id,
          day_of_week: parseInt(newSchedule.day_of_week),
          start_time: newSchedule.start_time,
          end_time: newSchedule.end_time,
          multiplier: parseFloat(newSchedule.multiplier)
        })
      });
      if (response.ok) {
        await fetchSchedules();
        alert('Horario especial añadido');
      }
    } catch (error) {
      console.error('Error adding schedule:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSchedule = async (id: number) => {
    if (!session?.user) return;
    if (!confirm('¿Seguro que deseas eliminar este horario?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/extra-points/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${(session?.user as any)?.accessToken}` }
      });
      if (response.ok) {
        setSchedules(schedules.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleAddCoupon = async () => {
    if (!session?.user || !params.id) return;
    setSaving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/coupons/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          merchant: params.id,
          title: newCoupon.title,
          description: newCoupon.description,
          original_price: parseFloat(newCoupon.original_price),
          offer_price_cash: parseFloat(newCoupon.offer_price_cash),
          offer_price_points: parseInt(newCoupon.offer_price_points)
        })
      });
      if (response.ok) {
        await fetchCoupons();
        setNewCoupon({
          title: '',
          description: '',
          original_price: '',
          offer_price_cash: '',
          offer_price_points: ''
        });
        alert('Cupón creado con éxito');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCoupon = async (id: number) => {
    if (!session?.user) return;
    if (!confirm('¿Seguro que deseas eliminar este cupón?')) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/coupons/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${(session?.user as any)?.accessToken}` }
      });
      if (response.ok) {
        setCoupons(coupons.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  useEffect(() => {
    if (session?.user && params.id && !hasFetched.current) {
      fetchMerchant();
      fetchSchedules();
      fetchCoupons();
      hasFetched.current = true;
    }
  }, [session, params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col pt-32 items-center">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    );
  }

  const daysLabels: Record<string, string> = {
    '0': 'Lunes', '1': 'Martes', '2': 'Miércoles', '3': 'Jueves',
    '4': 'Viernes', '5': 'Sábado', '6': 'Domingo'
  };

  const tabs = [
    { id: 'welcome', label: 'Bono Bienvenida', icon: Gift, color: 'text-violet-500', bg: 'bg-violet-500/10', border: 'border-violet-500' },
    { id: 'boost', label: 'Puntos Extra', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500' },
    { id: 'coupons', label: 'Cupones', icon: Ticket, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500' },
    { id: 'challenge', label: 'Retos', icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500' },
    { id: 'stamps', label: 'Sellos', icon: Stamp, color: 'text-indigo-500', bg: 'bg-indigo-500/10', border: 'border-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col gap-6 mb-12">
            <button 
              onClick={() => router.push('/dashboard/comercios')}
              className="group flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors font-bold text-sm w-fit"
            >
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ArrowLeft size={16} />
              </div>
              Volver a Mis Comercios
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Sparkles size={20} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Funciones Especiales</h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-bold ml-13">
                  Potencia la fidelidad en <span className="text-brand-primary">{merchant?.name}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-3">
              <div className="bg-white dark:bg-[#111827] rounded-[2rem] p-4 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 px-4 pt-2">Herramientas Disponibles</p>
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                        activeTab === tab.id 
                          ? `${tab.bg} ring-1 ring-inset ring-brand-primary/10` 
                          : 'hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        activeTab === tab.id ? `${tab.bg} ${tab.color} shadow-inner` : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        <tab.icon size={20} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className={`text-sm font-black transition-colors ${
                          activeTab === tab.id ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {tab.label}
                        </p>
                      </div>
                      <ChevronRight size={16} className={`transition-all ${
                        activeTab === tab.id ? 'text-brand-primary translate-x-1' : 'opacity-0'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden min-h-[500px] flex flex-col">
                <div className="p-8 pb-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 ${tabs.find(t => t.id === activeTab)?.bg} ${tabs.find(t => t.id === activeTab)?.color} rounded-2xl flex items-center justify-center`}>
                      {React.createElement(tabs.find(t => t.id === activeTab)?.icon || Gift, { size: 28 })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        {tabs.find(t => t.id === activeTab)?.label}
                      </h2>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Configuración de Función</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-grow">
                  {activeTab === 'welcome' && (
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-700 dark:text-slate-300">Estado de la Función</label>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setWelcomeActive(true)}
                            className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${
                              welcomeActive 
                                ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}
                          >Activado</button>
                          <button 
                            onClick={() => setWelcomeActive(false)}
                            className={`flex-1 py-4 rounded-2xl font-black text-sm transition-all ${
                              !welcomeActive 
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}
                          >Desactivado</button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-black text-slate-700 dark:text-slate-300">Puntos de Bienvenida</label>
                        <input 
                          type="number"
                          value={welcomePoints}
                          onChange={(e) => setWelcomePoints(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-primary/20 appearance-none"
                        />
                        <p className="text-[10px] text-slate-400 font-medium">Se otorgarán a los nuevos usuarios que seleccionen tu comercio de la lista de bonos disponibles.</p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'boost' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-3xl border border-amber-200 dark:border-amber-800 mb-8">
                        <h3 className="font-black text-amber-800 dark:text-amber-500 mb-2 flex items-center gap-2">
                            <Zap size={18} /> Nuevo Horario de Puntos Extra
                        </h3>
                        <p className="text-xs text-amber-700/60 dark:text-amber-500/50 font-bold mb-6">
                            Define cuándo la acumulación será acelerada (ej. 2x, 3x). Ignora el nivel del cliente.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-amber-800/50 tracking-widest">Día</label>
                                <select 
                                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                                    value={newSchedule.day_of_week}
                                    onChange={(e) => setNewSchedule({...newSchedule, day_of_week: e.target.value})}
                                >
                                    {Object.entries(daysLabels).map(([val, label]) => <option key={val} value={val} className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">{label}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-amber-800/50 tracking-widest">Inicio</label>
                                <input 
                                    type="time" 
                                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                                    value={newSchedule.start_time}
                                    onChange={(e) => setNewSchedule({...newSchedule, start_time: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-amber-800/50 tracking-widest">Fin</label>
                                <input 
                                    type="time" 
                                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                                    value={newSchedule.end_time}
                                    onChange={(e) => setNewSchedule({...newSchedule, end_time: e.target.value})}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-amber-800/50 tracking-widest">Puntos por Dólar</label>
                                <input 
                                    type="number" step="0.1" min="1"
                                    className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500/20"
                                    value={newSchedule.multiplier}
                                    onChange={(e) => setNewSchedule({...newSchedule, multiplier: e.target.value})}
                                />
                            </div>
                        </div>
                        <button 
                            onClick={handleAddSchedule}
                            className="mt-6 w-full py-3 bg-amber-500 text-white rounded-xl font-black text-sm shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >Añadir Horario</button>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Horarios Activos</h4>
                        {schedules.length === 0 ? (
                            <div className="p-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl text-center">
                                <p className="text-slate-400 font-bold">No has configurado puntos extra aún.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {schedules.map((s) => (
                                    <div key={s.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                                <Zap size={18} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white">
                                                    {daysLabels[s.day_of_week]} <span className="text-slate-400 font-medium px-2">|</span> {s.start_time.substring(0,5)} - {s.end_time.substring(0,5)}
                                                </p>
                                                <p className="text-xs font-bold text-amber-600 uppercase tracking-tight">Multiplicador: {s.multiplier}x</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteSchedule(s.id)}
                                            className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                        ><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'coupons' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="bg-emerald-50 dark:bg-emerald-950/20 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-800 mb-8">
                        <h3 className="font-black text-emerald-800 dark:text-emerald-500 mb-2 flex items-center gap-2">
                            <Ticket size={18} /> Nuevo Cupón de Oferta
                        </h3>
                        <p className="text-xs text-emerald-700/60 dark:text-emerald-500/50 font-bold mb-6">
                            Define ofertas exclusivas canjeables por puntos o precio especial en efectivo.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-emerald-800/50 tracking-widest px-1">Título de la oferta</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ej: Hamburguesa Especial"
                                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={newCoupon.title}
                                        onChange={(e) => setNewCoupon({...newCoupon, title: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-emerald-800/50 tracking-widest px-1">Descripción corta</label>
                                    <input 
                                        type="text" 
                                        placeholder="Breve detalle del beneficio"
                                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={newCoupon.description}
                                        onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-emerald-800/50 tracking-widest px-1">Precio Regular ($)</label>
                                    <input 
                                        type="number" step="0.01"
                                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={newCoupon.original_price}
                                        onChange={(e) => setNewCoupon({...newCoupon, original_price: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-emerald-800/50 tracking-widest px-1">Precio Oferta Cash ($)</label>
                                    <input 
                                        type="number" step="0.01"
                                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={newCoupon.offer_price_cash}
                                        onChange={(e) => setNewCoupon({...newCoupon, offer_price_cash: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-emerald-800/50 tracking-widest px-1">Precio en Puntos (pts)</label>
                                    <input 
                                        type="number"
                                        className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20"
                                        value={newCoupon.offer_price_points}
                                        onChange={(e) => setNewCoupon({...newCoupon, offer_price_points: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={handleAddCoupon}
                            disabled={!newCoupon.title || !newCoupon.original_price || !newCoupon.offer_price_cash || !newCoupon.offer_price_points}
                            className="mt-6 w-full py-3 bg-emerald-500 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                        >Crear Cupón</button>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Cupones Activos</h4>
                        {coupons.length === 0 ? (
                            <div className="p-12 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl text-center">
                                <p className="text-slate-400 font-bold">No has creado cupones aún.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {coupons.map((c: any) => (
                                    <div key={c.id} className="group relative bg-slate-50 dark:bg-white/5 rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Ticket size={20} />
                                            </div>
                                            <button 
                                                onClick={() => handleDeleteCoupon(c.id)}
                                                className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                            ><Trash2 size={14} /></button>
                                        </div>
                                        <h3 className="font-black text-slate-900 dark:text-white mb-1">{c.title}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mb-4">{c.description}</p>
                                        
                                        <div className="pt-4 border-t border-slate-200 dark:border-white/5 space-y-2">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-slate-400">Precio Regular:</span>
                                                <span className="text-slate-500 line-through">${c.original_price}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-bold text-slate-700 dark:text-slate-300">Precio Oferta:</span>
                                                <span className="font-black text-brand-primary">${c.offer_price_cash}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pt-1">
                                                <span className="font-bold text-emerald-600">En Puntos:</span>
                                                <span className="font-black text-emerald-500 uppercase">{c.offer_price_points} pts</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab !== 'welcome' && activeTab !== 'boost' && activeTab !== 'coupons' && (
                    <div className="flex flex-col items-center justify-center py-20 opacity-40">
                      <Sparkles size={48} className="text-slate-300 mb-4" />
                      <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Próximamente disponible</p>
                    </div>
                  )}
                </div>

                <div className="p-8 bg-slate-50/50 dark:bg-white/5 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                   {activeTab === 'welcome' && (
                     <button 
                      onClick={handleSaveWelcome}
                      disabled={saving}
                      className="px-10 py-4 bg-brand-primary text-white font-black rounded-2xl shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                       {saving ? 'Guardando...' : 'Guardar Cambios'}
                     </button>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
