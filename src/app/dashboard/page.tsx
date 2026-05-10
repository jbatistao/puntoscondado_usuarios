'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Home, 
  History, 
  Gift, 
  User, 
  LogOut, 
  Bell, 
  QrCode, 
  ChevronRight, 
  Star, 
  CreditCard,
  Search,
  Store,
  Wallet,
  Loader2,
  Menu as MenuIcon,
  X as XIcon,
  Building2,
  LayoutGrid,
  Plus,
  Minus,
  Users,
  TrendingUp,
  MapPin,
  CircleDollarSign,
  Info,
  Ticket,
  ArrowRight
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import PointRegistrationModal from '@/components/comercios/PointRegistrationModal';
import WelcomeBonusDiscovery from '@/components/dashboard/WelcomeBonusDiscovery';
import AcceleratedPointsList from '@/components/dashboard/AcceleratedPointsList';
import FeaturedCoupons from '@/components/dashboard/FeaturedCoupons';

export default function UserDashboard() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isPointModalOpen, setIsPointModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  
  const userType = userData?.user_type || (session?.user as any)?.user_type;
  const qrCodeImage = userData?.qr_code_image || (session?.user as any)?.qr_code_image;
  const points = userData?.total_points ?? 0;
  const savings = userData?.estimated_savings ?? 0;
  const tier = userData?.tier || 'BRONCE';
  const ownedMerchants = userData?.merchants || [];
  
  const isConsumer = userType === 'CONSUMER' || !userType;
  const isMerchant = userType === 'MERCHANT';

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Invalidate on Backend
      const refreshToken = (session?.user as any)?.refreshToken;
      if (refreshToken) {
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/auth/logout/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
          },
          body: JSON.stringify({ refresh: refreshToken })
        });
      }
    } catch (error) {
      console.error("Backend logout failed:", error);
    } finally {
      // 2. Sign out from NextAuth
      signOut({ callbackUrl: '/' });
    }
  };

  const fetchProfile = async () => {
    if (!session?.user) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/auth/user/`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchHistory = async () => {
    if (!session?.user) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}/api/rewards/history/?limit=5`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleRefresh = () => {
    fetchProfile();
    fetchHistory();
  };

  React.useEffect(() => {
    fetchProfile();
    fetchHistory();
  }, [session]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (days === 1) return 'Ayer, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' });
  };

  const partners = [
    { id: 1, name: "Artisan Coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop", promo: "2x1 en capuchinos" },
    { id: 2, name: "Fitness Zone", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop", promo: "100 pts por visita" },
    { id: 3, name: "Pet Shop Condado", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop", promo: "15% dto. en juguetes" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#030712] flex flex-col text-slate-800 dark:text-slate-100">
      <Navbar />
      
      {/* (1) Top Nav - Full Width */}
      <div className="flex-grow flex flex-col h-full bg-[#f8fafc] dark:bg-[#030712] pt-16">
        
        {/* (2) Main Content - Centered */}
        <main className="flex-grow p-4 sm:p-8 lg:py-12 mx-auto w-full max-w-7xl mb-20 lg:mb-0">
          
          {/* Expiration Alert */}
          {userData?.loyalty_info?.points_expiring_soon > 0 && (
            <div className="mb-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 text-amber-600 dark:text-amber-400">
                <Bell size={20} className="animate-bounce" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100">
                  ¡Atención! Tienes <span className="text-amber-600 dark:text-amber-400">{userData.loyalty_info.points_expiring_soon.toLocaleString()} puntos</span> por vencer
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400/80 font-medium">
                  Úsalos en los próximos 30 días antes de que expiren.
                </p>
              </div>
              <Link href="/directorio" className="text-xs font-bold text-amber-900 dark:text-amber-100 bg-amber-200 dark:bg-amber-800 px-4 py-2 rounded-xl hover:bg-amber-300 dark:hover:bg-amber-700 transition-colors">
                Canjear ahora
              </Link>
            </div>
          )}
          
          {/* Top Priority Section: QR, Points, Level */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            
            <div 
              onClick={() => setIsQrModalOpen(true)}
              className="bg-white dark:bg-[#111827] rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
               <div className="bg-white p-2 rounded-3xl mb-4 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform duration-500 relative w-[130px] h-[130px] flex items-center justify-center">
                  {qrCodeImage ? (
                    <Image 
                      src={qrCodeImage} 
                      alt="Mi Código QR" 
                      width={120} 
                      height={120} 
                      className="rounded-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <QrCode size={60} strokeWidth={1} />
                      <span className="text-[8px] mt-1 font-bold">Generando...</span>
                    </div>
                  )}
               </div>
               <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  Mi Código QR
                  <ChevronRight size={14} className="text-brand-primary" />
               </h3>
               <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">Toca para ampliar y mostrar en caja</p>
            </div>

            {/* 2. Points Balance Card */}
            <div className="md:col-span-1 bg-gradient-to-br from-brand-primary to-[#5b61ff] rounded-[2rem] p-8 shadow-xl shadow-brand-primary/20 flex flex-col justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <p className="text-white/70 font-bold uppercase tracking-widest text-[10px] mb-2">Saldo de Puntos</p>
               <div className="flex items-end gap-2 mb-6">
                  <span className="text-5xl font-black text-white tracking-tight">
                    {points.toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-lg mb-1 backdrop-blur-md">PTS</span>
               </div>
               <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <div className="flex flex-col">
                     <span className="text-white/60 text-[9px] uppercase font-bold tracking-tighter">Ahorro estimado</span>
                     <span className="font-extrabold text-white text-sm">
                        ${savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                     </span>
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <div className="flex flex-col">
                     <span className="text-white/60 text-[9px] uppercase font-bold tracking-tighter">Por vencer</span>
                     <span className="font-extrabold text-brand-secondary-light text-sm">
                        {(userData?.loyalty_info?.points_expiring_soon || 0).toLocaleString()} pts
                     </span>
                  </div>
               </div>
            </div>

            {/* 3. Loyalty Level Card */}
            <div className="bg-white dark:bg-[#111827] rounded-[2rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-center relative overflow-hidden">
               <div className="flex justify-between items-start mb-4">
                  <div>
                     <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">Nivel Actual</p>
                     <h3 className="text-2xl font-black text-brand-gold tracking-tight">
                        {(() => {
                           const label = userData?.loyalty_info?.tier_label || tier || '';
                           return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
                        })()}
                     </h3>
                  </div>
                  <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center border border-brand-gold/20">
                     <Star className="text-brand-gold fill-brand-gold" size={24} />
                  </div>
               </div>
               
               {userData?.loyalty_info?.next_tier_name ? (
                 <>
                   <p className="text-slate-600 dark:text-slate-400 font-bold text-xs mb-4">
                      Faltan <span className="text-slate-900 dark:text-white">
                        {Math.ceil(userData.loyalty_info.points_to_next_tier)} pts
                      </span> para {userData.loyalty_info.next_tier_name}
                   </p>
                   <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
                      <div 
                        className="bg-brand-accent h-full rounded-full shadow-[0_0_10px_rgba(255,152,3,0.4)] transition-all duration-1000" 
                        style={{ width: `${userData.loyalty_info.progress_percentage}%` }}
                      />
                   </div>
                 </>
               ) : (
                 <p className="text-slate-600 dark:text-slate-400 font-bold text-xs mb-4">
                    ¡Has alcanzado el nivel máximo!
                 </p>
               )}
               
               <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                  <span>Inicia</span>
                  <span>Meta</span>
               </div>
            </div>

          </div>

          {/* Welcome Bonus Section (Only for Consumers) */}
          {isConsumer && (
            <WelcomeBonusDiscovery onBonusClaimed={handleRefresh} />
          )}

          {isConsumer && (
            <FeaturedCoupons />
          )}

          {isMerchant && (
            <div className="mb-10 bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                        <Ticket size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Gestión de Cupones</h2>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Atrae más clientes con ofertas exclusivas.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="bg-slate-50 dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Cupones Activos</span>
                        <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                            {userData?.coupon_stats?.active_count || '...'}
                        </span>
                    </div>
                    <Link 
                        href="/dashboard/comercios"
                        className="bg-brand-primary text-white px-6 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] transition-all flex items-center gap-2"
                    >
                        Gestionar <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Activity */}
            <div className="space-y-8">
              {/* Transactions Section */}
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <History size={22} className="text-brand-primary" />
                    Actividad Reciente
                  </h2>
                  <Link href="#" className="text-sm font-bold text-brand-primary hover:text-brand-primary-light transition-colors">Ver todo</Link>
                </div>
                <div className="space-y-6">
                  {isLoadingHistory ? (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                      <Loader2 className="animate-spin mb-2" size={32} />
                      <p className="text-sm font-medium">Cargando actividad...</p>
                    </div>
                  ) : transactions.length > 0 ? (
                    transactions.slice(0, 5).map((tx) => {
                      const isEarn = tx.type === 'EARN';
                      const isWelcome = tx.type === 'WELCOME_BONUS';
                      const isRedeem = tx.type === 'REDEEM';
                      
                      return (
                        <div key={tx.id} className="flex items-center justify-between group hover:opacity-80 cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              isEarn ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' : 
                              isWelcome ? 'bg-violet-100 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400' :
                              'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                            }`}>
                              {isEarn && <Plus size={20} />}
                              {isRedeem && <Minus size={20} />}
                              {isWelcome && <Gift size={20} />}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white text-sm">
                                {isMerchant ? `Cliente: ${tx.user_email}` : tx.merchant_name}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                                {formatDate(tx.timestamp)} • {
                                  isEarn ? 'Acumulación' : 
                                  isWelcome ? 'Bono Bienvenida' : 
                                  'Canje'
                                }
                              </p>
                            </div>
                          </div>
                          <div className={`font-black text-lg ${
                            isEarn ? 'text-emerald-500' : 
                            isWelcome ? 'text-violet-500' : 
                            'text-red-500'
                          }`}>
                            {isEarn && `+${tx.points_earned}`}
                            {isWelcome && `+${tx.points_earned}`}
                            {isRedeem && `-${tx.points_redeemed}`}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-slate-400 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                      <History size={40} strokeWidth={1} className="mb-3 opacity-20" />
                      <p className="text-sm font-bold">No hay actividad reciente</p>
                      <p className="text-[10px] font-medium mt-1">Tus transacciones aparecerán aquí</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Discover */}
            <div className="space-y-8">
              {/* ACCELERATED POINTS SECTION */}
              {isConsumer && (
                <AcceleratedPointsList />
              )}

              {/* DESCUBRIR COMERCIOS */}
              <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 mb-8 font-bold text-xl text-slate-900 dark:text-white uppercase tracking-tight">
                  <Store size={22} className="text-brand-secondary" />
                  Descubrir
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {partners.map((partner) => (
                    <div key={partner.id} className="relative group rounded-3xl overflow-hidden h-32 cursor-pointer">
                      <img src={partner.image} alt={partner.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent group-hover:via-slate-900/60 transition-all duration-500" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <p className="text-white font-black text-lg leading-tight mb-1">{partner.name}</p>
                        <p className="text-brand-gold font-bold text-[10px] uppercase tracking-wider">{partner.promo}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-4 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold text-sm hover:bg-brand-primary hover:text-white transition-all">Ver mapa de comercios</button>
              </div>
            </div>

          </div>
          
        </main>
      </div>

      {/* --- QR Modal --- */}
      {isQrModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
            <div 
              className="absolute inset-0" 
              onClick={() => setIsQrModalOpen(false)} 
            />
            <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full relative z-10 shadow-2xl flex flex-col items-center text-center transform animate-in zoom-in-95 duration-300">
              <button 
                onClick={() => setIsQrModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
              >
                <XIcon size={24} />
              </button>
              
              <div className="w-20 h-20 bg-brand-primary/10 rounded-3xl flex items-center justify-center mb-6">
                <Image src="/images/logo_icon_mono.png" alt="Logo" width={48} height={48} />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 mb-2">Mi Código QR</h2>
              <p className="text-slate-500 text-sm font-medium mb-8">Presenta este código en el comercio para acumular o canjear tus puntos.</p>
              
              <div className="bg-white p-4 rounded-[2rem] shadow-inner border border-slate-100 mb-8 w-full aspect-square flex items-center justify-center">
                {qrCodeImage ? (
                  <Image 
                    src={qrCodeImage} 
                    alt="Código QR de Usuario" 
                    width={280} 
                    height={280}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                     <Loader2 className="animate-spin text-brand-primary" size={40} />
                     <span className="font-bold">Generando código...</span>
                  </div>
                )}
              </div>
              
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">ID de Usuario</p>
              <p className="font-mono text-xs bg-slate-50 px-4 py-2 rounded-full border border-slate-100 text-slate-600">
                {session?.user?.email}
              </p>
            </div>
          </div>
        )}

      <PointRegistrationModal
        isOpen={isPointModalOpen}
        onClose={() => setIsPointModalOpen(false)}
        merchant={selectedMerchant}
        onSuccess={handleRefresh}
      />
    </div>
  );
}
