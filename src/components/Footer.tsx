import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
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
    <footer className="bg-[#05070d] border-t border-white/[0.04] py-16 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Brand & Description */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-0.5 cursor-pointer w-fit group" onClick={scrollToTop}>
            <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="url(#footer-logo-glow)" opacity="0.1" />
                <rect x="7" y="6" width="4" height="20" rx="2" fill="url(#footer-logo-left-grad)" />
                <path d="M9 6H19C24.52 6 29 10.48 29 16C29 21.52 24.52 26 19 26H9" stroke="url(#footer-logo-loop-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17" cy="12" r="2.5" fill="url(#footer-logo-bit-grad)" />
                <circle cx="21" cy="16" r="2.5" fill="url(#footer-logo-bit-grad)" />
                <circle cx="17" cy="20" r="2.5" fill="url(#footer-logo-bit-grad)" />
                <path d="M17 12L21 16L17 20" stroke="url(#footer-logo-bit-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <defs>
                  <linearGradient id="footer-logo-glow" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="footer-logo-left-grad" x1="7" y1="6" x2="11" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8b5cf6" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="footer-logo-loop-grad" x1="9" y1="6" x2="29" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366f1" />
                    <stop offset="0.5" stopColor="#4f46e5" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="footer-logo-bit-grad" x1="14.5" y1="12" x2="23.5" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-display font-extrabold text-xl text-white group-hover:opacity-90 flex items-center select-none translate-y-[-0.5px]">
              ayabit
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-cyan-400 mx-2 animate-pulse shrink-0">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
              </svg>
              <span className="text-[9px] font-bold tracking-widest text-cyan-300 uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20">Estudio</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Diseñamos y programamos sitios web y catálogos interactivos enfocados en acelerar las ventas de pequeños y medianos comercios y profesionales independientes.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Enlaces Rápidos</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => scrollToSection('features')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Servicios
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('process')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Cómo Funciona
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('demo')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Demo En Vivo
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('pricing')} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                Planes
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Síguenos</h4>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.05] transition-all cursor-pointer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.05] transition-all cursor-pointer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.05] transition-all cursor-pointer" aria-label="Twitter / X">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.05] transition-all cursor-pointer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <p className="text-xs text-slate-500">
            ¿Tienes dudas? Escríbenos a <a href="mailto:hola@dayabit.com" className="text-cyan-400 hover:underline">hola@dayabit.com</a>
          </p>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {currentYear} Dayabit Innovation. Todos los derechos reservados.</p>
        <p className="flex items-center gap-1">
          Diseñado con <Heart className="w-3.5 h-3.5 fill-red-500/20 text-red-500" /> por el equipo de Dayabit.
        </p>
      </div>
    </footer>
  );
}
