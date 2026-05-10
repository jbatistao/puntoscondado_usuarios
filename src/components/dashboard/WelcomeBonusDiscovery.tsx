'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Gift, ChevronRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface Merchant {
  id: string;
  name: string;
  logo: string | null;
  welcome_bonus_points: number;
}

export default function WelcomeBonusDiscovery({ onBonusClaimed }: { onBonusClaimed: () => void }) {
  const { data: session } = useSession();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [selectionCount, setSelectionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const fetchBonuses = async () => {
    if (!session?.user) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/welcome-bonus/`, {
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setMerchants(data.merchants);
        setSelectionCount(data.selection_count);
      }
    } catch (error) {
      console.error('Error fetching welcome bonuses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBonuses();
  }, [session]);

  const handleClaim = async (merchantId: string) => {
    if (claimingId || selectionCount >= 3) return;
    setClaimingId(merchantId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/welcome-bonus/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(session?.user as any)?.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ merchant_id: merchantId })
      });
      
      if (response.ok) {
        // Refresh local list and call parent refresh
        await fetchBonuses();
        onBonusClaimed();
      } else {
        const data = await response.json();
        alert(data.error || 'Error al reclamar el bono');
      }
    } catch (error) {
      console.error('Error claiming bonus:', error);
    } finally {
      setClaimingId(null);
    }
  };

  if (loading) return null;
  
  // Requirement: Immediately after selecting 3 bonuses, it should no longer be shown in the dashboard.
  if (selectionCount >= 3) return null;
  
  if (merchants.length === 0) return null;

  return (
    <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Gift className="text-violet-500" size={24} />
            Regalos de Bienvenida
          </h2>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            Elige hasta 3 paquetes de puntos para iniciar tu ahorro
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link 
            href="/dashboard/obsequios" 
            className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 transition-colors"
          >
            Ver todos <ChevronRight size={14} />
          </Link>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  i <= selectionCount 
                    ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]' 
                    : 'bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {merchants.slice(0, 3).map((merchant) => (
          <div 
            key={merchant.id}
            className="bg-white dark:bg-[#111827] rounded-[2rem] p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col group hover:shadow-xl hover:border-violet-500/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-colors" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                {merchant.logo ? (
                  <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-cover" />
                ) : (
                  <Sparkles size={24} className="text-violet-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-slate-900 dark:text-white text-sm truncate">{merchant.name}</h3>
                <p className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">Bono Activo</p>
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Recibirás</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                    {merchant.welcome_bonus_points}
                  </span>
                  <span className="text-xs font-bold text-slate-500">PTS</span>
                </div>
              </div>
              
              <button
                onClick={() => handleClaim(merchant.id)}
                disabled={claimingId !== null || selectionCount >= 3}
                className={`relative px-6 py-3 rounded-xl font-black text-xs transition-all overflow-hidden ${
                  selectionCount >= 3 
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:scale-105 active:scale-95'
                }`}
              >
                {claimingId === merchant.id ? (
                  <Loader2 className="animate-spin mx-auto" size={16} />
                ) : (
                  <span className="flex items-center gap-2">
                    Lo quiero <ChevronRight size={14} />
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
