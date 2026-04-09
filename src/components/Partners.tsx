'use client';

import React, { useEffect, useState } from 'react';
import { Coffee, Dumbbell, Pizza, Scissors, ShoppingBag, Utensils, Store, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';


interface Merchant {
  id: string;
  name: string;
  category: string;
  logo: string | null;
}

export default function Partners() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000'}/api/rewards/merchants/public_list/`);
        if (response.ok) {
          const data = await response.json();
          setMerchants(data);
        }
      } catch (error) {
        console.error('Error fetching public merchants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Cafetería': return Coffee;
      case 'Restaurante': return Utensils;
      case 'Pizza': return Pizza; // If someone uses this
      case 'Gimnasio': return Dumbbell;
      case 'Salud y Belleza': return Scissors;
      case 'Supermercado': return ShoppingBag;
      case 'Comercio': return Store;
      default: return Store;
    }
  };

  if (loading) {
    return (
      <div className="py-24 bg-white dark:bg-[#030712] flex justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={32} />
      </div>
    );
  }

  // Fallback if no merchants registered yet
  const displayMerchants = merchants.length > 0 ? merchants : [
    { id: '1', name: "Café Condado", category: "Cafetería", logo: null },
    { id: '2', name: "Fit Zone", category: "Gimnasio", logo: null },
    { id: '3', name: "Pizza Roma", category: "Pizza", logo: null },
  ];

  return (
    <section id="comercios" className="py-24 bg-white dark:bg-[#030712] border-t border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Comercios Afiliados</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            Nuestros socios comerciales
          </h3>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed drop-shadow-sm">
            Marcas locales que ya confían en nosotros y forman parte del ecosistema en Condado Del Rey.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 md:gap-x-20">
          {displayMerchants.map((merchant) => {
            const Icon = getIcon(merchant.category);
            return (
              <Link 
                key={merchant.id} 
                href="/directorio"
                className="group flex flex-col items-center gap-4 opacity-80 hover:opacity-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-gray-800/50 group-hover:bg-brand-primary/10 flex items-center justify-center transition-colors shadow-sm overflow-hidden relative">
                  {merchant.logo ? (
                    <Image 
                      src={merchant.logo} 
                      alt={merchant.name} 
                      fill 
                      className="object-cover"
                    />
                  ) : (
                    <Icon className="text-gray-700 dark:text-gray-300 group-hover:text-brand-primary transition-colors" size={36} strokeWidth={1.5} />
                  )}
                </div>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300 group-hover:text-brand-primary tracking-tight transition-colors">
                  {merchant.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
