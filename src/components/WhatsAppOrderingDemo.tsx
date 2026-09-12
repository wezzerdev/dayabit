import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2, MessageCircle, Smartphone, ShoppingBag, ArrowRight, DollarSign, Zap, FileText, Sliders } from 'lucide-react';

export default function WhatsAppOrderingDemo() {
  // Interactive ordering state (1: Empty/Select, 2: Cart Filled, 3: Completed)
  const [orderStep, setOrderStep] = useState<1 | 2 | 3>(2);

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
    <div className="space-y-28 py-20 bg-white relative overflow-hidden">
      
      {/* =========================================================================
          BLOCK 1: WhatsApp Ordering System (Inspired by Pulpos Screenshots 1, 2, 3)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & 4 Benefits */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <div className="space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
                WhatsApp Ordering System
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-[1.15]">
                Catálogo Web con Pedidos a WhatsApp: Así compran tus clientes
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Un cliente común no quiere descargar aplicaciones pesadas ni llenar registros tediosos. Con tu Landing Page empresarial, tus clientes exploran tus productos y te envían su pedido armado directo a tu WhatsApp con un solo clic.
              </p>
            </div>

            {/* 4 Feature Cards Grid (Like Pulpos screenshots 1, 2, 3) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#00b37e]">
                  <ShoppingBag className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">Tickets Claros</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Recibes el resumen detallado con fotos, modelos y el total calculado en tu chat.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-600">
                  <Smartphone className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">Sin Descargar Apps</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Tu cliente navega desde cualquier navegador en su celular de manera instantánea.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-amber-600">
                  <DollarSign className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">0% Comisiones</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Cobras directo a tu cuenta por transferencia o contra entrega sin intermediarios.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-600">
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">Cierre en WhatsApp</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Atención humana que genera confianza y fideliza a tus compradores para siempre.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={scrollToPricing}
                className="px-8 py-3.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                Probar Gratis
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Demonstration Card (Exact replica of Pulpos 1, 2, 3) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg bg-[#f8fafc] p-3 sm:p-5 rounded-[36px] border border-slate-200/80 shadow-2xl relative">
              
              {/* Step switcher tabs */}
              <div className="flex items-center justify-between gap-1 mb-4 p-1.5 bg-white rounded-2xl border border-slate-200 text-xs">
                <button
                  onClick={() => setOrderStep(1)}
                  className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
                    orderStep === 1 
                      ? 'bg-[#00b37e] text-white shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  1. Vacío
                </button>
                <button
                  onClick={() => setOrderStep(2)}
                  className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
                    orderStep === 2 
                      ? 'bg-[#00b37e] text-white shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  2. Con Productos
                </button>
                <button
                  onClick={() => setOrderStep(3)}
                  className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
                    orderStep === 3 
                      ? 'bg-[#00b37e] text-white shadow-xs' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  3. Pedido Enviado
                </button>
              </div>

              {/* Mockup Screen Container */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm min-h-[440px] flex flex-col justify-between text-left relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {/* STATE 1: Empty Cart (Pulpos Screenshot 1) */}
                  {orderStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">
                          Catálogo de tu Negocio
                        </h3>
                        <div className="relative mb-8">
                          <input
                            type="text"
                            disabled
                            placeholder="Busca o selecciona tus productos..."
                            className="w-full py-3 px-4 pl-10 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 select-none"
                          />
                          <ShoppingBag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        </div>

                        <div className="py-14 text-center space-y-2">
                          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                            <ShoppingBag className="w-6 h-6" />
                          </div>
                          <p className="text-sm font-bold text-slate-700">Tu carrito está vacío</p>
                          <p className="text-xs text-slate-400 max-w-xs mx-auto">
                            Tus clientes eligen productos directamente desde tu Landing Page
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setOrderStep(2)}
                        className="w-full py-3.5 rounded-2xl bg-slate-100 text-slate-400 font-bold text-sm cursor-pointer hover:bg-emerald-50 hover:text-[#00b37e] transition-colors"
                      >
                        Hacer clic para agregar productos de prueba →
                      </button>
                    </motion.div>
                  )}

                  {/* STATE 2: Filled Cart with Products (Pulpos Screenshot 2) */}
                  {orderStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex-1 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-lg font-bold text-slate-900">
                            Resumen de Compra
                          </h3>
                          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            3 Artículos
                          </span>
                        </div>

                        <div className="space-y-2.5 mb-6">
                          {/* Item 1 */}
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-base shadow-2xs">
                                🎧
                              </div>
                              <div>
                                <h5 className="font-bold text-xs text-slate-800">Auriculares Pro F453</h5>
                                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                                  25% OFF
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-xs text-slate-800 font-mono">$200.00</span>
                          </div>

                          {/* Item 2 */}
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-base shadow-2xs">
                                🔋
                              </div>
                              <div>
                                <h5 className="font-bold text-xs text-slate-800">Termo Inteligente LCD</h5>
                                <span className="text-[10px] text-slate-400">Color Negro Mate</span>
                              </div>
                            </div>
                            <span className="font-bold text-xs text-slate-800 font-mono">$150.00</span>
                          </div>

                          {/* Item 3 */}
                          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-base shadow-2xs">
                                ☕
                              </div>
                              <div>
                                <h5 className="font-bold text-xs text-slate-800">Café de Especialidad 250g</h5>
                                <span className="text-[10px] text-slate-400">Tueste Medio</span>
                              </div>
                            </div>
                            <span className="font-bold text-xs text-slate-800 font-mono">$50.00</span>
                          </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="pt-3 border-t border-slate-100 space-y-1 text-xs">
                          <div className="flex justify-between text-slate-500">
                            <span>Subtotal</span>
                            <span className="font-mono">$450.00</span>
                          </div>
                          <div className="flex justify-between text-slate-900 font-bold text-base pt-1">
                            <span>Total a pagar</span>
                            <span className="font-mono text-[#00b37e]">$400.00 MXN</span>
                          </div>
                        </div>
                      </div>

                      {/* Primary WhatsApp Action Button */}
                      <button
                        onClick={() => setOrderStep(3)}
                        className="w-full py-4 rounded-2xl bg-[#00b37e] hover:bg-[#009e6f] text-white font-black text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                        Pedir por WhatsApp ($400.00 MXN)
                      </button>
                    </motion.div>
                  )}

                  {/* STATE 3: Success Confirmation (Pulpos Screenshot 3) */}
                  {orderStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex-1 bg-[#00b37e] text-white -m-5 sm:-m-6 p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                        <Check className="w-10 h-10 text-white stroke-[3.5]" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-3xl font-display font-black text-white">¡Listo!</h4>
                        <p className="text-lg font-bold text-emerald-100">
                          Recibiste el pedido por $400.00 MXN
                        </p>
                        <p className="text-xs text-emerald-100/80 max-w-xs pt-1">
                          El cliente fue redirigido a tu WhatsApp con el mensaje ya estructurado para que tú solo confirmes la entrega.
                        </p>
                      </div>

                      <button
                        onClick={() => setOrderStep(2)}
                        className="mt-4 px-6 py-2.5 rounded-full bg-white text-[#00b37e] font-bold text-xs shadow-md hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Volver a probar demostración
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 2: Self-Manageable Catalog (Inspired by Pulpos Screenshot 4)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Product Edit Mockup (Like Pulpos Screenshot 4) */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-lg bg-[#f8fafc] p-3 sm:p-5 rounded-[36px] border border-slate-200/80 shadow-2xl relative">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5 text-left">
                
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">SKU: PROD-JBL-01</span>
                    <h4 className="font-display font-bold text-lg text-slate-900">Bocina Inalámbrica Resistente</h4>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Activo en Catálogo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Precio al Público</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-800">
                      $ 349.00 MXN
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Unidades en Existencia</label>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm font-bold text-slate-800">
                      24 piezas
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Descripción Comercial</label>
                  <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    Sonido envolvente 360°, batería de 12 horas y resistencia a salpicaduras. Incluye cable USB-C.
                  </p>
                </div>

                {/* Green Save Success Pill (Like in Pulpos 4) */}
                <div className="p-3 rounded-xl bg-[#00b37e] text-white flex items-center gap-2 text-xs font-bold shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Los cambios han sido guardados y están en vivo</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Copywriting for Self-Management */}
          <div className="lg:col-span-6 space-y-7 text-left order-1 lg:order-2">
            <div className="space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
                Catálogo Autoadministrable
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-[1.15]">
                Lleva el control de tus productos sin depender de nadie
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Olvídate de pagarle a un programador cada vez que quieras cambiar un precio o subir una foto. Te entregamos un panel sumamente sencillo para que actualices tu catálogo en 2 minutos desde tu celular o computadora.
              </p>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00b37e] shrink-0 h-fit">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Cambios en Tiempo Real</h4>
                  <p className="text-slate-500 text-xs sm:text-sm">Editas un precio o producto y se actualiza al instante en tu Landing Page.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600 shrink-0 h-fit">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Organización por Categorías</h4>
                  <p className="text-slate-500 text-xs sm:text-sm">Estructura tus productos por giro: menús de comida, ropa, calzado o servicios profesionales.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToPricing}
                className="px-8 py-3.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                Ver Planes de Catálogo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          BLOCK 3: Formal Business Invoicing CFDI 4.0 (Inspired by Pulpos Screenshot 5)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Copywriting */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <div className="space-y-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 inline-block">
                Formalidad Fiscal SAT
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 leading-[1.15]">
                Factura tus ventas y genera total confianza a empresas
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Para que tu empresa crezca necesitas venderle a clientes corporativos y negocios que exigen factura fiscal. Todos nuestros servicios están formalmente respaldados ante el SAT con facturación CFDI 4.0.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#00b37e]">
                  <FileText className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">Facturación CFDI 4.0</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Generamos comprobantes fiscales digitales válidos para tus gastos corporativos.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-600">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">100% Deducible</h4>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Tu inversión en desarrollo web y presencia digital es totalmente deducible de impuestos.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToPricing}
                className="px-8 py-3.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                Cotizar con Factura Fiscal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Invoice Mockup (Like Pulpos Screenshot 5) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg bg-[#f8fafc] p-3 sm:p-5 rounded-[36px] border border-slate-200/80 shadow-2xl relative">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 text-left">
                
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#00b37e] text-white flex items-center justify-center font-bold text-xs">
                      SAT
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Comprobante Fiscal CFDI 4.0</h4>
                      <p className="text-[10px] text-slate-400">Folio: DAYA-2026-F945</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Timbrado Oficial
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Landing Page Empresarial + Dominio</p>
                      <p className="text-[10px] text-slate-500">Clave SAT: 81112105 (Diseño de páginas web)</p>
                    </div>
                    <span className="font-mono font-bold text-slate-800">$1,499.00</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Catálogo Web con Pedidos a WhatsApp</p>
                      <p className="text-[10px] text-slate-500">Integración directa WhatsApp Ordering System</p>
                    </div>
                    <span className="font-mono font-bold text-slate-800">Incluido</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-mono">$1,499.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>IVA Trasladado (16%)</span>
                    <span className="font-mono">$239.84</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-bold text-base pt-1">
                    <span>Total Facturado</span>
                    <span className="font-mono text-[#00b37e]">$1,738.84 MXN</span>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00b37e]" /> Emisión con XML y PDF entregados de inmediato
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
