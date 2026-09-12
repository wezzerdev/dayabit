import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Compass } from 'lucide-react';

export default function ContactLocation() {
  const [showMap, setShowMap] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contacto" className="py-24 bg-[#f8fafc] border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Contact and Copywriting */}
          <div className="lg:col-span-5 space-y-7 text-left">
            <div className="space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
                Contacto & Cobertura
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
                ¿Dónde nos encuentras?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Estamos ubicados en Cuautitlán Izcalli, Estado de México, brindando desarrollo web, catálogos digitales y soporte técnico a todo el país.
              </p>
            </div>

            {/* Information Grid Cards */}
            <div className="space-y-3.5">
              
              {/* Address Card */}
              <div className="flex gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="p-3 rounded-xl bg-emerald-50 text-[#00b37e] shrink-0 h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">Dirección Oficial</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5 font-sans leading-relaxed">
                    Av. San Juan Bautista Manzana 012, Lomas de Cuautitlán, 54720 Cuautitlán Izcalli, Estado de México.
                  </p>
                </div>
              </div>

              {/* Support Hours */}
              <div className="flex gap-4 p-4.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 shrink-0 h-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-sm">Horario de Atención</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                    Lunes a Viernes: 9:00 AM - 6:00 PM (Soporte continuo vía WhatsApp)
                  </p>
                </div>
              </div>

              {/* Direct channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="flex gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00b37e] shrink-0 h-fit">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xs sm:text-sm">WhatsApp</h4>
                    <p className="text-slate-600 text-xs mt-0.5">+52 56 2578 5033</p>
                  </div>
                </div>
                
                <div className="flex gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 h-fit">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-bold text-xs sm:text-sm">Correo</h4>
                    <p className="text-slate-600 text-xs mt-0.5 font-sans">hola@dayabit.com</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Feature Pitch Badge */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#00b37e] shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong className="text-emerald-950 font-bold">Ventaja competitiva:</strong> Integramos mapas responsivos en tu página para que tus compradores locales lleguen directamente a tu tienda física.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Styled Iframe Map */}
          <div ref={containerRef} className="lg:col-span-7 w-full h-[400px] lg:h-[450px] relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 p-2 shadow-xl">
            <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 text-[11px] font-bold flex items-center gap-1.5 shadow-md select-none">
              <span className="w-2 h-2 rounded-full bg-[#00b37e] animate-ping" />
              Ubicación Cuautitlán Izcalli
            </div>
            
            {/* The Google Maps Iframe, clean natural light style */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-100 flex items-center justify-center">
              {showMap ? (
                <iframe
                  title="Mapa de Ubicación de Dayabit"
                  src="https://maps.google.com/maps?q=Av%20San%20Juan%20Bautista%20Manzana%20012%2C%20Lomas%20de%20Cuautitl%C3%A1n%2C%2054720%20Cuautitl%C3%A1n%20Izcalli%2C%20M%C3%A9x.&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="text-center space-y-3 p-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#00b37e] flex items-center justify-center mx-auto animate-pulse">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Cargando mapa interactivo...</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
