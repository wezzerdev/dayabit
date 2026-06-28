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
      <div className="max-w-7xl mx-auto px-6 pt-12 mt-12 border-t border-white/[0.04] flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <p>© {currentYear} Dayabit. Todos los derechos reservados.</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-slate-400">
            <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors cursor-pointer font-medium">Términos y Condiciones</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors cursor-pointer font-medium font-sans">Aviso de Privacidad</button>
            <button onClick={() => setActiveModal('billing')} className="hover:text-white transition-colors cursor-pointer font-medium">Facturación SAT CFDI 4.0</button>
          </div>
        </div>
        <p className="flex items-center gap-1">
          Diseñado con <Heart className="w-3.5 h-3.5 fill-red-500/20 text-red-500 animate-pulse" /> por el equipo de Dayabit.
        </p>
      </div>

      {/* Legal Modals System */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#090c16]/98 border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/[0.06]">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                {activeModal === 'terms' && <Scale className="w-5 h-5" />}
                {activeModal === 'privacy' && <ShieldCheck className="w-5 h-5" />}
                {activeModal === 'billing' && <FileText className="w-5 h-5" />}
              </div>
              <h3 className="text-white font-display font-extrabold text-lg sm:text-xl">
                {activeModal === 'terms' && 'Términos y Condiciones de Uso'}
                {activeModal === 'privacy' && 'Aviso de Privacidad Simplificado'}
                {activeModal === 'billing' && 'Políticas de Facturación SAT CFDI 4.0'}
              </h3>
              
              <button 
                onClick={() => setActiveModal(null)} 
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto pr-2 space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed text-left flex-1 max-h-[60vh] scrollbar-thin">
              {activeModal === 'terms' && (
                <>
                  <p>
                    Bienvenido a Dayabit. Al navegar por nuestro portal web, elegir un plan o solicitar una cotización, el cliente acepta expresamente y de forma incondicional los presentes <strong>Términos y Condiciones de Servicio</strong>. Es responsabilidad absoluta del cliente leer y comprender este documento antes de realizar una adquisición.
                  </p>
                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        1. Gastos de Hosting y Dominio
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Todos los gastos anuales de renovación del Hosting (alojamiento en servidor) y del Dominio (ej. <em>tunegocio.com</em>) corren <strong>únicamente y exclusivamente por cuenta del cliente</strong>. Dayabit actúa estrictamente como desarrollador, programador e integrador inicial del software. La falta de pago oportuno de estos servicios de alojamiento o dominios resultará en la baja automática de su sitio web por parte del proveedor respectivo, liberando a Dayabit de cualquier responsabilidad de operación o de resguardo de archivos.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        2. Límite de Responsabilidad Técnica y Uptime
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Dayabit entrega proyectos optimizados con altos estándares de calidad. No obstante, no nos hacemos responsables de pérdidas financieras, daños comerciales, caídas del sistema, cortes de red, actualizaciones de terceros que causen desconfiguraciones del código, o problemas técnicos directos en los servidores contratados por el cliente. Tampoco asumimos responsabilidad por fallas o interrupciones en la API de WhatsApp, la cual depende de Meta Platforms, Inc.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        3. Exclusión de Reclamaciones Históricas
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Al entregar el proyecto conforme al plan contratado, se asume la entera conformidad del cliente. Dayabit <strong>no aceptará reclamaciones, demandas o solicitudes de compensación en plazos históricos posteriores (de 1, 2 o más años)</strong> alegando que no fueron informados de las tarifas de hosting, dominios o de la estructura operativa de su sitio. Es obligación del cliente informarse debidamente de lo que está adquiriendo.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic mt-4">
                    Dayabit se reserva el derecho de actualizar estos términos en cualquier momento, los cuales se encontrarán siempre vigentes en este portal oficial.
                  </p>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <p>
                    En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de México, Dayabit hace de su conocimiento este Aviso de Privacidad para garantizar que su información personal sea tratada con la mayor confidencialidad y apego legal.
                  </p>
                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 font-display">Datos Recabados</h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Los únicos datos que procesamos en esta landing page son aquellos ingresados en el simulador interactivo de pedidos o en el chatbot de cotizaciones: nombre del negocio, volumen de productos, requerimientos de logotipo y elección de plan.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 font-display">Finalidad del Tratamiento</h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Estos datos son compilados localmente en un formato de ticket estructurado con el único fin de enviarse mediante redirección al número de soporte de WhatsApp de Dayabit (`+52 56 2578 5033`), facilitando el análisis preliminar de su cotización de forma profesional y transparente.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 font-display">Protección y Compartición de Datos</h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Dayabit <strong>no recopila estos datos en bases de datos del servidor ni los comparte, vende o transfiere a terceras personas</strong> bajo ningún concepto comercial o publicitario.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Cualquier duda o solicitud para ejercer sus derechos ARCO de acceso, rectificación, cancelación u oposición de datos de contacto puede ser canalizada vía correo a <a href="mailto:hola@dayabit.com" className="text-cyan-400 hover:underline">hola@dayabit.com</a>.
                  </p>
                </>
              )}

              {activeModal === 'billing' && (
                <>
                  <p>
                    Para la formalidad jurídica y fiscal de las operaciones de nuestros clientes comerciales, pequeñas y medianas empresas o profesionistas independientes en México, Dayabit opera con un modelo de facturación formal de alta confianza.
                  </p>
                  <div className="space-y-4 pt-2">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Facturación Fiscal SAT CFDI 4.0
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Todos nuestros servicios y precios publicados en este portal <strong>ya incluyen los impuestos fiscales correspondientes (IVA)</strong>. Tras realizar la contratación y validación de tu cotización, generamos formalmente tu comprobante fiscal digital por internet utilizando la versión vigente del SAT: <strong>CFDI 4.0</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-white font-bold text-sm mb-1.5 flex items-center gap-1.5 font-display">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Requisitos de Emisión
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm">
                        Para poder expedir la factura de manera correcta, nuestro equipo le solicitará la Constancia de Situación Fiscal (CSF) de su empresa, uso de CFDI (ej. Gastos en general), régimen fiscal y correo electrónico de destino para la entrega de los archivos XML y PDF.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#090c16] border border-emerald-500/10 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
                      <h4 className="text-white font-bold text-sm mb-1">Negocio 100% Respaldado</h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        Trabajar con Dayabit te brinda la seguridad de un servicio profesional formalmente registrado, de modo que cada centavo invertido en tu presencia digital es deducible de impuestos y cuenta con total validez legal y de soporte de ingeniería para la seguridad de tu empresa.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Action Button */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-end">
              <button 
                onClick={() => setActiveModal(null)} 
                className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg hover:shadow-violet-600/30 transition-all cursor-pointer"
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
