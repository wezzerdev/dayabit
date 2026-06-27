import { useState, useEffect } from 'react';
import { Menu, X, Rocket } from 'lucide-react';

export default function Navbar() {
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
      const offset = 80; // height of navbar
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
      isScrolled ? 'glass-nav py-4 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-0.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-9 h-9 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="url(#nav-logo-glow)" opacity="0.1" />
              <rect x="7" y="6" width="4" height="20" rx="2" fill="url(#nav-logo-left-grad)" />
              <path d="M9 6H19C24.52 6 29 10.48 29 16C29 21.52 24.52 26 19 26H9" stroke="url(#nav-logo-loop-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="17" cy="12" r="2.5" fill="url(#nav-logo-bit-grad)" />
              <circle cx="21" cy="16" r="2.5" fill="url(#nav-logo-bit-grad)" />
              <circle cx="17" cy="20" r="2.5" fill="url(#nav-logo-bit-grad)" />
              <path d="M17 12L21 16L17 20" stroke="url(#nav-logo-bit-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
              <defs>
                <linearGradient id="nav-logo-glow" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="nav-logo-left-grad" x1="7" y1="6" x2="11" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#8b5cf6" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="nav-logo-loop-grad" x1="9" y1="6" x2="29" y2="26" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="0.5" stopColor="#4f46e5" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
                <linearGradient id="nav-logo-bit-grad" x1="14.5" y1="12" x2="23.5" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#06b6d4" />
                  <stop offset="1" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 rounded-xl bg-violet-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-white group-hover:opacity-90 flex items-center select-none translate-y-[-0.5px]">
            ayabit
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-cyan-400 mx-2 animate-pulse shrink-0">
              <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
            </svg>
            <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">Estudio</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer">
            Servicios
          </button>
          <button onClick={() => scrollToSection('process')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer">
            Cómo Funciona
          </button>
          <button onClick={() => scrollToSection('demo')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Demo En Vivo
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer">
            Planes
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-slate-300 hover:text-white font-medium text-sm transition-colors cursor-pointer">
            Contacto
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection('pricing')}
            className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
          >
            Cotizar Proyecto
            <Rocket className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav border-t border-white/[0.05] py-6 px-6 flex flex-col gap-5 animate-in fade-in slide-in-from-top-5 duration-200">
          <button onClick={() => scrollToSection('features')} className="text-left text-slate-300 hover:text-white font-medium text-base py-2 transition-colors">
            Servicios
          </button>
          <button onClick={() => scrollToSection('process')} className="text-left text-slate-300 hover:text-white font-medium text-base py-2 transition-colors">
            Cómo Funciona
          </button>
          <button onClick={() => scrollToSection('demo')} className="text-left text-slate-300 hover:text-white font-medium text-base py-2 transition-colors flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Demo En Vivo (Simulador)
          </button>
          <button onClick={() => scrollToSection('pricing')} className="text-left text-slate-300 hover:text-white font-medium text-base py-2 transition-colors">
            Planes & Precios
          </button>
          <button onClick={() => scrollToSection('contacto')} className="text-left text-slate-300 hover:text-white font-medium text-base py-2 transition-colors">
            Contacto & Ubicación
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all duration-300"
          >
            Cotizar Proyecto
          </button>
        </div>
      )}
    </nav>
  );
}
