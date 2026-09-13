export type PlanTier = 'esencial' | 'vitrina' | 'pro';

export type ProductNiche = 'food' | 'fashion' | 'services' | 'general';

export interface NicheProductAttributes {
  niche?: ProductNiche;
  // Food & Beverages
  ingredients?: string;
  preparationTime?: string;
  badge?: string; // e.g. 'Recomendado', 'Más Vendido', 'Vegano', 'Nuevo'
  // Fashion & Apparel
  sizes?: string[]; // e.g. ['S', 'M', 'L', 'XL']
  colors?: string[]; // e.g. ['Negro', 'Blanco', 'Gris']
  material?: string;
  // Services & Consulting
  serviceDuration?: string; // e.g. '45 min', '1 hora', 'Mensual'
  serviceModality?: 'online' | 'presencial' | 'domicilio';
  includes?: string[];
  // General Retail
  warranty?: string;
  brand?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  iconText?: string;
  inStock: boolean;
  nicheAttributes?: NicheProductAttributes;
}

export interface SocialLinks {
  instagram?: string; // e.g. 'instagram.com/geishacafemx' or '@geishacafemx'
  facebook?: string;  // e.g. 'facebook.com/geishacafemx'
  tiktok?: string;    // e.g. 'tiktok.com/@geishacafe'
  website?: string;
  mapsUrl?: string;
}

export interface StorePolicies {
  shipping?: string;    // e.g. 'Entregas locales en menos de 45 min o envíos a todo México.'
  returns?: string;     // e.g. 'Garantía de satisfacción de 7 días.'
  paymentTerms?: string;// e.g. 'Aceptamos transferencias SPEI, efectivo contra entrega y tarjetas.'
}

export interface AboutUs {
  story?: string;
  experienceYears?: number;
  highlightValues?: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type ThemePaletteMode = 'light' | 'dark' | 'cream' | 'mint' | 'black' | 'slate' | 'rose' | 'custom';
export type CardBorderStyle = 'tinted' | 'subtle' | 'glow' | 'flat';
export type CardRadiusStyle = 'rounded' | 'smooth' | 'sharp';

export interface StoreThemeConfig {
  palette: ThemePaletteMode;
  pageBackground: string;
  cardBackground: string;
  headerBackground: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;
  accentColor: string;
  borderStyle?: CardBorderStyle;
  borderRadius?: CardRadiusStyle;
}

export type StoreTemplateId = 'modern_delivery' | 'boutique_editorial' | 'corporate_services' | 'catalog_express';

export interface StoreTemplateDefinition {
  id: StoreTemplateId;
  name: string;
  category: string;
  tagline: string;
  description: string;
  recommendedFor: string;
  badge?: string;
  previewThumbnail?: string;
  features: string[];
}

export interface TenantStore {
  id: string;
  slug: string; // e.g. 'taqueria-pepe' -> URL: dayabit.com/p/taqueria-pepe
  businessName: string;
  ownerName: string;
  ownerEmail: string;
  planId: PlanTier;
  templateId?: StoreTemplateId;
  whatsapp: string; // 10 digits, e.g. '5625785033'
  brandColor: string; // e.g. '#00b37e', '#2563eb', '#dc2626'
  themeConfig?: StoreThemeConfig;
  tagline: string;
  description: string;
  category: string;
  address?: string;
  hours?: string;
  logoUrl?: string;
  bannerUrl?: string;
  socialLinks?: SocialLinks;
  paymentMethods?: string[];
  storePolicies?: StorePolicies;
  aboutUs?: AboutUs;
  faqs?: FAQItem[];
  products: StoreProduct[];
  subscriptionStatus: 'active' | 'trial' | 'past_due';
  subscriptionPeriodEnd?: string;
  createdAt: string;
}

export interface PlanDetails {
  id: PlanTier;
  name: string;
  priceMxn: number;
  period: string;
  tagline: string;
  maxProducts: number;
  hasCart: boolean;
  hasOrderingSystem: boolean;
  features: string[];
}

