import { useState } from 'react';
import { Heart, X, Scale, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'billing' | null>(null);
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
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 py-16 relative">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Brand & Description */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-1.5 cursor-pointer w-fit group" onClick={scrollToTop}>
            <div className="relative w-8 h-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 32 32" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#00b37e" opacity="0.15" />
                <rect x="7" y="6" width="4" height="20" rx="2" fill="#00b37e" />
                <path d="M9 6H19C24.52 6 29 10.48 29 16C29 21.52 24.52 26 19 26H9" stroke="#00b37e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="17" cy="12" r="2.5" fill="#00c288" />
                <circle cx="21" cy="16" r="2.5" fill="#00c288" />
                <circle cx="17" cy="20" r="2.5" fill="#00c288" />
              </svg>
            </div>
            <span className="font-display font-black text-2xl text-white group-hover:text-emerald-400 transition-colors flex items-center select-none">
              dayabit
              <span className="ml-2 text-[10px] font-bold tracking-wider text-emerald-300 uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30">
                Estudio
              </span>
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Plataforma de páginas web y catálogos digitales interactivos en la nube, optimizados para ventas directas a WhatsApp y facturación fiscal CFDI 4.0.
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
                Precios
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Atención Directa</h4>
          <p className="text-xs text-slate-400">
            Cuautitlán Izcalli, Estado de México.<br />
            Cobertura digital en todo el país.
          </p>
          <div className="pt-2 space-y-1 text-xs">
            <p className="text-slate-300">
              WhatsApp: <a href="https://wa.me/525625785033" target="_blank" rel="noopener noreferrer" className="text-[#00b37e] hover:underline font-bold">+52 56 2578 5033</a>
            </p>
            <p className="text-slate-300">
              Correo: <a href="mailto:hola@dayabit.com" className="text-slate-200 hover:underline">hola@dayabit.com</a>
            </p>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <p>© {currentYear} Dayabit Cloud. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-slate-400">
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors cursor-pointer font-medium">Términos y Condiciones</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors cursor-pointer font-medium">Aviso de Privacidad</button>
            <button onClick={() => setActiveModal('billing')} className="hover:text-white transition-colors cursor-pointer font-medium">Facturación SAT CFDI 4.0</button>
          </div>
        </div>
        <p className="flex items-center gap-1">
          Hecho con <Heart className="w-3.5 h-3.5 fill-[#00b37e] text-[#00b37e]" /> por el equipo de Dayabit.
        </p>
      </div>

      {/* Legal Modals System */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] text-slate-800 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-200">
              <div className="p-2 rounded-xl bg-emerald-50 text-[#00b37e]">
                {activeModal === 'terms' && <Scale className="w-5 h-5" />}
                {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5" />}
                {activeModal === 'billing' && <FileText className="w-5 h-5" />}
              </div>
              <h3 className="text-slate-900 font-display font-extrabold text-lg sm:text-xl">
                {activeModal === 'terms' && 'Términos y Condiciones de Uso'}
                {activeModal === 'privacy' && 'Aviso de Privacidad Simplificado'}
                {activeModal === 'billing' && 'Políticas de Facturación SAT CFDI 4.0'}
              </h3>
              
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto pr-2 space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed text-left flex-1 max-h-[60vh]">
              {activeModal === 'terms' && (
                <>
                  <p>
                    Bienvenido a Dayabit. Al navegar por nuestro portal web, elegir un plan o solicitar una cotización, el cliente acepta expresamente y de forma incondicional los presentes <strong>Términos y Condiciones de Servicio</strong>.
                  </p>
                  <div className="space-y-3.5 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-[#00b37e]" />
                        1. Gastos de Hosting y Dominio
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Todos los gastos anuales de renovación del Hosting y del Dominio (ej. <em>tunegocio.com</em>) corren <strong>únicamente y exclusivamente por cuenta del cliente</strong>. Dayabit actúa estrictamente como desarrollador, programador e integrador inicial del software.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-[#00b37e]" />
                        2. Límite de Responsabilidad Técnica y Uptime
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Dayabit entrega proyectos optimizados con altos estándares de calidad. No obstante, no nos hacemos responsables de pérdidas financieras o caídas en los servidores contratados por el cliente, ni por fallas o interrupciones en la API de WhatsApp, la cual depende de Meta Platforms, Inc.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-[#00b37e]" />
                        3. Exclusión de Reclamaciones Históricas
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Al entregar el proyecto conforme al plan contratado, se asume la entera conformidad del cliente. Dayabit no aceptará reclamaciones en plazos históricos posteriores (de 1, 2 o más años) alegando desinformación de las tarifas de hosting o dominios.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México, Dayabit garantiza que su información personal sea tratada con la mayor confidencialidad y apego legal.
                  </p>
                  <div className="space-y-3.5 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 font-display">Datos Recabados</h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Los únicos datos que procesamos en esta landing page son aquellos ingresados en el simulador interactivo de pedidos o en el chatbot de cotizaciones: nombre del negocio, volumen de productos, requerimientos de logotipo y elección de plan.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 font-display">Finalidad del Tratamiento</h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Estos datos son compilados en un formato de ticket estructurado con el único fin de enviarse mediante redirección al número de soporte de WhatsApp de Dayabit (`+52 56 2578 5033`).
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 font-display">No Venta de Datos</h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Dayabit <strong>no comercializa ni comparte sus datos con terceros</strong> bajo ningún concepto.
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeModal === 'billing' && (
                <>
                  <p>
                    Para la formalidad jurídica y fiscal de las operaciones de nuestros clientes comerciales, Dayabit opera con un modelo de facturación formal de alta confianza.
                  </p>
                  <div className="space-y-3.5 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                      <h4 className="text-slate-900 font-bold text-sm mb-1 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-[#00b37e]" />
                        Facturación Fiscal SAT CFDI 4.0
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Todos nuestros servicios y precios publicados <strong>ya incluyen impuestos fiscales (IVA)</strong>. Emitimos formalmente comprobantes fiscales digitales por internet utilizando la versión <strong>CFDI 4.0</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80">
                      <h4 className="text-emerald-950 font-bold text-sm mb-1">Negocio Formal y Seguro</h4>
                      <p className="text-emerald-900 text-xs sm:text-sm leading-relaxed">
                        Cada proyecto adquirido con Dayabit es 100% deducible de impuestos y cuenta con total respaldo fiscal y de ingeniería de software.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Action Button */}
            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-6 py-2.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Entendido, cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </footer>
  );
}
