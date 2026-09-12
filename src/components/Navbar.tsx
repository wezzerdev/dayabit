import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

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
              <path d="M17 12L21 16L17 20" stroke="#00b37e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
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
              Estudio
            </span>
          </span>
        </div>

        {/* Desktop Menu */}
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
        <div className="hidden md:flex items-center gap-3.5">
          <a
            href="https://wa.me/525625785033?text=Hola%20Dayabit!%20Me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20web."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
                (window as any).gtag_report_conversion();
              }
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 font-semibold text-xs transition-all duration-200 cursor-pointer decoration-none"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-emerald-600" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.004 0C5.378 0 .004 5.374.004 12c0 2.112.551 4.168 1.597 5.982L.004 24l6.196-1.625A11.954 11.954 0 0012.004 24c6.626 0 12-5.374 12-12s-5.374-12-12-12zm6.659 17.027c-.246.695-1.433 1.272-1.97 1.341-.537.069-1.077.299-3.486-.653-3.111-1.233-5.074-4.42-5.23-4.628-.155-.208-1.272-1.696-1.272-3.236 0-1.54 1.002-2.298 1.31-2.607.307-.308.691-.416.921-.416.23 0 .461.003.653.012.204.009.479-.078.749.57.27.647.922 2.251 1.002 2.416.08.165.132.355.021.572-.11.217-.165.352-.329.544-.164.192-.345.427-.492.574-.165.165-.337.345-.145.674.192.329 1.135 1.868 2.433 3.023 1.67 1.488 3.078 1.95 3.518 2.13.44.18.697.151.958-.152.261-.302 1.114-1.298 1.41-1.742.297-.444.595-.37.994-.222.399.148 2.534 1.196 2.656 1.258.123.062.204.093.25.172.046.08.046.463-.2.158z"/>
            </svg>
            <span>56 2578 5033</span>
          </a>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="px-6 py-2.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 group"
          >
            Probar Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md border-b border-slate-200 py-6 px-6 flex flex-col gap-4 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200">
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
            className="w-full py-3 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center gap-2 cursor-pointer text-sm decoration-none"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-emerald-600" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.004 0C5.378 0 .004 5.374.004 12c0 2.112.551 4.168 1.597 5.982L.004 24l6.196-1.625A11.954 11.954 0 0012.004 24c6.626 0 12-5.374 12-12s-5.374-12-12-12zm6.659 17.027c-.246.695-1.433 1.272-1.97 1.341-.537.069-1.077.299-3.486-.653-3.111-1.233-5.074-4.42-5.23-4.628-.155-.208-1.272-1.696-1.272-3.236 0-1.54 1.002-2.298 1.31-2.607.307-.308.691-.416.921-.416.23 0 .461.003.653.012.204.009.479-.078.749.57.27.647.922 2.251 1.002 2.416.08.165.132.355.021.572-.11.217-.165.352-.329.544-.164.192-.345.427-.492.574-.165.165-.337.345-.145.674.192.329 1.135 1.868 2.433 3.023 1.67 1.488 3.078 1.95 3.518 2.13.44.18.697.151.958-.152.261-.302 1.114-1.298 1.41-1.742.297-.444.595-.37.994-.222.399.148 2.534 1.196 2.656 1.258.123.062.204.093.25.172.046.08.046.463-.2.158z"/>
            </svg>
            WhatsApp: 56 2578 5033
          </a>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="w-full text-center py-3 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-semibold shadow-md transition-all duration-200"
          >
            Probar Gratis
          </button>
        </div>
      )}
    </nav>
  );
}
