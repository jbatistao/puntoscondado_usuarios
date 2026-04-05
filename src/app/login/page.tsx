'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, User, ArrowLeft, ArrowRight, Eye, EyeOff, Smartphone, AlertCircle, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');
  
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    phone: '',
  });

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (isLogin) {
      try {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          setError('Credenciales inválidas. Por favor intente de nuevo.');
        } else {
          router.push('/dashboard');
        }
      } catch {
        setError('Ocurrió un error inesperado. Intente más tarde.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Mock registration
      console.log('Registering:', formData);
      setIsLoading(false);
      setIsLogin(true);
      setError(null);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Back Link */}
      <div className="mb-6 flex justify-start">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary group-hover:border-transparent transition-all">
            <ArrowLeft size={16} />
          </div>
          <span className="font-medium text-sm">Volver al inicio</span>
        </Link>
      </div>

      {/* Auth card */}
      <div className="bg-[#111827]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="p-8 md:p-12">
          
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-primary/10 rounded-[1.5rem] border border-brand-primary/20 mb-6 group cursor-pointer hover:scale-105 transition-transform duration-300">
              <Image 
                src="/images/logo_icon_mono.png" 
                alt="Logo" 
                width={48} 
                height={48} 
                className="rounded-lg shadow-inner drop-shadow-md"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              {isLogin ? '¡Bienvenido de vuelta!' : 'Crea tu cuenta'}
            </h1>
            <p className="text-slate-400 font-medium">
              {isLogin 
                ? 'Ingresa para gestionar tus puntos y beneficios' 
                : 'Únete hoy y empieza a ganar en Condado del Rey'}
            </p>
          </div>

          {/* Contextual Intent Message (Only for registration) */}
          {!isLogin && intent && (
            <div className="mb-6 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-start gap-3 text-brand-primary-light animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold leading-tight">
                  {intent === 'comercio' ? 'Registro de Comercio' : 
                    intent === 'comunidad' ? 'Registro de PH / Edificio' : 
                    'Registro de Mall'}
                </p>
                <p className="text-xs opacity-80 font-medium">
                  {intent === 'comercio' ? 'Regístrate como usuario para afiliar tu negocio.' : 
                    intent === 'comunidad' ? 'Crea tu perfil personal para registrar tu comunidad.' : 
                    'Regístrate primero para gestionar tu centro comercial.'}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="text-sm font-bold leading-tight">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="nombre" className="text-sm font-bold text-slate-300 ml-1">Nombre Completo</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={20} />
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Tu nombre aquí"
                    value={formData.nombre}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all font-medium text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-300 ml-1">Correo Electrónico</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all font-medium text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-slate-300 ml-1">Número de WhatsApp (Opcional)</label>
                <div className="relative group">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="6000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all font-medium text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-sm font-bold text-slate-300">Contraseña</label>
                {isLogin && (
                  <Link href="#" className="text-xs font-bold text-brand-primary hover:text-brand-primary-light transition-colors">
                    ¿Olvidaste tu contraseña?
                  </Link>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-primary transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all font-medium text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="flex items-start gap-3 px-1 pt-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  required 
                  className="mt-1 w-4 h-4 rounded bg-white/5 border-white/20 text-brand-primary focus:ring-offset-0 focus:ring-brand-primary"
                />
                <label htmlFor="terms" className="text-xs text-slate-400 font-medium leading-relaxed">
                  Acepto los <Link href="#" className="text-brand-primary font-bold hover:underline">Términos y Condiciones</Link> y la <Link href="#" className="text-brand-primary font-bold hover:underline">Política de Privacidad</Link>.
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Procesando...
                </>
              ) : (
                <>
                  {isLogin ? 'Ingresar Ahora' : 'Crear Mi Cuenta'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Auth (Optional but looks premium) */}
          <div className="mt-8 mb-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#111827] px-4 text-slate-500 font-bold tracking-widest">O continúa con</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
              type="button" 
              onClick={() => signIn('google')}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-200 py-4 rounded-2xl text-slate-900 font-bold transition-all shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-base">Continuar con Google</span>
            </button>
          </div>

          {/* Toggle */}
          <div className="mt-10 text-center">
            <p className="text-slate-400 font-medium">
              {isLogin ? '¿Aún no tienes cuenta?' : '¿Ya eres miembro?'} {' '}
              <button 
                type="button"
                onClick={toggleMode}
                className="text-brand-primary font-extrabold hover:text-brand-primary-light transition-colors"
              >
                {isLogin ? 'Regístrate aquí' : 'Ingresa aquí'}
              </button>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col justify-center items-center p-4">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-brand-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative floating icon at top-right (mobile friendly) */}
      <div className="absolute top-10 right-10 opacity-20 hidden sm:block">
        <Image src="/images/logo_icon_mono.png" alt="" width={120} height={120} className="filter blur-[1px]" />
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-brand-primary" size={48} />
          <p className="text-slate-400 font-medium">Cargando acceso...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>

      {/* Footer text */}
      <p className="mt-8 text-center text-slate-500 text-sm font-medium">
        © {new Date().getFullYear()} Puntos Condado. Todos los derechos reservados.
      </p>
    </div>
  );
}
