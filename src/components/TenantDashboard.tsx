import React, { useState } from 'react';
import { Store, ShoppingBag, Sliders, CreditCard, ExternalLink, Copy, Check, Plus, Trash2, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react';
import type { TenantStore, StoreProduct } from '../types/tenant';
import { TenantStorageService, PLANS } from '../services/tenantStore';

interface TenantDashboardProps {
  initialStore?: TenantStore;
  onOpenStore: (slug: string) => void;
  onBackToMain: () => void;
  onCreateNewStore: () => void;
}

const COLOR_SWATCHES = [
  { name: 'Verde Esmeralda', hex: '#00b37e' },
  { name: 'Azul Real', hex: '#2563eb' },
  { name: 'Púrpura Vibrante', hex: '#7c3aed' },
  { name: 'Rojo Coral', hex: '#e11d48' },
  { name: 'Ámbar Cálido', hex: '#d97706' },
  { name: 'Slate Ejecutivo', hex: '#0f172a' }
];

export default function TenantDashboard({ initialStore, onOpenStore, onBackToMain, onCreateNewStore }: TenantDashboardProps) {
  const [allStores, setAllStores] = useState<TenantStore[]>(() => TenantStorageService.getAllStores());
  const [activeStore, setActiveStore] = useState<TenantStore>(() => initialStore || TenantStorageService.getActiveTenant());
  const [activeTab, setActiveTab] = useState<'brand' | 'catalog' | 'subscription'>('catalog');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for brand customization
  const [businessName, setBusinessName] = useState(activeStore.businessName);
  const [tagline, setTagline] = useState(activeStore.tagline);
  const [description, setDescription] = useState(activeStore.description);
  const [whatsapp, setWhatsapp] = useState(activeStore.whatsapp);
  const [brandColor, setBrandColor] = useState(activeStore.brandColor);
  const [address, setAddress] = useState(activeStore.address || '');
  const [hours, setHours] = useState(activeStore.hours || '');

  // Modal for new product
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('General');
  const [newProdPrice, setNewProdPrice] = useState<number>(100);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdIcon, setNewProdIcon] = useState('📦');

  // Handle switching active store
  const handleSelectStore = (storeId: string) => {
    const s = allStores.find(item => item.id === storeId);
    if (s) {
      setActiveStore(s);
      TenantStorageService.setActiveTenantId(s.id);
      setBusinessName(s.businessName);
      setTagline(s.tagline);
      setDescription(s.description);
      setWhatsapp(s.whatsapp);
      setBrandColor(s.brandColor);
      setAddress(s.address || '');
      setHours(s.hours || '');
    }
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}/p/${activeStore.slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = TenantStorageService.updateStore(activeStore.id, {
      businessName,
      tagline,
      description,
      whatsapp: whatsapp.replace(/\D/g, ''),
      brandColor,
      address,
      hours
    });

    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const newProd: StoreProduct = {
      id: `p-${Date.now()}`,
      name: newProdName.trim(),
      category: newProdCategory.trim() || 'General',
      price: Number(newProdPrice) || 0,
      description: newProdDesc.trim(),
      iconText: newProdIcon.trim() || '📦',
      inStock: true
    };

    const updatedProducts = [newProd, ...activeStore.products];
    const updated = TenantStorageService.updateStore(activeStore.id, {
      products: updatedProducts
    });

    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setIsNewProductModalOpen(false);
      setNewProdName('');
      setNewProdPrice(100);
      setNewProdDesc('');
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = activeStore.products.filter(p => p.id !== productId);
    const updated = TenantStorageService.updateStore(activeStore.id, {
      products: updatedProducts
    });

    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
    }
  };

  const currentPlan = PLANS[activeStore.planId];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col justify-between text-left">
      
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMain}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Volver al sitio de Dayabit"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Store Switcher */}
            <div className="flex items-center gap-2">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
                style={{ backgroundColor: activeStore.brandColor }}
              >
                <Store className="w-5 h-5" />
              </div>
              <div>
                <select
                  value={activeStore.id}
                  onChange={(e) => handleSelectStore(e.target.value)}
                  className="font-display font-bold text-slate-900 text-sm sm:text-base bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  {allStores.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.businessName} ({PLANS[s.planId].name})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 font-mono">
                  dayabit.com/p/{activeStore.slug}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCreateNewStore}
              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" /> Nueva Tienda
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00b37e]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLink ? '¡Enlace Copiado!' : 'Copiar Link'}
            </button>

            <button
              onClick={() => onOpenStore(activeStore.slug)}
              className="px-4 py-2 rounded-xl bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver Tienda en Vivo
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Catálogo de Productos ({activeStore.products.length})
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'brand'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Identidad & WhatsApp
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'subscription'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Suscripción & Plan
          </button>
        </div>

        {/* ================= TAB 1: CATALOG MANAGEMENT ================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                <h3 className="font-display font-black text-xl text-slate-900">
                  Tus Productos y Artículos en Venta
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Capacidad de tu plan: {activeStore.products.length} de {currentPlan.maxProducts} artículos permitidos.
                </p>
              </div>

              <button
                onClick={() => setIsNewProductModalOpen(true)}
                className="px-5 py-2.5 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer w-fit"
              >
                <Plus className="w-4 h-4" />
                Agregar Artículo
              </button>
            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeStore.products.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                      {prod.iconText || '📦'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                        {prod.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm truncate mt-1">
                        {prod.name}
                      </h4>
                      <p className="font-mono font-black text-sm text-slate-900 mt-1">
                        ${prod.price} MXN
                      </p>
                    </div>
                  </div>

                  {prod.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 mt-3 pt-3 border-t border-slate-100">
                      {prod.description}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> En existencia
                    </span>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {activeStore.products.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-sm">
                Aún no has agregado productos. Haz clic en "Agregar Artículo" para comenzar.
              </div>
            )}

          </div>
        )}

        {/* ================= TAB 2: BRAND & WHATSAPP SETTINGS ================= */}
        {activeTab === 'brand' && (
          <div className="max-w-2xl bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-xs">
            
            <div className="mb-6">
              <h3 className="font-display font-black text-xl text-slate-900">
                Personaliza la Identidad de tu Tienda
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Los cambios se reflejan inmediatamente en tu URL pública.
              </p>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nombre Comercial</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00b37e]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">WhatsApp para Recibir Pedidos</label>
                <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden">
                  <span className="px-3 bg-slate-50 text-slate-400 text-xs font-mono select-none">+52</span>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="flex-1 py-2.5 px-2 text-sm focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">10 dígitos sin espacios ni guiones.</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Color Distintivo de Marca</label>
                <div className="flex flex-wrap gap-3 pt-1">
                  {COLOR_SWATCHES.map(swatch => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => setBrandColor(swatch.hex)}
                      title={swatch.name}
                      className={`w-8 h-8 rounded-full transition-transform flex items-center justify-center cursor-pointer ${
                        brandColor === swatch.hex ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {brandColor === swatch.hex && <Check className="w-4 h-4 text-white stroke-[3]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Eslogan de Cabecera</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00b37e]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Descripción o Bienvenida</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00b37e]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Horario de Atención</label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="Ej. Lun a Sáb: 9am - 7pm"
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Dirección o Ciudad</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej. Cuautitlán Izcalli, Edo. Méx."
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Guardar Cambios
                </button>

                {saveSuccess && (
                  <span className="text-xs font-bold text-[#00b37e] flex items-center gap-1 animate-in fade-in">
                    <Check className="w-4 h-4" /> ¡Guardado con éxito!
                  </span>
                )}
              </div>

            </form>
          </div>
        )}

        {/* ================= TAB 3: SUBSCRIPTION & PLAN ================= */}
        {activeTab === 'subscription' && (
          <div className="max-w-2xl bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Suscripción Activa
                </span>
                <h3 className="font-display font-black text-2xl text-slate-900 mt-2">
                  {currentPlan.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Facturación fiscal con CFDI 4.0 al día.
                </p>
              </div>

              <div className="text-right">
                <span className="font-display font-black text-2xl text-slate-900 font-mono">
                  ${currentPlan.priceMxn}
                </span>
                <span className="text-xs text-slate-500 block">MXN / {currentPlan.period}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Fecha de renovación automática:</span>
                <span className="font-bold text-slate-800">{activeStore.subscriptionPeriodEnd || '2027-03-15'}</span>
              </div>
              <div className="flex justify-between">
                <span>Capacidad de productos:</span>
                <span className="font-bold text-slate-800">{currentPlan.maxProducts} artículos</span>
              </div>
              <div className="flex justify-between">
                <span>WhatsApp Ordering System:</span>
                <span className="font-bold text-emerald-700">{currentPlan.hasOrderingSystem ? 'Habilitado ✓' : 'No incluido'}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/525625785033?text=Hola%20Dayabit,%20quiero%20mejorar%20el%20plan%20de%20mi%20tienda."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs inline-flex items-center gap-2 decoration-none"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Solicitar Cambio de Plan
              </a>
            </div>

          </div>
        )}

      </main>

      {/* ================= MODAL: ADD PRODUCT ================= */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 text-left space-y-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h4 className="font-display font-bold text-lg text-slate-900">
                Agregar Nuevo Artículo
              </h4>
              <button
                onClick={() => setIsNewProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nombre del Producto / Servicio</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Torta de Pastor Especial"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Precio ($ MXN)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Categoría</label>
                  <input
                    type="text"
                    placeholder="Ej. Platillos"
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Emoji / Icono representativo</label>
                <input
                  type="text"
                  placeholder="Ej. 🌮 o 👕 o 💼"
                  value={newProdIcon}
                  onChange={(e) => setNewProdIcon(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none text-base"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Descripción breve</label>
                <textarea
                  rows={2}
                  placeholder="Ingredientes, tallas o detalles relevantes..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold cursor-pointer shadow-xs"
                >
                  Guardar en Catálogo
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-5 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
        Panel de Administración Multi-Tenant · Dayabit SaaS Cloud
      </footer>

    </div>
  );
}
