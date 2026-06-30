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

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/525625785033?text=Hola%20Dayabit!%20Me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20web."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                (window as any).gtag_report_conversion();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.06] hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 font-medium text-xs transition-all duration-300 cursor-pointer decoration-none"
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current text-emerald-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.887-6.963C16.478 1.928 14.003.903 11.37.903c-5.44 0-9.866 4.42-9.87 9.852 0 1.712.464 3.385 1.341 4.866l-.99 3.615 3.708-.97c1.478.806 3.017 1.22 4.498 1.22zM18.06 14.85c-.328-.164-1.94-.957-2.24-1.067-.3-.11-.518-.164-.736.164-.219.328-.847 1.066-1.037 1.285-.19.219-.38.246-.708.082-.328-.164-1.385-.51-2.637-1.63-1.033-.921-1.614-2.054-1.816-2.4-.202-.328-.021-.507.143-.67.147-.146.328-.382.492-.574.164-.19.219-.328.328-.547.11-.219.055-.41-.028-.574-.082-.164-.736-1.777-1.01-2.434-.268-.644-.542-.557-.736-.567-.19-.01-.408-.012-.627-.012-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.733 0 1.614 1.174 3.172 1.338 3.391.164.22 2.307 3.522 5.59 4.942.78.337 1.39.539 1.86.688.784.249 1.498.214 2.062.13.629-.094 1.94-.793 2.214-1.529.273-.736.273-1.366.19-1.529-.08-.162-.3-.26-.628-.424z"/>
            </svg>
            <span>WhatsApp: 56 2578 5033</span>
          </a>
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
          <a
            href="https://wa.me/525625785033?text=Hola%20Dayabit!%20Me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20web."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                (window as any).gtag_report_conversion();
              }
            }}
            className="w-full py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 font-bold flex items-center justify-center gap-2 cursor-pointer text-sm decoration-none"
          >
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current text-emerald-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.887-6.963C16.478 1.928 14.003.903 11.37.903c-5.44 0-9.866 4.42-9.87 9.852 0 1.712.464 3.385 1.341 4.866l-.99 3.615 3.708-.97c1.478.806 3.017 1.22 4.498 1.22zM18.06 14.85c-.328-.164-1.94-.957-2.24-1.067-.3-.11-.518-.164-.736.164-.219.328-.847 1.066-1.037 1.285-.19.219-.38.246-.708.082-.328-.164-1.385-.51-2.637-1.63-1.033-.921-1.614-2.054-1.816-2.4-.202-.328-.021-.507.143-.67.147-.146.328-.382.492-.574.164-.19.219-.328.328-.547.11-.219.055-.41-.028-.574-.082-.164-.736-1.777-1.01-2.434-.268-.644-.542-.557-.736-.567-.19-.01-.408-.012-.627-.012-.218 0-.573.082-.873.41-.3.328-1.147 1.12-1.147 2.733 0 1.614 1.174 3.172 1.338 3.391.164.22 2.307 3.522 5.59 4.942.78.337 1.39.539 1.86.688.784.249 1.498.214 2.062.13.629-.094 1.94-.793 2.214-1.529.273-.736.273-1.366.19-1.529-.08-.162-.3-.26-.628-.424z"/>
            </svg>
            Escríbenos por WhatsApp: 56 2578 5033
          </a>
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
