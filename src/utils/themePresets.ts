import type { StoreThemeConfig, ThemePaletteMode, TenantStore } from '../types/tenant';

export const THEME_PRESETS: Record<Exclude<ThemePaletteMode, 'custom'>, StoreThemeConfig> = {
  light: {
    palette: 'light',
    pageBackground: '#f8fafc',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(255, 255, 255, 0.95)',
    textColor: '#0f172a',
    textMutedColor: '#64748b',
    borderColor: '#e2e8f0',
    accentColor: '#00b37e',
  },
  dark: {
    palette: 'dark',
    pageBackground: '#0b0f19',
    cardBackground: '#131c2e',
    headerBackground: 'rgba(19, 28, 46, 0.95)',
    textColor: '#f8fafc',
    textMutedColor: '#94a3b8',
    borderColor: '#1e293b',
    accentColor: '#00b37e',
  },
  cream: {
    palette: 'cream',
    pageBackground: '#fbf8f3',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(251, 248, 243, 0.95)',
    textColor: '#292524',
    textMutedColor: '#78716c',
    borderColor: '#e7e5e4',
    accentColor: '#b45309',
  },
  mint: {
    palette: 'mint',
    pageBackground: '#f0fdf4',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(240, 253, 244, 0.95)',
    textColor: '#064e3b',
    textMutedColor: '#047857',
    borderColor: '#bbf7d0',
    accentColor: '#00b37e',
  },
  black: {
    palette: 'black',
    pageBackground: '#050507',
    cardBackground: '#0e1117',
    headerBackground: 'rgba(14, 17, 23, 0.95)',
    textColor: '#ffffff',
    textMutedColor: '#a1a1aa',
    borderColor: '#222734',
    accentColor: '#00b37e',
  },
};

export const THEME_PRESET_CARDS = [
  {
    id: 'light' as ThemePaletteMode,
    name: 'Blanco Minimalista',
    desc: 'Limpio, profesional y ejecutivo. Ideal para tiendas y marcas de retail.',
    previewBg: '#f8fafc',
    previewCard: '#ffffff',
    previewText: '#0f172a',
    previewAccent: '#00b37e',
  },
  {
    id: 'dark' as ThemePaletteMode,
    name: 'Dark Luxury (Nocturno)',
    desc: 'Fondo oscuro elegante con alto contraste. Perfecto para tecnología, moda y bares.',
    previewBg: '#0b0f19',
    previewCard: '#131c2e',
    previewText: '#f8fafc',
    previewAccent: '#00b37e',
  },
  {
    id: 'cream' as ThemePaletteMode,
    name: 'Crema & Café Artesanal',
    desc: 'Cálido y orgánico. Ideal para cafeterías, reposterías y productos hechos a mano.',
    previewBg: '#fbf8f3',
    previewCard: '#ffffff',
    previewText: '#292524',
    previewAccent: '#b45309',
  },
  {
    id: 'mint' as ThemePaletteMode,
    name: 'Fresco Menta / Salud',
    desc: 'Suave y botánico. Perfecto para nutrición, cosmética y bienestar.',
    previewBg: '#f0fdf4',
    previewCard: '#ffffff',
    previewText: '#064e3b',
    previewAccent: '#00b37e',
  },
  {
    id: 'black' as ThemePaletteMode,
    name: 'Obsidian Negro Puro',
    desc: 'Estilo OLED ultra moderno con detalles neón. Máximo impacto visual.',
    previewBg: '#050507',
    previewCard: '#0e1117',
    previewText: '#ffffff',
    previewAccent: '#00b37e',
  },
  {
    id: 'custom' as ThemePaletteMode,
    name: 'Personalizado a Medida',
    desc: 'Tú eliges el color de fondo exacto, tarjetas y texto.',
    previewBg: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    previewCard: '#ffffff',
    previewText: '#0f172a',
    previewAccent: '#e11d48',
  }
];

export function resolveStoreTheme(store: TenantStore): StoreThemeConfig {
  if (store.themeConfig) {
    return store.themeConfig;
  }

  // Fallback defaults if store has not configured a full theme yet
  const accent = store.brandColor || '#00b37e';
  return {
    ...THEME_PRESETS.light,
    accentColor: accent,
  };
}
