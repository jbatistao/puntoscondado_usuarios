'use client';

import React from 'react';
import { Send, User, Mail, Phone, Store, MessageSquare } from 'lucide-react';

export default function ContactFormComercios() {
  const [formData, setFormData] = React.useState({
    nombre: '',
    correo: '',
    whatsapp: '',
    comercio: '',
    consulta: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for form submission would go here (e.g., Web3Forms, API, etc.)
    console.log('Form data submitted:', formData);
    alert('¡Gracias! Tu consulta ha sido enviada. Nos pondremos en contacto pronto.');
    setFormData({ nombre: '', correo: '', whatsapp: '', comercio: '', consulta: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contacto-comercios" className="py-24 bg-white dark:bg-[#030712] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Contacto Directo</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-slate-950 mb-6 leading-tight tracking-tight">
              ¿Listo para hacer crecer tu comercio?
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-10">
              Déjanos tus datos y un asesor comercial se pondrá en contacto contigo para explicarte cómo Puntos Condado puede transformar tu negocio. Sin compromiso.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                  <Store size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">Soporte Local</h4>
                  <p className="text-gray-600 dark:text-gray-400">Atención personalizada en Condado Del Rey.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">Respuesta Rápida</h4>
                  <p className="text-gray-600 dark:text-gray-400">Contestamos vía WhatsApp en menos de 24 horas.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Nombre</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      placeholder="Tu nombre completo"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="correo" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Correo electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      required
                      placeholder="ejemplo@correo.com"
                      value={formData.correo}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      placeholder="6000-0000"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="comercio" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Nombre del Comercio</label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      id="comercio"
                      name="comercio"
                      required
                      placeholder="Nombre de tu negocio"
                      value={formData.comercio}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="consulta" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Consulta o Mensaje</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                  <textarea
                    id="consulta"
                    name="consulta"
                    rows={4}
                    required
                    placeholder="Cuéntanos un poco sobre tu negocio o haznos una pregunta..."
                    value={formData.consulta}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all dark:text-white resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar consulta
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
