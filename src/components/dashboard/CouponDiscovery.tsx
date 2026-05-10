'use client';

import React, { useEffect, useState } from 'react';
import { Ticket, ArrowRight, Loader2, Tag } from 'lucide-react';
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

export default function CouponDiscovery() {
  const { data: session } = useSession();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const resp = await fetch(`${backendUrl}/api/rewards/coupons/`);
        if (resp.ok) {
          const data = await resp.json();
          // For discovery, let's just show the first few
          setCoupons(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center py-12">
        <Loader2 className="animate-spin text-brand-primary mb-4" size={32} />
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Buscando ofertas...</p>
      </div>
    );
  }

  if (coupons.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#111827] rounded-[2.5rem] p-8 shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Tag size={22} className="text-brand-secondary" />
          Ofertas y Cupones
        </h2>
        <Link href="/directorio" className="text-sm font-bold text-brand-primary hover:text-brand-primary-light transition-colors">Explorar todo</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="group flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 hover:border-brand-primary/30 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 overflow-hidden relative">
                    {coupon.merchant_logo ? (
                        <Image src={coupon.merchant_logo} alt={coupon.merchant_name} fill className="object-cover" />
                    ) : (
                        <Ticket size={16} className="text-slate-300" />
                    )}
                 </div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight truncate max-w-[100px]">{coupon.merchant_name}</span>
              </div>
              <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-lg uppercase">
                 ¡Ahorra!
              </span>
            </div>

            <h3 className="font-black text-slate-900 dark:text-white text-sm leading-tight mb-2 line-clamp-1 group-hover:text-brand-primary transition-colors">
              {coupon.title}
            </h3>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 line-through">${coupon.original_price}</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">${coupon.offer_price_cash}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-primary/10 text-brand-primary px-3 py-1.5 rounded-xl">
                 <Ticket size={12} />
                 <span className="text-xs font-black">{coupon.offer_price_points.toLocaleString()}</span>
                 <span className="text-[8px] font-black uppercase">pts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-4 rounded-2xl bg-brand-primary/5 text-brand-primary font-bold text-sm hover:bg-brand-primary hover:text-white transition-all flex items-center justify-center gap-2 group">
        Ver más promociones
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
