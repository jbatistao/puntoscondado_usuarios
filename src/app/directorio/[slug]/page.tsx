'use client';

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Globe, 
  Instagram, 
  MessageCircle, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  Ticket, 
  Share2, 
  Check, 
  AlertCircle, 
  Loader2, 
  Sparkles,
  ExternalLink,
  QrCode,
  Award,
  Store,
  Facebook,
  FileText,
  Calendar,
  ShoppingBag,
  Link2,
  Mail,
  Youtube
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Custom Tiktok Icon since it's not exported by lucide-react in this version
const Tiktok = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Custom Google Maps Icon
const GoogleMapsIcon = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.527 4.799c1.212 2.608.937 5.678-.405 8.173-1.101 2.047-2.744 3.74-4.098 5.614-.619.858-1.244 1.75-1.669 2.727-.141.325-.263.658-.383.992-.121.333-.224.673-.34 1.008-.109.314-.236.684-.627.687h-.007c-.466-.001-.579-.53-.695-.887-.284-.874-.581-1.713-1.019-2.525-.51-.944-1.145-1.817-1.79-2.671L19.527 4.799zM8.545 7.705l-3.959 4.707c.724 1.54 1.821 2.863 2.871 4.18.247.31.494.622.737.936l4.984-5.925-.029.01c-1.741.601-3.691-.291-4.392-1.987a3.377 3.377 0 0 1-.209-.716c-.063-.437-.077-.761-.004-1.198l.001-.007zM5.492 3.149l-.003.004c-1.947 2.466-2.281 5.88-1.117 8.77l4.785-5.689-.058-.05-3.607-3.035zM14.661.436l-3.838 4.563a.295.295 0 0 1 .027-.01c1.6-.551 3.403.15 4.22 1.626.176.319.323.683.377 1.045.068.446.085.773.012 1.22l-.003.016 3.836-4.561A8.382 8.382 0 0 0 14.67.439l-.009-.003zM9.466 5.868L14.162.285l-.047-.012A8.31 8.31 0 0 0 11.986 0a8.439 8.439 0 0 0-6.169 2.766l-.016.018 3.665 3.084z" />
  </svg>
);

