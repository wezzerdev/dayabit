import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Sparkles, Store } from 'lucide-react';
import type { PlanTier, TenantStore } from '../types/tenant';
import { PLANS, TenantStorageService } from '../services/tenantStore';

interface OnboardingFlowProps {
  initialPlanId?: PlanTier;
  onClose: () => void;
  onSuccess: (newStore: TenantStore) => void;
}

const COLOR_SWATCHES = [
  { name: 'Verde Esmeralda', hex: '#00b37e' },
  { name: 'Azul Real', hex: '#2563eb' },
  { name: 'Púrpura Vibrante', hex: '#7c3aed' },
  { name: 'Rojo Coral', hex: '#e11d48' },
  { name: 'Ámbar Cálido', hex: '#d97706' },
  { name: 'Slate Ejecutivo', hex: '#0f172a' }
];

export default function OnboardingFlow({ initialPlanId = 'vitrina', onClose, onSuccess }: OnboardingFlowProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPlan, setSelectedPlan] = useState<PlanTier>(initialPlanId);

  // Form states
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [slug, setSlug] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [brandColor, setBrandColor] = useState('#00b37e');
  const [category, setCategory] = useState('Comercio');
  const [tagline, setTagline] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [createdStore, setCreatedStore] = useState<TenantStore | null>(null);

  // Automatically suggest slug when business name changes
  const handleBusinessNameChange = (val: string) => {
    setBusinessName(val);
    if (!slug || slug === businessName.toLowerCase().replace(/[^a-z0-9]/g, '-')) {
      const generated = val.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      setSlug(generated);
    }
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment verification and store provisioning
    setTimeout(() => {
      const cleanPhone = whatsapp.replace(/\D/g, '');
      const newStore = TenantStorageService.createStore({
        slug: slug.trim().toLowerCase() || `tienda-${Date.now().toString().slice(-4)}`,
        businessName: businessName.trim() || 'Mi Negocio',
        ownerName: ownerName.trim() || 'Administrador',
        ownerEmail: ownerEmail.trim() || 'admin@minegocio.com',
        planId: selectedPlan,
        whatsapp: cleanPhone || '5625785033',
        brandColor,
        tagline: tagline.trim() || 'Los mejores productos con atención directa por WhatsApp',
        description: `Bienvenido a la tienda oficial de ${businessName}. Elige tus artículos favoritos y te atenderemos con gusto por WhatsApp.`,
        category,
        subscriptionStatus: 'active',
        subscriptionPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        products: [
          {
            id: 'demo-item-1',
            name: 'Producto Destacado #1',
            category: 'Populares',
            price: 250,
            description: 'Excelente calidad y disponibilidad inmediata para entrega.',
            iconText: '⭐',
            inStock: true
          },
          {
            id: 'demo-item-2',
            name: 'Producto Especial #2',
            category: 'Populares',
            price: 490,
            description: 'Garantía oficial y envío rápido.',
            iconText: '📦',
            inStock: true
          }
        ]
      });

      setCreatedStore(newStore);
      setIsProcessing(false);
      setStep(4);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl sm:rounded-[36px] border border-slate-200 shadow-2xl p-6 sm:p-9 relative flex flex-col my-auto text-left">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00b37e] text-white flex items-center justify-center font-bold text-sm">
              D
            </div>
            <div>
              <h3 className="font-display font-black text-slate-900 text-base sm:text-lg">
                Crea tu Tienda en Dayabit
              </h3>
              <p className="text-xs text-slate-500">
                Paso {step} de 4 · Configuración inicial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-xs font-bold"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-[#00b37e] transition-all duration-300 rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step Contents */}
        <AnimatePresence mode="wait">
          
          {/* ================= STEP 1: PLAN SELECTION ================= */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-display font-black text-xl text-slate-900">
                  Selecciona el paquete para tu empresa
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Podrás cambiar de plan o cancelar tu suscripción en cualquier momento.
                </p>
              </div>

              <div className="space-y-3">
                {(Object.keys(PLANS) as PlanTier[]).map((planKey) => {
                  const p = PLANS[planKey];
                  const isSelected = selectedPlan === planKey;
                  return (
                    <div
                      key={planKey}
                      onClick={() => setSelectedPlan(planKey)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected 
                          ? 'border-[#00b37e] bg-emerald-50/40 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-slate-900 text-sm sm:text-base">
                            {p.name}
                          </h5>
                          {planKey === 'vitrina' && (
                            <span className="text-[10px] font-black uppercase text-white bg-[#00b37e] px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 max-w-md">
                          {p.tagline}
                        </p>
                      </div>

                      <div className="flex items-center sm:flex-col sm:items-end justify-between shrink-0">
                        <span className="font-display font-black text-lg text-slate-900">
                          ${p.priceMxn} <span className="text-xs font-normal text-slate-500">MXN/{p.period}</span>
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          IVA incluido
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2: ACCOUNT DATA ================= */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <h4 className="font-display font-black text-xl text-slate-900">
                  Crea tu cuenta de administrador
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Con estos datos iniciarás sesión para administrar tu catálogo.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tu Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="juan@empresa.com"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Contraseña</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    defaultValue="clave-segura-2026"
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800"
                  />
                  <p className="text-[11px] text-slate-400">Mínimo 8 caracteres</p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-full text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Regresar
                </button>
                <button
                  type="button"
                  disabled={!ownerName.trim() || !ownerEmail.trim()}
                  onClick={() => setStep(3)}
                  className={`px-8 py-3 rounded-full text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                    ownerName.trim() && ownerEmail.trim()
                      ? 'bg-[#00b37e] hover:bg-[#009e6f] cursor-pointer'
                      : 'bg-slate-300 cursor-not-allowed'
                  }`}
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: BUSINESS & BRANDING ================= */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <h4 className="font-display font-black text-xl text-slate-900">
                  Configura los datos de tu empresa
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Tu plantilla se generará de forma automática con estos parámetros.
                </p>
              </div>

              <form onSubmit={handleCreateStore} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nombre de la Empresa o Negocio</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Taquería Los Primos"
                    value={businessName}
                    onChange={(e) => handleBusinessNameChange(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800"
                  />
                </div>

                {/* Custom URL slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Tu Enlace Web Exclusivo</label>
                  <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden bg-slate-50 text-xs">
                    <span className="px-3 text-slate-400 font-mono select-none">dayabit.com/p/</span>
                    <input
                      type="text"
                      required
                      placeholder="mi-negocio"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                      className="flex-1 py-2.5 px-2 bg-white focus:outline-none text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                {/* WhatsApp number for orders */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">WhatsApp Oficial para Recibir Pedidos</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 55 1234 5678 (10 dígitos)"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">Aquí te llegarán los tickets armados de tus clientes.</p>
                </div>

                {/* Business Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Giro de tu Negocio</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800 bg-white cursor-pointer"
                  >
                    <option value="Alimentos y Bebidas">Alimentos y Bebidas (Restaurantes, Cafés, Postres)</option>
                    <option value="Moda y Ropa">Moda, Ropa y Calzado</option>
                    <option value="Servicios Profesionales">Servicios Profesionales (Consultorías, Médicos, etc.)</option>
                    <option value="Tecnología y Accesorios">Tecnología y Electrónica</option>
                    <option value="Belleza y Cosmética">Belleza, Estética y Cuidado Personal</option>
                    <option value="Comercio General">Comercio General / Distribuidora</option>
                  </select>
                </div>

                {/* Color Palette Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Color Principal de tu Marca</label>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {COLOR_SWATCHES.map((swatch) => (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => setBrandColor(swatch.hex)}
                        title={swatch.name}
                        className={`w-8 h-8 rounded-full transition-transform flex items-center justify-center cursor-pointer shadow-xs ${
                          brandColor === swatch.hex ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      >
                        {brandColor === swatch.hex && <Check className="w-4 h-4 text-white stroke-[3]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tagline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Eslogan o Frase Breve</label>
                  <input
                    type="text"
                    placeholder="Ej. El mejor sabor casero entregado a tu puerta"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-sm text-slate-800"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-full text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Regresar
                  </button>
                  <button
                    type="submit"
                    disabled={!businessName.trim() || !whatsapp.trim() || isProcessing}
                    className={`px-8 py-3 rounded-full text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                      businessName.trim() && whatsapp.trim() && !isProcessing
                        ? 'bg-[#00b37e] hover:bg-[#009e6f] cursor-pointer'
                        : 'bg-slate-300 cursor-not-allowed'
                    }`}
                  >
                    {isProcessing ? 'Generando tu plantilla...' : 'Activar mi Tienda Ahora'}
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ================= STEP 4: SUCCESS CONFIRMATION ================= */}
          {step === 4 && createdStore && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center space-y-6"
            >
              <div className="w-18 h-18 rounded-full bg-emerald-100 text-[#00b37e] flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-9 h-9 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-black text-2xl text-slate-900">
                  ¡Felicidades! Tu Tienda está en Vivo 🎉
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Hemos generado tu plantilla exclusiva bajo el paquete <strong>{PLANS[createdStore.planId].name}</strong>.
                </p>
              </div>

              {/* URL Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tu Enlace Público Oficial</span>
                <div className="font-mono text-sm font-bold text-[#00b37e] break-all">
                  https://dayabit.com/p/{createdStore.slug}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onSuccess(createdStore)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Store className="w-4 h-4" />
                  Ir al Panel de Administración
                </button>
                <a
                  href={`/p/${createdStore.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 decoration-none"
                >
                  Ver mi Tienda en Vivo →
                </a>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
}
