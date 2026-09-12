import { motion } from 'framer-motion';
import { Check, Star, MessageSquare } from 'lucide-react';

const plans = [
  {
    id: "esencial",
    name: "Landing Page Esencial",
    badge: "Presencia Inicial",
    tagline: "La carta de presentación digital que tu empresa necesita",
    focus: "Diseñado para empresas y profesionales que no tienen página web y necesitan presencia corporativa inmediata en Google y WhatsApp.",
    price: "$749",
    period: "MXN / año",
    features: [
      "Landing Page corporativa adaptada a tu empresa",
      "Sección de Quiénes Somos, Servicios y Propuesta de Valor",
      "Galería destacada de proyectos o productos",
      "Botón directo de contacto a WhatsApp",
      "Horarios de atención y mapa interactivo",
      "Optimización de velocidad (carga en menos de 1s)",
      "SEO estructurado para Google y Google Ads",
      "Facturación con CFDI 4.0 incluida"
    ],
    ctaText: "Elegir Landing Page Esencial",
    highlighted: false
  },
  {
    id: "vitrina",
    name: "Landing Page + Catálogo Web",
    badge: "MÁS VENDIDO",
    tagline: "El equilibrio perfecto entre presencia empresarial y ventas",
    focus: "Para empresas y comercios que quieren mostrar su catálogo de productos y recibir pedidos directos a su WhatsApp sin pagar comisiones.",
    price: "$1,499",
    period: "MXN / año",
    features: [
      "Todo lo incluido en la Landing Page Esencial",
      "Catálogo Web interactivo estructurado por categorías",
      "Capacidad para hasta 50 productos en vitrina digital",
      "Botón de pedido por WhatsApp en cada producto",
      "Mensaje de WhatsApp prearmado con código de producto",
      "Panel autoadministrable fácil (cambia precios y fotos)",
      "Diseño 100% optimizado para celulares",
      "Soporte y asesoría técnica garantizada"
    ],
    ctaText: "Elegir Landing Page + Catálogo",
    highlighted: true
  },
  {
    id: "pro",
    name: "Landing Page + WhatsApp Ordering System",
    badge: "Empresarial Completo",
    tagline: "Tu canal de ventas y cotizaciones automatizado a WhatsApp",
    focus: "Para empresas, distribuidoras o comercios con inventario amplio que necesitan carrito de compra con ticket automático.",
    price: "$2,899",
    period: "MXN / año",
    features: [
      "Todo lo incluido en los Planes anteriores",
      "WhatsApp Ordering System completo con carrito",
      "Panel autoadministrable robusto (hasta 1,000 productos)",
      "Buscador predictivo y filtros avanzados por categorías",
      "Generación automática de ticket con desglose y total",
      "Envío de orden estructurada con un clic a WhatsApp",
      "Integración analítica con Google Ads & Meta Pixel",
      "Carga de imágenes WebP ultralivianas"
    ],
    ctaText: "Elegir WhatsApp Ordering System",
    highlighted: false
  }
];

export default function PricingCards({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) {
  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
            Inversión Clara para tu Empresa
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            Elige la Landing Page Ideal para tu Negocio
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Sin tarifas ocultas ni comisiones por transacción. Todos nuestros costos <strong>ya incluyen impuestos</strong> y factura fiscal CFDI 4.0.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl transition-all duration-300 ${
                plan.highlighted 
                  ? 'bg-white border-2 border-[#00b37e] shadow-2xl lg:scale-105 z-10 my-4 lg:my-0' 
                  : 'bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl'
              }`}
            >
              {/* Highlight badge */}
              {plan.highlighted && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#00b37e] text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-white" />
                  {plan.badge}
                </div>
              )}

              {/* Top part */}
              <div>
                {!plan.highlighted && (
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {plan.badge}
                  </span>
                )}
                
                <h3 className="text-2xl font-display font-black text-slate-900 mt-1 mb-2">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                    {plan.price}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <p className="text-xs text-emerald-800 font-semibold mb-4 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-xl inline-block">
                  {plan.tagline}
                </p>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {plan.focus}
                </p>
                
                <hr className="border-slate-100 mb-6" />

                {/* Features list */}
                <ul className="space-y-3 text-left mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5">
                      <div className="p-0.5 rounded-full shrink-0 mt-0.5 bg-emerald-50 text-[#00b37e]">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-xs sm:text-sm leading-snug">
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
                  className={`w-full py-3.5 px-6 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer text-center ${
                    plan.highlighted
                      ? 'bg-[#00b37e] hover:bg-[#009e6f] text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5'
                      : 'bg-slate-900 hover:bg-slate-800 text-white hover:-translate-y-0.5'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 fill-current opacity-80 group-hover:scale-110 transition-transform" />
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
