import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, ShoppingCart, TrendingUp, Sparkles, Code2 } from 'lucide-react';

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
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-brand-bg">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Side: Copywriting */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
              Desarrollo Web & Catálogos Digitales
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold leading-tight text-white"
          >
            Llevamos tu Negocio al <br />
            <span className="text-gradient-violet-cyan">Mundo Digital.</span> <br />
            <span className="text-gradient-cyan-emerald">Sin Complicaciones.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-400 max-w-xl font-normal leading-relaxed"
          >
            Creamos sitios web y catálogos interactivos optimizados para vender. 
            Nos encargamos de todo el desarrollo, diseño y configuración técnica 
            para que tú solo te preocupes por recibir pedidos directamente en tu WhatsApp.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={scrollToPricing}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-semibold text-base shadow-[0_0_30px_rgba(139,92,246,0.35)] hover:shadow-[0_0_40px_rgba(139,92,246,0.55)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2 group"
            >
              Iniciar mi transformación
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="#demo"
              className="px-8 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] text-slate-300 hover:text-white font-semibold text-base border border-white/[0.08] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Ver Demo Interactiva
            </a>
          </motion.div>
        </div>

        {/* Right Side: Showcase Mockup */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-lg lg:max-w-xl mx-auto h-[450px] lg:h-[500px] flex items-center justify-center"
          >
            {/* Background Glow Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 rounded-3xl blur-2xl" />

            {/* Simulated Live Web Shop Card (Glassmorphism) - Placed top-left */}
            <div className="absolute top-4 left-2 lg:top-8 lg:left-0 w-56 lg:w-64 glass-card p-4 rounded-2xl shadow-2xl border border-white/[0.08] animate-float z-20">
              <div className="w-full h-32 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/10 to-cyan-500/10" />
                <ShoppingCart className="w-12 h-12 text-violet-400 opacity-60" />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/20">
                  Catálogo Vivo
                </span>
              </div>
              <div className="mt-3 space-y-1">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Cafetería Gourmet</span>
                <h4 className="text-white font-semibold text-sm">Café Geisha Especial</h4>
                <p className="text-slate-400 text-xs line-clamp-1">Granos selectos con notas a jazmín y durazno.</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-white font-bold text-sm">Catálogo</span>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition-colors">
                    <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20" />
                    Pedir
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Chat Bubble - Placed bottom-right */}
            <div className="absolute bottom-4 right-2 lg:bottom-8 lg:right-0 w-56 lg:w-64 glass-card p-3 rounded-2xl shadow-2xl border border-emerald-500/20 animate-float z-30" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.04]">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                  WA
                </div>
                <div>
                  <h5 className="text-white font-bold text-xs">Dayabit Bot</h5>
                  <p className="text-[9px] text-slate-400">Cliente interesado en compra</p>
                </div>
              </div>
              <div className="mt-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 leading-relaxed font-mono">
                "¡Hola! Quiero ordenar el *Café Geisha Especial* (ID: 023). Por favor confírmame disponibilidad."
              </div>
            </div>

            {/* Simulated Code Panel (Watermark background - very low opacity) */}
            <div className="hidden md:block absolute top-24 left-[-4rem] w-72 glass-card p-4 rounded-2xl shadow-2xl border border-white/[0.06] text-left font-mono text-[11px] text-slate-300 select-none pointer-events-none z-10 opacity-20 transform scale-95" style={{ animationDelay: '3s' }}>
              <div className="flex gap-1.5 pb-3 border-b border-white/[0.04] mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-[9px] text-slate-500 ml-auto flex items-center gap-1">
                  <Code2 className="w-3 h-3" /> DayabitEngine.tsx
                </span>
              </div>
              <div className="space-y-1 text-slate-400">
                <div><span className="text-violet-400">const</span> <span className="text-cyan-400">checkoutToWhatsApp</span> = () =&gt; &#123;</div>
                <div className="pl-4"><span className="text-violet-400">const</span> msg = <span className="text-emerald-300">`Me interesa el plan...`</span>;</div>
                <div className="pl-4"><span className="text-violet-400">const</span> url = <span className="text-emerald-300">`https://wa.me/phone?text=`</span>;</div>
                <div className="pl-4">window.<span className="text-yellow-400">open</span>(url + <span className="text-yellow-400">encodeURIComponent</span>(msg));</div>
                <div>&#125;</div>
                <div className="pt-2 text-slate-500">// Rendimiento óptimo SEO y React 19</div>
                <div><span className="text-cyan-400">export default</span> DayabitEngine;</div>
              </div>
            </div>

            {/* Analytics floating badge - Placed top-right */}
            <div className="absolute bottom-28 left-2 lg:bottom-auto lg:left-auto lg:top-4 lg:right-[-2rem] w-36 lg:w-44 glass-card p-2.5 sm:p-3 rounded-2xl shadow-xl border border-white/[0.06] flex items-center gap-2.5 sm:gap-3 z-25">
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Conversión</p>
                <h5 className="text-white font-bold text-base">+32.4%</h5>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
