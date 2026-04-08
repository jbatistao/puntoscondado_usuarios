'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Store, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Percent, 
  MapPin, 
  Tag,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function RegisterMerchantPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    redemption_cap: '25.00',
    category: 'Restaurante',
    address: ''
  });

  const categories = [
    'Restaurante',
    'Cafetería',
    'Tienda de Ropa',
    'Supermercado',
    'Servicios Profesionales',
    'Salud y Belleza',
    'Entretenimiento',
    'Comunidad / PH',
    'Centro Comercial',
    'Otros'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/`;
    console.log('Fetching:', url);

    const token = (session?.user as any)?.accessToken;
    if (!token) {
      setError('Sesión no válida o expirada. Por favor, inicia sesión de nuevo.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        let errorMessage = 'Error al registrar el comercio';
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          errorMessage = data.detail || data.error || JSON.stringify(data);
        } else {
          errorMessage = `Error ${response.status}: ${response.statusText}`;
          const text = await response.text();
          console.error('Server HTML response:', text.substring(0, 500));
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-md w-full text-center shadow-2xl border border-slate-100 dark:border-slate-800">
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">¡Comercio Registrado!</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
            Tu negocio ha sido afiliado correctamente a la red de Puntos Condado.
          </p>
          <p className="text-xs text-brand-primary font-bold uppercase tracking-widest">Redirigiendo al Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/dashboard" 
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-brand-primary hover:border-brand-primary transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="text-right">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Afiliar mi Comercio</h1>
              <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">Puntos Condado Network</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Business Name */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Store size={14} className="text-brand-primary" />
                  Nombre del Comercio
                </label>
                <input 
                  required
                  type="text"
                  placeholder="Ej. Artisan Coffee Shop"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Tag size={14} className="text-brand-primary" />
                    Categoría
                  </label>
                  <select 
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                {/* Redemption Cap */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Percent size={14} className="text-brand-primary" />
                    Tope de Canje
                  </label>
                  <div className="relative">
                    <input 
                      required
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-right pr-12"
                      value={formData.redemption_cap}
                      onChange={(e) => setFormData({...formData, redemption_cap: e.target.value})}
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-slate-400">%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium ml-1">Límite para puntos externos a tu local.</p>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin size={14} className="text-brand-primary" />
                  Dirección
                </label>
                <textarea 
                  required
                  placeholder="Ej. Condado del Rey, Plaza Green Park, Local 5"
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all min-h-24 resize-none"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              {error && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 animate-in shake">
                  <AlertCircle size={20} />
                  <p className="text-xs font-bold">{error}</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-slate-400 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 relative overflow-hidden group active:scale-95"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    <span>Registrar mi Negocio</span>
                    <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-500 text-xs font-medium max-w-sm mx-auto">
            Al registrar tu comercio, aceptas los términos de afiliación de la red Puntos Condado y la política de privacidad.
          </p>
        </div>
      </main>
    </div>
  );
}
