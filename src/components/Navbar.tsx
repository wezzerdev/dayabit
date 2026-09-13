import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Store } from 'lucide-react';

interface NavbarProps {
  onOpenOnboarding?: () => void;
  onOpenDashboard?: () => void;
}

export default function Navbar({ onOpenOnboarding, onOpenDashboard }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 py-3.5' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-1.5 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="relative w-9 h-9 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="#00b37e" opacity="0.12" />
              <rect x="7" y="6" width="4" height="20" rx="2" fill="url(#nav-p-left)" />
              <path d="M9 6H19C24.52 6 29 10.48 29 16C29 21.52 24.52 26 19 26H9" stroke="url(#nav-p-loop)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17" cy="12" r="2.5" fill="#00b37e" />
              <circle cx="21" cy="16" r="2.5" fill="#00b37e" />
              <circle cx="17" cy="20" r="2.5" fill="#00b37e" />
              <defs>
                <linearGradient id="nav-p-left" x1="7" y1="6" x2="11" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0f172a" />
                  <stop offset="1" stopColor="#00b37e" />
                </linearGradient>
                <linearGradient id="nav-p-loop" x1="9" y1="6" x2="29" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00b37e" />
                  <stop offset="0.5" stopColor="#00c288" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-display font-black text-2xl tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center select-none">
            dayabit
            <span className="ml-2 text-[10px] font-bold tracking-wider text-emerald-800 uppercase px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80">
              SaaS
            </span>
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7">
          <button onClick={() => scrollToSection('features')} className="text-slate-600 hover:text-emerald-600 font-medium text-sm transition-colors cursor-pointer">
            Servicios
          </button>
          <button onClick={() => scrollToSection('process')} className="text-slate-600 hover:text-emerald-600 font-medium text-sm transition-colors cursor-pointer">
            Cómo Funciona
          </button>
          <button onClick={() => scrollToSection('demo')} className="text-slate-600 hover:text-emerald-600 font-medium text-sm transition-colors cursor-pointer flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Demo En Vivo
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-slate-600 hover:text-emerald-600 font-medium text-sm transition-colors cursor-pointer">
            Precios
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-slate-600 hover:text-emerald-600 font-medium text-sm transition-colors cursor-pointer">
            Contacto
          </button>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="px-3.5 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            Mi Tienda (Dashboard)
          </button>

          <button 
            onClick={onOpenOnboarding}
            className="px-5 py-2.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-xs shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 group"
          >
            Crear mi Tienda
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Quick Action & Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenDashboard}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Mi Tienda (Dashboard)"
          >
            <Store className="w-5 h-5 text-[#00b37e]" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-slate-200 py-6 px-6 flex flex-col gap-4 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenDashboard?.();
            }} 
            className="text-left text-slate-900 font-bold text-base py-1.5 transition-colors flex items-center justify-between"
          >
            <span>Mi Tienda (Dashboard)</span>
            <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full">Acceso</span>
          </button>
          <button onClick={() => scrollToSection('features')} className="text-left text-slate-700 hover:text-emerald-600 font-medium text-base py-1.5 transition-colors">
            Servicios
          </button>
          <button onClick={() => scrollToSection('process')} className="text-left text-slate-700 hover:text-emerald-600 font-medium text-base py-1.5 transition-colors">
            Cómo Funciona
          </button>
          <button onClick={() => scrollToSection('demo')} className="text-left text-slate-700 hover:text-emerald-600 font-medium text-base py-1.5 transition-colors flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Demo En Vivo
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-left text-slate-700 hover:text-emerald-600 font-medium text-base py-1.5 transition-colors">
            Precios
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-left text-slate-700 hover:text-emerald-600 font-medium text-base py-1.5 transition-colors">
            Contacto & Ubicación
          </button>
          
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenOnboarding?.();
            }}
            className="w-full text-center py-3 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold shadow-md transition-all duration-200 mt-2"
          >
            Crear mi Tienda Ahora
          </button>
        </div>
      )}
    </nav>
  );
}
