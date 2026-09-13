import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, MessageCircle, MapPin, Clock, Plus, Minus, Trash2, Search, 
  ArrowLeft, X, ShieldCheck, Truck, CreditCard, 
  ChevronDown, HelpCircle, Award, Zap, FileText, Check
} from 'lucide-react';
import type { TenantStore, StoreProduct } from '../types/tenant';
import { InstagramIcon, FacebookIcon, TikTokIcon, GoogleMapsIcon } from './SocialIcons';
import { formatSocialUrl } from '../utils/formatSocial';
import { resolveStoreTheme } from '../utils/themePresets';
import { resolveStoreTemplate } from '../utils/templateDefinitions';

interface StorefrontRendererProps {
  store: TenantStore;
  onBackToMain?: () => void;
  isMobileSimulator?: boolean;
}

interface CartItem {
  product: StoreProduct;
  quantity: number;
  selectedOption?: string;
}

export default function StorefrontRenderer({ store, onBackToMain, isMobileSimulator = false }: StorefrontRendererProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Resolve store full-page theme & template
  const theme = resolveStoreTheme(store);
  const activeTemplate = resolveStoreTemplate(store);
  const isDark = theme.palette === 'dark' || theme.palette === 'black' || 
    (theme.pageBackground?.startsWith('#0') || theme.pageBackground?.startsWith('#1'));

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

  // Handle variant selection
  const handleSelectVariant = (productId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }));
  };

  // Cart functions
  const addToCart = (product: StoreProduct, qty: number = 1) => {
    const variant = selectedVariants[product.id] || product.nicheAttributes?.sizes?.[0];
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id && item.selectedOption === variant);
      if (exists) {
        return prev.map(item => item === exists ? { ...item, quantity: item.quantity + qty } : item);
      }
      return [...prev, { product, quantity: qty, selectedOption: variant }];
    });
  };

  const updateQuantity = (productId: string, amount: number, variant?: string) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.selectedOption === variant) {
          const next = item.quantity + amount;
          return next > 0 ? { ...item, quantity: next } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string, variant?: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedOption === variant)));
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
      const optStr = item.selectedOption ? ` [Opción: ${item.selectedOption}]` : '';
      text += `• ${item.quantity}x ${item.product.name}${optStr} - $${item.product.price * item.quantity} MXN\n`;
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

  // Build individual product WhatsApp link for Vitrina / Direct order
  const getProductQuoteLink = (product: StoreProduct) => {
    const optStr = selectedVariants[product.id] ? ` (Opción: ${selectedVariants[product.id]})` : '';
    const text = `¡Hola *${store.businessName}*! Vi su catálogo web y me interesa ordenar:\n\n• *${product.name}*${optStr} ($${product.price} MXN)\n\n¿Tienen disponibilidad y costos de entrega?`;
    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const prefix = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
    return `https://wa.me/${prefix}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between w-full overflow-x-hidden text-left relative transition-colors duration-200"
      style={{
        backgroundColor: theme.pageBackground,
        color: theme.textColor,
        '--store-brand': theme.accentColor,
      } as React.CSSProperties}
    >
      {/* ================= SHARED HEADER ================= */}
      <header 
        className="sticky top-0 z-40 backdrop-blur-xl transition-all border-b shadow-2xs"
        style={{
          backgroundColor: isDark ? 'rgba(11, 15, 25, 0.85)' : 'rgba(255, 255, 255, 0.88)',
          borderColor: theme.borderColor
        }}
      >
        <div className={`mx-auto ${isMobileSimulator ? 'px-3 py-2.5' : 'max-w-6xl px-4 sm:px-6 py-3'} flex items-center justify-between gap-3`}>
          
          {/* Brand Identity / Left */}
          <div className="flex items-center gap-2.5 min-w-0">
            {onBackToMain && (
              <button
                onClick={onBackToMain}
                className="p-1.5 rounded-full opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Volver al portal principal"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-9 h-9 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md ring-2 ring-white/20"
                style={{ backgroundColor: theme.accentColor }}
              >
                {store.businessName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 
                  className="font-display font-black text-sm sm:text-base tracking-tight truncate leading-tight"
                  style={{ color: theme.textColor }}
                >
                  {store.businessName}
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    Abierto
                  </span>
                  <span className="text-[9px] opacity-40">•</span>
                  <span className="text-[10px] font-semibold opacity-70">
                    Verificado ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions / Right */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/52${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${store.businessName}, vi su catálogo web y me gustaría información.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 decoration-none shadow-sm cursor-pointer"
              style={{
                backgroundColor: '#00b37e',
                color: '#ffffff',
              }}
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs">WhatsApp</span>
            </a>

            {store.planId === 'pro' && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 cursor-pointer shrink-0"
                style={{ backgroundColor: theme.accentColor }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span className="font-mono">{totalItemsCount}</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ================= TEMPLATE 1: APP MODERNA & DELIVERY ================= */}
      {activeTemplate === 'modern_delivery' && (
        <>
          {/* Edge-to-Edge Hero Banner */}
          {store.bannerUrl && (
            <div className="relative w-full overflow-hidden">
              <div className={`w-full ${isMobileSimulator ? 'h-44' : 'h-52 sm:h-72'} relative`}>
                <img
                  src={store.bannerUrl}
                  alt={store.businessName}
                  className="w-full h-full object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className={`absolute bottom-3 left-4 ${isMobileSimulator ? 'left-3' : 'sm:left-8'} flex items-center gap-2`}>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 shadow-lg">
                    {store.category}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Profile Card in Relief */}
          <div className={`mx-auto w-full ${isMobileSimulator ? 'px-3 -mt-6' : 'max-w-6xl px-4 sm:px-6 -mt-8'} relative z-10`}>
            <div 
              className="rounded-3xl p-5 sm:p-7 border shadow-xl backdrop-blur-md transition-all space-y-4"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.borderColor,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg ring-4 ring-white/60 dark:ring-black/40"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {store.businessName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 
                        className="font-display font-black text-xl sm:text-2xl tracking-tight leading-tight"
                        style={{ color: theme.textColor }}
                      >
                        {store.businessName}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold mt-0.5" style={{ color: theme.accentColor }}>
                        {store.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed max-w-2xl pt-1" style={{ color: theme.textMutedColor }}>
                    {store.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPoliciesOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs shrink-0 self-start border"
                  style={{
                    backgroundColor: `${theme.textColor}08`,
                    borderColor: theme.borderColor,
                    color: theme.textColor
                  }}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Garantías & Envíos</span>
                </button>
              </div>

              {/* Hours, location & social icons */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                <div className="flex flex-wrap items-center gap-4 text-[11px]" style={{ color: theme.textMutedColor }}>
                  {store.hours && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 opacity-70" />
                      <span>{store.hours}</span>
                    </div>
                  )}
                  {store.address && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 opacity-70" />
                      <span className="truncate max-w-[200px]">{store.address}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {store.socialLinks?.instagram && (
                    <a href={formatSocialUrl('instagram', store.socialLinks.instagram)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xs border" style={{ backgroundColor: `${theme.textColor}08`, borderColor: theme.borderColor, color: theme.textColor }}>
                      <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
                    </a>
                  )}
                  {store.socialLinks?.facebook && (
                    <a href={formatSocialUrl('facebook', store.socialLinks.facebook)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xs border" style={{ backgroundColor: `${theme.textColor}08`, borderColor: theme.borderColor, color: theme.textColor }}>
                      <FacebookIcon className="w-3.5 h-3.5 text-blue-500" />
                    </a>
                  )}
                  {store.socialLinks?.tiktok && (
                    <a href={formatSocialUrl('tiktok', store.socialLinks.tiktok)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xs border" style={{ backgroundColor: `${theme.textColor}08`, borderColor: theme.borderColor, color: theme.textColor }}>
                      <TikTokIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {store.socialLinks?.mapsUrl && (
                    <a href={formatSocialUrl('maps', store.socialLinks.mapsUrl)} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-2xs border" style={{ backgroundColor: `${theme.textColor}08`, borderColor: theme.borderColor, color: theme.textColor }}>
                      <GoogleMapsIcon className="w-3.5 h-3.5 text-emerald-500" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ================= TEMPLATE 2: BOUTIQUE EDITORIAL & LOOKBOOK ================= */}
      {activeTemplate === 'boutique_editorial' && (
        <div className="w-full">
          {/* High-Fashion Editorial Hero */}
          <div className="relative w-full border-b" style={{ borderColor: theme.borderColor }}>
            {store.bannerUrl ? (
              <div className={`w-full ${isMobileSimulator ? 'h-52' : 'h-64 sm:h-96'} relative overflow-hidden`}>
                <img src={store.bannerUrl} alt={store.businessName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent flex items-center">
                  <div className={`p-6 ${isMobileSimulator ? 'max-w-xs' : 'sm:p-12 max-w-xl'} text-white space-y-3`}>
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                      Nueva Colección • {store.category}
                    </span>
                    <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight">
                      {store.tagline || store.businessName}
                    </h2>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                      {store.description}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 sm:p-16 text-center space-y-3">
                <span className="text-xs uppercase font-bold tracking-[0.25em] opacity-60">Colección Exclusiva</span>
                <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight">{store.businessName}</h2>
                <p className="text-xs sm:text-sm max-w-xl mx-auto opacity-80">{store.tagline}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TEMPLATE 3: CORPORATIVA & SERVICIOS B2B ================= */}
      {activeTemplate === 'corporate_services' && (
        <div className={`mx-auto w-full ${isMobileSimulator ? 'px-3 py-4' : 'max-w-6xl px-4 sm:px-6 py-6'} space-y-6`}>
          {/* Executive Value Proposition Banner */}
          <div 
            className="rounded-3xl p-6 sm:p-10 border shadow-sm space-y-5"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
          >
            <div className="max-w-3xl space-y-3">
              <span 
                className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block"
                style={{ backgroundColor: `${theme.accentColor}18`, color: theme.accentColor }}
              >
                Firma Profesional • {store.category}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl tracking-tight leading-tight" style={{ color: theme.textColor }}>
                {store.tagline || store.businessName}
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMutedColor }}>
                {store.description}
              </p>
            </div>

            {/* 3 Trust Credibility Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl border text-left space-y-1 shadow-2xs" style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor }}>
                <div className="flex items-center gap-2" style={{ color: theme.accentColor }}>
                  <Award className="w-4 h-4" />
                  <span className="font-display font-black text-xl">+{store.aboutUs?.experienceYears || 10} Años</span>
                </div>
                <p className="text-[11px] opacity-70">Trayectoria y respaldo legal garantizado</p>
              </div>

              <div className="p-4 rounded-2xl border text-left space-y-1 shadow-2xs" style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor }}>
                <div className="flex items-center gap-2 text-emerald-500">
                  <FileText className="w-4 h-4" />
                  <span className="font-display font-black text-xl">SAT CFDI 4.0</span>
                </div>
                <p className="text-[11px] opacity-70">Comprobantes fiscales 100% deducibles</p>
              </div>

              <div className="p-4 rounded-2xl border text-left space-y-1 shadow-2xs" style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor }}>
                <div className="flex items-center gap-2 text-blue-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-display font-black text-xl">Confidencial</span>
                </div>
                <p className="text-[11px] opacity-70">Contrato formal de prestación de servicios</p>
              </div>
            </div>

            {/* 3-Step Process Workflow Banner */}
            <div className="pt-4 border-t space-y-3" style={{ borderColor: theme.borderColor }}>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-60 block">Metodología de Trabajo:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-xs" style={{ backgroundColor: theme.accentColor }}>1</span>
                  <div>
                    <h5 className="font-bold">Diagnóstico Inicial</h5>
                    <p className="text-[11px] opacity-70">Evaluamos tu caso por WhatsApp o Zoom.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-xs" style={{ backgroundColor: theme.accentColor }}>2</span>
                  <div>
                    <h5 className="font-bold">Propuesta & Dictamen</h5>
                    <p className="text-[11px] opacity-70">Estrategia formal y cotización transparente.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-xs" style={{ backgroundColor: theme.accentColor }}>3</span>
                  <div>
                    <h5 className="font-bold">Ejecución & Soporte</h5>
                    <p className="text-[11px] opacity-70">Atención continua y entregables certificados.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TEMPLATE 4: CATÁLOGO EXPRESS / RETAIL ================= */}
      {activeTemplate === 'catalog_express' && (
        <div className={`mx-auto w-full ${isMobileSimulator ? 'px-3 py-3' : 'max-w-6xl px-4 sm:px-6 py-4'} space-y-4`}>
          {/* Top Quick Search Hero Bar */}
          <div 
            className="rounded-2xl p-4 border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
          >
            <div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h2 className="font-display font-bold text-base sm:text-lg">{store.businessName}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600">Catálogo Directo</span>
              </div>
              <p className="text-xs opacity-70 mt-0.5">{store.tagline}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg border bg-slate-500/5" style={{ borderColor: theme.borderColor }}>
                {store.products.length} artículos en almacén
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= MAIN CATALOG / PRODUCTS SECTION ================= */}
      <main className={`flex-grow mx-auto w-full ${isMobileSimulator ? 'px-3 py-4 space-y-6' : 'max-w-6xl px-4 sm:px-6 py-6 space-y-10'}`}>
        
        {/* Category & Search Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
              style={activeCategory === 'all' ? {
                backgroundColor: theme.accentColor,
                color: '#ffffff'
              } : {
                backgroundColor: theme.cardBackground,
                border: `1px solid ${theme.borderColor}`,
                color: theme.textColor
              }}
            >
              Todos ({store.products.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
                style={activeCategory === cat ? {
                  backgroundColor: theme.accentColor,
                  color: '#ffffff'
                } : {
                  backgroundColor: theme.cardBackground,
                  border: `1px solid ${theme.borderColor}`,
                  color: theme.textColor
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <input
              type="text"
              placeholder="Buscar en el catálogo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-3.5 pl-9 rounded-full text-xs focus:outline-none shadow-sm transition-all"
              style={{
                backgroundColor: theme.cardBackground,
                border: `1px solid ${theme.borderColor}`,
                color: theme.textColor
              }}
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 opacity-50" style={{ color: theme.textColor }} />
          </div>
        </div>

        {/* ================= PRODUCTS GRID (ADAPTED PER TEMPLATE) ================= */}
        
        {/* 1. LOOKBOOK FASHION GRID (Template 2) */}
        {activeTemplate === 'boutique_editorial' && (
          <div className={`grid gap-4 ${isMobileSimulator ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredProducts.map(product => {
              const niche = product.nicheAttributes;
              const inCart = cart.find(c => c.product.id === product.id);

              return (
                <div
                  key={product.id}
                  className="rounded-3xl p-4 border shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group overflow-hidden"
                  style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
                >
                  <div className="space-y-3">
                    {/* 3:4 Vertical Fashion Card Aspect Ratio */}
                    <div 
                      className="w-full h-48 sm:h-56 rounded-2xl flex items-center justify-center text-5xl relative overflow-hidden shadow-inner group-hover:scale-[1.01] transition-transform"
                      style={{ backgroundColor: `${theme.textColor}06`, border: `1px solid ${theme.borderColor}` }}
                    >
                      <span className="transform transition-transform group-hover:scale-110 duration-300">
                        {product.iconText || '👗'}
                      </span>
                      {niche?.badge && (
                        <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-black/80 text-white backdrop-blur-md shadow-md">
                          {niche.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 block">{product.category}</span>
                      <h4 className="font-display font-black text-base sm:text-lg mt-0.5" style={{ color: theme.textColor }}>
                        {product.name}
                      </h4>
                      <p className="text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: theme.textMutedColor }}>
                        {product.description}
                      </p>

                      {/* Sizes selector chips */}
                      {niche?.sizes && niche.sizes.length > 0 && (
                        <div className="mt-3 pt-2" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                          <span className="text-[10px] font-bold opacity-60 block mb-1.5">Tallas disponibles:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {niche.sizes.map(size => {
                              const isChosen = (selectedVariants[product.id] || niche.sizes?.[0]) === size;
                              return (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => handleSelectVariant(product.id, size)}
                                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer shadow-2xs"
                                  style={isChosen ? {
                                    backgroundColor: theme.accentColor,
                                    color: '#ffffff'
                                  } : {
                                    backgroundColor: `${theme.textColor}08`,
                                    border: `1px solid ${theme.borderColor}`,
                                    color: theme.textColor
                                  }}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 mt-4 flex items-center justify-between" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    <span className="font-mono font-black text-lg" style={{ color: theme.textColor }}>
                      ${product.price} <span className="text-xs font-sans opacity-70">MXN</span>
                    </span>
                    
                    {store.planId === 'pro' ? (
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        {inCart ? `Bolsa (${inCart.quantity})` : 'Añadir a la Bolsa'}
                      </button>
                    ) : (
                      <a
                        href={getProductQuoteLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer decoration-none"
                        style={{ backgroundColor: '#00b37e' }}
                      >
                        Pedir Talla
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. CORPORATE SERVICES CARDS (Template 3) */}
        {activeTemplate === 'corporate_services' && (
          <div className={`grid gap-4 ${isMobileSimulator ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredProducts.map(service => (
              <div 
                key={service.id}
                className="p-6 rounded-3xl border shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-1 space-y-4"
                style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{service.iconText || '💼'}</span>
                    {service.nicheAttributes?.badge && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {service.nicheAttributes.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-display font-black text-lg" style={{ color: theme.textColor }}>
                    {service.name}
                  </h4>
                  
                  <p className="text-xs leading-relaxed" style={{ color: theme.textMutedColor }}>
                    {service.description}
                  </p>

                  {/* Service Deliverables Checklist */}
                  {service.nicheAttributes?.includes && service.nicheAttributes.includes.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block">Incluye:</span>
                      {service.nicheAttributes.includes.map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs opacity-90">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.nicheAttributes?.serviceDuration && (
                    <div className="text-xs font-semibold flex items-center gap-1.5 pt-1 text-emerald-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.nicheAttributes.serviceDuration} • Modalidad {service.nicheAttributes.serviceModality}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: theme.borderColor }}>
                  <span className="font-mono font-black text-base" style={{ color: theme.textColor }}>
                    ${service.price} MXN
                  </span>
                  <a
                    href={`https://wa.me/52${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${store.businessName}, me interesa agendar una consulta sobre el servicio: *${service.name}*.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5 decoration-none cursor-pointer"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Agendar Cita
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. CATALOG EXPRESS / HIGH DENSITY (Template 4) */}
        {activeTemplate === 'catalog_express' && (
          <div className="space-y-3">
            {filteredProducts.map(product => {
              const niche = product.nicheAttributes;
              const inCart = cart.find(c => c.product.id === product.id);

              return (
                <div 
                  key={product.id}
                  className="p-3.5 sm:p-4 rounded-2xl border shadow-2xs flex items-center justify-between gap-3 transition-all hover:border-slate-400"
                  style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
                >
                  {/* Left: Thumbnail + Details */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0 shadow-inner"
                      style={{ backgroundColor: `${theme.textColor}08`, border: `1px solid ${theme.borderColor}` }}
                    >
                      {product.iconText || '📦'}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-emerald-500/10 text-emerald-600">
                          ✓ En Stock
                        </span>
                        {niche?.brand && (
                          <span className="text-[10px] font-semibold opacity-60">
                            Marca: {niche.brand}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm truncate mt-0.5" style={{ color: theme.textColor }}>
                        {product.name}
                      </h4>
                      <p className="text-[11px] line-clamp-1 opacity-70" style={{ color: theme.textMutedColor }}>
                        {product.description || 'Disponible para surtido inmediato.'}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price + Fast Buy */}
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div>
                      <span className="font-mono font-black text-sm block" style={{ color: theme.textColor }}>
                        ${product.price}
                      </span>
                      <span className="text-[9px] opacity-60 block">MXN c/u</span>
                    </div>

                    {store.planId === 'pro' ? (
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="px-3 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{inCart ? inCart.quantity : 'Pedir'}</span>
                      </button>
                    ) : (
                      <a
                        href={getProductQuoteLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl text-white font-bold text-xs flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 cursor-pointer decoration-none"
                        style={{ backgroundColor: '#00b37e' }}
                      >
                        Cotizar
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. MODERN DELIVERY APP GRID (Template 1 Default) */}
        {activeTemplate === 'modern_delivery' && (
          <div className={`grid gap-4 ${isMobileSimulator ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredProducts.map(product => {
              const niche = product.nicheAttributes;
              const inCart = cart.find(c => c.product.id === product.id);

              return (
                <div
                  key={product.id}
                  className="rounded-3xl p-4 sm:p-5 border shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
                  style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
                >
                  <div className="space-y-3">
                    <div 
                      className="w-full h-36 sm:h-40 rounded-2xl flex items-center justify-center text-4xl relative overflow-hidden shadow-inner group-hover:scale-[1.01] transition-transform"
                      style={{ backgroundColor: `${theme.textColor}06`, border: `1px solid ${theme.borderColor}` }}
                    >
                      <span className="transform transition-transform group-hover:scale-110 duration-300">
                        {product.iconText || '📦'}
                      </span>
                      {product.category && (
                        <span 
                          className="absolute top-2.5 left-2.5 text-[9px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs"
                          style={{
                            backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)',
                            border: `1px solid ${theme.borderColor}`,
                            color: theme.textColor
                          }}
                        >
                          {product.category}
                        </span>
                      )}
                      {niche?.badge && (
                        <span 
                          className="absolute top-2.5 right-2.5 text-[9px] font-black text-white px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-md"
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          {niche.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-sm sm:text-base leading-snug line-clamp-1" style={{ color: theme.textColor }}>
                        {product.name}
                      </h4>
                      <p className="text-xs line-clamp-2 mt-1 leading-relaxed" style={{ color: theme.textMutedColor }}>
                        {product.description || 'Disponible para pedido inmediato con atención por WhatsApp.'}
                      </p>

                      {niche?.ingredients && (
                        <p className="text-[11px] italic mt-2 p-2 rounded-xl" style={{ backgroundColor: `${theme.textColor}05`, border: `1px solid ${theme.borderColor}`, color: theme.textMutedColor }}>
                          <strong>Ingredientes:</strong> {niche.ingredients}
                        </p>
                      )}
                      {niche?.preparationTime && (
                        <span className="text-[10px] font-semibold mt-1.5 inline-flex items-center gap-1 opacity-70" style={{ color: theme.textColor }}>
                          <Clock className="w-3 h-3" /> {niche.preparationTime}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3.5 mt-3.5 flex items-center justify-between" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    <div>
                      <span className="text-[10px] opacity-60 block font-medium">Precio oficial</span>
                      <span className="font-mono font-black text-base" style={{ color: theme.textColor }}>
                        ${product.price} <span className="text-[10px] font-sans font-normal opacity-70">MXN</span>
                      </span>
                    </div>

                    {store.planId === 'pro' ? (
                      <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        style={{ backgroundColor: theme.accentColor }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>{inCart ? `Agregado (${inCart.quantity})` : 'Agregar'}</span>
                      </button>
                    ) : (
                      <a
                        href={getProductQuoteLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer decoration-none"
                        style={{ backgroundColor: '#00b37e' }}
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Ordenar</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div 
            className="py-16 text-center rounded-3xl border text-xs"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor, color: theme.textMutedColor }}
          >
            No se encontraron artículos que coincidan con la búsqueda.
          </div>
        )}

        {/* ================= SECTION: ABOUT US & PHILOSOPHY ================= */}
        {store.aboutUs?.story && (
          <section 
            className="rounded-3xl p-5 sm:p-7 border shadow-sm text-left space-y-4"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
          >
            <div className="flex items-center gap-2" style={{ color: theme.accentColor }}>
              <Award className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Quiénes Somos & Trayectoria</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div className="md:col-span-2 space-y-2">
                <h3 className="font-display font-black text-lg sm:text-xl tracking-tight" style={{ color: theme.textColor }}>
                  Pasión y Compromiso en {store.businessName}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMutedColor }}>
                  {store.aboutUs.story}
                </p>
              </div>

              {store.aboutUs.experienceYears && (
                <div 
                  className="p-5 rounded-2xl border text-center flex flex-col justify-center items-center shadow-inner"
                  style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor }}
                >
                  <span className="font-display font-black text-3xl sm:text-4xl" style={{ color: theme.accentColor }}>
                    +{store.aboutUs.experienceYears}
                  </span>
                  <span className="text-xs font-bold mt-1" style={{ color: theme.textColor }}>
                    Años de Experiencia
                  </span>
                  <span className="text-[10px] mt-0.5 opacity-70" style={{ color: theme.textMutedColor }}>
                    Respaldando cada orden
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= SECTION: FAQS ================= */}
        {store.faqs && store.faqs.length > 0 && (
          <section 
            className="rounded-3xl p-5 sm:p-7 border shadow-sm text-left space-y-4"
            style={{ backgroundColor: theme.cardBackground, borderColor: theme.borderColor }}
          >
            <div className="flex items-center gap-2" style={{ color: theme.accentColor }}>
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-black uppercase tracking-wider">Preguntas Frecuentes</span>
            </div>

            <h3 className="font-display font-black text-lg sm:text-xl tracking-tight" style={{ color: theme.textColor }}>
              Resolvemos tus Dudas
            </h3>

            <div className="space-y-2.5">
              {store.faqs.map(faq => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="rounded-2xl border transition-all overflow-hidden shadow-2xs"
                    style={{ backgroundColor: `${theme.textColor}03`, borderColor: theme.borderColor }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm" style={{ color: theme.textColor }}>
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        style={{ color: theme.accentColor }}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs leading-relaxed" style={{ color: theme.textMutedColor }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>

      {/* ================= STICKY MOBILE ORDER BAR (FOR PRO OR WHEN ITEMS IN CART) ================= */}
      {store.planId === 'pro' && cart.length > 0 && (
        <div className="fixed bottom-3 inset-x-3 sm:inset-x-auto sm:right-6 z-40 max-w-md mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-2xl text-white font-bold text-xs shadow-2xl backdrop-blur-xl flex items-center justify-between transition-transform active:scale-95 cursor-pointer ring-2 ring-white/20"
            style={{ backgroundColor: theme.accentColor }}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-white/25 flex items-center justify-center">
                <ShoppingCart className="w-3.5 h-3.5" />
              </div>
              <span>{totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-sm">${cartTotal} MXN</span>
              <span className="bg-white/25 px-2.5 py-1 rounded-xl text-[11px] font-bold">Ver Carrito →</span>
            </div>
          </motion.button>
        </div>
      )}

      {/* ================= CART MODAL (TIER 3 PRO) ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto no-scrollbar p-5 sm:p-7 shadow-2xl space-y-5 text-left border"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.borderColor,
                color: theme.textColor
              }}
            >
              <div className="w-12 h-1 bg-slate-400/30 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${theme.borderColor}` }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <ShoppingCart className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl">Tu Carrito de Pedido</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-12 text-center text-xs opacity-60">
                  Tu carrito está vacío. Agrega productos desde el catálogo para enviar tu pedido a WhatsApp.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar pr-1">
                    {cart.map((item, idx) => (
                      <div 
                        key={`${item.product.id}-${item.selectedOption || idx}`}
                        className="p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs border shadow-2xs"
                        style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor }}
                      >
                        <div className="min-w-0">
                          <h5 className="font-bold truncate">{item.product.name}</h5>
                          {item.selectedOption && (
                            <span className="text-[10px] opacity-70 block font-medium">Opción: {item.selectedOption}</span>
                          )}
                          <span className="font-mono font-bold text-xs block mt-0.5" style={{ color: theme.accentColor }}>
                            ${item.product.price * item.quantity} MXN
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, -1, item.selectedOption)}
                            className="w-7 h-7 rounded-xl flex items-center justify-center border cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            style={{ borderColor: theme.borderColor }}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs w-5 text-center font-mono">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, 1, item.selectedOption)}
                            className="w-7 h-7 rounded-xl flex items-center justify-center border cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                            style={{ borderColor: theme.borderColor }}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.selectedOption)}
                            className="p-1.5 text-rose-500 hover:text-rose-600 cursor-pointer ml-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5 pt-2" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    <div>
                      <label className="text-xs font-bold block mb-1">Nombre completo:</label>
                      <input
                        type="text"
                        placeholder="Ej. Sofía Hernández"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full py-2 px-3.5 rounded-xl text-xs focus:outline-none border shadow-2xs"
                        style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor, color: theme.textColor }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1">Indicaciones o domicilio de entrega:</label>
                      <input
                        type="text"
                        placeholder="Ej. Calle Palmas 204 / Entregar caliente"
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        className="w-full py-2 px-3.5 rounded-xl text-xs focus:outline-none border shadow-2xs"
                        style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor, color: theme.textColor }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 space-y-3" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span>Total Estimado:</span>
                      <span className="font-mono text-lg font-black" style={{ color: theme.accentColor }}>
                        ${cartTotal} MXN
                      </span>
                    </div>

                    <a
                      href={generateWhatsAppOrderLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 rounded-2xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:opacity-95 transition-transform active:scale-98 cursor-pointer decoration-none"
                      style={{ backgroundColor: '#00b37e' }}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Enviar Pedido a WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= STORE POLICIES MODAL ================= */}
      <AnimatePresence>
        {isPoliciesOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto no-scrollbar p-5 sm:p-7 shadow-2xl space-y-5 text-left border"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.borderColor,
                color: theme.textColor
              }}
            >
              <div className="w-12 h-1 bg-slate-400/30 rounded-full mx-auto -mt-1 mb-2" />

              <div className="flex items-start justify-between pb-3" style={{ borderBottom: `1px solid ${theme.borderColor}` }}>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider" style={{ color: theme.accentColor }}>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Políticas Oficiales del Comercio</span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl mt-1">
                    {store.businessName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPoliciesOpen(false)}
                  className="p-1.5 rounded-full opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Shipping Policy */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Truck className="w-4 h-4" style={{ color: theme.accentColor }} />
                  <span>Envíos y Tiempos de Entrega</span>
                </div>
                <p 
                  className="text-xs leading-relaxed p-3.5 rounded-2xl border"
                  style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor, color: theme.textMutedColor }}
                >
                  {store.storePolicies?.shipping || 'Las entregas locales y envíos se coordinan directamente a través de nuestro WhatsApp oficial para brindarte atención inmediata y personalizada.'}
                </p>
              </div>

              {/* Guarantee & Returns */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4" style={{ color: theme.accentColor }} />
                  <span>Garantía de Satisfacción y Devoluciones</span>
                </div>
                <p 
                  className="text-xs leading-relaxed p-3.5 rounded-2xl border"
                  style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor, color: theme.textMutedColor }}
                >
                  {store.storePolicies?.returns || 'Tu satisfacción es nuestra máxima prioridad. Si existe cualquier inconveniente con tu producto o servicio, comunícate con nosotros por WhatsApp para solucionarlo de inmediato.'}
                </p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <CreditCard className="w-4 h-4" style={{ color: theme.accentColor }} />
                  <span>Formas de Pago Aceptadas</span>
                </div>
                <p 
                  className="text-xs leading-relaxed p-3.5 rounded-2xl border"
                  style={{ backgroundColor: `${theme.textColor}04`, borderColor: theme.borderColor, color: theme.textMutedColor }}
                >
                  {store.storePolicies?.paymentTerms || 'Aceptamos transferencias electrónicas SPEI y pagos en efectivo al momento de recibir tu orden.'}
                </p>
              </div>

              <div className="text-[10px] pt-3 text-center opacity-60" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                Comercio verificado e independiente. Dayabit Cloud provee la infraestructura tecnológica.
              </div>

              <button
                type="button"
                onClick={() => setIsPoliciesOpen(false)}
                className="w-full py-3 rounded-2xl text-white text-xs font-bold cursor-pointer transition-opacity hover:opacity-90 shadow-md"
                style={{ backgroundColor: isDark ? '#ffffff' : '#0f172a', color: isDark ? '#0f172a' : '#ffffff' }}
              >
                Entendido, volver a la tienda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= VIRAL FOOTER ================= */}
      <footer 
        className="py-8 border-t text-center text-xs space-y-4 transition-colors"
        style={{
          backgroundColor: theme.cardBackground,
          borderColor: theme.borderColor,
          color: theme.textMutedColor
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          {store.socialLinks?.instagram && (
            <a
              href={formatSocialUrl('instagram', store.socialLinks.instagram)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity flex items-center gap-1 font-bold text-xs"
              style={{ color: theme.textColor }}
            >
              <InstagramIcon className="w-3.5 h-3.5 text-rose-500" /> Instagram
            </a>
          )}
          {store.socialLinks?.facebook && (
            <a
              href={formatSocialUrl('facebook', store.socialLinks.facebook)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity flex items-center gap-1 font-bold text-xs"
              style={{ color: theme.textColor }}
            >
              <FacebookIcon className="w-3.5 h-3.5 text-blue-500" /> Facebook
            </a>
          )}
          {store.socialLinks?.tiktok && (
            <a
              href={formatSocialUrl('tiktok', store.socialLinks.tiktok)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity flex items-center gap-1 font-bold text-xs"
              style={{ color: theme.textColor }}
            >
              <TikTokIcon className="w-3.5 h-3.5" /> TikTok
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsPoliciesOpen(true)}
            className="font-bold underline cursor-pointer hover:opacity-100 transition-opacity text-xs"
            style={{ color: theme.textColor }}
          >
            Políticas & Garantías
          </button>
        </div>

        <p className="opacity-70 text-[11px]">
          Tienda oficial de <strong>{store.businessName}</strong> • Impulsada por{' '}
          <a
            href="/"
            onClick={(e) => {
              if (onBackToMain) {
                e.preventDefault();
                onBackToMain();
              }
            }}
            className="font-bold underline hover:opacity-100"
            style={{ color: theme.accentColor }}
          >
            Dayabit Cloud
          </a>
        </p>
      </footer>

    </div>
  );
}
