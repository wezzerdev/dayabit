import { MapPin, Phone, Mail, Clock, Compass } from 'lucide-react';

export default function ContactLocation() {
  return (
    <section id="contacto" className="py-24 bg-[#070913] relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-600/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Contact and Copywriting */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                Contacto y Ubicación
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
                ¿Dónde nos encuentras?
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Estamos ubicados en Cuautitlán Izcalli, Estado de México, brindando cobertura digital y desarrollo web a todo el país.
              </p>
            </div>

            {/* Information Grid Cards */}
            <div className="space-y-4">
              
              {/* Address Card */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 shrink-0 h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Dirección Oficial</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans leading-relaxed">
                    Av. San Juan Bautista Manzana 012, Lomas de Cuautitlán, 54720 Cuautitlán Izcalli, Estado de México.
                  </p>
                </div>
              </div>

              {/* Support Hours */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0 h-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Horario de Atención</h4>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Lunes a Viernes: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              {/* Direct channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0 h-fit">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Teléfono</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">+52 56 2578 5033</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 h-fit">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Correo</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">hola@dayabit.com</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Feature Pitch Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/10 flex items-start gap-3">
              <Compass className="w-5.5 h-5.5 text-cyan-400 shrink-0 mt-0.5 animate-spin" style={{ animationDuration: '12s' }} />
              <p className="text-xs text-cyan-300/80 leading-relaxed">
                <strong className="text-white">Tip de conversión:</strong> Integramos mapas responsivos y personalizados en tu catálogo para que tus clientes locales sepan exactamente cómo llegar a tu sucursal o negocio.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Styled Iframe Map */}
          <div className="lg:col-span-7 w-full h-[400px] lg:h-[450px] relative rounded-3xl overflow-hidden glass-card border border-white/[0.08] p-2 shadow-2xl">
            <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/[0.06] text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-lg select-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Demo de integración: Mapa en Vivo
            </div>
            
            {/* The Google Maps Iframe, styled using CSS filters to match dark mode */}
            <div className="w-full h-full rounded-[20px] overflow-hidden relative">
              <iframe
                title="Mapa de Ubicación de Dayabit"
                src="https://maps.google.com/maps?q=Av%20San%20Juan%20Bautista%20Manzana%20012%2C%20Lomas%20de%20Cuautitl%C3%A1n%2C%2054720%20Cuautitl%C3%A1n%20Izcalli%2C%20M%C3%A9x.&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) grayscale(15%) contrast(95%) brightness(90%)',
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
