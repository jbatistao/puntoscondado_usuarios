'use client';

import React, { useEffect, useState } from 'react';
import { Ticket, ArrowRight, Loader2, Tag, Percent, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface Coupon {
  id: string;
  title: string;
  description: string;
  original_price: string;
  offer_price_cash: string;
  offer_price_points: number;
  merchant_name: string;
  merchant_id: string;
  merchant_logo?: string;
}

export default function FeaturedCoupons() {
  const { data: session } = useSession();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchCoupons = async () => {
      if (!session?.user) {
        if (!session) setLoading(false); 
        return;
      }
      
      try {
        const resp = await fetch(`${backendUrl}/api/rewards/coupons/`, {
          headers: {
            'Authorization': `Bearer ${(session.user as any).accessToken}`
          }
        });
        if (resp.ok) {
          const data = await resp.json();
          setCoupons(data);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [backendUrl, session]);

  if (loading) {
    return (
      <div className="mb-10 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg mb-6" />
        <div className="flex gap-6 overflow-hidden -mx-4 px-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[280px] h-64 bg-white dark:bg-[#111827] rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  // Fallback mock data for visual verification if empty
  const displayCoupons = coupons.length > 0 ? coupons : [
    {
      id: 'mock-1',
      title: '2x1 en Bebidas Especiales',
      original_price: '12.00',
      offer_price_cash: '6.00',
      offer_price_points: 1200,
      merchant_name: 'Café Tipy',
      merchant_id: '1',
      merchant_logo: null
    },
    {
      id: 'mock-2',
      title: '15% Descuento en Menú Ejecutivo',
      original_price: '15.00',
      offer_price_cash: '12.75',
      offer_price_points: 1500,
      merchant_name: 'Lindura Saloom',
      merchant_id: '2',
      merchant_logo: null
    }
  ];

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
            <Zap size={24} className="text-brand-secondary fill-brand-secondary" />
            Ofertas Relámpago
          </h2>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Canjea tus puntos por descuentos exclusivos.</p>
        </div>
        <Link href="/directorio" className="text-xs font-black text-brand-primary uppercase tracking-widest hover:text-brand-primary-light transition-colors flex items-center gap-1 group">
          Ver todas
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 snap-x">
        {displayCoupons.map((coupon) => {
          const discount = Math.round((1 - parseFloat(coupon.offer_price_cash) / parseFloat(coupon.original_price)) * 100);
          
          return (
            <div 
              key={coupon.id} 
              className="snap-start min-w-[280px] sm:min-w-[320px] bg-white dark:bg-[#111827] rounded-[2rem] p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Decorative background element */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden relative">
                    {coupon.merchant_logo ? (
                      <Image src={coupon.merchant_logo} alt={coupon.merchant_name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Tag size={16} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{coupon.merchant_name}</p>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">{coupon.title}</h3>
                  </div>
                </div>
                {discount > 0 && (
                  <div className="bg-emerald-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg shadow-emerald-500/20">
                    -{discount}%
                  </div>
                )}
              </div>

              <div className="relative h-28 w-full bg-slate-50 dark:bg-slate-900 rounded-2xl mb-4 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent" />
                <Percent size={40} className="text-brand-primary/10" />
                <div className="absolute bottom-3 left-3 flex gap-1">
                   <span className="text-[9px] font-black bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white px-2 py-1 rounded-md border border-slate-100 dark:border-slate-700">Limitado</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter line-through">${coupon.original_price}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900 dark:text-white">${coupon.offer_price_cash}</span>
                    <span className="text-[10px] font-bold text-slate-500">O</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-brand-primary text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-brand-primary/20 hover:scale-105 transition-transform">
                    <Ticket size={14} />
                    <span className="text-sm font-black tracking-tight">{coupon.offer_price_points.toLocaleString()}</span>
                    <span className="text-[8px] font-black uppercase opacity-80">PTS</span>
                  </div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Canje Instantáneo</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
