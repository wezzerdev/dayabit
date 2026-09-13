import type { StoreTemplateDefinition, StoreTemplateId, TenantStore } from '../types/tenant';

export const STORE_TEMPLATES: Record<StoreTemplateId, StoreTemplateDefinition> = {
  modern_delivery: {
    id: 'modern_delivery',
    name: 'App Moderna & Delivery',
    category: 'Gastronomía & Quick Order',
    tagline: 'Experiencia inmersiva estilo app con barra flotante de pedidos',
    description: 'Diseñada para restaurantes, cafeterías, reposterías y comida rápida. Cuenta con portada edge-to-edge, tarjeta de perfil en relieve, tabs de categorías y carrito flotante directo a WhatsApp.',
    recommendedFor: 'Cafeterías, Restaurantes, Dark Kitchens, Panaderías, Bares',
    badge: 'Más Popular',
    features: [
      'Portada fotográfica inmersiva edge-to-edge',
      'Tarjeta de perfil flotante con estado "Abierto hoy"',
      'Slider táctil de categorías con navegación por swipe',
      'Micro-detalles culinarios (ingredientes y tiempo de preparación)',
      'Barra flotante de pedido rápido pegada al pie'
    ]
  },
  boutique_editorial: {
    id: 'boutique_editorial',
    name: 'Boutique Editorial & Lookbook',
    category: 'Moda & Tendencias',
    tagline: 'Estética minimalista de alta gama estilo Zara, Apple y Nike',
    description: 'Enfocada en el impacto visual y la elegancia de las prendas. Presenta una cabecera minimalista, cuadrícula de catálogo vertical formato 3:4 lookbook y selector de tallas integrado.',
    recommendedFor: 'Ropa, Calzado, Joyería, Accesorios, Cosmética, Diseñadores',
    badge: 'Lookbook',
    features: [
      'Hero editorial limpio y espacioso de alta costura',
      'Galería de fotos verticales formato lookbook (3:4)',
      'Selector instantáneo de tallas (CH, M, G, XL) y colores',
      'Etiquetas de "Edición Limitada", "Tendencia" y "Nuevo"',
      'Tipografía moderna con acentos de lujo discretos'
    ]
  },
  corporate_services: {
    id: 'corporate_services',
    name: 'Corporativa & Servicios B2B',
    category: 'Consultoría & Negocios',
    tagline: 'Landing page ejecutiva de alta conversión estilo Stripe y Linear',
    description: 'Ideal para despachos contables, jurídicos, agencias y consultores. Destaca la propuesta de valor con métricas clave, metodología en 3 pasos y tarjetas con entregables detallados.',
    recommendedFor: 'Contadores, Abogados, Consultores, Agencias, Clínicas, Arquitectos',
    badge: 'Ejecutiva',
    features: [
      'Banner corporativo con métricas de confianza (+Años, CFDI 4.0)',
      'Metodología en 3 pasos: "Cómo trabajamos"',
      'Tarjetas con checklist de entregables incluidos por servicio',
      'Modalidad clara: En línea (Zoom/Meet), Presencial o Domicilio',
      'Botón directo para agendar diagnóstico inicial por WhatsApp'
    ]
  },
  catalog_express: {
    id: 'catalog_express',
    name: 'Catálogo Express / Retail',
    category: 'Alta Densidad & Mayoreo',
    tagline: 'Formato compacto tipo Amazon y MercadoLibre para compras rápidas',
    description: 'Pensada para negocios con alto volumen de artículos, refacciones, ferreterías o mayoreo. Integra un buscador predominante, etiquetas de stock en tiempo real y selector rápido de cantidad.',
    recommendedFor: 'Ferreterías, Electrónica, Refacciones, Papelerías, Mayoreo, Suplementos',
    badge: 'Venta Rápida',
    features: [
      'Buscador superior predictivo de alta visibilidad',
      'Listado compacto de alta densidad para explorar muchos productos',
      'Insignia de disponibilidad en existencia y marca/garantía',
      'Controles rápidos de cantidad para pedidos por volumen',
      'Cotización directa de pedido consolidado a WhatsApp'
    ]
  }
};

export const STORE_TEMPLATES_LIST = Object.values(STORE_TEMPLATES);

export function resolveStoreTemplate(store: TenantStore): StoreTemplateId {
  if (store.templateId && STORE_TEMPLATES[store.templateId]) {
    return store.templateId;
  }
  // Default fallback based on plan or store category if not set
  if (store.planId === 'esencial') return 'corporate_services';
  if (store.category?.toLowerCase().includes('moda') || store.category?.toLowerCase().includes('ropa')) return 'boutique_editorial';
  return 'modern_delivery';
}
