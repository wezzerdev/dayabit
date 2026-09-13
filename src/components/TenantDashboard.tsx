import React, { useState } from 'react';
import { 
  Store, ShoppingBag, CreditCard, ExternalLink, Copy, Check, Plus, Trash2, 
  ArrowLeft, RefreshCw, Share2, ShieldCheck, Truck, Globe, 
  Smartphone, Monitor, HelpCircle, Award, BookOpen, Utensils, Shirt, Briefcase, Package, 
  Image as ImageIcon, Palette, LayoutTemplate, Sparkles
} from 'lucide-react';
import type { 
  TenantStore, StoreProduct, ProductNiche, FAQItem, NicheProductAttributes, 
  StoreThemeConfig, ThemePaletteMode, StoreTemplateId 
} from '../types/tenant';
import { TenantStorageService, PLANS } from '../services/tenantStore';
import { InstagramIcon, FacebookIcon, TikTokIcon, GoogleMapsIcon } from './SocialIcons';
import { formatSocialUrl } from '../utils/formatSocial';
import { THEME_PRESETS, THEME_PRESET_CARDS, resolveStoreTheme } from '../utils/themePresets';
import { STORE_TEMPLATES_LIST, resolveStoreTemplate } from '../utils/templateDefinitions';
import StorefrontRenderer from './StorefrontRenderer';

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

const AVAILABLE_PAYMENT_METHODS = [
  'Transferencia SPEI',
  'Efectivo contra entrega',
  'Tarjeta (Terminal física)',
  'Tarjeta Débito / Crédito en línea',
  'Mercado Pago',
  'Depósito en OXXO'
];

