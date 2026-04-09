'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  Store, 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Phone,
  Instagram,
  Facebook,
  Globe,
  MapPin,
  Tag,
  Percent,
  MessageCircle,
  Upload,
  Image as ImageIcon,
  X
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MerchantDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    redemption_cap: '25.00',
    phone_number: '',
    whatsapp_number: '',
    instagram_handle: '',
    facebook_url: '',
    website_url: '',
    logo: '' as string | File | null
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const categories = [
    'Restaurante', 'Cafetería', 'Tienda de Ropa', 'Supermercado', 
    'Servicios Profesionales', 'Salud y Belleza', 'Entretenimiento', 'Otros'
  ];

  useEffect(() => {
    const fetchMerchant = async () => {
      if (!session?.user) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/${id}/`, {
          headers: {
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name || '',
            category: data.category || '',
            address: data.address || '',
            redemption_cap: data.redemption_cap || '25.00',
            phone_number: data.phone_number || '',
            whatsapp_number: data.whatsapp_number || '',
            instagram_handle: data.instagram_handle || '',
            facebook_url: data.facebook_url || '',
            website_url: data.website_url || '',
            logo: data.logo || ''
          });
          if (data.logo) {
            setLogoPreview(data.logo);
          }
        }
      } catch (err) {
        console.error('Error fetching merchant:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchant();
  }, [id, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // Only append if it's not the logo (we handle logo separately) 
        // OR if logo is a File (meaning it was changed)
        if (key === 'logo') {
          if (value instanceof File) {
            data.append('logo', value);
          }
        } else if (value !== null && value !== undefined) {
          data.append(key, value as string);
        }
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/${id}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        },
        body: data
      });

      if (!response.ok) throw new Error('Error al actualizar el comercio');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormData({ ...formData, logo: null });
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <Link 
              href="/dashboard/comercios" 
              className="group flex items-center gap-2 text-slate-500 hover:text-brand-primary font-bold transition-colors"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Volver a la lista
            </Link>
            <div className="text-right">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{formData.name}</h1>
              <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">Configuración del Perfil</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-950/30 text-orange-500 flex items-center justify-center">
                    <Store size={18} />
                  </div>
                  Información Principal
                </h2>

                {/* Logo Upload Section */}
                <div className="mb-10 flex flex-col items-center">
                  <div className="relative group">
                    <div 
                      className={`w-40 h-40 rounded-[2rem] border-4 border-dashed ${logoPreview ? 'border-brand-primary' : 'border-slate-200 dark:border-slate-800'} flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900/50 transition-all group-hover:border-brand-primary/50 relative shadow-inner`}
                    >
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <Upload size={32} />
                          <span className="text-[10px] font-black uppercase tracking-wider">Subir Logo</span>
                        </div>
                      )}
                      
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-bold text-sm"
                      >
                        <ImageIcon size={18} />
                        {logoPreview ? 'Cambiar' : 'Seleccionar'}
                      </button>
                    </div>

                    {logoPreview && (
                      <button
                        type="button"
                        onClick={removeLogo}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="mt-4 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Formato Sugerido: Cuadrado (1:1)</p>
                    <p className="text-[9px] text-slate-400">JPG, PNG o WEBP</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Comercial</label>
                    <input 
                      required
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Categoría</label>
                    <select 
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all appearance-none"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Dirección Exacta</label>
                    <textarea 
                      required
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all min-h-24 resize-none"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Social & Contact */}
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  Contacto y Redes Sociales
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Phone size={12} /> Teléfono
                    </label>
                    <input 
                      type="text"
                      placeholder="+507 0000-0000"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <MessageCircle size={12} /> WhatsApp
                    </label>
                    <input 
                      type="text"
                      placeholder="+507 0000-0000"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      value={formData.whatsapp_number}
                      onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Instagram size={12} /> Instagram Handle
                    </label>
                    <div className="relative">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">@</span>
                      <input 
                        type="text"
                        placeholder="tu.negocio"
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                        value={formData.instagram_handle}
                        onChange={(e) => setFormData({...formData, instagram_handle: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Globe size={12} /> Sitio Web
                    </label>
                    <input 
                      type="url"
                      placeholder="https://tuweb.com"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      value={formData.website_url}
                      onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Facebook size={12} /> Facebook URL
                    </label>
                    <input 
                      type="url"
                      placeholder="https://facebook.com/tu.negocio"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                      value={formData.facebook_url}
                      onChange={(e) => setFormData({...formData, facebook_url: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <h3 className="text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest">Ajustes de Red</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Percent size={12} /> Tope de Canje
                    </label>
                    <div className="relative">
                      <input 
                        type="number"
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all text-right pr-10"
                        value={formData.redemption_cap}
                        onChange={(e) => setFormData({...formData, redemption_cap: e.target.value})}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-400">%</span>
                    </div>
                    <p className="text-[9px] text-slate-400 leading-relaxed">
                      Máximo permitido para que usuarios paguen con puntos generados en OTROS locales.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-primary hover:bg-brand-primary-hover disabled:bg-slate-400 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Guardar Cambios</>}
                    </button>
                    
                    {success && (
                      <div className="mt-4 flex items-center gap-2 text-emerald-500 font-bold text-xs justify-center animate-in fade-in zoom-in">
                        <CheckCircle2 size={16} />
                        ¡Cambios guardados!
                      </div>
                    )}
                    
                    {error && (
                      <div className="mt-4 flex items-center gap-2 text-red-500 font-bold text-xs justify-center">
                        <AlertCircle size={16} />
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-brand-primary/5 rounded-[2.5rem] p-8 border border-brand-primary/10">
                <h4 className="text-brand-primary font-black text-sm mb-4 uppercase tracking-widest">Tip Pro</h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed font-medium">
                  Completar tus redes sociales ayuda a que los usuarios te encuentren más fácil en el mapa de beneficios.
                </p>
              </div>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
