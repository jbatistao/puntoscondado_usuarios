'use client';

import React from 'react';
import { Send, Building, Phone, Mail, User } from 'lucide-react';

export default function ContactFormMalls() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario Malls enviado');
  };

  return (
    <section id="contacto-malls" className="py-24 bg-gray-50 dark:bg-slate-900 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-3">CONTACTO</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight">
            Digitaliza tu Centro Comercial hoy mismo.
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
            Nuestro equipo de consultores corporativos te diseñará una estrategia a la medida de tu mall.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-secondary/10 transition-all" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-4 uppercase tracking-wider">Nombre del Contacto</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    placeholder="Escriba su nombre completo"
                    className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-slate-950 transition-all outline-none text-lg font-medium shadow-sm active:scale-[0.99]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-4 uppercase tracking-wider">Correo Corporativo</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    placeholder="email@mall.com"
                    className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-slate-950 transition-all outline-none text-lg font-medium shadow-sm active:scale-[0.99]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-4 uppercase tracking-wider">Teléfono / WhatsApp</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors">
                    <Phone size={20} />
                  </span>
                  <input
                    type="tel"
                    placeholder="+507 0000-0000"
                    className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-slate-950 transition-all outline-none text-lg font-medium shadow-sm active:scale-[0.99]"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-4 uppercase tracking-wider">Nombre del Centro Comercial</label>
                <div className="relative group">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors">
                    <Building size={20} />
                  </span>
                  <input
                    type="text"
                    placeholder="Escriba el nombre del Mall"
                    className="w-full pl-14 pr-6 py-5 rounded-[1.5rem] bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-slate-950 transition-all outline-none text-lg font-medium shadow-sm active:scale-[0.99]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-4 uppercase tracking-wider">¿Qué objetivos busca alcanzar?</label>
              <textarea
                rows={4}
                placeholder="Aumento de tráfico, fidelización, data analítica, etc..."
                className="w-full px-8 py-6 rounded-[1.5rem] bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-brand-primary focus:bg-white dark:focus:bg-slate-950 transition-all outline-none text-lg font-medium shadow-sm resize-none"
                required
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-brand-primary hover:bg-brand-primary-hover text-white px-12 py-5 rounded-[2rem] font-extrabold text-xl transition-all shadow-xl hover:shadow-2xl active:scale-95 group focus:ring-4 ring-brand-primary/20"
              >
                Enviar Solicitud <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