// Custom Waze Icon
const WazeIcon = ({ size = 22, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z" />
  </svg>
);



interface Coupon {
  id: string;
  title: string;
  description: string;
  original_price: string;
  offer_price_cash: string;
  offer_price_points: number;
}

interface MerchantData {
  id: string;
  name: string;
  category: string;
  address: string;
  email?: string;
  phone_number?: string;
  whatsapp_number?: string;
  instagram_handle?: string;
  facebook_url?: string;
  website_url?: string;
  logo?: string | null;
  coupons?: Coupon[];
  slogan?: string;
  bio?: string;
  description?: string;
  latitude?: string | number;
  longitude?: string | number;
  theme_preset?: string;
  custom_links?: any[];
  extra_contacts?: any[];
  visible_contacts?: string[];
}

interface ThemePreset {
  id: string;
  name: string;
  class: string;
  buttonClass: string;
  textClass: string;
  titleClass: string;
  categoryClass: string;
  iconClass: string;
  footerLabelClass: string;
  footerBadgeClass: string;
  borderClass: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'cyber_neon',
    name: 'Cyber Neon 🟣',
    class: 'bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#311042]',
    buttonClass: 'bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/50 hover:border-indigo-500 text-indigo-200 shadow-lg shadow-indigo-500/5',
    textClass: 'text-indigo-200',
    titleClass: 'text-white',
    categoryClass: 'text-white/70 bg-white/10 border-white/10',
    iconClass: 'bg-white/10 border-white/10 text-white hover:bg-white/20',
    footerLabelClass: 'text-white/40',
    footerBadgeClass: 'text-white/60 bg-white/5 border-white/5',
    borderClass: 'border-white/10'
  },
  {
    id: 'sunset_glow',
    name: 'Atardecer 🌅',
    class: 'bg-gradient-to-b from-[#F43F5E] via-[#EC4899] to-[#8B5CF6]',
    buttonClass: 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white shadow-lg shadow-black/5',
    textClass: 'text-rose-100',
    titleClass: 'text-white',
    categoryClass: 'text-white/70 bg-white/10 border-white/10',
    iconClass: 'bg-white/10 border-white/10 text-white hover:bg-white/20',
    footerLabelClass: 'text-white/40',
    footerBadgeClass: 'text-white/60 bg-white/5 border-white/5',
    borderClass: 'border-white/10'
  },
  {
    id: 'ocean_forest',
    name: 'Bosque Marino 🌲',
    class: 'bg-gradient-to-b from-[#0F766E] to-[#115E59]',
    buttonClass: 'bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/30 text-teal-100 shadow-sm',
    textClass: 'text-teal-100',
    titleClass: 'text-white',
    categoryClass: 'text-white/70 bg-white/10 border-white/10',
    iconClass: 'bg-white/10 border-white/10 text-white hover:bg-white/20',
    footerLabelClass: 'text-white/40',
    footerBadgeClass: 'text-white/60 bg-white/5 border-white/5',
    borderClass: 'border-white/10'
  },
  {
    id: 'glass_minimal',
    name: 'Cristal Esmerilado ❄️',
    class: 'bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950',
    buttonClass: 'bg-white/40 hover:bg-white/60 dark:bg-slate-900/40 dark:hover:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md text-slate-800 dark:text-slate-100 shadow-md',
    textClass: 'text-slate-500 dark:text-slate-400',
    titleClass: 'text-slate-800 dark:text-white',
    categoryClass: 'text-slate-500 bg-slate-200/50 border-slate-300 dark:text-white/70 dark:bg-white/10 dark:border-white/10',
    iconClass: 'bg-slate-200/50 hover:bg-slate-200/70 dark:bg-white/10 dark:hover:bg-white/20 border-slate-300 dark:border-white/10 text-slate-700 dark:text-white',
    footerLabelClass: 'text-slate-400 dark:text-white/40',
    footerBadgeClass: 'text-slate-600 bg-slate-200/50 border-slate-300 dark:text-white/60 dark:bg-white/5 dark:border-white/5',
    borderClass: 'border-slate-300/50 dark:border-white/10'
  },
  {
    id: 'sweet_peach',
    name: 'Durazno Dulce 🍑',
    class: 'bg-gradient-to-b from-[#FFEDD5] to-[#FED7AA] text-orange-950',
    buttonClass: 'bg-white/60 hover:bg-white/80 border-orange-200/50 hover:border-orange-300/60 text-orange-900 shadow-sm',
    textClass: 'text-orange-800',
    titleClass: 'text-orange-950',
    categoryClass: 'text-orange-800 bg-orange-950/10 border-orange-950/10',
    iconClass: 'bg-white/60 hover:bg-white/80 border-orange-200/50 text-orange-900 hover:bg-orange-100',
    footerLabelClass: 'text-orange-800/50',
    footerBadgeClass: 'text-orange-900 bg-white/40 border-orange-200/50',
    borderClass: 'border-orange-950/10'
  }
];