const BANNER_PRESETS = [
  { name: 'Cafetería & Gourmet', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Boutique & Ropa Urbana', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Oficina & Asesoría Corporativa', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Restaurante & Alta Cocina', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80' },
  { name: 'Salón, Barbería & Spa', url: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&auto=format&fit=crop&q=80' }
];

function TemplateMiniMockup({ templateId }: { templateId: StoreTemplateId }) {
  if (templateId === 'modern_delivery') {
    return (
      <div className="w-full h-32 rounded-2xl bg-slate-900 overflow-hidden relative border border-slate-200 shadow-inner flex flex-col justify-between p-2.5 select-none">
        <div className="absolute inset-0 bg-cover bg-center brightness-75" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&auto=format&fit=crop&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md text-white px-2 py-0.5 rounded-full border border-white/30">
            Delivery & Menú
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="relative z-10 space-y-1.5">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-xl p-1.5 flex items-center justify-between gap-2 shadow-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center text-xs">☕</div>
              <div className="leading-none">
                <span className="text-[10px] font-bold text-slate-900 block truncate w-24">Café & Gourmet</span>
                <span className="text-[8px] font-mono font-bold text-emerald-600">$95 MXN</span>
              </div>
            </div>
            <span className="w-5 h-5 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">+</span>
          </div>
          
          <div className="h-4 bg-emerald-600/90 rounded-lg flex items-center justify-between px-2 text-[8px] font-bold text-white">
            <span>🛒 1 Pedido</span>
            <span>Enviar a WhatsApp →</span>
          </div>
        </div>
      </div>
    );
  }

  if (templateId === 'boutique_editorial') {
    return (
      <div className="w-full h-32 rounded-2xl bg-zinc-950 overflow-hidden relative border border-zinc-800 shadow-inner flex flex-col justify-between p-2.5 select-none text-white">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-80">
            ZARA / APPLE STYLE
          </span>
          <span className="text-[8px] font-bold bg-white/20 px-1.5 py-0.2 rounded text-white">Lookbook</span>
        </div>

        <div className="grid grid-cols-2 gap-2 my-auto">
          <div className="bg-zinc-900 rounded-xl p-1.5 border border-zinc-800 flex items-center gap-1.5">
            <div className="w-7 h-9 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=150&auto=format&fit=crop&q=80" alt="Hoodie" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-[9px] font-bold block truncate">Hoodie Acid</span>
              <span className="text-[8px] opacity-60 block font-mono">$690</span>
              <span className="text-[7px] bg-zinc-800 px-1 rounded text-zinc-300">S M L</span>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl p-1.5 border border-zinc-800 flex items-center gap-1.5">
            <div className="w-7 h-9 rounded-lg bg-zinc-800 overflow-hidden shrink-0">
              <img src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=150&auto=format&fit=crop&q=80" alt="Cargo" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight min-w-0">
              <span className="text-[9px] font-bold block truncate">Cargo Tech</span>
              <span className="text-[8px] opacity-60 block font-mono">$850</span>
              <span className="text-[7px] bg-zinc-800 px-1 rounded text-zinc-300">28 30</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[8px] opacity-70 border-t border-zinc-800 pt-1">
          <span>Colección Streetwear</span>
          <span>Pedir por WhatsApp →</span>
        </div>
      </div>
    );
  }

  if (templateId === 'corporate_services') {
    return (
      <div className="w-full h-32 rounded-2xl bg-slate-900 overflow-hidden relative border border-slate-800 shadow-inner flex flex-col justify-between p-2.5 select-none text-white">
        <div className="flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-wider text-sky-400 bg-sky-950 px-2 py-0.5 rounded-full border border-sky-800">
            Firma Corporativa B2B
          </span>
          <span className="text-[8px] font-mono text-emerald-400">SAT CFDI 4.0 ✓</span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <div className="bg-slate-800/80 rounded-lg p-1 text-center border border-slate-700">
            <span className="font-bold text-sky-400 text-[10px] block leading-none">+12 Años</span>
            <span className="text-[7px] opacity-60">Trayectoria</span>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-1 text-center border border-slate-700">
            <span className="font-bold text-emerald-400 text-[10px] block leading-none">CFDI 4.0</span>
            <span className="text-[7px] opacity-60">Deducible</span>
          </div>
          <div className="bg-slate-800/80 rounded-lg p-1 text-center border border-slate-700">
            <span className="font-bold text-purple-400 text-[10px] block leading-none">100% Legal</span>
            <span className="text-[7px] opacity-60">Contrato</span>
          </div>
        </div>

        <div className="bg-slate-800/90 rounded-xl p-1.5 border border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">📊</span>
            <span className="text-[9px] font-bold truncate">Auditoría Fiscal Integral</span>
          </div>
          <span className="text-[8px] font-bold bg-sky-500 px-2 py-0.5 rounded-lg text-white">Agendar</span>
        </div>
      </div>
    );
  }

  // catalog_express
  return (
    <div className="w-full h-32 rounded-2xl overflow-hidden relative border border-amber-200/50 shadow-inner flex flex-col justify-between p-2.5 select-none bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
          Alta Densidad / Retail
        </span>
        <span className="text-[8px] font-mono text-emerald-700 font-bold">Stock en Almacén ✓</span>
      </div>

      <div className="space-y-1.5">
        <div className="bg-white rounded-xl p-1.5 border border-amber-200/60 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-xs">⚡</div>
            <div className="leading-tight">
              <span className="text-[9px] font-bold text-slate-900 block truncate w-24">Rotomartillo 20V</span>
              <span className="text-[8px] text-emerald-600 font-semibold">DeWalt • Stock 15</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-mono font-bold">$2,199</span>
            <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[9px] font-bold">+</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-1.5 border border-amber-200/60 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-xs">🔧</div>
            <div className="leading-tight">
              <span className="text-[9px] font-bold text-slate-900 block truncate w-24">Llaves Urrea 14pz</span>
              <span className="text-[8px] text-emerald-600 font-semibold">Urrea • Stock 42</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-mono font-bold">$680</span>
            <span className="w-4 h-4 rounded bg-orange-600 text-white flex items-center justify-center text-[9px] font-bold">+</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[8px] text-amber-900 font-bold border-t border-amber-200/50 pt-1">
        <span>Cotización Mayorista</span>
        <span>WhatsApp Directo →</span>
      </div>
    </div>
  );
}

export default function TenantDashboard({ initialStore, onOpenStore, onBackToMain, onCreateNewStore }: TenantDashboardProps) {
  const [allStores, setAllStores] = useState<TenantStore[]>(() => TenantStorageService.getAllStores());
  const [activeStore, setActiveStore] = useState<TenantStore>(() => initialStore || TenantStorageService.getActiveTenant());
  const [activeTab, setActiveTab] = useState<'design' | 'catalog' | 'brand' | 'policies' | 'sections' | 'subscription'>('design');
  const [activeTemplateId, setActiveTemplateId] = useState<StoreTemplateId>(() => resolveStoreTemplate(activeStore));
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Theme configuration states
  const initialTheme = resolveStoreTheme(activeStore);
  const [themeMode, setThemeMode] = useState<ThemePaletteMode>(initialTheme.palette);
  const [pageBackground, setPageBackground] = useState(initialTheme.pageBackground);
  const [cardBackground, setCardBackground] = useState(initialTheme.cardBackground);
  const [textColor, setTextColor] = useState(initialTheme.textColor);
  const [accentColor, setAccentColor] = useState(initialTheme.accentColor);

  // Form states for brand customization
  const [businessName, setBusinessName] = useState(activeStore.businessName);
  const [category, setCategory] = useState(activeStore.category || 'Alimentos y Bebidas');
  const [tagline, setTagline] = useState(activeStore.tagline);
  const [description, setDescription] = useState(activeStore.description);
  const [whatsapp, setWhatsapp] = useState(activeStore.whatsapp);
  const [brandColor, setBrandColor] = useState(activeStore.brandColor);
  const [address, setAddress] = useState(activeStore.address || '');
  const [hours, setHours] = useState(activeStore.hours || '');
  const [bannerUrl, setBannerUrl] = useState(activeStore.bannerUrl || '');

  // Social Links states
  const [instagram, setInstagram] = useState(activeStore.socialLinks?.instagram || '');
  const [facebook, setFacebook] = useState(activeStore.socialLinks?.facebook || '');
  const [tiktok, setTiktok] = useState(activeStore.socialLinks?.tiktok || '');
  const [website, setWebsite] = useState(activeStore.socialLinks?.website || '');
  const [mapsUrl, setMapsUrl] = useState(activeStore.socialLinks?.mapsUrl || '');

  // Payment Methods & Policies states
  const [paymentMethods, setPaymentMethods] = useState<string[]>(
    activeStore.paymentMethods || ['Transferencia SPEI', 'Efectivo contra entrega']
  );
  const [policyShipping, setPolicyShipping] = useState(activeStore.storePolicies?.shipping || '');
  const [policyReturns, setPolicyReturns] = useState(activeStore.storePolicies?.returns || '');
  const [policyPaymentTerms, setPolicyPaymentTerms] = useState(activeStore.storePolicies?.paymentTerms || '');

  // Sections (About Us & FAQs)
  const [aboutStory, setAboutStory] = useState(activeStore.aboutUs?.story || '');
  const [experienceYears, setExperienceYears] = useState<number>(activeStore.aboutUs?.experienceYears || 3);
  const [highlightValues, setHighlightValues] = useState<string>(activeStore.aboutUs?.highlightValues?.join(', ') || 'Calidad Garantizada, Atención Inmediata, Precios Claros');
  const [faqs, setFaqs] = useState<FAQItem[]>(activeStore.faqs || [
    { id: 'faq-1', question: '¿Cómo realizo un pedido?', answer: 'Elige los artículos que te interesen y presiona el botón de WhatsApp para coordinar la entrega o cotización.' },
    { id: 'faq-2', question: '¿Qué formas de pago manejan?', answer: 'Aceptamos transferencias bancarias directas SPEI y efectivo contra entrega al recibir.' }
  ]);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // Niche Product Modal state
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [productNiche, setProductNiche] = useState<ProductNiche>('food');
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('');
  const [newProdPrice, setNewProdPrice] = useState<number>(100);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdIcon, setNewProdIcon] = useState('🍽️');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');
  // Food fields
  const [prodIngredients, setProdIngredients] = useState('');
  const [prodPrepTime, setProdPrepTime] = useState('');
  const [prodBadge, setProdBadge] = useState('');
  // Fashion fields
  const [prodSizes, setProdSizes] = useState<string>('S, M, L, XL');
  const [prodColors, setProdColors] = useState<string>('Negro, Blanco');
  const [prodMaterial, setProdMaterial] = useState<string>('');
  // Services fields
  const [prodDuration, setProdDuration] = useState<string>('45 minutos');
  const [prodModality, setProdModality] = useState<'online' | 'presencial' | 'domicilio'>('online');
  const [prodIncludes, setProdIncludes] = useState<string>('Diagnóstico inicial, Plan de acción, Soporte por WhatsApp');
  // General fields
  const [prodWarranty, setProdWarranty] = useState<string>('');
  const [prodBrand, setProdBrand] = useState<string>('');

  // Handle switching active store
  const handleSelectStore = (storeId: string) => {
    const s = allStores.find(item => item.id === storeId);
    if (s) {
      setActiveStore(s);
      TenantStorageService.setActiveTenantId(s.id);
      setBusinessName(s.businessName);
      setCategory(s.category || 'Alimentos y Bebidas');
      setTagline(s.tagline);
      setDescription(s.description);
      setWhatsapp(s.whatsapp);
      setBrandColor(s.brandColor);
      setAddress(s.address || '');
      setHours(s.hours || '');
      setBannerUrl(s.bannerUrl || '');
      setInstagram(s.socialLinks?.instagram || '');
      setFacebook(s.socialLinks?.facebook || '');
      setTiktok(s.socialLinks?.tiktok || '');
      setWebsite(s.socialLinks?.website || '');
      setMapsUrl(s.socialLinks?.mapsUrl || '');
      setPaymentMethods(s.paymentMethods || ['Transferencia SPEI', 'Efectivo contra entrega']);
      setPolicyShipping(s.storePolicies?.shipping || '');
      setPolicyReturns(s.storePolicies?.returns || '');
      setPolicyPaymentTerms(s.storePolicies?.paymentTerms || '');
      setAboutStory(s.aboutUs?.story || '');
      setExperienceYears(s.aboutUs?.experienceYears || 3);
      setHighlightValues(s.aboutUs?.highlightValues?.join(', ') || 'Calidad Garantizada, Atención Inmediata, Precios Claros');
      setFaqs(s.faqs || []);
      setActiveTemplateId(resolveStoreTemplate(s));
      const t = resolveStoreTheme(s);
      setThemeMode(t.palette);
      setPageBackground(t.pageBackground);
      setCardBackground(t.cardBackground);
      setTextColor(t.textColor);
      setAccentColor(t.accentColor);
    }
  };

  const handleApplyTemplate = (templateId: StoreTemplateId) => {
    setActiveTemplateId(templateId);
    const updated = TenantStorageService.updateStore(activeStore.id, { templateId });
    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleLoadNicheProducts = (niche: ProductNiche) => {
    const updated = TenantStorageService.applyNicheProductsToStore(activeStore.id, niche);
    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleApplyFullNiche = (niche: ProductNiche) => {
    const updated = TenantStorageService.applyFullNicheToStore(activeStore.id, niche);
    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setCategory(updated.category);
      setTagline(updated.tagline);
      setDescription(updated.description);
      setBannerUrl(updated.bannerUrl || '');
      setActiveTemplateId(resolveStoreTemplate(updated));
      const t = resolveStoreTheme(updated);
      setThemeMode(t.palette);
      setPageBackground(t.pageBackground);
      setCardBackground(t.cardBackground);
      setTextColor(t.textColor);
      setAccentColor(t.accentColor);
      setBrandColor(t.accentColor);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleSelectThemePreset = (presetKey: ThemePaletteMode) => {
    setThemeMode(presetKey);
    if (presetKey !== 'custom') {
      const p = THEME_PRESETS[presetKey];
      setPageBackground(p.pageBackground);
      setCardBackground(p.cardBackground);
      setTextColor(p.textColor);
      setAccentColor(p.accentColor);
      setBrandColor(p.accentColor);

      const isDark = p.textColor === '#ffffff' || p.textColor === '#f8fafc' || p.pageBackground.startsWith('#0') || p.pageBackground.startsWith('#1');
      const themeConfig: StoreThemeConfig = {
        palette: presetKey,
        pageBackground: p.pageBackground,
        cardBackground: p.cardBackground,
        headerBackground: p.cardBackground.startsWith('#') ? `${p.cardBackground}f2` : p.cardBackground,
        textColor: p.textColor,
        textMutedColor: isDark ? '#94a3b8' : '#64748b',
        borderColor: isDark ? '#1e293b' : '#e2e8f0',
        accentColor: p.accentColor,
      };

      const updated = TenantStorageService.updateStore(activeStore.id, {
        themeConfig,
        brandColor: p.accentColor
      });
      if (updated) {
        setActiveStore(updated);
        setAllStores(TenantStorageService.getAllStores());
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    }
  };

  const handleUpdateCustomTheme = (updates: Partial<{ pageBackground: string; cardBackground: string; textColor: string; accentColor: string; bannerUrl: string }>) => {
    const newPageBg = updates.pageBackground ?? pageBackground;
    const newCardBg = updates.cardBackground ?? cardBackground;
    const newTextColor = updates.textColor ?? textColor;
    const newAccent = updates.accentColor ?? accentColor;
    const newBanner = updates.bannerUrl ?? bannerUrl;

    if (updates.pageBackground) setPageBackground(updates.pageBackground);
    if (updates.cardBackground) setCardBackground(updates.cardBackground);
    if (updates.textColor) setTextColor(updates.textColor);
    if (updates.accentColor) {
      setAccentColor(updates.accentColor);
      setBrandColor(updates.accentColor);
    }
    if (updates.bannerUrl !== undefined) setBannerUrl(updates.bannerUrl);

    setThemeMode('custom');

    const isDark = newTextColor === '#ffffff' || newTextColor === '#f8fafc' || newPageBg.startsWith('#0') || newPageBg.startsWith('#1');
    const themeConfig: StoreThemeConfig = {
      palette: 'custom',
      pageBackground: newPageBg,
      cardBackground: newCardBg,
      headerBackground: newCardBg.startsWith('#') ? `${newCardBg}f2` : newCardBg,
      textColor: newTextColor,
      textMutedColor: isDark ? '#94a3b8' : '#64748b',
      borderColor: isDark ? '#1e293b' : '#e2e8f0',
      accentColor: newAccent,
    };

    const updated = TenantStorageService.updateStore(activeStore.id, {
      themeConfig,
      brandColor: newAccent,
      bannerUrl: newBanner
    });
    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
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
    const effectiveAccent = accentColor || brandColor || '#00b37e';
    const isDarkTheme = textColor === '#ffffff' || textColor === '#f8fafc' || pageBackground.startsWith('#0') || pageBackground.startsWith('#1');

    const themeConfig: StoreThemeConfig = {
      palette: themeMode,
      pageBackground,
      cardBackground,
      headerBackground: cardBackground.startsWith('#') ? `${cardBackground}f2` : cardBackground,
      textColor,
      textMutedColor: isDarkTheme ? '#94a3b8' : '#64748b',
      borderColor: isDarkTheme ? '#1e293b' : '#e2e8f0',
      accentColor: effectiveAccent,
    };

    const updated = TenantStorageService.updateStore(activeStore.id, {
      businessName,
      tagline,
      description,
      whatsapp: whatsapp.replace(/\D/g, ''),
      brandColor: effectiveAccent,
      themeConfig,
      address,
      hours,
      bannerUrl,
      category
    });

    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleTogglePaymentMethod = (method: string) => {
    setPaymentMethods(prev => {
      if (prev.includes(method)) {
        return prev.filter(m => m !== method);
      } else {
        return [...prev, method];
      }
    });
  };

  const handleSavePolicies = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = TenantStorageService.updateStore(activeStore.id, {
      socialLinks: {
        instagram: formatSocialUrl('instagram', instagram),
        facebook: formatSocialUrl('facebook', facebook),
        tiktok: formatSocialUrl('tiktok', tiktok),
        website: formatSocialUrl('web', website),
        mapsUrl: formatSocialUrl('maps', mapsUrl),
      },
      paymentMethods,
      storePolicies: {
        shipping: policyShipping.trim(),
        returns: policyReturns.trim(),
        paymentTerms: policyPaymentTerms.trim(),
      }
    });

    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleSaveSections = (e: React.FormEvent) => {
    e.preventDefault();
    const valuesArray = highlightValues.split(',').map(v => v.trim()).filter(Boolean);
    const updated = TenantStorageService.updateStore(activeStore.id, {
      aboutUs: {
        story: aboutStory.trim(),
        experienceYears: Number(experienceYears) || 0,
        highlightValues: valuesArray
      },
      faqs
    });

    if (updated) {
      setActiveStore(updated);
      setAllStores(TenantStorageService.getAllStores());
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim()
    };
    setFaqs(prev => [...prev, newFaq]);
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  const handleDeleteFaq = (faqId: string) => {
    setFaqs(prev => prev.filter(f => f.id !== faqId));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const sizesArray = prodSizes.split(',').map(s => s.trim()).filter(Boolean);
    const colorsArray = prodColors.split(',').map(c => c.trim()).filter(Boolean);
    const includesArray = prodIncludes.split(',').map(i => i.trim()).filter(Boolean);

    const nicheAttributes: NicheProductAttributes = {
      niche: productNiche,
      badge: prodBadge.trim() || undefined,
      ...(productNiche === 'food' ? {
        ingredients: prodIngredients.trim() || undefined,
        preparationTime: prodPrepTime.trim() || undefined
      } : {}),
      ...(productNiche === 'fashion' ? {
        sizes: sizesArray.length > 0 ? sizesArray : undefined,
        colors: colorsArray.length > 0 ? colorsArray : undefined,
        material: prodMaterial.trim() || undefined
      } : {}),
      ...(productNiche === 'services' ? {
        serviceDuration: prodDuration.trim() || undefined,
        serviceModality: prodModality,
        includes: includesArray.length > 0 ? includesArray : undefined
      } : {}),
      ...(productNiche === 'general' ? {
        warranty: prodWarranty.trim() || undefined,
        brand: prodBrand.trim() || undefined
      } : {})
    };

    const newProd: StoreProduct = {
      id: `p-${Date.now()}`,
      name: newProdName.trim(),
      category: newProdCategory.trim() || (productNiche === 'food' ? 'Alimentos' : productNiche === 'fashion' ? 'Ropa' : productNiche === 'services' ? 'Servicios' : 'General'),
      price: Number(newProdPrice) || 0,
      description: newProdDesc.trim(),
      imageUrl: newProdImageUrl.trim() || undefined,
      iconText: newProdIcon.trim() || (productNiche === 'food' ? '🍽️' : productNiche === 'fashion' ? '👗' : productNiche === 'services' ? '💼' : '📦'),
      inStock: true,
      nicheAttributes
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
      setNewProdImageUrl('');
      setProdIngredients('');
      setProdPrepTime('');
      setProdBadge('');
      setProdMaterial('');
      setProdWarranty('');
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
                  {allStores.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.businessName} ({PLANS[st.planId].name})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 font-mono">
                  dayabit.com/p/{activeStore.slug}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onCreateNewStore}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Nueva Tienda
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00b37e]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? '¡Copiado!' : 'Copiar Link'}</span>
            </button>

            <button
              onClick={() => setActiveTab('design')}
              className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'design' 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#00b37e]" />
              <span>Diseño & Vista Previa</span>
            </button>

            <button
              onClick={() => onOpenStore(activeStore.slug)}
              className="px-4 py-1.5 rounded-full text-white font-bold text-xs shadow-xs hover:opacity-90 transition-all cursor-pointer flex items-center gap-1.5"
              style={{ backgroundColor: activeStore.brandColor }}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir Web Pública
            </button>
          </div>

        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-6 py-8 w-full flex-grow space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('design')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'design'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutTemplate className="w-4 h-4" />
            Diseño & Vista Previa
            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              En Vivo
            </span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'catalog'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Catálogo & Artículos ({activeStore.products.length})
          </button>

          <button
            onClick={() => setActiveTab('brand')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'brand'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Store className="w-4 h-4" />
            Datos del Negocio & Redes
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'policies'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Garantías & Formas de Pago
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'sections'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Quiénes Somos & FAQ
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-3 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'subscription'
                ? 'border-[#00b37e] text-[#00b37e]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Suscripción & Plan
          </button>
        </div>

        {/* ================= TAB 0: UNIFIED DESIGN STUDIO & LIVE SIMULATOR ================= */}
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Header Control Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#00b37e]">
                  <span className="w-2 h-2 rounded-full bg-[#00b37e] animate-pulse" />
                  <span>Estudio Visual & Vista Previa en Vivo</span>
                </div>
                <h3 className="font-display font-black text-xl text-slate-900 mt-1">
                  Diseña y Personaliza la Tienda de {activeStore.businessName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Cambia de plantilla, colores o banners y visualiza los cambios al instante en el simulador interactivo.
                </p>
              </div>

              {/* Device switcher and fullscreen open */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Móvil (iPhone)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Escritorio</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenStore(activeStore.slug)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  title="Abrir tienda en una pestaña nueva"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Pantalla Completa</span>
                </button>
              </div>
            </div>

            {/* Split Screen Layout: Left Controls (7 cols), Right Simulator (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: Controls */}
              <div className="lg:col-span-7 space-y-6">

                {/* Section 1: Template Selection */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <LayoutTemplate className="w-4 h-4 text-[#00b37e]" />
                        <span>Paso 1: Selecciona la Plantilla</span>
                      </div>
                      <h4 className="font-display font-black text-lg text-slate-900 mt-0.5">
                        Plantilla Arquitectónica de la Tienda
                      </h4>
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full w-fit">
                      4 Plantillas Disponibles
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {STORE_TEMPLATES_LIST.map(tmpl => {
                      const isCurrent = activeTemplateId === tmpl.id;
                      const niche: ProductNiche = 
                        tmpl.id === 'modern_delivery' ? 'food' :
                        tmpl.id === 'boutique_editorial' ? 'fashion' :
                        tmpl.id === 'corporate_services' ? 'services' : 'general';

                      return (
                        <div
                          key={tmpl.id}
                          className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                            isCurrent
                              ? 'border-[#00b37e] bg-emerald-50/20 shadow-md ring-2 ring-[#00b37e]/20'
                              : 'border-slate-200 hover:border-slate-300 bg-white shadow-2xs hover:shadow-sm'
                          }`}
                        >
                          <div className="space-y-2.5">
                            <TemplateMiniMockup templateId={tmpl.id} />

                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="font-bold text-sm text-slate-900 leading-tight">
                                  {tmpl.name}
                                </h5>
                                {isCurrent && (
                                  <span className="text-[9px] font-black uppercase tracking-wider bg-[#00b37e] text-white px-2 py-0.5 rounded-md shrink-0 flex items-center gap-1">
                                    <Check className="w-2.5 h-2.5" /> Activa
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-bold text-[#00b37e] uppercase tracking-wide block mt-0.5">
                                {tmpl.badge}
                              </span>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {tmpl.description}
                              </p>
                            </div>

                            <ul className="space-y-1 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                              {tmpl.features.slice(0, 2).map((feat, i) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b37e]" />
                                  <span className="truncate">{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-1 flex flex-col gap-2">
                            <button
                              type="button"
                              onClick={() => handleApplyTemplate(tmpl.id)}
                              className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                isCurrent
                                  ? 'bg-[#00b37e] text-white shadow-xs'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {isCurrent ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Plantilla Seleccionada</span>
                                </>
                              ) : (
                                <span>Aplicar esta Plantilla</span>
                              )}
                            </button>

                            {isCurrent && (
                              <button
                                type="button"
                                onClick={() => handleApplyFullNiche(niche)}
                                className="w-full py-1.5 px-2.5 rounded-xl text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                title="Carga artículos reales de este rubro y adapta la identidad de la tienda"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>Adaptar Artículos a este Estilo</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Color Palettes & Custom Colors */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <Palette className="w-4 h-4 text-[#00b37e]" />
                        <span>Paso 2: Paleta de Colores y Modo</span>
                      </div>
                      <h4 className="font-display font-black text-lg text-slate-900 mt-0.5">
                        Estilo Visual y Fondos de la Tienda
                      </h4>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Actualización inmediata al hacer clic
                    </span>
                  </div>

                  {/* Preset Swatches */}
                  <div>
                    <span className="text-xs font-bold text-slate-700 block mb-2">
                      Estilos Preconfigurados:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {THEME_PRESET_CARDS.map(preset => {
                        const isSelected = themeMode === preset.id;
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => handleSelectThemePreset(preset.id)}
                            className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                              isSelected
                                ? 'border-[#00b37e] bg-emerald-50/20 ring-2 ring-[#00b37e]/20 shadow-xs'
                                : 'border-slate-200 hover:border-slate-300 bg-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 block truncate">
                                {preset.name}
                              </span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-[#00b37e] shrink-0" />}
                            </div>

                            <div className="flex items-center gap-1.5">
                              <div
                                className="w-5 h-5 rounded-md border border-slate-300 shadow-2xs shrink-0"
                                style={{ backgroundColor: preset.previewBg }}
                                title="Fondo de página"
                              />
                              <div
                                className="w-5 h-5 rounded-md border border-slate-300 shadow-2xs shrink-0"
                                style={{ backgroundColor: preset.previewAccent }}
                                title="Color de acento"
                              />
                              <span className="text-[10px] text-slate-400 truncate">
                                {preset.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Fine Tuning Custom Colors */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">
                      Ajuste Fino de Colores Personalizados:
                    </span>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Fondo Página
                        </label>
                        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
                          <input
                            type="color"
                            value={pageBackground.startsWith('#') ? pageBackground : '#ffffff'}
                            onChange={e => handleUpdateCustomTheme({ pageBackground: e.target.value })}
                            className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                          />
                          <input
                            type="text"
                            value={pageBackground}
                            onChange={e => handleUpdateCustomTheme({ pageBackground: e.target.value })}
                            className="w-full text-[11px] font-mono text-slate-700 bg-transparent outline-none uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Fondo Tarjetas
                        </label>
                        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
                          <input
                            type="color"
                            value={cardBackground.startsWith('#') ? cardBackground : '#ffffff'}
                            onChange={e => handleUpdateCustomTheme({ cardBackground: e.target.value })}
                            className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                          />
                          <input
                            type="text"
                            value={cardBackground}
                            onChange={e => handleUpdateCustomTheme({ cardBackground: e.target.value })}
                            className="w-full text-[11px] font-mono text-slate-700 bg-transparent outline-none uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Acento / Botón
                        </label>
                        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
                          <input
                            type="color"
                            value={accentColor.startsWith('#') ? accentColor : '#00b37e'}
                            onChange={e => handleUpdateCustomTheme({ accentColor: e.target.value })}
                            className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                          />
                          <input
                            type="text"
                            value={accentColor}
                            onChange={e => handleUpdateCustomTheme({ accentColor: e.target.value })}
                            className="w-full text-[11px] font-mono text-slate-700 bg-transparent outline-none uppercase"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                          Texto / Letra
                        </label>
                        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200">
                          <input
                            type="color"
                            value={textColor.startsWith('#') ? textColor : '#0f172a'}
                            onChange={e => handleUpdateCustomTheme({ textColor: e.target.value })}
                            className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                          />
                          <input
                            type="text"
                            value={textColor}
                            onChange={e => handleUpdateCustomTheme({ textColor: e.target.value })}
                            className="w-full text-[11px] font-mono text-slate-700 bg-transparent outline-none uppercase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 3: Banner & Cover Image */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <ImageIcon className="w-4 h-4 text-[#00b37e]" />
                        <span>Paso 3: Banner o Portada</span>
                      </div>
                      <h4 className="font-display font-black text-lg text-slate-900 mt-0.5">
                        Imagen de Cabecera del Negocio
                      </h4>
                    </div>
                  </div>

                  {/* Preset Banner Thumbnails */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Selecciona una imagen de portada sugerida:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {BANNER_PRESETS.map((preset, idx) => {
                        const isChosen = bannerUrl === preset.url;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleUpdateCustomTheme({ bannerUrl: preset.url })}
                            className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group text-left ${
                              isChosen
                                ? 'border-[#00b37e] ring-2 ring-[#00b37e]/30 scale-[1.02]'
                                : 'border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-2 flex flex-col justify-between">
                              <div className="flex justify-end">
                                {isChosen && (
                                  <span className="bg-[#00b37e] text-white p-0.5 rounded-full">
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-bold text-white line-clamp-1">
                                {preset.name}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom Banner Input */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      O pega el enlace URL de tu propia imagen:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={bannerUrl}
                        onChange={e => handleUpdateCustomTheme({ bannerUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/... o enlace de tu imagen"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#00b37e] focus:outline-none"
                      />
                      {bannerUrl && (
                        <button
                          type="button"
                          onClick={() => handleUpdateCustomTheme({ bannerUrl: '' })}
                          className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                          title="Quitar portada"
                        >
                          Quitar
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 4: Demo Switcher */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00b37e]" />
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      Cargar Tienda Demo de Ejemplo por Rubro:
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Cambia la tienda activa a un ejemplo completo con sus artículos y fotos reales para ver cómo queda:
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {([
                      { id: 'store-geisha', label: 'Alimentos & Café', icon: '🍔' },
                      { id: 'store-boutique', label: 'Moda & Ropa', icon: '👗' },
                      { id: 'store-consultoria', label: 'Servicios B2B', icon: '💼' },
                      { id: 'store-ferreteria', label: 'Ferretería / Retail', icon: '⚡' }
                    ] as const).map(item => {
                      const isSelected = activeStore.id === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectStore(item.id)}
                          className={`p-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center gap-1 text-center border ${
                            isSelected
                              ? 'border-[#00b37e] bg-[#00b37e] text-white shadow-xs scale-105'
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="text-[11px] leading-tight">{item.label}</span>
                          {isSelected && <span className="text-[9px] font-black uppercase mt-0.5">Tienda Activa</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Interactive Live Simulator (Sticky) */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00b37e] animate-pulse" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Simulador en Vivo: {activeStore.businessName}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {previewDevice === 'mobile' ? 'iPhone 16 Pro' : 'Desktop 1200px'}
                  </span>
                </div>

                {previewDevice === 'mobile' ? (
                  /* Luxury iPhone 16 Pro Titanium Mockup Frame */
                  <div className="w-full max-w-[365px] sm:max-w-[390px] h-[720px] bg-slate-950 rounded-[50px] p-2.5 sm:p-3 border-[7px] border-slate-800 shadow-2xl relative flex flex-col mx-auto overflow-hidden ring-1 ring-white/10">
                    
                    {/* Top iOS Status Bar */}
                    <div className="w-full h-8 px-5 flex items-center justify-between text-white text-[11px] font-semibold shrink-0 z-30 select-none bg-black/40 backdrop-blur-sm">
                      <span className="tracking-tight">9:41</span>
                      {/* Dynamic Island */}
                      <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                      </div>
                      {/* WiFi & Battery */}
                      <div className="flex items-center gap-1.5 text-[10px]">
                        <span>5G</span>
                        <div className="w-5 h-2.5 rounded-sm border border-white/80 p-0.5 flex items-center">
                          <div className="h-full w-full bg-white rounded-xs" />
                        </div>
                      </div>
                    </div>

                    {/* Device screen inside frame */}
                    <div 
                      className="flex-1 rounded-[38px] overflow-y-auto relative no-scrollbar"
                      style={{ backgroundColor: resolveStoreTheme(activeStore).pageBackground }}
                    >
                      <StorefrontRenderer store={activeStore} isMobileSimulator={true} />
                    </div>

                    {/* Bottom iOS Home Indicator Bar */}
                    <div className="w-full py-1.5 flex items-center justify-center shrink-0 z-30 bg-black/40 backdrop-blur-sm">
                      <div className="w-28 h-1 bg-white/50 rounded-full" />
                    </div>
                  </div>
                ) : (
                  /* Desktop Mockup Frame */
                  <div className="w-full h-[680px] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                    {/* Browser Bar */}
                    <div className="h-9 bg-slate-100 border-b border-slate-200 px-3 flex items-center gap-2 shrink-0">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </div>
                      <div className="flex-1 max-w-xs mx-auto bg-white px-2 py-0.5 rounded text-[11px] text-slate-600 font-mono text-center border border-slate-200 truncate">
                        dayabit.com/p/{activeStore.slug}
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenStore(activeStore.slug)}
                        className="text-[11px] text-[#00b37e] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3" /> Abrir
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <StorefrontRenderer store={activeStore} isMobileSimulator={false} />
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-emerald-900 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Simulador 100% Interactivo:</strong> Puedes agregar artículos, calcular el carrito y simular pedidos a WhatsApp.
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 1: CATALOG & NICHE PRODUCTS ================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#00b37e] uppercase tracking-wider">
                  <Package className="w-4 h-4" />
                  <span>Alta Inteligente según Giro</span>
                </div>
                <h3 className="font-display font-black text-xl text-slate-900 mt-1">
                  Artículos y Servicios del Negocio
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
                Agregar Artículo por Giro
              </button>
            </div>

            {/* Quick Niche Catalog Loader */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-slate-900">
                    ¿Cambiaste el rubro de tu negocio? Carga un catálogo de muestra al instante
                  </h4>
                  <p className="text-xs text-slate-600">
                    Reemplaza los artículos actuales por un catálogo profesional con fotos HD listo para vender:
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleLoadNicheProducts('food')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <span>☕</span>
                  <span>Alimentos & Café</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadNicheProducts('fashion')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <span>👗</span>
                  <span>Moda & Ropa</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadNicheProducts('services')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <span>💼</span>
                  <span>Servicios B2B</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadNicheProducts('general')}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                >
                  <span>⚡</span>
                  <span>Ferretería / Retail</span>
                </button>
              </div>
            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeStore.products.map((prod) => {
                const niche = prod.nicheAttributes;
                return (
                  <div 
                    key={prod.id}
                    className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start gap-3.5">
                        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs overflow-hidden">
                          {prod.imageUrl ? (
                            <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                          ) : (
                            <span>{prod.iconText || '📦'}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                              {prod.category}
                            </span>
                            {niche?.badge && (
                              <span className="text-[9px] font-bold text-white bg-slate-900 px-1.5 py-0.5 rounded-md">
                                {niche.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm truncate mt-1">
                            {prod.name}
                          </h4>
                          <p className="font-mono font-black text-sm text-slate-900 mt-0.5">
                            ${prod.price} MXN
                          </p>
                        </div>
                      </div>

                      {/* Attributes preview based on niche */}
                      {niche?.ingredients && (
                        <p className="text-[11px] text-slate-500 italic mt-2.5 bg-slate-50 p-2 rounded-xl border border-slate-100 line-clamp-2">
                          <strong>Ingredientes:</strong> {niche.ingredients}
                        </p>
                      )}

                      {niche?.sizes && niche.sizes.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-1 flex-wrap text-[10px]">
                          <span className="font-bold text-slate-400">Tallas:</span>
                          {niche.sizes.map(s => (
                            <span key={s} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">{s}</span>
                          ))}
                        </div>
                      )}

                      {niche?.serviceDuration && (
                        <p className="text-[11px] text-emerald-800 font-semibold mt-2">
                          🕒 Duración: {niche.serviceDuration} · <span className="capitalize">{niche.serviceModality}</span>
                        </p>
                      )}

                      {prod.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mt-2 pt-2 border-t border-slate-100">
                          {prod.description}
                        </p>
                      )}
                    </div>

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
                );
              })}
            </div>

            {activeStore.products.length === 0 && (
              <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 text-slate-400 text-sm">
                Aún no has agregado productos. Haz clic en "Agregar Artículo por Giro" para comenzar.
              </div>
            )}

          </div>
        )}



        {/* ================= TAB 2: BRAND, WHATSAPP & COVER BANNER ================= */}
        {activeTab === 'brand' && (
          <div className="max-w-3xl bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            
            <div>
              <h3 className="font-display font-black text-xl text-slate-900">
                Personaliza la Identidad & Portada de tu Tienda
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Los cambios se reflejan inmediatamente en tu URL pública y en la vista previa.
              </p>
            </div>

            <form onSubmit={handleSaveBrand} className="space-y-6">
              
              {/* Banner / Cover Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#00b37e]" />
                    Imagen de Portada / Banner de Cabecera
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Resolución recomendada 1200x500</span>
                </label>

                {/* Banner Preview */}
                {bannerUrl && (
                  <div className="w-full h-32 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200">
                    <img src={bannerUrl} alt="Portada actual" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setBannerUrl('')}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white text-xs hover:bg-slate-900"
                    >
                      Quitar
                    </button>
                  </div>
                )}

                {/* Presets Grid */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-500 font-medium">Elige un fondo profesional o pega tu propio enlace:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {BANNER_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setBannerUrl(preset.url)}
                        className={`p-2 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex flex-col justify-between h-16 relative overflow-hidden ${
                          bannerUrl === preset.url ? 'border-[#00b37e] ring-2 ring-[#00b37e]/30' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <img src={preset.url} alt={preset.name} className="absolute inset-0 w-full h-full object-cover opacity-35" />
                        <span className="relative z-10 text-[10px] font-bold text-slate-900 bg-white/90 px-1.5 py-0.5 rounded-md w-fit">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <input
                  type="url"
                  placeholder="O pega aquí la URL de tu propia imagen..."
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                />
              </div>

              {/* Giro / Rubro Comercial */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block">Rubro o Giro Comercial del Negocio</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#00b37e] bg-white"
                  >
                    <option value="Alimentos y Bebidas">Alimentos y Bebidas (Cafetería, Restaurante, Snacks)</option>
                    <option value="Moda & Streetwear">Moda & Ropa (Boutique, Calzado, Lookbook)</option>
                    <option value="Asesoría Fiscal & Legal">Servicios Profesionales (Consultoría, Asesoría, B2B)</option>
                    <option value="Ferretería Industrial">Ferretería & Retail (Herramientas, Mayoreo, Tienda General)</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      const niche: ProductNiche = 
                        category.includes('Alimentos') ? 'food' :
                        category.includes('Moda') ? 'fashion' :
                        category.includes('Fiscal') || category.includes('Servicios') ? 'services' : 'general';
                      handleApplyFullNiche(niche);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Adaptar Plantilla & Artículos a este Rubro</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
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
                  <p className="text-[10px] text-slate-400">10 dígitos sin espacios ni guiones.</p>
                </div>
              </div>

              {/* SECTION: FULL PAGE THEME & COLORS */}
              <div className="space-y-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#00b37e]" />
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Paleta & Colores de la Página Completa
                  </h4>
                </div>
                <p className="text-xs text-slate-500">
                  Elige una paleta profesional o define tú mismo el color de fondo de toda la página, tarjetas, textos y botones.
                </p>

                {/* Preset Themes Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {THEME_PRESET_CARDS.map(preset => {
                    const isSelected = themeMode === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectThemePreset(preset.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                          isSelected 
                            ? 'border-[#00b37e] ring-2 ring-[#00b37e]/40 shadow-sm' 
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                        style={{ backgroundColor: preset.previewBg }}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <span 
                            className="text-[11px] font-bold px-2 py-0.5 rounded-md shadow-2xs"
                            style={{ backgroundColor: preset.previewCard, color: preset.previewText }}
                          >
                            {preset.name}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#00b37e] text-white flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </span>
                          )}
                        </div>
                        <div 
                          className="p-2 rounded-xl text-[10px] space-y-1 shadow-2xs border"
                          style={{ 
                            backgroundColor: preset.previewCard, 
                            borderColor: `${preset.previewText}20`,
                            color: preset.previewText 
                          }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-bold">Tarjeta Demo</span>
                            <span 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: preset.previewAccent }} 
                            />
                          </div>
                          <p className="line-clamp-1 opacity-70">{preset.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Fine-tuning Color Pickers */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 mt-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Personalizador de Colores Específicos:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {/* 1. Page Background */}
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700 block">
                        Fondo de Página
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={pageBackground.startsWith('#') ? pageBackground : '#ffffff'}
                          onChange={(e) => {
                            setPageBackground(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={pageBackground}
                          onChange={(e) => {
                            setPageBackground(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="flex-1 py-1 px-2 text-xs font-mono rounded border border-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 2. Card Background */}
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700 block">
                        Fondo de Tarjetas
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={cardBackground.startsWith('#') ? cardBackground : '#ffffff'}
                          onChange={(e) => {
                            setCardBackground(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={cardBackground}
                          onChange={(e) => {
                            setCardBackground(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="flex-1 py-1 px-2 text-xs font-mono rounded border border-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 3. Text Color */}
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700 block">
                        Color del Texto
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={textColor.startsWith('#') ? textColor : '#0f172a'}
                          onChange={(e) => {
                            setTextColor(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={textColor}
                          onChange={(e) => {
                            setTextColor(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="flex-1 py-1 px-2 text-xs font-mono rounded border border-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 4. Accent / Brand Color */}
                    <div className="space-y-1 bg-white p-2.5 rounded-xl border border-slate-200">
                      <label className="text-[11px] font-bold text-slate-700 block">
                        Botones & Acento
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={accentColor.startsWith('#') ? accentColor : '#00b37e'}
                          onChange={(e) => {
                            setAccentColor(e.target.value);
                            setBrandColor(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="w-7 h-7 rounded-lg cursor-pointer border-0 p-0"
                        />
                        <input
                          type="text"
                          value={accentColor}
                          onChange={(e) => {
                            setAccentColor(e.target.value);
                            setBrandColor(e.target.value);
                            setThemeMode('custom');
                          }}
                          className="flex-1 py-1 px-2 text-xs font-mono rounded border border-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quick Accent Swatches */}
                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1.5 uppercase tracking-wider">
                      Sugerencias rápidas para el botón de compra:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {COLOR_SWATCHES.map(swatch => (
                        <button
                          key={swatch.hex}
                          type="button"
                          onClick={() => {
                            setAccentColor(swatch.hex);
                            setBrandColor(swatch.hex);
                          }}
                          title={swatch.name}
                          className={`w-7 h-7 rounded-full transition-transform flex items-center justify-center cursor-pointer ${
                            accentColor === swatch.hex ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                          }`}
                          style={{ backgroundColor: swatch.hex }}
                        >
                          {accentColor === swatch.hex && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </button>
                      ))}
                    </div>
                  </div>
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
                  rows={2}
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

        {/* ================= TAB 3: SOCIAL & BUSINESS POLICIES ================= */}
        {activeTab === 'policies' && (
          <div className="max-w-3xl bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-xs space-y-8">
            
            <div>
              <div className="flex items-center gap-2 text-[#00b37e] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Autonomía & Confianza Comercial</span>
              </div>
              <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
                Redes Sociales, Formas de Pago y Políticas
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Personaliza la identidad de tu empresa para que tus clientes sepan que compran bajo tus propias políticas, garantías y canales oficiales.
              </p>
            </div>

            <form onSubmit={handleSavePolicies} className="space-y-8">
              
              {/* SECTION 1: SOCIAL LINKS */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-[#00b37e]" />
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Redes Sociales Oficiales
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  Aparecerán con íconos interactivos en la cabecera y pie de tu tienda web.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Instagram */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="text-rose-500"><InstagramIcon className="w-3.5 h-3.5" /></span>
                      Instagram
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. @geishacafemx o instagram.com/geishacafemx"
                      value={instagram}
                      onChange={(e) => setInstagram(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  {/* Facebook */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="text-blue-600"><FacebookIcon className="w-3.5 h-3.5" /></span>
                      Facebook
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. facebook.com/geishacafemx"
                      value={facebook}
                      onChange={(e) => setFacebook(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  {/* TikTok */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="text-slate-900"><TikTokIcon className="w-3.5 h-3.5" /></span>
                      TikTok
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. @geishacafemx"
                      value={tiktok}
                      onChange={(e) => setTiktok(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  {/* Google Maps */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span className="text-emerald-600"><GoogleMapsIcon className="w-3.5 h-3.5" /></span>
                      Google Maps (Ubicación)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Enlace o dirección en Maps"
                      value={mapsUrl}
                      onChange={(e) => setMapsUrl(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  {/* Website adicional */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      Sitio Web Adicional / Dominio Externo (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. www.tudominio.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: PAYMENT METHODS */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00b37e]" />
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Métodos de Pago que Acepta tu Negocio
                  </h4>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {AVAILABLE_PAYMENT_METHODS.map(method => {
                    const isSelected = paymentMethods.includes(method);
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => handleTogglePaymentMethod(method)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>{method}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: STORE POLICIES */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#00b37e]" />
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Tus Políticas y Compromisos Comerciales
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Política de Envíos y Tiempos de Entrega</label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Entregas locales en 45 minutos. Envíos nacionales por paquetería en 2-4 días hábiles."
                      value={policyShipping}
                      onChange={(e) => setPolicyShipping(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Política de Garantía y Devoluciones</label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Garantía de satisfacción 100%: si tu orden llega dañada, la reemplazamos sin costo dentro de 7 días."
                      value={policyReturns}
                      onChange={(e) => setPolicyReturns(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Condiciones y Términos de Pago</label>
                    <textarea
                      rows={2}
                      placeholder="Ej. Se paga contra entrega en efectivo o mediante transferencia SPEI directa al confirmar tu orden por WhatsApp."
                      value={policyPaymentTerms}
                      onChange={(e) => setPolicyPaymentTerms(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Guardar Redes y Políticas
                </button>

                {saveSuccess && (
                  <span className="text-xs font-bold text-[#00b37e] flex items-center gap-1 animate-in fade-in">
                    <Check className="w-4 h-4" /> ¡Configuración guardada exitosamente!
                  </span>
                )}
              </div>

            </form>
          </div>
        )}

        {/* ================= TAB 4: SECTIONS (ABOUT US & FAQ) ================= */}
        {activeTab === 'sections' && (
          <div className="max-w-3xl bg-white p-6 sm:p-9 rounded-3xl border border-slate-200 shadow-xs space-y-8">
            
            <div>
              <div className="flex items-center gap-2 text-[#00b37e] font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Confianza y Certidumbre para Clientes</span>
              </div>
              <h3 className="font-display font-black text-2xl text-slate-900 mt-1">
                Quiénes Somos & Preguntas Frecuentes
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Transmite profesionalismo corporativo y responde las dudas más habituales antes de que el cliente escriba a WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSaveSections} className="space-y-8">
              
              {/* ABOUT US */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00b37e]" />
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Sección "Quiénes Somos / Sobre Nosotros"
                  </h4>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Historia o Filosofía de la Empresa</label>
                    <textarea
                      rows={3}
                      placeholder="Cuenta brevemente el origen de tu negocio, qué te apasiona y cómo cuidas a tus clientes..."
                      value={aboutStory}
                      onChange={(e) => setAboutStory(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Años de Experiencia / Trayectoria</label>
                      <input
                        type="number"
                        min="1"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Valores Clave (separados por coma)</label>
                      <input
                        type="text"
                        placeholder="Ej. Tueste Semanal, 100% Mexicano, Atención Rápida"
                        value={highlightValues}
                        onChange={(e) => setHighlightValues(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00b37e]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQS LIST & CREATION */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#00b37e]" />
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      Preguntas Frecuentes (FAQ)
                    </h4>
                  </div>
                  <span className="text-[11px] text-slate-400">{faqs.length} preguntas activas</span>
                </div>

                {/* Existing FAQs */}
                <div className="space-y-2.5">
                  {faqs.map(faq => (
                    <div key={faq.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs">
                      <div>
                        <h5 className="font-bold text-slate-900">{faq.question}</h5>
                        <p className="text-slate-600 mt-1">{faq.answer}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(faq.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add new FAQ inputs */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">Agregar Nueva Pregunta:</span>
                  <input
                    type="text"
                    placeholder="Pregunta (ej. ¿Hacen envíos el mismo día?)"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    placeholder="Respuesta detallada..."
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Agregar Pregunta a la Lista
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full bg-[#00b37e] hover:bg-[#009e6f] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Guardar Quiénes Somos & FAQs
                </button>

                {saveSuccess && (
                  <span className="text-xs font-bold text-[#00b37e] flex items-center gap-1 animate-in fade-in">
                    <Check className="w-4 h-4" /> ¡Secciones guardadas con éxito!
                  </span>
                )}
              </div>

            </form>
          </div>
        )}

        {/* ================= TAB 6: SUBSCRIPTION & PLAN ================= */}
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
                <span className="text-xs text-slate-400"> MXN/{currentPlan.period}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Características incluidas en tu membresía:
              </h4>
              <ul className="space-y-2">
                {currentPlan.features.map((feat, index) => (
                  <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00b37e] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-slate-500 border-t border-slate-100">
              <span>Próxima renovación: <strong>{activeStore.subscriptionPeriodEnd || '15 Mar 2027'}</strong></span>
              <a
                href="https://wa.me/525625785033?text=Hola%20Dayabit,%20quiero%20mejorar%20el%20plan%20de%20mi%20tienda."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#00b37e] hover:underline"
              >
                Cambiar de Plan →
              </a>
            </div>

          </div>
        )}

      </main>

      {/* ================= MODAL: NICHE-SPECIFIC PRODUCT CREATION ================= */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-5 text-left">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-[#00b37e] uppercase tracking-wider">
                  Catálogo Inteligente
                </span>
                <h4 className="font-display font-black text-xl text-slate-900">
                  Dar de Alta Nuevo Artículo
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsNewProductModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* Niche Selector Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Giro o Tipo de Producto:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setProductNiche('food');
                    setNewProdIcon('🍽️');
                  }}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    productNiche === 'food' ? 'border-[#00b37e] bg-emerald-50 text-emerald-900 shadow-2xs' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <Utensils className="w-4 h-4" />
                  <span>Comida</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProductNiche('fashion');
                    setNewProdIcon('👗');
                  }}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    productNiche === 'fashion' ? 'border-[#00b37e] bg-emerald-50 text-emerald-900 shadow-2xs' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <Shirt className="w-4 h-4" />
                  <span>Moda / Ropa</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProductNiche('services');
                    setNewProdIcon('💼');
                  }}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    productNiche === 'services' ? 'border-[#00b37e] bg-emerald-50 text-emerald-900 shadow-2xs' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Servicio</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProductNiche('general');
                    setNewProdIcon('📦');
                  }}
                  className={`p-2 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    productNiche === 'general' ? 'border-[#00b37e] bg-emerald-50 text-emerald-900 shadow-2xs' : 'border-slate-200 text-slate-500'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>General</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              
              {/* Common Fields */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nombre del Artículo / Servicio</label>
                <input
                  type="text"
                  required
                  placeholder={productNiche === 'food' ? 'Ej. Croissant de Almendras' : productNiche === 'fashion' ? 'Ej. Sudadera Oversize Vintage' : productNiche === 'services' ? 'Ej. Asesoría Fiscal RESICO' : 'Ej. Termo de Acero Inox'}
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e]"
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
                    placeholder={productNiche === 'food' ? 'Repostería, Bebidas...' : productNiche === 'fashion' ? 'Sudaderas, Calzado...' : 'Consultoría, Citas...'}
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* SPECIFIC NICHE FIELDS */}

              {/* 1. FOOD & BEVERAGES */}
              {productNiche === 'food' && (
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                  <span className="font-bold text-emerald-900 block">Detalles de Gastronomía:</span>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Ingredientes Principales / Notas</label>
                    <input
                      type="text"
                      placeholder="Ej. Harina orgánica, mantequilla de importación, chocolate belga"
                      value={prodIngredients}
                      onChange={(e) => setProdIngredients(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Tiempo de Preparación</label>
                      <input
                        type="text"
                        placeholder="Ej. 15-20 min"
                        value={prodPrepTime}
                        onChange={(e) => setProdPrepTime(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Distintivo / Badge</label>
                      <input
                        type="text"
                        placeholder="Ej. Recomendación Barista"
                        value={prodBadge}
                        onChange={(e) => setProdBadge(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. FASHION & APPAREL */}
              {productNiche === 'fashion' && (
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                  <span className="font-bold text-purple-900 block">Detalles de Moda & Tallas:</span>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Tallas Disponibles (separadas por coma)</label>
                    <input
                      type="text"
                      placeholder="Ej. S, M, L, XL ó 28, 30, 32"
                      value={prodSizes}
                      onChange={(e) => setProdSizes(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Colores Disponibles</label>
                      <input
                        type="text"
                        placeholder="Ej. Negro, Blanco, Beige"
                        value={prodColors}
                        onChange={(e) => setProdColors(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Material / Composición</label>
                      <input
                        type="text"
                        placeholder="Ej. 100% Algodón 400 GSM"
                        value={prodMaterial}
                        onChange={(e) => setProdMaterial(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. SERVICES & CONSULTING */}
              {productNiche === 'services' && (
                <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                  <span className="font-bold text-blue-900 block">Detalles del Servicio:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Duración Estimada</label>
                      <input
                        type="text"
                        placeholder="Ej. 45 min, 1 hora, Mensual"
                        value={prodDuration}
                        onChange={(e) => setProdDuration(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Modalidad</label>
                      <select
                        value={prodModality}
                        onChange={(e) => setProdModality(e.target.value as any)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      >
                        <option value="online">Online (Videollamada)</option>
                        <option value="presencial">Presencial (Oficina/Local)</option>
                        <option value="domicilio">A Domicilio</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Qué incluye (separado por coma)</label>
                    <input
                      type="text"
                      placeholder="Ej. Diagnóstico 32-D, Plan de regularización, Soporte WhatsApp"
                      value={prodIncludes}
                      onChange={(e) => setProdIncludes(e.target.value)}
                      className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* 4. GENERAL RETAIL */}
              {productNiche === 'general' && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Garantía</label>
                      <input
                        type="text"
                        placeholder="Ej. 6 meses de garantía"
                        value={prodWarranty}
                        onChange={(e) => setProdWarranty(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-700">Marca / Fabricante</label>
                      <input
                        type="text"
                        placeholder="Ej. Marca Propia"
                        value={prodBrand}
                        onChange={(e) => setProdBrand(e.target.value)}
                        className="w-full py-2 px-3 rounded-xl border border-slate-200 bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Fotografía HD del Producto */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Fotografía del Producto (URL HD opcional)</span>
                  <span className="text-[10px] text-slate-400 font-normal">Unsplash o enlace web directo</span>
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={newProdImageUrl}
                    onChange={(e) => setNewProdImageUrl(e.target.value)}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00b37e] text-xs font-mono"
                  />
                  {newProdImageUrl ? (
                    <img 
                      src={newProdImageUrl} 
                      alt="Vista previa" 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0" 
                      onError={(e) => { (e.currentTarget as HTMLElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
                {/* Quick suggestions based on niche */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="text-[10px] text-slate-400 font-medium self-center mr-1">Sugerencias:</span>
                  {productNiche === 'food' && (
                    <>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Platillo Gourmet</button>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Café Latte</button>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Panadería</button>
                    </>
                  )}
                  {productNiche === 'fashion' && (
                    <>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Sudadera / Hoodie</button>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Camisa Minimalista</button>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Calzado Casual</button>
                    </>
                  )}
                  {productNiche === 'services' && (
                    <>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Consultoría</button>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Legal / Notarial</button>
                    </>
                  )}
                  {productNiche === 'general' && (
                    <>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Herramientas</button>
                      <button type="button" onClick={() => setNewProdImageUrl('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80')} className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md transition-colors cursor-pointer">Gadget / Tech</button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Emoji / Icono representativo</label>
                <input
                  type="text"
                  value={newProdIcon}
                  onChange={(e) => setNewProdIcon(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 focus:outline-none text-base"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Descripción breve</label>
                <textarea
                  rows={2}
                  placeholder="Detalles adicionales para tus clientes..."
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
