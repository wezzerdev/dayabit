import { motion } from 'framer-motion';
import { Zap, Search, ShieldCheck, Smartphone, Sliders, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Velocidad Ultra Rápida",
    description: "Desarrollados con React y Vite de última generación. Menos de 1 segundo de carga para que tus compradores nunca abandonen la tienda.",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200/60"
  },
  {
    icon: ShieldCheck,
    title: "Ventas Directas a WhatsApp",
    description: "Tus clientes agregan productos a su carrito y envían el pedido desglosado directo a tu chat personal o empresarial sin fricciones.",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200/60"
  },
  {
    icon: DollarSign,
    title: "0% Comisiones por Venta",
    description: "A diferencia de Mercado Libre o Shopify, no te cobramos comisiones por tus pedidos. El 100% del dinero entra directamente a tu cuenta bancaria.",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200/60"
  },
  {
    icon: Search,
    title: "Optimización SEO y Google Ads",
    description: "Configurado con etiquetas estructuradas para que Google posicione tu marca y tus campañas publicitarias conviertan clics en clientes reales.",
    iconBg: "bg-cyan-50 text-cyan-600 border-cyan-200/60"
  },
  {
    icon: Smartphone,
    title: "Experiencia 100% Móvil",
    description: "El 92% de las compras en México se inician desde un smartphone. Diseñamos con botones ergonómicos y navegación táctil intuitiva.",
    iconBg: "bg-emerald-50 text-emerald-700 border-emerald-200/60"
  },
  {
    icon: Sliders,
    title: "Autoadministrable Sencillo",
    description: "Sube productos, actualiza precios, cambia fotos o activa promociones especiales en 2 minutos sin depender de un programador.",
    iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200/60"
  }
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 bg-[#f8fafc] border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-18">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
            ¿Por qué Dayabit?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            Todo lo que necesitas para vender en línea, sin la complejidad
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Combinamos diseño web de alta conversión con la herramienta de mensajería más utilizada en México: WhatsApp.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-emerald-300/80 hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left group"
              >
                <div className={`p-3.5 rounded-2xl border ${feature.iconBg} mb-5 group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
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