const AVAILABLE_ICONS = [
  { id: 'link', label: 'Enlace Genérico', icon: Link2 },
  { id: 'menu', label: 'Menú / Carta', icon: FileText },
  { id: 'calendar', label: 'Reservaciones', icon: Calendar },
  { id: 'shop', label: 'Tienda / Pedidos', icon: ShoppingBag },
  { id: 'phone', label: 'Teléfono', icon: Phone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'facebook', label: 'Facebook', icon: Facebook }
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MerchantLinktreePage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [merchant, setMerchant] = useState<MerchantData | null>(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

  useEffect(() => {
    const fetchMerchantByDomain = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${backendUrl}/api/rewards/merchants/by-domain/?domain=${slug}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setMerchant(data);
      } catch (err) {
        console.error("Error fetching merchant by domain slug:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchantByDomain();
  }, [slug, backendUrl]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title: merchant?.name || 'Comercio en Puntos Condado',
          text: `Visita el micro-sitio web de ${merchant?.name} en Puntos Condado!`,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  // ── LOADING STATE ──
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-32 px-4">
          <div className="text-center space-y-4">
            <Loader2 className="animate-spin text-brand-primary mx-auto" size={48} />
            <p className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Cargando sitio del comercio...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── ERROR OR NOT FOUND STATE ──
  if (error || !merchant) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow pt-32 pb-24 px-4 flex items-center justify-center">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 text-center shadow-sm">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              Comercio No Encontrado
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
              El enlace que ingresaste no corresponde a ningún comercio activo en nuestra red. ¿Deseas explorar nuestro directorio local?
            </p>
            <div className="space-y-3">
              <Link 
                href="/directorio"
                className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Ver Directorio Completo
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const activeCoupons = merchant.coupons || [];
  
  const isBioSelected = (() => {
    const contacts: any[] = [...(merchant?.extra_contacts || [])];
    if (merchant?.latitude && merchant?.longitude) {
      if (!contacts.some((c: any) => c.type === 'google_maps')) {
        contacts.push({ type: 'google_maps', value: `${merchant.latitude},${merchant.longitude}` });
      }
      if (!contacts.some((c: any) => c.type === 'waze')) {
        contacts.push({ type: 'waze', value: `${merchant.latitude},${merchant.longitude}` });
      }
    }
    // Añadimos el contacto virtual 'bio' al final de la lista para mantener paridad de índices
    contacts.push({ type: 'bio', value: 'bio' });

    const bioIndex = contacts.length - 1;
    const visibleIndices = merchant?.visible_contacts;
    if (visibleIndices !== undefined && visibleIndices !== null) {
      return visibleIndices.includes(`${bioIndex}`) || visibleIndices.includes(bioIndex.toString());
    }
    return true; // Por defecto visible
  })();

  const preset = merchant.theme_preset ? (THEME_PRESETS.find(t => t.id === merchant.theme_preset) || THEME_PRESETS[0]) : null;

  const containerClass = preset 
    ? `min-h-screen ${preset.class} flex flex-col justify-between text-white relative overflow-hidden`
    : "min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col justify-between text-slate-800 dark:text-slate-100 relative overflow-hidden";

  const cardClass = preset
    ? "bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-[3rem] p-8 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden group text-white"
    : "bg-white dark:bg-[#111827] rounded-[3rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none flex flex-col items-center text-center relative overflow-hidden group";

  const badgeClass = preset
    ? "text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 text-white px-4 py-1.5 rounded-full mt-3 relative z-10"
    : "text-[10px] font-black uppercase tracking-[0.2em] bg-brand-primary/10 text-brand-primary px-4 py-1.5 rounded-full mt-3 relative z-10";

  const mapIconClass = preset ? "text-white/80 flex-shrink-0" : "text-brand-primary/70 flex-shrink-0";
  const backLinkClass = preset
    ? "flex items-center gap-2 text-white/80 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors"
    : "flex items-center gap-2 text-slate-500 hover:text-brand-primary font-bold text-xs uppercase tracking-wider transition-colors";

  const shareBtnClass = preset
    ? "w-9 h-9 bg-white/10 hover:bg-white/25 border border-white/20 rounded-xl flex items-center justify-center text-white transition-all active:scale-90"
    : "w-9 h-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-500 hover:text-brand-primary hover:border-brand-primary transition-all active:scale-90";

  return (
    <div className={containerClass}>
      
      {/* Abstract Background Blobs - Only if no preset theme to prevent interference */}
      {!preset && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-primary/5 dark:bg-brand-primary/10 blur-[130px] rounded-full -z-10" />
          <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand-secondary/5 dark:bg-brand-secondary/5 blur-[120px] rounded-full -z-10" />
        </>
      )}

      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 relative z-10">
        <div className="max-w-md mx-auto space-y-8">
          
          {/* Back to directory button */}
          <div className="flex justify-between items-center px-2">
            <Link 
              href="/directorio" 
              className={backLinkClass}
            >
              <ArrowLeft size={16} /> Directorio
            </Link>

            <button 
              onClick={handleShare}
              className={shareBtnClass}
              title="Compartir enlace"
            >
              {copied ? <Check size={18} className="text-emerald-400" /> : <Share2 size={18} />}
            </button>
          </div>

          {/* ── PROFILE SECTION ── */}
          {preset ? (
            /* PREVIEW-REPLICATED GLASS MINIMAL STYLE (NO WRAPPING CARD) */
            <div className="flex flex-col items-center text-center">
              {/* Merchant Logo */}
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center overflow-hidden shrink-0 shadow-lg mt-4 mb-3 relative">
                {merchant.logo ? (
                  <Image 
                    src={merchant.logo.startsWith('http') ? merchant.logo : `${backendUrl}${merchant.logo}`} 
                    alt={merchant.name} 
                    fill 
                    className="object-cover animate-in fade-in zoom-in-95 duration-200" 
                  />
                ) : (
                  <Store size={32} className={preset.titleClass} />
                )}
              </div>

              {/* Merchant Name & Category */}
              <h1 className={`text-lg font-black leading-tight tracking-tight px-2 mb-1 ${preset.titleClass}`}>
                {merchant.name}
              </h1>
              <span className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full border mb-4 inline-block ${preset.categoryClass}`}>
                {merchant.category}
              </span>

              {/* Bio text */}
              {isBioSelected && (merchant.bio || merchant.slogan || merchant.description) && (
                <p 
                  className={`text-[11px] font-bold leading-relaxed px-3 mb-4 max-w-[240px] whitespace-pre-wrap ${preset.textClass}`}
                  dangerouslySetInnerHTML={{ __html: merchant.bio || merchant.slogan || merchant.description || '' }}
                />
              )}

              {/* Social Icons Row */}
              {(() => {
                const contacts: any[] = [...(merchant?.extra_contacts || [])];
                if (merchant?.latitude && merchant?.longitude) {
                  if (!contacts.some((c: any) => c.type === 'google_maps')) {
                    contacts.push({
                      type: 'google_maps',
                      value: `${merchant.latitude},${merchant.longitude}`
                    });
                  }
                  if (!contacts.some((c: any) => c.type === 'waze')) {
                    contacts.push({
                      type: 'waze',
                      value: `${merchant.latitude},${merchant.longitude}`
                    });
                  }
                }
                
                // Añadimos el contacto virtual 'bio' al final de la lista para mantener paridad de índices
                contacts.push({ type: 'bio', value: 'bio' });

                const visibleIndices = merchant?.visible_contacts;
                
                let visibleContactsToRender: { type: string; value: string }[] = [];
                
                if (visibleIndices !== undefined && visibleIndices !== null) {
                  visibleContactsToRender = visibleIndices
                    .map((idxStr) => {
                      const idx = parseInt(idxStr, 10);
                      return contacts[idx];
                    })
                    .filter((c) => c && c.type !== 'bio');
                } else {
                  // Fallback
                  if (merchant?.whatsapp_number) visibleContactsToRender.push({ type: 'whatsapp', value: merchant.whatsapp_number });
                  if (merchant?.instagram_handle) visibleContactsToRender.push({ type: 'instagram', value: merchant.instagram_handle });
                  if (merchant?.website_url) visibleContactsToRender.push({ type: 'email', value: merchant.website_url });
                  if (merchant?.phone_number) visibleContactsToRender.push({ type: 'phone', value: merchant.phone_number });
                }
                
                if (visibleContactsToRender.length === 0) return null;

                const ICON_MAP: Record<string, React.ReactNode> = {
                  whatsapp:  <MessageCircle size={15} />,
                  mobile:    <Phone size={15} />,
                  phone:     <Phone size={15} />,
                  email:     <Mail size={15} />,
                  instagram: <Instagram size={15} />,
                  facebook:  <Facebook size={15} />,
                  twitter:   <span className="text-[11px] font-black">𝕏</span>,
                  youtube:   <Youtube size={15} />,
                  tiktok:    <Tiktok size={15} />,
                  google_maps: <GoogleMapsIcon size={15} />,
                  waze:        <WazeIcon size={15} />
                };

                const getContactHref = (type: string, val: string) => {
                  const cleanVal = val.replace(/\s+/g, '').replace('+', '');
                  if (type === 'whatsapp') return `https://wa.me/${cleanVal}`;
                  if (type === 'instagram') return `https://instagram.com/${cleanVal.replace('@', '')}`;
                  if (type === 'mobile' || type === 'phone') return `tel:${cleanVal}`;
                  if (type === 'email') return val.includes('@') ? `mailto:${val}` : (val.startsWith('http') ? val : `https://${val}`);
                  if (type === 'facebook') return val.startsWith('http') ? val : `https://facebook.com/${val}`;
                  if (type === 'twitter') return `https://twitter.com/${val}`;
                  if (type === 'google_maps') return `https://www.google.com/maps/search/?api=1&query=${val}`;
                  if (type === 'waze') return `https://waze.com/ul?ll=${val}&navigate=yes`;
                  return val.startsWith('http') ? val : `https://${val}`;
                };

                return (
                  <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-[270px] mx-auto mb-6 shrink-0 animate-in fade-in zoom-in-95 duration-200">
                    {visibleContactsToRender.map((c, i) => (
                      <a
                        key={i}
                        href={getContactHref(c.type, c.value)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-sm border ${preset.iconClass}`}
                        title={c.value}
                      >
                        {ICON_MAP[c.type] ?? <Globe size={15} />}
                      </a>
                    ))}
                  </div>
                );
              })()}

              {/* Physical Address */}
              <div className={`flex items-center justify-center gap-2 font-medium text-[11px] mt-1 max-w-[240px] relative z-10 leading-relaxed mx-auto ${preset.textClass}`}>
                <MapPin size={14} className={mapIconClass} />
                <span className="text-center line-clamp-2">{merchant.address || 'Condado del Rey, Ciudad de Panamá'}</span>
              </div>
            </div>
          ) : (
            /* STANDARD DEFAULT THEME (WITH CONTAINER CARD) */
            <div className={cardClass}>
              <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-brand-primary to-brand-secondary" />
              <div className="absolute top-10 w-28 h-28 rounded-full blur-xl bg-brand-primary/5 group-hover:bg-opacity-20 transition-colors" />

              {/* Merchant Logo */}
              <div className="w-28 h-28 rounded-[2.5rem] flex items-center justify-center shadow-md p-1.5 relative z-10 border overflow-hidden bg-[#F8FAFC] dark:bg-slate-950 border-slate-100 dark:border-slate-800">
                {merchant.logo ? (
                  <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden">
                    <Image 
                      src={merchant.logo.startsWith('http') ? merchant.logo : `${backendUrl}${merchant.logo}`} 
                      alt={merchant.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                ) : (
                  <Store size={44} className="text-slate-400" />
                )}
              </div>

              {/* Name */}
              <h1 className="text-2xl font-black tracking-tight mt-6 leading-tight relative z-10 text-slate-900 dark:text-white">
                {merchant.name}
              </h1>

              {/* Category */}
              <span className={badgeClass}>
                {merchant.category}
              </span>

              {/* Biography / Slogan */}
              {isBioSelected && (merchant.bio || merchant.slogan || merchant.description) && (
                <p 
                  className="text-xs font-bold leading-relaxed mt-4 max-w-xs relative z-10 text-slate-500 dark:text-slate-400 whitespace-pre-wrap animate-in fade-in duration-300"
                  dangerouslySetInnerHTML={{ __html: merchant.bio || merchant.slogan || merchant.description || '' }}
                />
              )}

              {/* Physical Address */}
              <div className="flex items-center gap-2 font-medium text-xs mt-4 max-w-xs relative z-10 leading-relaxed text-slate-500 dark:text-slate-400">
                <MapPin size={16} className={mapIconClass} />
                <span className="text-left line-clamp-2">{merchant.address || 'Condado del Rey, Ciudad de Panamá'}</span>
              </div>
            </div>
          )}

          {/* ── LINKTREE DYNAMIC LINKS ── */}
          <div className="space-y-4">
            {merchant.custom_links && Array.isArray(merchant.custom_links) && merchant.custom_links.length > 0 ? (
              merchant.custom_links.map((link: any) => {
                const iconData = AVAILABLE_ICONS.find(i => i.id === link.icon);
                const ButtonIcon = iconData ? iconData.icon : Link2;
                return (
                  <a 
                    key={link.id}
                    href={link.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={preset
                      ? `w-full flex items-center justify-between p-3 rounded-xl border font-bold text-xs tracking-wide cursor-pointer transition-all ${preset.buttonClass}`
                      : "w-full p-5 rounded-2xl font-bold flex items-center justify-between transition-all shadow-md active:scale-98 group border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:border-brand-primary hover:scale-[1.01]"
                    }
                  >
                    {preset ? (
                      <>
                        <ButtonIcon size={14} className="shrink-0" />
                        <span className="flex-grow text-center px-2 truncate">{link.title}</span>
                        <div className="w-3.5 h-3.5 shrink-0" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-primary/10 text-brand-primary">
                            <ButtonIcon size={20} />
                          </div>
                          <span className="text-sm">{link.title}</span>
                        </div>
                        <ExternalLink size={16} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </a>
                );
              })
            ) : (
              <>
                {/* WhatsApp link */}
                {merchant.whatsapp_number && (
                  <a 
                    href={`https://wa.me/${merchant.whatsapp_number.replace(/\s+/g, '').replace('+', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={preset
                      ? `w-full flex items-center justify-between p-3 rounded-xl border font-bold text-xs tracking-wide cursor-pointer transition-all ${preset.buttonClass}`
                      : "w-full p-5 rounded-2xl font-bold flex items-center justify-between transition-all shadow-md active:scale-98 group border bg-[#128C7E] hover:bg-[#075e54] text-white hover:scale-[1.01]"
                    }
                  >
                    {preset ? (
                      <>
                        <MessageCircle size={14} className="shrink-0" />
                        <span className="flex-grow text-center px-2 truncate">Contactar por WhatsApp</span>
                        <div className="w-3.5 h-3.5 shrink-0" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
                            <MessageCircle size={20} />
                          </div>
                          <span className="text-sm">Contactar por WhatsApp</span>
                        </div>
                        <ExternalLink size={16} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </a>
                )}

                {/* Instagram link */}
                {merchant.instagram_handle && (
                  <a 
                    href={`https://instagram.com/${merchant.instagram_handle.replace('@', '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={preset
                      ? `w-full flex items-center justify-between p-3 rounded-xl border font-bold text-xs tracking-wide cursor-pointer transition-all ${preset.buttonClass}`
                      : "w-full p-5 rounded-2xl font-bold flex items-center justify-between transition-all shadow-md active:scale-98 group border bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white hover:scale-[1.01]"
                    }
                  >
                    {preset ? (
                      <>
                        <Instagram size={14} className="shrink-0" />
                        <span className="flex-grow text-center px-2 truncate">Síguenos en Instagram</span>
                        <div className="w-3.5 h-3.5 shrink-0" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
                            <Instagram size={20} />
                          </div>
                          <span className="text-sm">Síguenos en Instagram</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black opacity-80">@{merchant.instagram_handle.replace('@', '')}</span>
                          <ExternalLink size={16} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </>
                    )}
                  </a>
                )}

                {/* Official Website link */}
                {merchant.website_url && (
                  <a 
                    href={merchant.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={preset
                      ? `w-full flex items-center justify-between p-3 rounded-xl border font-bold text-xs tracking-wide cursor-pointer transition-all ${preset.buttonClass}`
                      : "w-full p-5 rounded-2xl font-bold flex items-center justify-between transition-all shadow-sm active:scale-98 group border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:border-brand-primary hover:scale-[1.01]"
                    }
                  >
                    {preset ? (
                      <>
                        <Globe size={14} className="shrink-0" />
                        <span className="flex-grow text-center px-2 truncate">Sitio Web Oficial</span>
                        <div className="w-3.5 h-3.5 shrink-0" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-primary/10 text-brand-primary">
                            <Globe size={20} />
                          </div>
                          <span className="text-sm">Sitio Web Oficial</span>
                        </div>
                        <ExternalLink size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </a>
                )}

                {/* Direct Phone Call */}
                {merchant.phone_number && (
                  <a 
                    href={`tel:${merchant.phone_number}`}
                    className={preset
                      ? `w-full flex items-center justify-between p-3 rounded-xl border font-bold text-xs tracking-wide cursor-pointer transition-all ${preset.buttonClass}`
                      : "w-full p-5 rounded-2xl font-bold flex items-center justify-between transition-all shadow-sm active:scale-98 group border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white hover:border-brand-secondary hover:scale-[1.01]"
                    }
                  >
                    {preset ? (
                      <>
                        <Phone size={14} className="shrink-0" />
                        <span className="flex-grow text-center px-2 truncate">Llamar Directamente</span>
                        <div className="w-3.5 h-3.5 shrink-0" />
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-secondary/10 text-brand-secondary">
                            <Phone size={20} />
                          </div>
                          <span className="text-sm">Llamar Directamente</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-400">{merchant.phone_number}</span>
                          <ExternalLink size={16} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </>
                    )}
                  </a>
                )}
              </>
            )}
          </div>

          {/* ── ACTIVE OFFERS / COUPONS SECTION ── */}
          {activeCoupons.length > 0 && (
            <div className="space-y-4 pt-4">
              <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 px-2 ${preset ? 'text-white/60' : 'text-slate-400'}`}>
                <Ticket size={14} className={`animate-pulse ${preset ? 'text-white' : 'text-brand-primary'}`} /> Ofertas Activas del Comercio
              </h4>

              <div className="space-y-4">
                {activeCoupons.map((coupon) => (
                  <div 
                    key={coupon.id} 
                    className={preset
                      ? "bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                    }
                  >
                    {/* Tiny punch hole styling like a real ticket */}
                    <div className={preset
                      ? "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 rounded-full border-r border-white/20 bg-transparent backdrop-blur-xl"
                      : "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-6 h-6 rounded-full bg-[#F8FAFC] dark:bg-[#030712] border-r border-slate-200 dark:border-slate-800"
                    } />
                    <div className={preset
                      ? "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-6 rounded-full border-l border-white/20 bg-transparent backdrop-blur-xl"
                      : "absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-6 h-6 rounded-full bg-[#F8FAFC] dark:bg-[#030712] border-l border-slate-200 dark:border-slate-800"
                    } />

                    <div className="pl-2 pr-2">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h5 className={`font-extrabold text-base leading-tight transition-colors ${preset ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-brand-primary'}`}>
                          {coupon.title}
                        </h5>
                        <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase flex-shrink-0 ${preset ? 'bg-white/20 text-white' : 'bg-brand-secondary/10 text-brand-secondary'}`}>
                          -{(100 - (Number(coupon.offer_price_cash) * 100 / Number(coupon.original_price))).toFixed(0)}% OFF
                        </span>
                      </div>

                      <p className={`text-xs font-medium leading-relaxed mb-4 ${preset ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                        {coupon.description}
                      </p>

                      <div className={`flex items-center justify-between border-t border-dashed pt-4 mt-2 ${preset ? 'border-white/20' : 'border-slate-200 dark:border-slate-800'}`}>
                        <div className="flex flex-col">
                          <span className={`text-[9px] font-bold line-through ${preset ? 'text-white/55' : 'text-slate-400'}`}>${coupon.original_price}</span>
                          <span className={`text-base font-black ${preset ? 'text-white' : 'text-slate-900 dark:text-white'}`}>${coupon.offer_price_cash}</span>
                        </div>
                        <div className="text-right">
                          <span className={`text-[9px] font-bold uppercase ${preset ? 'text-white/55' : 'text-slate-400'}`}>O canjea con</span>
                          <div className={`flex items-center gap-1 ${preset ? 'text-white' : 'text-brand-primary'}`}>
                            <span className="text-sm font-black">{coupon.offer_price_points.toLocaleString()}</span>
                            <span className="text-[9px] font-black">Puntos</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
