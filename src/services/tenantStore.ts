import type { TenantStore, PlanDetails, PlanTier } from '../types/tenant';

export const PLANS: Record<PlanTier, PlanDetails> = {
  esencial: {
    id: 'esencial',
    name: 'Landing Page Esencial',
    priceMxn: 749,
    period: 'año',
    tagline: 'Presencia corporativa para profesionales y empresas',
    maxProducts: 5,
    hasCart: false,
    hasOrderingSystem: false,
    features: [
      'Landing Page corporativa exclusiva',
      'Quiénes somos, servicios y fotos',
      'Botón directo a tu WhatsApp oficial',
      'Horarios y mapa de ubicación',
      'Carga ultra rápida y dominio personalizado',
      'Facturación fiscal SAT CFDI 4.0'
    ]
  },
  vitrina: {
    id: 'vitrina',
    name: 'Landing Page + Catálogo Web',
    priceMxn: 1499,
    period: 'año',
    tagline: 'Vitrina digital por categorías para pedidos a WhatsApp',
    maxProducts: 50,
    hasCart: false,
    hasOrderingSystem: false,
    features: [
      'Todo lo del Plan Esencial',
      'Catálogo Web interactivo por categorías',
      'Hasta 50 productos con fotos y precios',
      'Botón de cotización por WhatsApp en cada producto',
      'Panel autoadministrable fácil',
      'Diseño 100% optimizado para celulares'
    ]
  },
  pro: {
    id: 'pro',
    name: 'WhatsApp Ordering System',
    priceMxn: 2899,
    period: 'año',
    tagline: 'Tienda en línea completa con carrito y pedidos a WhatsApp',
    maxProducts: 1000,
    hasCart: true,
    hasOrderingSystem: true,
    features: [
      'Todo lo de los Planes anteriores',
      'WhatsApp Ordering System completo con Carrito',
      'Catálogo ilimitado (hasta 1,000 productos)',
      'Buscador predictivo y filtros avanzados',
      'Generación automática de ticket con total',
      'Envío con un clic de orden completa a WhatsApp'
    ]
  }
};

