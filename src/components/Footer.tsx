import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Link as LinkIcon } from 'lucide-react';

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
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
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 20, className = "" }) => (
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
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center transition-transform group-hover:scale-110">
              <Image 
                src="/images/logo_icon_mono.png" 
                alt="Logo Puntos Condado" 
                width={32} 
                height={32} 
                className=""
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">Puntos Condado</span>
          </Link>
            <p className="text-gray-400 leading-relaxed">
              El programa de lealtad multicomercios que premia tus compras diarias en Condado Del Rey, Panamá.
            </p>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-200">Plataforma</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/login" className="hover:text-brand-primary transition-colors">Ingresa Gratis</a></li>
              <li><a href="#como-funciona" className="hover:text-brand-primary transition-colors">Cómo Funciona</a></li>
              <li><a href="#beneficios" className="hover:text-brand-primary transition-colors">Beneficios</a></li>
              <li><a href="#comercios" className="hover:text-brand-primary transition-colors">Ver Comercios</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-200">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-brand-primary transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Ayuda / Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gray-200">Contacto</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-primary flex-shrink-0 mt-1" />
                <span>Condado Del Rey, Ciudad de Panamá</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-brand-primary flex-shrink-0" />
                <a href="mailto:hola@puntoscondado.com" className="hover:text-white transition-colors">hola@puntoscondado.com</a>
              </li>
            </ul>
            <div className="flex space-x-5 mt-6 border-t border-gray-800 pt-6">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                <WhatsAppIcon size={24} className="text-brand-primary" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <InstagramIcon size={24} className="text-brand-primary" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <FacebookIcon size={24} className="text-brand-primary" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Puntos Condado. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para la comunidad de Condado del Rey.</p>
        </div>
      </div>
    </footer>
  );
}
