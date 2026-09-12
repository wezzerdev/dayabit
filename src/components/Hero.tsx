import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, TrendingUp, CheckCircle, Smartphone, MessageCircle, DollarSign } from 'lucide-react';

export default function Hero() {
  const scrollToPricing = () => {
    const element = document.getElementById('pricing');
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#f0fdf9]/60 via-white to-white">
      {/* Soft atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#00b37e]/10 via-[#06b6d4]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        {/* Social Proof Avatar Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-xs mb-8"
        >
          <div className="flex -space-x-2">
            <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Cliente Dayabit" />
            <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Cliente Dayabit" />
            <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Cliente Dayabit" />
          </div>
          <span className="text-xs font-bold text-slate-700 tracking-tight">
            Empresas en México potenciando sus ganancias con Dayabit
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-display font-black text-slate-900 leading-[1.12] tracking-tight max-w-4xl mx-auto"
        >
          La Landing Page que tu Empresa Necesita para Multiplicar sus Ganancias
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed mt-6"
        >
          ¿Tu negocio aún no tiene una página web que realmente venda? Creamos tu <strong>Landing Page profesional</strong> con <strong>Catálogo Web y Pedidos a WhatsApp (WhatsApp Ordering System)</strong> para que recibas órdenes estructuradas sin comisiones.
        </motion.p>

        {/* CTA Button with Playful Arrow Price Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col items-center relative"
        >
          <div className="relative inline-flex items-center">
            <button
              onClick={scrollToPricing}
              className="px-10 py-4 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-base sm:text-lg shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2 group"
            >
              Probar Gratis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Hand-drawn style Callout Arrow */}
            <div className="hidden sm:flex absolute left-full ml-5 -top-2 items-center gap-1.5 whitespace-nowrap text-left select-none pointer-events-none">
              <svg className="w-8 h-8 text-[#00b37e] rotate-[-20deg]" viewBox="0 0 40 40" fill="none">
                <path d="M5 30C15 28 25 15 32 8M32 8L24 7M32 8L31 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="bg-emerald-50 border border-emerald-200/80 text-emerald-900 font-display font-extrabold text-xs px-3 py-1.5 rounded-xl shadow-xs">
                Planes desde <span className="text-[#00b37e] font-black">$749 MXN/año</span>
              </div>
            </div>
          </div>

          {/* Trust Stars */}
          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <span className="font-bold text-slate-800">4.9</span>
            <span>·</span>
            <span>Verificado por clientes en México</span>
          </div>
        </motion.div>

        {/* SaaS Dashboard & Mobile Mockup Showcase (Inspired directly by Pulpos layout) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto relative"
        >
          {/* Outer glowing frame */}
          <div className="bg-gradient-to-tr from-emerald-100/70 via-slate-100/50 to-cyan-100/50 p-2.5 sm:p-4 rounded-3xl sm:rounded-[36px] border border-slate-200/90 shadow-2xl relative">
            
            {/* Main Desktop Screen */}
            <div className="bg-white rounded-2xl sm:rounded-[28px] overflow-hidden border border-slate-200/80 shadow-md text-left">
              
              {/* Window Header */}
              <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-500 ml-2 hidden sm:inline-block">app.dayabit.com · Panel Empresarial</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                    Tienda en Vivo: Abierta 🟢
                  </span>
                </div>
              </div>

              {/* Window Body: Dashboard Grid */}
              <div className="grid grid-cols-12 min-h-[360px] sm:min-h-[420px]">
                
                {/* Left Sidebar */}
                <div className="hidden md:block col-span-3 bg-[#0f172a] text-slate-300 p-5 space-y-6">
                  <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                    <div className="w-7 h-7 rounded-lg bg-[#00b37e] flex items-center justify-center text-white font-black text-xs">
                      D
                    </div>
                    <span className="font-bold text-white text-sm">Dayabit Cloud</span>
                  </div>

                  <nav className="space-y-1 text-xs">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/10 text-white font-semibold">
                      <TrendingUp className="w-4 h-4 text-[#00b37e]" />
                      Inicio
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      <ShoppingBag className="w-4 h-4" />
                      Productos & Catálogo
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Pedidos WhatsApp
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                      <DollarSign className="w-4 h-4" />
                      Facturación CFDI 4.0
                    </div>
                  </nav>

                  <div className="pt-6 border-t border-white/10 text-[11px] text-slate-400 space-y-1.5">
                    <p className="text-slate-500 font-semibold uppercase text-[9px] tracking-wider">Plan Activo</p>
                    <p className="text-white font-bold">Vitrina Interactiva</p>
                    <p className="text-[#00b37e] flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Sin comisiones (0%)
                    </p>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="col-span-12 md:col-span-9 p-5 sm:p-7 bg-[#f8fafc] space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">¡Hola Dayabit! 👋</h3>
                      <p className="text-xs text-slate-500">Resumen de ventas y pedidos por WhatsApp de hoy</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 rounded-lg bg-[#00b37e] text-white text-xs font-semibold shadow-xs">
                        + Nuevo Producto
                      </button>
                    </div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                      <span className="text-xs font-semibold text-slate-500">Ventas por WhatsApp</span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">1,623</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          +32.4% este mes
                        </span>
                      </div>
                      <div className="h-10 flex items-end gap-1.5 pt-2">
                        <div className="flex-1 bg-emerald-100 rounded-t h-4" />
                        <div className="flex-1 bg-emerald-200 rounded-t h-6" />
                        <div className="flex-1 bg-emerald-300 rounded-t h-5" />
                        <div className="flex-1 bg-emerald-400 rounded-t h-8" />
                        <div className="flex-1 bg-[#00b37e] rounded-t h-10" />
                      </div>
                    </div>

                    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                      <span className="text-xs font-semibold text-slate-500">Facturación Generada</span>
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">$91,861</span>
                        <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md">
                          100% Ganancia neta
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 pt-3">
                        Sin comisiones intermedias. El dinero entra directo a tus cuentas.
                      </p>
                    </div>
                  </div>

                  {/* Recent Orders in table */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs space-y-2.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                      <span>Últimos Pedidos WhatsApp</span>
                      <span className="text-emerald-600 cursor-pointer hover:underline">Ver catálogo</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                        <span className="font-semibold text-slate-800">Café Geisha Especial (x2)</span>
                        <span className="font-mono text-emerald-700 font-bold">$360 MXN</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Enviado a WhatsApp</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                        <span className="font-semibold text-slate-800">Termo Inteligente LCD (x1)</span>
                        <span className="font-mono text-emerald-700 font-bold">$350 MXN</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Enviado a WhatsApp</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Overlapping Smartphone Mockup (Exactly like Pulpos screenshot!) */}
            <div className="hidden md:block absolute -bottom-6 -right-6 w-72 lg:w-80 bg-white rounded-[38px] p-3 border-4 border-slate-800 shadow-2xl z-20 text-left">
              <div className="bg-slate-900 rounded-[30px] p-1.5 overflow-hidden">
                <div className="bg-white rounded-[24px] overflow-hidden p-3.5 space-y-3">
                  
                  {/* Phone Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#00b37e] flex items-center justify-center text-white text-[9px] font-bold">
                        WA
                      </div>
                      <span className="font-bold text-xs text-slate-800">Tu Tienda Digital</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Carrito (2)
                    </span>
                  </div>

                  {/* Phone Product in cart */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100/60 flex items-center justify-center text-sm">
                        ☕
                      </div>
                      <div className="flex-1 text-[11px]">
                        <p className="font-bold text-slate-800">Café de Especialidad</p>
                        <p className="text-slate-500 font-mono">$180.00 MXN</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100/60 flex items-center justify-center text-sm">
                        🔋
                      </div>
                      <div className="flex-1 text-[11px]">
                        <p className="font-bold text-slate-800">Termo Inteligente LCD</p>
                        <p className="text-slate-500 font-mono">$350.00 MXN</p>
                      </div>
                    </div>
                  </div>

                  {/* Big WhatsApp Checkout Button */}
                  <div className="pt-1">
                    <button className="w-full py-2.5 rounded-xl bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20">
                      <Smartphone className="w-3.5 h-3.5" />
                      Pedir por WhatsApp ($530 MXN)
                    </button>
                    <p className="text-[9px] text-slate-400 text-center mt-1">
                      El ticket se genera y envía al instante
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Press / Trust Logos Banner (Like Pulpos footer in Screenshot 2) */}
        <div className="mt-20 pt-10 border-t border-slate-200/80">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Confianza respaldada para negocios y emprendedores en México
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="font-serif font-black text-xl tracking-tighter text-slate-700">REFORMA</span>
            <span className="font-sans font-extrabold text-lg tracking-tight text-slate-700">EL ECONOMISTA</span>
            <span className="font-serif font-bold text-xl tracking-wider text-slate-700">Forbes</span>
            <span className="font-sans font-black text-lg tracking-normal text-slate-700">Entrepreneur</span>
            <span className="font-sans font-bold text-lg text-slate-700">BUSINESS INSIDER</span>
          </div>
        </div>

      </div>
    </section>
  );
}
