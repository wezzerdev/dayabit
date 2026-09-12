import { motion } from 'framer-motion';
import { ClipboardList, Palette, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Diagnóstico Rápido (15 Min)",
    description: "Eliges el plan que mejor se adapta a tu negocio o nos cuentas tu idea. Revisamos tus productos, tu identidad y tus canales de atención."
  },
  {
    number: "02",
    icon: Palette,
    title: "Diseño & Configuración",
    description: "Creamos y estructuramos tu tienda o catálogo digital a medida. Vinculamos tu número de WhatsApp para que los pedidos lleguen armados."
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Publicación y Ventas",
    description: "Lanzamos tu sitio web en alta velocidad con dominio propio. Tus clientes exploran tu menú o catálogo y te escriben listos para pagar."
  }
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
            Paso a Paso
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-tight">
            Tu Tienda Digital Lista en 3 Simples Pasos
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Sin enredos técnicos ni dolores de cabeza. Nosotros nos encargamos de todo para que tú solo atiendas nuevos pedidos.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-14 left-[20%] right-[20%] h-[2px] bg-slate-200 z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all group"
              >
                {/* Number Circle */}
                <div className="relative mb-6">
                  <div className="w-18 h-18 rounded-full bg-emerald-50 border-2 border-[#00b37e] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <span className="font-display font-black text-2xl text-[#00b37e]">
                      {step.number}
                    </span>
                  </div>
                  {/* Miniature Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-[#00b37e] text-white shadow-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-slate-900 mb-2.5">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
