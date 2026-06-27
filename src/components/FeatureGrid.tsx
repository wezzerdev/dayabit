import { motion } from 'framer-motion';
import { Zap, Search, ShieldCheck, Smartphone, Sliders, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Velocidad Ultra Rápida",
    description: "Desarrollados con tecnología moderna que garantiza una carga instantánea. Menos de 1 segundo de espera significa que ningún cliente abandonará tu sitio.",
    color: "text-amber-400 bg-amber-400/10"
  },
  {
    icon: Search,
    title: "Optimización SEO Local",
    description: "Estructuramos tu sitio web con las mejores prácticas semánticas para que Google indexe tu negocio y aparezcas ante los clientes que te buscan en tu zona.",
    color: "text-cyan-400 bg-cyan-400/10"
  },
  {
    icon: ShieldCheck,
    title: "Conexión Directa WhatsApp",
    description: "Elimina la fricción de formularios complejos. Tus clientes ordenan o cotizan directo a tu WhatsApp, agilizando el proceso y aumentando un 30% tus cierres.",
    color: "text-emerald-400 bg-emerald-400/10"
  },
  {
    icon: Smartphone,
    title: "Diseño Mobile-First",
    description: "El 90% de tus clientes navegarán desde sus celulares. Diseñamos pensando en la experiencia táctil, fluida y ergonómica en pantallas móviles.",
    color: "text-violet-400 bg-violet-400/10"
  },
  {
    icon: Sliders,
    title: "Autoadministrable Ligero",
    description: "Añade nuevos productos, actualiza tus horarios, cambia imágenes o edita la descripción de tus servicios en segundos sin depender de un programador.",
    color: "text-pink-400 bg-pink-400/10"
  },
  {
    icon: DollarSign,
    title: "Cero Comisiones por Venta",
    description: "A diferencia de las plataformas de e-commerce tradicionales, no te cobramos comisiones por tus transacciones. Todo lo que vendes es 100% ganancia tuya.",
    color: "text-indigo-400 bg-indigo-400/10"
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-[#090C16] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg via-[#090C16] to-[#070913] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            ¿Por qué Dayabit?
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
            Soluciones Modernas y Escalables para Pequeños Negocios
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Combinamos diseño de vanguardia con automatización práctica. Creamos herramientas sencillas de usar que impulsan tus ventas de forma real.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 sm:p-8 rounded-2xl border-gradient-glow hover:translate-y-[-4px] transition-all duration-300 flex flex-col items-start text-left group"
              >
                <div className={`p-3.5 rounded-xl ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
