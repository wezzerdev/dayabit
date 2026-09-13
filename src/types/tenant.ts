export type PlanTier = 'esencial' | 'vitrina' | 'pro';

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  imageUrl?: string;
  iconText?: string;
  inStock: boolean;
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

export interface TenantStore {
  id: string;
  slug: string; // e.g. 'taqueria-pepe' -> URL: dayabit.com/p/taqueria-pepe
  businessName: string;
  ownerName: string;
  ownerEmail: string;
  planId: PlanTier;
  whatsapp: string; // 10 digits, e.g. '5625785033'
  brandColor: string; // e.g. '#00b37e', '#2563eb', '#dc2626'
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