const SEED_STORES: TenantStore[] = [
  {
    id: 'store-geisha',
    slug: 'cafeteria-geisha',
    businessName: 'Cafetería Geisha Gourmet',
    ownerName: 'Sofía Hernández',
    ownerEmail: 'sofia@geishagourmet.com',
    planId: 'pro',
    whatsapp: '5625785033',
    brandColor: '#00b37e',
    tagline: 'Café de altura y repostería artesanal en la puerta de tu casa',
    description: 'Seleccionamos granos finos de Chiapas y Veracruz tostados semanalmente. Haz tu pedido y recíbelo en minutos con atención personalizada por WhatsApp.',
    category: 'Alimentos y Bebidas',
    address: 'Av. Las Palmas 204, Cuautitlán Izcalli, Edo. Méx.',
    hours: 'Lun a Sáb: 8:00 AM - 9:00 PM',
    socialLinks: {
      instagram: 'https://instagram.com/geishacafemx',
      facebook: 'https://facebook.com/geishacafemx',
      tiktok: 'https://tiktok.com/@geishacafemx',
      mapsUrl: 'https://maps.google.com/?q=Cuautitlan+Izcalli'
    },
    paymentMethods: ['Transferencia SPEI', 'Efectivo contra entrega', 'Tarjeta (Terminal / En línea)'],
    storePolicies: {
      shipping: 'Entregas locales en menos de 45 minutos en zona Cuautitlán Izcalli. Envíos de café en grano a todo México por paquetería en 2-4 días hábiles.',
      returns: 'Garantía de frescura 100%: si tu pedido no llega en perfectas condiciones o a la temperatura adecuada, te lo reponemos sin costo de inmediato.',
      paymentTerms: 'Aceptamos transferencias directas SPEI, efectivo al recibir tu pedido o pago con tarjeta mediante terminal física.'
    },
    subscriptionStatus: 'active',
    subscriptionPeriodEnd: '2027-03-15',
    createdAt: '2026-03-15T10:00:00.000Z',
    products: [
      {
        id: 'p-101',
        name: 'Café Geisha Especial (250g)',
        category: 'Café en Grano',
        price: 240,
        description: 'Notas florales de jazmín, melocotón y miel de azahar. Tueste medio.',
        iconText: '☕',
        inStock: true
      },
      {
        id: 'p-102',
        name: 'Cold Brew Artesanal 500ml',
        category: 'Bebidas Frías',
        price: 95,
        description: 'Macerado en frío durante 18 horas para máxima suavidad y notas achocolatadas.',
        iconText: '🧊',
        inStock: true
      },
      {
        id: 'p-103',
        name: 'Croissant Francés Mantequilla',
        category: 'Repostería',
        price: 65,
        description: 'Hojaldrado tradicional con mantequilla de importación horneado cada mañana.',
        iconText: '🥐',
        inStock: true
      },
      {
        id: 'p-104',
        name: 'Cheesecake de Frutos Rojos',
        category: 'Repostería',
        price: 110,
        description: 'Base crujiente de almendra y coulis fresco de zarzamora y frambuesa.',
        iconText: '🍰',
        inStock: true
      },
      {
        id: 'p-105',
        name: 'Termo Térmico 16oz Edición Geisha',
        category: 'Accesorios',
        price: 340,
        description: 'Doble pared al vacío que mantiene tu café caliente por 8 horas.',
        iconText: '🔋',
        inStock: true
      }
    ]
  },
  {
    id: 'store-boutique',
    slug: 'boutique-urban',
    businessName: 'Urban Trend Boutique',
    ownerName: 'Carlos Morales',
    ownerEmail: 'carlos@urbantrend.com',
    planId: 'vitrina',
    whatsapp: '5625785033',
    brandColor: '#7c3aed',
    tagline: 'Moda contemporánea y streetwear exclusivo en México',
    description: 'Prendas seleccionadas con materiales premium para tu estilo diario. Cotiza tallas y disponibilidad directamente a nuestro WhatsApp.',
    category: 'Moda y Ropa',
    address: 'Centro Comercial Plaza Central, Local 45, Edo. Méx.',
    hours: 'Lun a Dom: 11:00 AM - 8:00 PM',
    socialLinks: {
      instagram: 'https://instagram.com/urbantrendmex',
      facebook: 'https://facebook.com/urbantrendmex',
      tiktok: 'https://tiktok.com/@urbantrendmex'
    },
    paymentMethods: ['Transferencia SPEI', 'Tarjeta Débito / Crédito', 'Mercado Pago'],
    storePolicies: {
      shipping: 'Envíos express a todo México por DHL y FedEx. Tiempo estimado: 24 a 48 horas hábiles con número de guía.',
      returns: 'Cambios de talla y devoluciones válidos hasta 15 días naturales después de recibir tu prenda con etiquetas intactas.',
      paymentTerms: 'Aceptamos transferencias bancarias SPEI, tarjetas Visa/Mastercard y depósitos en tiendas de conveniencia.'
    },
    subscriptionStatus: 'active',
    subscriptionPeriodEnd: '2027-02-20',
    createdAt: '2026-02-20T10:00:00.000Z',
    products: [
      {
        id: 'b-201',
        name: 'Sudadera Oversize Acid Wash',
        category: 'Sudaderas',
        price: 690,
        description: 'Algodón pesado 400 GSM con acabado deslavado vintage. Tallas S a XL.',
        iconText: '👕',
        inStock: true
      },
      {
        id: 'b-202',
        name: 'Cargo Pants Cargo Tech',
        category: 'Pantalones',
        price: 850,
        description: 'Corte relajado con 6 bolsillos utilitarios y correa ajustable en tobillo.',
        iconText: '👖',
        inStock: true
      },
      {
        id: 'b-203',
        name: 'Gorra Minimalista Bordada',
        category: 'Accesorios',
        price: 390,
        description: 'Ajustable con hebilla metálica y bordado tonal de alta definición.',
        iconText: '🧢',
        inStock: true
      }
    ]
  },
  {
    id: 'store-consultoria',
    slug: 'consultoria-fiscal',
    businessName: 'Vázquez & Asociados Contadores',
    ownerName: 'Lic. Roberto Vázquez',
    ownerEmail: 'contacto@vazquezcontadores.mx',
    planId: 'esencial',
    whatsapp: '5625785033',
    brandColor: '#0284c7',
    tagline: 'Estrategia fiscal, auditoría y contabilidad para PYMES y personas físicas',
    description: 'Optimizamos la carga tributaria de tu empresa cumpliendo al 100% con las disposiciones del SAT. Agenda tu diagnóstico contable inicial por WhatsApp.',
    category: 'Servicios Profesionales',
    address: 'Torre Corporativa del Valle, Piso 8, Of. 802, CDMX.',
    hours: 'Lun a Vie: 9:00 AM - 6:00 PM',
    socialLinks: {
      facebook: 'https://facebook.com/vazquezcontadores',
      website: 'https://vazquezcontadores.mx',
      mapsUrl: 'https://maps.google.com/?q=Torre+del+Valle+CDMX'
    },
    paymentMethods: ['Transferencia SPEI Corporativa', 'Tarjeta de Crédito / Débito'],
    storePolicies: {
      shipping: 'Atención 100% remota y presencial en oficinas previa cita. Entregas de dictámenes y opiniones vía portal seguro cifrado.',
      returns: 'Contrato formal de prestación de servicios profesionales y garantía de cumplimiento ante la autoridad fiscal.',
      paymentTerms: 'Honorarios mensuales o por proyecto con factura SAT CFDI 4.0 inmediata deducible al 100%.'
    },
    subscriptionStatus: 'active',
    subscriptionPeriodEnd: '2027-01-10',
    createdAt: '2026-01-10T10:00:00.000Z',
    products: [
      {
        id: 's-301',
        name: 'Auditoría Fiscal & Diagnóstico Inicial',
        category: 'Servicios',
        price: 1500,
        description: 'Revisión minuciosa de tu situación tributaria, opiniones de cumplimiento y detección de saldos a favor.',
        iconText: '📊',
        inStock: true
      },
      {
        id: 's-302',
        name: 'Contabilidad Mensual para Personas Morales',
        category: 'Servicios',
        price: 3200,
        description: 'Cálculo de impuestos mensuales, DIOT, declaraciones anuales y conciliaciones bancarias.',
        iconText: '💼',
        inStock: true
      },
      {
        id: 's-303',
        name: 'Regularización y Asesoría RESICO',
        category: 'Servicios',
        price: 950,
        description: 'Inscripción y actualización al Régimen Simplificado de Confianza para pagar la menor tasa de ISR legal.',
        iconText: '📑',
        inStock: true
      }
    ]
  }
];

