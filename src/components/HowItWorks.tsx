import { motion } from 'framer-motion';
import { ClipboardList, Palette, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Diagnóstico y Diagnóstico (15 Minutos)",
    description: "Seleccionas el plan ideal o nos consultas tu idea. Agendamos una llamada rápida para comprender tu modelo de negocio, identidad de marca y principales productos."
  },
  {
    number: "02",
    icon: Palette,
    title: "Co-Diseño de Élite",
    description: "Estructuramos y programamos tu sitio web adaptándolo 100% a tu marca. Redactamos textos comerciales persuasivos enfocados en enganchar a tus visitas."
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Despegue y Ventas por WhatsApp",
    description: "Publicamos tu plataforma en servidores de alta velocidad. Tus clientes entran, exploran tus productos en segundos y te envían pedidos estructurados a tu chat."
  }
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 bg-[#080B14] relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#090C16] via-[#080B14] to-brand-bg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-24">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Paso a Paso
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white leading-tight">
            Tu Web Lista en 3 Simples Pasos
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            Olvídate de la complejidad técnica. Nosotros nos encargamos de todo el trabajo pesado mientras tú te enfocas en lo que mejor haces: vender.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/5 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-violet-600/30 via-indigo-500/50 to-cyan-400/30 z-0" />

          {/* Connector Line (Mobile Only) */}
          <div className="absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-violet-600/20 via-indigo-500/30 to-cyan-400/20 lg:hidden z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Number Orb */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-900 to-slate-950 border border-white/[0.08] flex items-center justify-center shadow-xl group-hover:border-violet-500/50 transition-colors duration-300">
                    <span className="font-display font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                      {step.number}
                    </span>
                  </div>
                  {/* Miniature Icon Badge */}
                  <div className="absolute -bottom-1.5 -right-1.5 p-2 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
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
