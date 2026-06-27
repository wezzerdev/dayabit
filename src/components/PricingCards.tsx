import { motion } from 'framer-motion';
import { Check, Star, MessageSquare } from 'lucide-react';

const plans = [
  {
    id: "esencial",
    name: "Presencia Esencial",
    tagline: "Tu tarjeta de presentación digital en tiempo récord",
    focus: "Diseñado para profesionales independientes, consultores o negocios locales que necesitan su primer sitio web.",
    features: [
      "Landing Page premium de una sola página (diseño adaptado)",
      "Sección de Quiénes Somos / Sobre Nosotros",
      "Sección de listado de Servicios destacados",
      "Galería estática de 2 o 3 productos (solo informativos, sin precio)",
      "Formulario de contacto rápido y enlaces a redes sociales",
      "Horarios de atención y mapa interactivo",
      "Optimización de velocidad (carga ultra rápida)",
      "SEO básico para indexación de motores de búsqueda"
    ],
    ctaText: "Iniciar mi sitio web",
    highlighted: false,
    gradient: "from-cyan-500 to-indigo-500"
  },
  {
    id: "vitrina",
    name: "Vitrina Interactiva",
    tagline: "El equilibrio perfecto entre diseño y contacto inmediato",
    focus: "Ideal para negocios con movimiento constante que quieren interactuar directamente y mostrar un catálogo vivo.",
    features: [
      "Todo lo incluido en el Plan Esencial",
      "Catálogo dinámico estructurado por categorías",
      "Capacidad para hasta 30 productos en vitrina",
      "Botón de cotización por WhatsApp directo en cada producto",
      "Panel autoadministrable ultraligero (edita textos y fotos en 2 clics)",
      "Diseño 100% responsivo y optimizado para móviles (Mobile-First)",
      "Diseño alineado a la identidad gráfica de tu marca",
      "Enlace de WhatsApp pre-configurado con detalle de producto"
    ],
    ctaText: "Quiero este plan",
    highlighted: true,
    gradient: "from-violet-600 via-indigo-600 to-cyan-500"
  },
  {
    id: "pro",
    name: "Catálogo Pro & Pedidos",
    tagline: "Tu canal de ventas automatizado sin comisiones externas",
    focus: "Para comercios, distribuidores o negocios con inventarios amplios que buscan un flujo de ventas organizado.",
    features: [
      "Todo lo incluido en los Planes Esenciales e Interactivos",
      "Panel autoadministrable robusto (gestiona hasta 1,000 productos)",
      "Buscador inteligente integrado y filtros rápidos por categorías",
      "Carrito de compras interactivo para acumular productos",
      "Botón de Envío de Pedido estructurado a WhatsApp",
      "Generación automática de ticket con detalle de compra en el chat",
      "Optimización SEO avanzada e integración de Google Analytics",
      "Carga ultra rápida de imágenes en formato WebP de última generación"
    ],
    ctaText: "Cotizar catálogo Pro",
    highlighted: false,
    gradient: "from-indigo-600 to-purple-600"
  }
];

export default function PricingCards({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) {
  return (
    <section id="pricing" className="py-24 bg-brand-bg relative">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
            Nuestros Planes
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
            Elige el Canal Ideal para tu Negocio
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Desarrollamos soluciones adaptadas a tu nivel de operación. Todos nuestros costos <strong>ya incluyen impuestos</strong> facturables. Elige tu plan y cotiza sin compromisos.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all duration-300 ${
                plan.highlighted 
                  ? 'bg-slate-900/60 border-2 border-violet-500 shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] lg:scale-105 z-10 my-8 lg:my-0' 
                  : 'glass-card border border-white/[0.06] hover:border-white/[0.12] shadow-xl'
              }`}
            >
              {/* Highlight badge */}
              {plan.highlighted && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-violet-500/30">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  El más popular
                </div>
              )}

              {/* Top part */}
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                  {plan.id === "esencial" ? "PLAN 1" : plan.id === "vitrina" ? "PLAN 2" : "PLAN 3"}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-extrabold text-white mt-2 mb-3">
                  {plan.name}
                </h3>
                <p className="text-xs text-cyan-400 font-semibold mb-4 bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 rounded-lg inline-block">
                  {plan.tagline}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {plan.focus}
                </p>
                
                <hr className="border-white/[0.06] mb-6" />

                {/* Features list */}
                <ul className="space-y-3.5 text-left mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${
                        plan.highlighted ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-800 text-slate-400'
                      }`}>
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-slate-300 text-sm leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom part (CTA) */}
              <div>
                <button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-center ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] hover:-translate-y-0.5'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 fill-current opacity-70 group-hover:scale-110 transition-transform" />
                  {plan.ctaText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