const STORAGE_KEY = 'dayabit_tenant_stores_v1';
const ACTIVE_TENANT_KEY = 'dayabit_active_tenant_id';

export class TenantStorageService {
  private static loadStores(): TenantStore[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // ensure existing stores have socialLinks, paymentMethods, storePolicies initialized
          return parsed.map(store => {
            const seed = SEED_STORES.find(s => s.id === store.id);
            return {
              ...store,
              socialLinks: store.socialLinks || seed?.socialLinks || {},
              paymentMethods: store.paymentMethods || seed?.paymentMethods || ['Transferencia SPEI', 'Efectivo'],
              storePolicies: store.storePolicies || seed?.storePolicies || {
                shipping: 'Entregas locales y envíos acordados directamente por WhatsApp.',
                returns: 'Garantía de satisfacción y atención directa con el comercio.',
                paymentTerms: 'Aceptamos transferencias SPEI y efectivo contra entrega.'
              }
            };
          });
        }
      }
    } catch (e) {
      console.warn('Error loading stores from localStorage, falling back to seed', e);
    }
    // Seed initial stores
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_STORES));
    return SEED_STORES;
  }

  private static saveStores(stores: TenantStore[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stores));
    } catch (e) {
      console.error('Failed to persist stores to localStorage', e);
    }
  }

  public static getAllStores(): TenantStore[] {
    return this.loadStores();
  }

  public static getStoreBySlug(slug: string): TenantStore | null {
    const stores = this.loadStores();
    return stores.find(s => s.slug.toLowerCase() === slug.toLowerCase()) || null;
  }

  public static getStoreById(id: string): TenantStore | null {
    const stores = this.loadStores();
    return stores.find(s => s.id === id) || null;
  }

  public static createStore(data: Omit<TenantStore, 'id' | 'createdAt'>): TenantStore {
    const stores = this.loadStores();
    
    // Ensure slug is unique
    let finalSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    let counter = 1;
    while (stores.some(s => s.slug === finalSlug)) {
      finalSlug = `${data.slug}-${counter}`;
      counter++;
    }

    const newStore: TenantStore = {
      ...data,
      slug: finalSlug,
      id: `store-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    stores.unshift(newStore);
    this.saveStores(stores);
    this.setActiveTenantId(newStore.id);
    return newStore;
  }

  public static updateStore(id: string, updates: Partial<TenantStore>): TenantStore | null {
    const stores = this.loadStores();
    const index = stores.findIndex(s => s.id === id);
    if (index === -1) return null;

    const updated = {
      ...stores[index],
      ...updates
    };

    stores[index] = updated;
    this.saveStores(stores);
    return updated;
  }

  public static getActiveTenant(): TenantStore {
    const activeId = localStorage.getItem(ACTIVE_TENANT_KEY);
    if (activeId) {
      const found = this.getStoreById(activeId);
      if (found) return found;
    }
    const all = this.getAllStores();
    return all[0];
  }

  public static setActiveTenantId(id: string): void {
    localStorage.setItem(ACTIVE_TENANT_KEY, id);
  }
}
