import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, MessageCircle, MapPin, Clock, Plus, Minus, Trash2, Search, ArrowLeft, ExternalLink, X } from 'lucide-react';
import type { TenantStore, StoreProduct } from '../types/tenant';

interface StorefrontRendererProps {
  store: TenantStore;
  onBackToMain?: () => void;
}

interface CartItem {
  product: StoreProduct;
  quantity: number;
}

export default function StorefrontRenderer({ store, onBackToMain }: StorefrontRendererProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    store.products.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [store.products]);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return store.products.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = !searchQuery.trim() || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [store.products, activeCategory, searchQuery]);

  // Cart functions
  const addToCart = (product: StoreProduct) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const next = item.quantity + amount;
          return next > 0 ? { ...item, quantity: next } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Build WhatsApp pre-formatted order
  const generateWhatsAppOrderLink = () => {
    let text = `🛒 *NUEVO PEDIDO - ${store.businessName.toUpperCase()}*\n`;
    text += `=================================\n\n`;
    
    if (customerName.trim()) {
      text += `👤 *Cliente:* ${customerName.trim()}\n\n`;
    }

    text += `📋 *Productos solicitados:*\n`;
    cart.forEach(item => {
      text += `• ${item.quantity}x ${item.product.name} - $${item.product.price * item.quantity} MXN\n`;
    });

    text += `\n💰 *TOTAL: $${cartTotal} MXN*\n`;

    if (deliveryNotes.trim()) {
      text += `\n📝 *Notas:* ${deliveryNotes.trim()}\n`;
    }

    text += `\n=================================\n`;
    text += `Pedido generado desde la tienda web oficial.`;

    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const prefix = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
    return `https://wa.me/${prefix}?text=${encodeURIComponent(text)}`;
  };

  // Build individual product WhatsApp link for Plan 2 (Vitrina)
  const getProductQuoteLink = (product: StoreProduct) => {
    const text = `¡Hola *${store.businessName}*! Vi su catálogo web y me interesa ordenar:\n\n• *${product.name}* ($${product.price} MXN)\n\n¿Tienen disponibilidad y costos de envío?`;
    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const prefix = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
    return `https://wa.me/${prefix}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between"
      style={{ '--store-brand': store.brandColor } as React.CSSProperties}
    >
      {/* Top Banner & Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToMain && (
              <button
                onClick={onBackToMain}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Volver al portal principal"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
                style={{ backgroundColor: store.brandColor }}
              >
                {store.businessName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="font-display font-black text-slate-900 text-sm sm:text-base leading-tight">
                  {store.businessName}
                </h1>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Tienda Verificada ✓
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct WhatsApp chat button */}
            <a
              href={`https://wa.me/52${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${store.businessName}, vi su página web y me gustaría información.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors text-xs font-bold decoration-none"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#00b37e]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Cart Button (Only for Plan Pro Tier 3) */}
            {store.planId === 'pro' && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-3.5 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 cursor-pointer"
                style={{ backgroundColor: store.brandColor }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Carrito ({totalItemsCount})</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-5 py-8 w-full space-y-10">
        
        {/* ================= HERO SECTION ================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs relative overflow-hidden text-left">
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: store.brandColor }}
          />

          <div className="max-w-2xl space-y-4 relative z-10">
            <span 
              className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block"
              style={{ color: store.brandColor, backgroundColor: `${store.brandColor}15` }}
            >
              {store.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 leading-tight">
              {store.tagline}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {store.description}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500">
              {store.hours && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{store.hours}</span>
                </div>
              )}
              {store.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{store.address}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= TEMPLATE 1: PLAN ESENCIAL (SERVICES & PORTFOLIO) ================= */}
        {store.planId === 'esencial' && (
          <section className="space-y-6 text-left">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display font-black text-xl text-slate-900">
                  Nuestros Servicios & Especialidades
                </h3>
                <p className="text-xs text-slate-500">
                  Consulta de forma directa a nuestro WhatsApp para una cotización personalizada.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {store.products.map(item => (
                <div 
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="text-3xl">{item.iconText || '💼'}</div>
                    <h4 className="font-bold text-slate-900 text-base">{item.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      ${item.price} MXN
                    </span>
                    <a
                      href={`https://wa.me/52${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${store.businessName}, me interesa solicitar información sobre su servicio: *${item.name}*.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-xs transition-opacity hover:opacity-90 flex items-center gap-1 decoration-none"
                      style={{ backgroundColor: store.brandColor }}
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Cotizar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= TEMPLATES 2 & 3: VITRINA DIGITAL & WHATSAPP ORDERING ================= */}
        {(store.planId === 'vitrina' || store.planId === 'pro') && (
          <section className="space-y-6 text-left">
            
            {/* Search & Categories Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeCategory === 'all'
                      ? 'text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                  style={activeCategory === 'all' ? { backgroundColor: store.brandColor } : {}}
                >
                  Todos ({store.products.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      activeCategory === cat
                        ? 'text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                    style={activeCategory === cat ? { backgroundColor: store.brandColor } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Buscar en el catálogo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-3 pl-9 rounded-full bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none shadow-2xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map(product => {
                const inCart = cart.find(c => c.product.id === product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="w-full h-36 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl shadow-inner relative">
                        {product.iconText || '📦'}
                        {product.category && (
                          <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-slate-500 bg-white/90 border border-slate-200 px-2 py-0.5 rounded-full">
                            {product.category}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-base line-clamp-1">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {product.description || 'Disponible para pedido inmediato con atención por WhatsApp.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-mono font-black text-slate-900 text-base">
                        ${product.price} <span className="text-[10px] font-normal text-slate-400">MXN</span>
                      </span>

                      {/* If Plan 3 (Pro): Cart Addition Button */}
                      {store.planId === 'pro' ? (
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer"
                          style={{ backgroundColor: store.brandColor }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          {inCart ? `En Carrito (${inCart.quantity})` : 'Agregar'}
                        </button>
                      ) : (
                        /* If Plan 2 (Vitrina): Direct WhatsApp Quote Link */
                        <a
                          href={getProductQuoteLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-90 transition-all flex items-center gap-1.5 decoration-none cursor-pointer"
                          style={{ backgroundColor: store.brandColor }}
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Pedir
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-xs">
                No se encontraron artículos con ese criterio de búsqueda.
              </div>
            )}
          </section>
        )}

      </main>

      {/* ================= FLOATING CART DRAWER (PLAN PRO ONLY) ================= */}
      {store.planId === 'pro' && (
        <>
          {/* Floating Cart Bar at Bottom if items in cart */}
          {cart.length > 0 && !isCartOpen && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg"
            >
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full py-4 px-6 rounded-2xl text-white font-bold text-sm shadow-xl flex items-center justify-between cursor-pointer hover:opacity-95 transition-all"
                style={{ backgroundColor: store.brandColor }}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Ver Pedido ({totalItemsCount} productos)</span>
                </div>
                <span className="font-mono text-base font-black">${cartTotal} MXN →</span>
              </button>
            </motion.div>
          )}

          {/* Cart Modal / Drawer */}
          <AnimatePresence>
            {isCartOpen && (
              <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between text-left overflow-y-auto"
                >
                  <div>
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" style={{ color: store.brandColor }} />
                        <h3 className="font-display font-bold text-lg text-slate-900">
                          Tu Carrito ({totalItemsCount})
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Products List */}
                    {cart.length === 0 ? (
                      <div className="py-20 text-center text-slate-400 text-xs">
                        Tu carrito está vacío. Agrega productos del catálogo.
                      </div>
                    ) : (
                      <div className="space-y-3 py-4">
                        {cart.map(item => (
                          <div
                            key={item.product.id}
                            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs"
                          >
                            <div>
                              <h5 className="font-bold text-slate-800">{item.product.name}</h5>
                              <p className="text-slate-400 font-mono">${item.product.price} MXN c/u</p>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center bg-white rounded-lg border border-slate-200">
                                <button
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="p-1 text-slate-500 hover:text-slate-800"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 font-bold font-mono">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="p-1 text-slate-500 hover:text-slate-800"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1 text-slate-400 hover:text-rose-500"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Customer details in cart */}
                        <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Tu Nombre (opcional)</label>
                            <input
                              type="text"
                              placeholder="Ej. Ana García"
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              className="w-full py-2 px-3 rounded-xl border border-slate-200 focus:outline-none text-xs"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="font-bold text-slate-700">Indicaciones o dirección de entrega</label>
                            <input
                              type="text"
                              placeholder="Ej. Calle Morelos #123, timbre 2"
                              value={deliveryNotes}
                              onChange={(e) => setDeliveryNotes(e.target.value)}
                              className="w-full py-2 px-3 rounded-xl border border-slate-200 focus:outline-none text-xs"
                            />
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Checkout Footer */}
                  {cart.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-slate-600">Total a Pagar:</span>
                        <span className="font-mono font-black text-xl text-slate-900">${cartTotal} MXN</span>
                      </div>

                      <a
                        href={generateWhatsAppOrderLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 rounded-2xl text-white font-black text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer decoration-none hover:opacity-95"
                        style={{ backgroundColor: store.brandColor }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Enviar Pedido a WhatsApp
                      </a>
                    </div>
                  )}

                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ================= VIRAL FOOTER BADGE ================= */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-400">
        <p className="flex items-center justify-center gap-1.5">
          <span>Tienda digital impulsada por</span>
          <a
            href="/"
            onClick={(e) => {
              if (onBackToMain) {
                e.preventDefault();
                onBackToMain();
              }
            }}
            className="font-bold text-slate-700 hover:text-[#00b37e] transition-colors flex items-center gap-1"
          >
            Dayabit Cloud <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </footer>

    </div>
  );
}
