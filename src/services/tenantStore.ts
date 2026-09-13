import type { TenantStore, PlanTier, PlanDetails, StoreProduct } from '../types/tenant';
import { THEME_PRESETS } from '../utils/themePresets';

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
    templateId: 'modern_delivery',
    whatsapp: '5625785033',
    brandColor: '#b45309',
    themeConfig: THEME_PRESETS.cream,
    tagline: 'Café de altura y repostería artesanal en la puerta de tu casa',
    description: 'Seleccionamos granos finos de Chiapas y Veracruz tostados semanalmente. Haz tu pedido y recíbelo en minutos con atención personalizada por WhatsApp.',
    category: 'Alimentos y Bebidas',
    address: 'Av. Las Palmas 204, Cuautitlán Izcalli, Edo. Méx.',
    hours: 'Lun a Sáb: 8:00 AM - 9:00 PM',
    bannerUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
    aboutUs: {
      story: 'Nacimos en 2021 con el sueño de llevar el mejor café de especialidad mexicano y repostería artesanal recién horneada directamente a los hogares y oficinas de nuestra comunidad.',
      experienceYears: 5,
      highlightValues: ['Granos 100% Mexicanos de Altura', 'Tueste Artesanal Semanal', 'Repostería Horneada al Día']
    },
    faqs: [
      {
        id: 'faq-g1',
        question: '¿Cómo confirmo y recibo mi pedido?',
        answer: 'Agrega los productos que desees al carrito y presiona "Enviar Pedido a WhatsApp". Te llegará un mensaje pre-armado con tu total exacto y te confirmamos en menos de 3 minutos.'
      },
      {
        id: 'faq-g2',
        question: '¿En cuánto tiempo llega mi orden a domicilio?',
        answer: 'Nuestras entregas locales en Cuautitlán Izcalli toman entre 30 y 45 minutos. Los paquetes de café en grano al resto del país toman de 2 a 4 días hábiles.'
      },
      {
        id: 'faq-g3',
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos transferencias SPEI al momento de ordenar, efectivo al recibir o cobro con tarjeta mediante terminal física.'
      }
    ],
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
        description: 'Notas florales de jazmín, melocotón y miel de azahar. Tueste medio artesanal.',
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80',
        iconText: '☕',
        inStock: true,
        nicheAttributes: {
          niche: 'food',
          ingredients: 'Grano arábica lavado (Chiapas), notas florales',
          preparationTime: 'Tueste semanal',
          badge: 'Recomendación Barista'
        }
      },
      {
        id: 'p-102',
        name: 'Cold Brew Artesanal 500ml',
        category: 'Bebidas Frías',
        price: 95,
        description: 'Macerado en frío durante 18 horas para máxima suavidad y notas achocolatadas.',
        imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
        iconText: '🧊',
        inStock: true,
        nicheAttributes: {
          niche: 'food',
          ingredients: 'Café macerado 18 hrs, agua purificada de manantial',
          preparationTime: 'Listo para entrega',
          badge: 'Más Vendido'
        }
      },
      {
        id: 'p-103',
        name: 'Croissant Francés Mantequilla',
        category: 'Repostería',
        price: 65,
        description: 'Hojaldrado tradicional con mantequilla de importación horneado cada mañana.',
        imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
        iconText: '🥐',
        inStock: true,
        nicheAttributes: {
          niche: 'food',
          ingredients: 'Mantequilla europea pura, harina orgánica',
          preparationTime: 'Horneado cada mañana',
          badge: 'Fresco del Día'
        }
      },
      {
        id: 'p-104',
        name: 'Cheesecake de Frutos Rojos',
        category: 'Repostería',
        price: 110,
        description: 'Base crujiente de almendra y coulis fresco de zarzamora y frambuesa.',
        imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80',
        iconText: '🍰',
        inStock: true,
        nicheAttributes: {
          niche: 'food',
          ingredients: 'Queso crema artesanal, coulis de zarzamora y frambuesa',
          preparationTime: 'Porción individual',
          badge: 'Especialidad'
        }
      },
      {
        id: 'p-105',
        name: 'Termo Térmico 16oz Edición Geisha',
        category: 'Accesorios',
        price: 340,
        description: 'Doble pared al vacío que mantiene tu café caliente por 8 horas.',
        imageUrl: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80',
        iconText: '🔋',
        inStock: true,
        nicheAttributes: {
          niche: 'general',
          warranty: '1 año de garantía contra fugas',
          brand: 'Geisha Gear'
        }
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
    templateId: 'boutique_editorial',
    whatsapp: '5625785033',
    brandColor: '#7c3aed',
    themeConfig: THEME_PRESETS.dark,
    tagline: 'Moda contemporánea y streetwear exclusivo en México',
    description: 'Prendas seleccionadas con materiales premium para tu estilo diario. Cotiza tallas y disponibilidad directamente a nuestro WhatsApp.',
    category: 'Moda y Ropa',
    address: 'Centro Comercial Plaza Central, Local 45, Edo. Méx.',
    hours: 'Lun a Dom: 11:00 AM - 8:00 PM',
    bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
    aboutUs: {
      story: 'Urban Trend Boutique nació para transformar la escena de la moda urbana en México, diseñando y curando prendas con materiales de gramaje pesado y cortes contemporáneos.',
      experienceYears: 4,
      highlightValues: ['Algodón Pesado 400 GSM', 'Cortes Oversize Modernos', 'Envíos Express Asegurados']
    },
    faqs: [
      {
        id: 'faq-u1',
        question: '¿Hacen envíos a todo México?',
        answer: 'Sí, enviamos por DHL y FedEx express a cualquier código postal de la República Mexicana en 24 a 48 horas hábiles con número de rastreo.'
      },
      {
        id: 'faq-u2',
        question: '¿Puedo solicitar cambio de talla?',
        answer: '¡Totalmente! Si la prenda no te queda como esperabas, cuentas con 15 días naturales para cambio de talla sin complicaciones conservando etiquetas.'
      }
    ],
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
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
        iconText: '👕',
        inStock: true,
        nicheAttributes: {
          niche: 'fashion',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Negro Deslavado', 'Gris Vintage', 'Oliva'],
          material: '100% Algodón 400 GSM Peinado',
          badge: 'Top Ventas'
        }
      },
      {
        id: 'b-202',
        name: 'Cargo Pants Cargo Tech',
        category: 'Pantalones',
        price: 850,
        description: 'Corte relajado con 6 bolsillos utilitarios y correa ajustable en tobillo.',
        imageUrl: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80',
        iconText: '👖',
        inStock: true,
        nicheAttributes: {
          niche: 'fashion',
          sizes: ['28', '30', '32', '34'],
          colors: ['Negro Mate', 'Caqui Táctico'],
          material: 'Ripstop antidesgarro con ajuste en tobillos',
          badge: 'Nuevo'
        }
      },
      {
        id: 'b-203',
        name: 'Gorra Minimalista Bordada',
        category: 'Accesorios',
        price: 390,
        description: 'Ajustable con hebilla metálica y bordado tonal de alta definición.',
        imageUrl: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&auto=format&fit=crop&q=80',
        iconText: '🧢',
        inStock: true,
        nicheAttributes: {
          niche: 'fashion',
          sizes: ['Unitalla ajustable'],
          colors: ['Negro', 'Blanco Crudo'],
          material: 'Sarga de algodón pesado con hebilla de latón'
        }
      },
      {
        id: 'b-204',
        name: 'Chamarra Bomber Puffer Street',
        category: 'Chamarras',
        price: 1250,
        description: 'Relleno térmico ultraligero con tejido repelente al agua y cuello elástico.',
        imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=600&auto=format&fit=crop&q=80',
        iconText: '🧥',
        inStock: true,
        nicheAttributes: {
          niche: 'fashion',
          sizes: ['M', 'L', 'XL'],
          colors: ['Negro Mate', 'Plata Grafito'],
          badge: 'Invierno 2026'
        }
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
    templateId: 'corporate_services',
    whatsapp: '5625785033',
    brandColor: '#0284c7',
    themeConfig: { ...THEME_PRESETS.light, accentColor: '#0284c7' },
    tagline: 'Estrategia fiscal, auditoría y contabilidad para PYMES y personas físicas',
    description: 'Optimizamos la carga tributaria de tu empresa cumpliendo al 100% con las disposiciones del SAT. Agenda tu diagnóstico contable inicial por WhatsApp.',
    category: 'Servicios Profesionales',
    address: 'Torre Corporativa del Valle, Piso 8, Of. 802, CDMX.',
    hours: 'Lun a Vie: 9:00 AM - 6:00 PM',
    bannerUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80',
    aboutUs: {
      story: 'Firma contable y fiscal con más de 12 años de trayectoria protegiendo el patrimonio y optimizando los impuestos de personas físicas y PYMES en México.',
      experienceYears: 12,
      highlightValues: ['Especialistas en RESICO y PYMES', 'Facturación SAT CFDI 4.0 Inmediata', 'Confidencialidad Rigurosa']
    },
    faqs: [
      {
        id: 'faq-v1',
        question: '¿Cómo se imparte la asesoría inicial?',
        answer: 'Se agenda una videollamada por Google Meet o cita presencial en nuestras oficinas. Analizamos tu opinión de cumplimiento 32-D y declaraciones previas.'
      },
      {
        id: 'faq-v2',
        question: '¿Los honorarios son deducibles de impuestos?',
        answer: 'Totalmente. Emitimos comprobante fiscal digital CFDI 4.0 deducible al 100% para efectos de ISR e IVA.'
      }
    ],
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
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80',
        iconText: '📊',
        inStock: true,
        nicheAttributes: {
          niche: 'services',
          serviceDuration: '45 minutos',
          serviceModality: 'online',
          includes: ['Revisión Opinión SAT 32-D', 'Detección saldos a favor', 'Plan de regularización integral'],
          badge: 'Paso 1 Recomendado'
        }
      },
      {
        id: 's-302',
        name: 'Contabilidad Mensual para Personas Morales',
        category: 'Servicios',
        price: 3200,
        description: 'Cálculo de impuestos mensuales, DIOT, declaraciones anuales y conciliaciones bancarias.',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        iconText: '💼',
        inStock: true,
        nicheAttributes: {
          niche: 'services',
          serviceDuration: 'Mensual continuo',
          serviceModality: 'online',
          includes: ['Cálculo de impuestos mensuales', 'Envío puntual de DIOT', 'Conciliación bancaria', 'Atención directa por WhatsApp']
        }
      },
      {
        id: 's-303',
        name: 'Regularización y Asesoría RESICO',
        category: 'Servicios',
        price: 950,
        description: 'Inscripción y actualización al Régimen Simplificado de Confianza para pagar la menor tasa de ISR legal.',
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        iconText: '📑',
        inStock: true,
        nicheAttributes: {
          niche: 'services',
          serviceDuration: 'Sesión de 60 min',
          serviceModality: 'online',
          includes: ['Actualización constancia CSF', 'Activación buzón tributario', 'Estrategia tasa reducida 1% a 2.5%']
        }
      }
    ]
  },
  {
    id: 'store-ferreteria',
    slug: 'ferreteria-industrial-norte',
    businessName: 'Ferretería & Suministros Norte',
    ownerName: 'Ing. Alejandro Vega',
    ownerEmail: 'ventas@ferreterianorte.com',
    planId: 'pro',
    templateId: 'catalog_express',
    whatsapp: '5625785033',
    brandColor: '#ea580c',
    themeConfig: { ...THEME_PRESETS.light, accentColor: '#ea580c' },
    tagline: 'Herramientas de poder, tornillería y mayoreo industrial',
    description: 'Distribuidor autorizado de maquinaria y herramientas con entrega express a obra o taller. Cotiza y surte pedidos por volumen directamente a WhatsApp.',
    category: 'Ferretería y Mayoreo',
    address: 'Calzada Industrial 105, Parque Industrial Toluca, Edo. Méx.',
    hours: 'Lun a Sáb: 7:30 AM - 6:30 PM',
    bannerUrl: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1200&auto=format&fit=crop&q=80',
    aboutUs: {
      story: 'Más de 15 años abasteciendo a la industria constructora y manufacturera de México con las marcas líderes en herramienta, seguridad y fijación.',
      experienceYears: 15,
      highlightValues: ['Distribuidor DeWalt, Makita y Urrea', 'Precios de Mayoreo Directo', 'Entrega en Obra en 2 Horas']
    },
    faqs: [
      {
        id: 'faq-f1',
        question: '¿Manejan precio de mayoreo para constructoras?',
        answer: 'Sí, otorgamos descuentos por volumen a partir de 10 piezas o compras superiores a $5,000 MXN con factura fiscal SAT.'
      },
      {
        id: 'faq-f2',
        question: '¿Tienen entrega el mismo día?',
        answer: 'Contamos con flotilla propia para entregas express en el Valle de México y envíos consolidados por fletera nacional.'
      }
    ],
    socialLinks: {
      facebook: 'https://facebook.com/ferreterianortemx',
      mapsUrl: 'https://maps.google.com/?q=Toluca+Industrial'
    },
    paymentMethods: ['Transferencia SPEI', 'Tarjeta de Crédito / Débito', 'Efectivo contra entrega'],
    storePolicies: {
      shipping: 'Entregas express en obra en 2 a 4 horas en zona metropolitana. Envíos foráneos por fletera con guía.',
      returns: 'Garantía directa de 1 a 3 años según fabricante. Cambio inmediato por defecto de fábrica.',
      paymentTerms: 'Aceptamos transferencias SPEI directas, pago contra entrega y tarjetas de crédito con factura fiscal.'
    },
    subscriptionStatus: 'active',
    subscriptionPeriodEnd: '2027-04-10',
    createdAt: '2026-04-10T10:00:00.000Z',
    products: [
      {
        id: 'f-401',
        name: 'Rotomartillo Inalámbrico 20V Brushless MAX',
        category: 'Herramientas Eléctricas',
        price: 2199,
        description: 'Motor sin carbones de alto rendimiento, incluye 2 baterías de litio 4.0Ah y cargador rápido.',
        imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&auto=format&fit=crop&q=80',
        iconText: '⚡',
        inStock: true,
        nicheAttributes: {
          niche: 'general',
          brand: 'DeWalt Industrial',
          warranty: '3 años de garantía limitada',
          badge: 'Más Vendido'
        }
      },
      {
        id: 'f-402',
        name: 'Juego de Llaves Españolas Milimétricas 14 Pzas',
        category: 'Herramientas Manuales',
        price: 680,
        description: 'Forjadas en acero al cromo vanadio con acabado pulido espejo y estuche organizador.',
        imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&auto=format&fit=crop&q=80',
        iconText: '🔧',
        inStock: true,
        nicheAttributes: {
          niche: 'general',
          brand: 'Urrea Pro',
          warranty: 'Garantía de por vida'
        }
      },
      {
        id: 'f-403',
        name: 'Sierra Circular Profesional 7-1/4" 1800W',
        category: 'Herramientas Eléctricas',
        price: 1890,
        description: 'Capacidad de corte de 66mm con guía láser y disco de carburo de tungsteno 24 dientes.',
        imageUrl: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&auto=format&fit=crop&q=80',
        iconText: '⚙️',
        inStock: true,
        nicheAttributes: {
          niche: 'general',
          brand: 'Makita Power',
          warranty: '1 año de garantía'
        }
      },
      {
        id: 'f-404',
        name: 'Compresor de Aire Portátil 24L 2.5 HP',
        category: 'Maquinaria & Aire',
        price: 3450,
        description: 'Tanque reforzado con doble manómetro, arranque automático y regulador de presión.',
        imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
        iconText: '💨',
        inStock: true,
        nicheAttributes: {
          niche: 'general',
          brand: 'Truper Expert',
          warranty: '1 año de garantía'
        }
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
          // ensure existing stores have all fields initialized
          const loadedStores: TenantStore[] = parsed.map(store => {
            const seed = SEED_STORES.find(s => s.id === store.id);
            return {
              ...store,
              templateId: store.templateId || seed?.templateId || (store.planId === 'esencial' ? 'corporate_services' : 'modern_delivery'),
              themeConfig: store.themeConfig || seed?.themeConfig || { ...THEME_PRESETS.light, accentColor: store.brandColor || '#00b37e' },
              bannerUrl: store.bannerUrl || seed?.bannerUrl || '',
              aboutUs: store.aboutUs || seed?.aboutUs || {
                story: 'Empresa dedicada a brindar la mejor calidad y servicio personalizado con atención por WhatsApp.',
                experienceYears: 3,
                highlightValues: ['Atención Inmediata', 'Calidad Garantizada', 'Precios Transparentes']
              },
              faqs: store.faqs && store.faqs.length > 0 ? store.faqs : seed?.faqs || [
                {
                  id: 'faq-gen-1',
                  question: '¿Cómo realizo un pedido?',
                  answer: 'Selecciona los artículos que deseas y da clic en el botón de WhatsApp para coordinar tu entrega de inmediato.'
                },
                {
                  id: 'faq-gen-2',
                  question: '¿Cuáles son las formas de pago?',
                  answer: 'Aceptamos transferencias electrónicas SPEI y pago en efectivo contra entrega.'
                }
              ],
              socialLinks: store.socialLinks || seed?.socialLinks || {},
              paymentMethods: store.paymentMethods || seed?.paymentMethods || ['Transferencia SPEI', 'Efectivo contra entrega'],
              storePolicies: store.storePolicies || seed?.storePolicies || {
                shipping: 'Entregas locales y envíos acordados directamente por WhatsApp.',
                returns: 'Garantía de satisfacción y atención directa con el comercio.',
                paymentTerms: 'Aceptamos transferencias SPEI y efectivo contra entrega.'
              },
              products: (store.products || []).map((p: StoreProduct) => {
                const seedProd = seed?.products.find(sp => sp.id === p.id);
                return {
                  ...p,
                  imageUrl: p.imageUrl || seedProd?.imageUrl,
                  nicheAttributes: p.nicheAttributes || seedProd?.nicheAttributes || { niche: 'general' }
                };
              })
            };
          });

          // Check if any seed store is missing in loadedStores (e.g. newly added store-ferreteria)
          SEED_STORES.forEach(seed => {
            if (!loadedStores.some(ls => ls.id === seed.id)) {
              loadedStores.push(seed);
            }
          });

          return loadedStores;
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
