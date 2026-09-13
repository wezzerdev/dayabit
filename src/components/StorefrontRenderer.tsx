import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, MessageCircle, MapPin, Clock, Plus, Minus, Trash2, Search, 
  ArrowLeft, X, ShieldCheck, Truck, CreditCard, 
  ChevronDown, HelpCircle, Award, CheckCircle2 
} from 'lucide-react';
import type { TenantStore, StoreProduct } from '../types/tenant';
import { InstagramIcon, FacebookIcon, TikTokIcon, GoogleMapsIcon } from './SocialIcons';
import { formatSocialUrl } from '../utils/formatSocial';
import { resolveStoreTheme } from '../utils/themePresets';

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

  // Resolve store full-page theme colors
  const theme = resolveStoreTheme(store);
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
  const addToCart = (product: StoreProduct) => {
    const variant = selectedVariants[product.id] || product.nicheAttributes?.sizes?.[0];
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id && item.selectedOption === variant);
      if (exists) {
        return prev.map(item => item === exists ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1, selectedOption: variant }];
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

  // Build individual product WhatsApp link for Plan 2 (Vitrina)
  const getProductQuoteLink = (product: StoreProduct) => {
    const optStr = selectedVariants[product.id] ? ` (Opción: ${selectedVariants[product.id]})` : '';
    const text = `¡Hola *${store.businessName}*! Vi su catálogo web y me interesa ordenar:\n\n• *${product.name}*${optStr} ($${product.price} MXN)\n\n¿Tienen disponibilidad y costos de envío?`;
    const cleanPhone = store.whatsapp.replace(/\D/g, '');
    const prefix = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
    return `https://wa.me/${prefix}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between w-full overflow-x-hidden text-left transition-colors duration-200"
      style={{
        backgroundColor: theme.pageBackground,
        color: theme.textColor,
        '--store-brand': theme.accentColor,
      } as React.CSSProperties}
    >
      {/* ================= TOP BANNER & NAVIGATION ================= */}
      <header 
        className="sticky top-0 z-40 backdrop-blur-md transition-colors"
        style={{
          backgroundColor: theme.headerBackground,
          borderBottom: `1px solid ${theme.borderColor}`
        }}
      >
        <div className={`mx-auto ${isMobileSimulator ? 'px-3 py-2.5' : 'max-w-6xl px-4 sm:px-6 py-3'} flex items-center justify-between gap-2`}>
          
          {/* Brand Identity / Left */}
          <div className="flex items-center gap-2 min-w-0">
            {onBackToMain && (
              <button
                onClick={onBackToMain}
                className="p-1.5 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Volver al portal principal"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-2 min-w-0">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-xs"
                style={{ backgroundColor: theme.accentColor }}
              >
                {store.businessName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h1 
                  className="font-display font-black text-xs sm:text-sm truncate leading-tight"
                  style={{ color: theme.textColor }}
                >
                  {store.businessName}
                </h1>
                <span 
                  className="text-[9px] font-bold px-1.5 py-0.2 rounded-full inline-flex items-center gap-0.5"
                  style={{ 
                    color: theme.accentColor, 
                    backgroundColor: `${theme.accentColor}18`,
                    border: `1px solid ${theme.accentColor}35`
                  }}
                >
                  ✓ Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Actions / Right */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Desktop Social Icons */}
            {!isMobileSimulator && (
              <div className="hidden md:flex items-center gap-1.5">
                {store.socialLinks?.instagram && (
                  <a
                    href={formatSocialUrl('instagram', store.socialLinks.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram oficial"
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: `${theme.textColor}12`, color: theme.textColor }}
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {store.socialLinks?.facebook && (
                  <a
                    href={formatSocialUrl('facebook', store.socialLinks.facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook oficial"
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: `${theme.textColor}12`, color: theme.textColor }}
                  >
                    <FacebookIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {store.socialLinks?.tiktok && (
                  <a
                    href={formatSocialUrl('tiktok', store.socialLinks.tiktok)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="TikTok oficial"
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
                    style={{ backgroundColor: `${theme.textColor}12`, color: theme.textColor }}
                  >
                    <TikTokIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Direct WhatsApp chat button */}
            <a
              href={`https://wa.me/52${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${store.businessName}, vi su catálogo web y me gustaría ordenar.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 decoration-none shadow-2xs cursor-pointer"
              style={{
                backgroundColor: isDark ? '#00b37e' : '#ecfdf5',
                color: isDark ? '#ffffff' : '#065f46',
                border: isDark ? 'none' : '1px solid #a7f3d0'
              }}
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0 text-[#00b37e] dark:text-white" />
              <span className={isMobileSimulator ? 'text-[11px]' : 'hidden xs:inline text-xs'}>WhatsApp</span>
            </a>

            {/* Cart Button (Only for Plan Pro Tier 3) */}
            {store.planId === 'pro' && (
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative px-2.5 sm:px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-transform hover:scale-105 cursor-pointer shrink-0"
                style={{ backgroundColor: theme.accentColor }}
              >
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                <span>({totalItemsCount})</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* ================= MAIN STOREFRONT BODY ================= */}
      <main className={`flex-grow mx-auto w-full ${isMobileSimulator ? 'px-3 py-4 space-y-6' : 'max-w-6xl px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10'}`}>
        
        {/* ================= HERO SECTION ================= */}
        <section 
          className={`rounded-3xl border shadow-xs relative overflow-hidden text-left transition-colors ${
            isMobileSimulator ? 'p-4 space-y-4' : 'p-5 sm:p-8 space-y-5'
          }`}
          style={{
            backgroundColor: theme.cardBackground,
            borderColor: theme.borderColor
          }}
        >
          {/* Ambient Glow */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ backgroundColor: theme.accentColor }}
          />

          {/* Hero Banner if available */}
          {store.bannerUrl && (
            <div className={`w-full ${isMobileSimulator ? 'h-36' : 'h-40 sm:h-56'} rounded-2xl overflow-hidden relative shadow-inner mb-2`}>
              <img
                src={store.bannerUrl}
                alt={store.businessName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                  {store.category}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3 relative z-10 max-w-2xl">
            {!store.bannerUrl && (
              <span 
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block"
                style={{ color: theme.accentColor, backgroundColor: `${theme.accentColor}15` }}
              >
                {store.category}
              </span>
            )}
            
            <h2 
              className={`font-display font-black leading-tight ${isMobileSimulator ? 'text-xl' : 'text-xl sm:text-3xl'}`}
              style={{ color: theme.textColor }}
            >
              {store.tagline}
            </h2>
            
            <p 
              className={`leading-relaxed ${isMobileSimulator ? 'text-xs' : 'text-xs sm:text-sm'}`}
              style={{ color: theme.textMutedColor }}
            >
              {store.description}
            </p>

            {/* Hours and Address */}
            {(store.hours || store.address) && (
              <div 
                className="pt-1 flex flex-wrap gap-3 text-xs"
                style={{ color: theme.textMutedColor }}
              >
                {store.hours && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 opacity-60" />
                    <span>{store.hours}</span>
                  </div>
                )}
                {store.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 opacity-60" />
                    <span>{store.address}</span>
                  </div>
                )}
              </div>
            )}

            {/* Social Network Links & Store Policies Button */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              {store.socialLinks?.instagram && (
                <a
                  href={formatSocialUrl('instagram', store.socialLinks.instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${theme.textColor}10`, color: theme.textColor }}
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-rose-500" />
                  <span>Instagram</span>
                </a>
              )}
              {store.socialLinks?.facebook && (
                <a
                  href={formatSocialUrl('facebook', store.socialLinks.facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${theme.textColor}10`, color: theme.textColor }}
                >
                  <FacebookIcon className="w-3.5 h-3.5 text-blue-500" />
                  <span>Facebook</span>
                </a>
              )}
              {store.socialLinks?.tiktok && (
                <a
                  href={formatSocialUrl('tiktok', store.socialLinks.tiktok)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${theme.textColor}10`, color: theme.textColor }}
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                  <span>TikTok</span>
                </a>
              )}
              {store.socialLinks?.mapsUrl && (
                <a
                  href={formatSocialUrl('maps', store.socialLinks.mapsUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-opacity hover:opacity-80"
                  style={{ backgroundColor: `${theme.textColor}10`, color: theme.textColor }}
                >
                  <GoogleMapsIcon className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ubicación</span>
                </a>
              )}

              {/* Policies trigger button */}
              <button
                type="button"
                onClick={() => setIsPoliciesOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer"
                style={{
                  backgroundColor: isDark ? '#ffffff' : '#0f172a',
                  color: isDark ? '#0f172a' : '#ffffff'
                }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Políticas & Garantías</span>
              </button>
            </div>

            {/* Payment Methods Badges */}
            {store.paymentMethods && store.paymentMethods.length > 0 && (
              <div 
                className="pt-2 flex flex-wrap items-center gap-1.5 text-[10px]"
                style={{ borderTop: `1px solid ${theme.borderColor}` }}
              >
                <span className="font-bold opacity-75" style={{ color: theme.textColor }}>Pagos:</span>
                {store.paymentMethods.map(pm => (
                  <span 
                    key={pm} 
                    className="px-2 py-0.5 rounded-md font-medium"
                    style={{
                      backgroundColor: `${theme.textColor}0a`,
                      border: `1px solid ${theme.borderColor}`,
                      color: theme.textColor
                    }}
                  >
                    ✓ {pm}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= TEMPLATE 1: PLAN ESENCIAL (SERVICES) ================= */}
        {store.planId === 'esencial' && (
          <section className="space-y-4 text-left">
            <div>
              <h3 
                className="font-display font-black text-lg sm:text-xl"
                style={{ color: theme.textColor }}
              >
                Nuestros Servicios & Soluciones
              </h3>
              <p className="text-xs" style={{ color: theme.textMutedColor }}>
                Consulta directa por WhatsApp para agendar o solicitar una cotización formal.
              </p>
            </div>

            <div className={`grid gap-4 ${isMobileSimulator ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
              {store.products.map(item => (
                <div 
                  key={item.id}
                  className="p-5 rounded-2xl border shadow-2xs flex flex-col justify-between transition-transform hover:-translate-y-1"
                  style={{
                    backgroundColor: theme.cardBackground,
                    borderColor: theme.borderColor
                  }}
                >
                  <div className="space-y-2.5">
                    <div className="text-2xl">{item.iconText || '💼'}</div>
                    <h4 className="font-bold text-sm sm:text-base" style={{ color: theme.textColor }}>
                      {item.name}
                    </h4>
                    <p className="text-xs leading-relaxed" style={{ color: theme.textMutedColor }}>
                      {item.description}
                    </p>

                    {item.nicheAttributes?.serviceDuration && (
                      <div 
                        className="text-[11px] font-semibold flex items-center gap-1 pt-1"
                        style={{ color: theme.accentColor }}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{item.nicheAttributes.serviceDuration} · {item.nicheAttributes.serviceModality}</span>
                      </div>
                    )}
                  </div>

                  <div 
                    className="pt-4 mt-4 flex items-center justify-between"
                    style={{ borderTop: `1px solid ${theme.borderColor}` }}
                  >
                    <span className="font-mono font-bold text-sm" style={{ color: theme.textColor }}>
                      ${item.price} MXN
                    </span>
                    <a
                      href={`https://wa.me/52${store.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${store.businessName}, me interesa solicitar información sobre: *${item.name}*.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-xs transition-opacity hover:opacity-90 flex items-center gap-1 decoration-none cursor-pointer"
                      style={{ backgroundColor: theme.accentColor }}
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
          <section className="space-y-4 sm:space-y-5 text-left">
            
            {/* Search & Categories Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Category Pills with smooth horizontal swipe on mobile */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className="px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer"
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
                    className="px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer"
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

              {/* Search Bar */}
              <div className="relative w-full sm:w-60 shrink-0">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-1.5 px-3 pl-8 rounded-full text-xs focus:outline-none shadow-2xs"
                  style={{
                    backgroundColor: theme.cardBackground,
                    border: `1px solid ${theme.borderColor}`,
                    color: theme.textColor
                  }}
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 opacity-50" style={{ color: theme.textColor }} />
              </div>
            </div>

            {/* Products Grid - Always 1 column in mobile simulator to prevent squished cards */}
            <div className={`grid gap-4 ${isMobileSimulator ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredProducts.map(product => {
                const niche = product.nicheAttributes;
                const inCart = cart.find(c => c.product.id === product.id);

                return (
                  <div
                    key={product.id}
                    className="rounded-3xl p-4 border shadow-xs transition-all flex flex-col justify-between"
                    style={{
                      backgroundColor: theme.cardBackground,
                      borderColor: theme.borderColor
                    }}
                  >
                    <div className="space-y-3">
                      {/* Product Thumbnail / Icon */}
                      <div 
                        className="w-full h-32 sm:h-36 rounded-2xl flex items-center justify-center text-4xl relative shadow-inner"
                        style={{
                          backgroundColor: `${theme.textColor}08`,
                          border: `1px solid ${theme.borderColor}`
                        }}
                      >
                        {product.iconText || '📦'}
                        {product.category && (
                          <span 
                            className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md"
                            style={{
                              backgroundColor: `${theme.cardBackground}ee`,
                              border: `1px solid ${theme.borderColor}`,
                              color: theme.textMutedColor
                            }}
                          >
                            {product.category}
                          </span>
                        )}
                        {niche?.badge && (
                          <span 
                            className="absolute bottom-2 right-2 text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-2xs"
                            style={{ backgroundColor: theme.accentColor }}
                          >
                            {niche.badge}
                          </span>
                        )}
                      </div>

                      <div>
                        <h4 
                          className="font-bold text-sm sm:text-base leading-snug line-clamp-1"
                          style={{ color: theme.textColor }}
                        >
                          {product.name}
                        </h4>
                        <p 
                          className="text-xs line-clamp-2 mt-1"
                          style={{ color: theme.textMutedColor }}
                        >
                          {product.description || 'Disponible para pedido inmediato con atención directa por WhatsApp.'}
                        </p>

                        {/* Food attributes */}
                        {niche?.ingredients && (
                          <p 
                            className="text-[11px] italic mt-2 p-2 rounded-xl"
                            style={{
                              backgroundColor: `${theme.textColor}06`,
                              border: `1px solid ${theme.borderColor}`,
                              color: theme.textMutedColor
                            }}
                          >
                            <strong>Ingredientes:</strong> {niche.ingredients}
                          </p>
                        )}
                        {niche?.preparationTime && (
                          <span 
                            className="text-[10px] font-medium mt-1 inline-block"
                            style={{ color: theme.textMutedColor }}
                          >
                            ⏱️ {niche.preparationTime}
                          </span>
                        )}

                        {/* Fashion sizes */}
                        {niche?.sizes && niche.sizes.length > 0 && (
                          <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                            <span className="text-[10px] font-bold opacity-60 block mb-1" style={{ color: theme.textColor }}>
                              Talla:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {niche.sizes.map(size => {
                                const isChosen = (selectedVariants[product.id] || niche.sizes?.[0]) === size;
                                return (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => handleSelectVariant(product.id, size)}
                                    className="px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer"
                                    style={isChosen ? {
                                      backgroundColor: theme.accentColor,
                                      color: '#ffffff'
                                    } : {
                                      backgroundColor: `${theme.textColor}0a`,
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

                    {/* Card Footer: Price & Action */}
                    <div 
                      className="pt-3 mt-3 flex items-center justify-between"
                      style={{ borderTop: `1px solid ${theme.borderColor}` }}
                    >
                      <span className="font-mono font-black text-sm" style={{ color: theme.textColor }}>
                        ${product.price} MXN
                      </span>

                      {/* Tier 3: Add to Cart */}
                      {store.planId === 'pro' && (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-2xs hover:opacity-95 transition-transform active:scale-95 cursor-pointer"
                          style={{ backgroundColor: theme.accentColor }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{inCart ? `Agregar (${inCart.quantity})` : 'Agregar'}</span>
                        </button>
                      )}

                      {/* Tier 2: Order direct via WhatsApp */}
                      {store.planId === 'vitrina' && (
                        <a
                          href={getProductQuoteLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1 shadow-2xs hover:opacity-95 transition-transform active:scale-95 cursor-pointer decoration-none"
                          style={{ backgroundColor: theme.accentColor }}
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
              <div 
                className="py-12 text-center rounded-3xl border text-xs"
                style={{
                  backgroundColor: theme.cardBackground,
                  borderColor: theme.borderColor,
                  color: theme.textMutedColor
                }}
              >
                No se encontraron artículos que coincidan con la búsqueda.
              </div>
            )}

          </section>
        )}

        {/* ================= SECTION: ABOUT US & PHILOSOPHY ================= */}
        {store.aboutUs?.story && (
          <section 
            className="rounded-3xl p-5 sm:p-7 border shadow-xs text-left space-y-4"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.borderColor
            }}
          >
            <div className="flex items-center gap-2" style={{ color: theme.accentColor }}>
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Quiénes Somos & Nuestra Filosofía</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              <div className="md:col-span-2 space-y-2">
                <h3 className="font-display font-black text-lg sm:text-xl" style={{ color: theme.textColor }}>
                  Pasión, Compromiso y Calidad en {store.businessName}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: theme.textMutedColor }}>
                  {store.aboutUs.story}
                </p>
              </div>

              {store.aboutUs.experienceYears && (
                <div 
                  className="p-4 rounded-2xl border text-center flex flex-col justify-center items-center"
                  style={{
                    backgroundColor: `${theme.textColor}05`,
                    borderColor: theme.borderColor
                  }}
                >
                  <span className="font-display font-black text-2xl sm:text-3xl" style={{ color: theme.accentColor }}>
                    +{store.aboutUs.experienceYears}
                  </span>
                  <span className="text-xs font-bold mt-0.5" style={{ color: theme.textColor }}>
                    Años de Experiencia
                  </span>
                  <span className="text-[10px] mt-1" style={{ color: theme.textMutedColor }}>
                    Respaldando cada orden con garantía
                  </span>
                </div>
              )}
            </div>

            {store.aboutUs.highlightValues && store.aboutUs.highlightValues.length > 0 && (
              <div 
                className="pt-3 flex flex-wrap items-center gap-2"
                style={{ borderTop: `1px solid ${theme.borderColor}` }}
              >
                <span className="text-xs font-bold opacity-75" style={{ color: theme.textColor }}>Nuestros Pilares:</span>
                {store.aboutUs.highlightValues.map((val, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                    style={{
                      backgroundColor: `${theme.accentColor}15`,
                      color: theme.accentColor,
                      border: `1px solid ${theme.accentColor}30`
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" /> {val}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================= SECTION: FREQUENTLY ASKED QUESTIONS (FAQ) ================= */}
        {store.faqs && store.faqs.length > 0 && (
          <section 
            className="rounded-3xl p-5 sm:p-7 border shadow-xs text-left space-y-4"
            style={{
              backgroundColor: theme.cardBackground,
              borderColor: theme.borderColor
            }}
          >
            <div className="flex items-center gap-2" style={{ color: theme.accentColor }}>
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Resolvemos tus Dudas</span>
            </div>

            <h3 className="font-display font-black text-lg sm:text-xl" style={{ color: theme.textColor }}>
              Preguntas Frecuentes
            </h3>

            <div className="space-y-2">
              {store.faqs.map(faq => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="rounded-2xl border transition-all overflow-hidden"
                    style={{
                      backgroundColor: `${theme.textColor}04`,
                      borderColor: theme.borderColor
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm" style={{ color: theme.textColor }}>
                        {faq.question}
                      </span>
                      <ChevronDown 
                        className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        style={{ color: theme.accentColor }}
                      />
                    </button>
                    {isOpen && (
                      <div 
                        className="px-3.5 pb-3.5 pt-1 text-xs leading-relaxed"
                        style={{ color: theme.textMutedColor }}
                      >
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

      {/* ================= CART MODAL (TIER 3 PRO) ================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 sm:p-7 shadow-2xl space-y-5 text-left border"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.borderColor,
                color: theme.textColor
              }}
            >
              <div className="flex items-center justify-between pb-3" style={{ borderBottom: `1px solid ${theme.borderColor}` }}>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" style={{ color: theme.accentColor }} />
                  <h3 className="font-display font-black text-lg sm:text-xl">Tu Carrito de Compras</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full opacity-60 hover:opacity-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="py-10 text-center text-xs opacity-60">
                  Tu carrito está vacío. Agrega productos desde el catálogo.
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {cart.map((item, idx) => (
                      <div 
                        key={`${item.product.id}-${item.selectedOption || idx}`}
                        className="p-3 rounded-2xl flex items-center justify-between gap-3 text-xs border"
                        style={{
                          backgroundColor: `${theme.textColor}05`,
                          borderColor: theme.borderColor
                        }}
                      >
                        <div className="min-w-0">
                          <h5 className="font-bold truncate">{item.product.name}</h5>
                          {item.selectedOption && (
                            <span className="text-[10px] opacity-70 block">Opción: {item.selectedOption}</span>
                          )}
                          <span className="font-mono font-bold text-xs block mt-0.5">
                            ${item.product.price * item.quantity} MXN
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, -1, item.selectedOption)}
                            className="w-6 h-6 rounded-full flex items-center justify-center border cursor-pointer opacity-70 hover:opacity-100"
                            style={{ borderColor: theme.borderColor }}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.product.id, 1, item.selectedOption)}
                            className="w-6 h-6 rounded-full flex items-center justify-center border cursor-pointer opacity-70 hover:opacity-100"
                            style={{ borderColor: theme.borderColor }}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id, item.selectedOption)}
                            className="p-1 text-rose-500 hover:text-rose-600 cursor-pointer ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Customer Information */}
                  <div className="space-y-2 pt-2" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    <label className="text-xs font-bold block">Tu Nombre (opcional):</label>
                    <input
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl text-xs focus:outline-none border"
                      style={{
                        backgroundColor: `${theme.textColor}05`,
                        borderColor: theme.borderColor,
                        color: theme.textColor
                      }}
                    />

                    <label className="text-xs font-bold block pt-1">Notas o instrucciones de entrega:</label>
                    <input
                      type="text"
                      placeholder="Ej. Sin cebolla / Enviar a tal dirección"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl text-xs focus:outline-none border"
                      style={{
                        backgroundColor: `${theme.textColor}05`,
                        borderColor: theme.borderColor,
                        color: theme.textColor
                      }}
                    />
                  </div>

                  {/* Total & WhatsApp Order Button */}
                  <div className="pt-3 space-y-3" style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span>Total Estimado:</span>
                      <span className="font-mono text-base" style={{ color: theme.accentColor }}>
                        ${cartTotal} MXN
                      </span>
                    </div>

                    <a
                      href={generateWhatsAppOrderLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-95 transition-transform active:scale-98 cursor-pointer decoration-none"
                      style={{ backgroundColor: '#00b37e' }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Confirmar Pedido por WhatsApp</span>
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 sm:p-7 shadow-2xl space-y-5 text-left border"
              style={{
                backgroundColor: theme.cardBackground,
                borderColor: theme.borderColor,
                color: theme.textColor
              }}
            >
              <div className="flex items-start justify-between pb-3" style={{ borderBottom: `1px solid ${theme.borderColor}` }}>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" style={{ color: theme.accentColor }}>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Políticas del Negocio</span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl mt-1">
                    {store.businessName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPoliciesOpen(false)}
                  className="p-1 rounded-full opacity-60 hover:opacity-100 cursor-pointer"
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
                  className="text-xs leading-relaxed p-3 rounded-2xl border"
                  style={{
                    backgroundColor: `${theme.textColor}05`,
                    borderColor: theme.borderColor,
                    color: theme.textMutedColor
                  }}
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
                  className="text-xs leading-relaxed p-3 rounded-2xl border"
                  style={{
                    backgroundColor: `${theme.textColor}05`,
                    borderColor: theme.borderColor,
                    color: theme.textMutedColor
                  }}
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
                  className="text-xs leading-relaxed p-3 rounded-2xl border"
                  style={{
                    backgroundColor: `${theme.textColor}05`,
                    borderColor: theme.borderColor,
                    color: theme.textMutedColor
                  }}
                >
                  {store.storePolicies?.paymentTerms || 'Aceptamos transferencias electrónicas SPEI y pagos en efectivo al momento de recibir tu orden.'}
                </p>
              </div>

              <div 
                className="text-[10px] pt-3 text-center opacity-60"
                style={{ borderTop: `1px solid ${theme.borderColor}` }}
              >
                Comercio verificado. Esta tienda opera bajo su propia administración. Dayabit provee la tecnología de catálogo web.
              </div>

              <button
                type="button"
                onClick={() => setIsPoliciesOpen(false)}
                className="w-full py-2.5 rounded-2xl text-white text-xs font-bold cursor-pointer transition-opacity hover:opacity-90"
                style={{ backgroundColor: isDark ? '#ffffff' : '#0f172a', color: isDark ? '#0f172a' : '#ffffff' }}
              >
                Cerrar y Volver a la Tienda
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= FOOTER ================= */}
      <footer 
        className="py-6 border-t text-center text-xs space-y-3 transition-colors"
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
              className="hover:opacity-100 transition-opacity flex items-center gap-1 font-bold"
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
              className="hover:opacity-100 transition-opacity flex items-center gap-1 font-bold"
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
              className="hover:opacity-100 transition-opacity flex items-center gap-1 font-bold"
              style={{ color: theme.textColor }}
            >
              <TikTokIcon className="w-3.5 h-3.5" /> TikTok
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsPoliciesOpen(true)}
            className="font-bold underline cursor-pointer hover:opacity-100 transition-opacity"
            style={{ color: theme.textColor }}
          >
            Políticas y Garantías
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
