import type { StoreThemeConfig, ThemePaletteMode, CardBorderStyle, TenantStore } from '../types/tenant';

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 0, g: 179, b: 126 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function computeHarmoniousBorder(
  bgColor: string,
  cardBg: string,
  accentColor: string,
  style: CardBorderStyle = 'tinted'
): string {
  const { r, g, b } = hexToRgb(accentColor);
  const isDark = bgColor.startsWith('#0') || bgColor.startsWith('#1') || cardBg.startsWith('#0') || cardBg.startsWith('#1');

  if (style === 'tinted') {
    return isDark 
      ? `rgba(${r}, ${g}, ${b}, 0.32)` 
      : `rgba(${r}, ${g}, ${b}, 0.22)`;
  }
  if (style === 'glow') {
    return isDark 
      ? `rgba(${r}, ${g}, ${b}, 0.50)` 
      : `rgba(${r}, ${g}, ${b}, 0.38)`;
  }
  if (style === 'flat') {
    return 'transparent';
  }
  // 'subtle' neutral
  return isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
}

export const THEME_PRESETS: Record<Exclude<ThemePaletteMode, 'custom'>, StoreThemeConfig> = {
  light: {
    palette: 'light',
    pageBackground: '#f8fafc',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(255, 255, 255, 0.92)',
    textColor: '#0f172a',
    textMutedColor: '#64748b',
    borderColor: '#e2e8f0',
    accentColor: '#00b37e',
    borderStyle: 'tinted',
    borderRadius: 'rounded'
  },
  dark: {
    palette: 'dark',
    pageBackground: '#090d16',
    cardBackground: '#111827',
    headerBackground: 'rgba(17, 24, 39, 0.92)',
    textColor: '#f9fafb',
    textMutedColor: '#9ca3af',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    accentColor: '#00b37e',
    borderStyle: 'tinted',
    borderRadius: 'rounded'
  },
  cream: {
    palette: 'cream',
    pageBackground: '#faf7f2',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(250, 247, 242, 0.92)',
    textColor: '#1c1917',
    textMutedColor: '#78716c',
    borderColor: '#ede8df',
    accentColor: '#b45309',
    borderStyle: 'subtle',
    borderRadius: 'smooth'
  },
  mint: {
    palette: 'mint',
    pageBackground: '#f0fdf4',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(240, 253, 244, 0.92)',
    textColor: '#064e3b',
    textMutedColor: '#047857',
    borderColor: '#bbf7d0',
    accentColor: '#00b37e',
    borderStyle: 'tinted',
    borderRadius: 'rounded'
  },
  black: {
    palette: 'black',
    pageBackground: '#000000',
    cardBackground: '#0c0d12',
    headerBackground: 'rgba(12, 13, 18, 0.92)',
    textColor: '#ffffff',
    textMutedColor: '#94a3b8',
    borderColor: '#1e293b',
    accentColor: '#00b37e',
    borderStyle: 'glow',
    borderRadius: 'rounded'
  },
  slate: {
    palette: 'slate',
    pageBackground: '#0f172a',
    cardBackground: '#1e293b',
    headerBackground: 'rgba(30, 41, 59, 0.92)',
    textColor: '#f8fafc',
    textMutedColor: '#94a3b8',
    borderColor: '#334155',
    accentColor: '#2563eb',
    borderStyle: 'tinted',
    borderRadius: 'rounded'
  },
  rose: {
    palette: 'rose',
    pageBackground: '#fff1f2',
    cardBackground: '#ffffff',
    headerBackground: 'rgba(255, 241, 242, 0.92)',
    textColor: '#881337',
    textMutedColor: '#9f1239',
    borderColor: '#fecdd3',
    accentColor: '#e11d48',
    borderStyle: 'tinted',
    borderRadius: 'smooth'
  }
};

export const BRAND_COLOR_SWATCHES = [
  { name: 'Esmeralda', hex: '#00b37e' },
  { name: 'Azul Rey', hex: '#2563eb' },
  { name: 'Púrpura', hex: '#7c3aed' },
  { name: 'Rojo Pasión', hex: '#e11d48' },
  { name: 'Naranja Fuego', hex: '#ea580c' },
  { name: 'Ámbar Cálido', hex: '#d97706' },
  { name: 'Cian Neón', hex: '#06b6d4' },
  { name: 'Rosa Neón', hex: '#ec4899' },
  { name: 'Café Robusto', hex: '#78350f' },
  { name: 'Negro Carbón', hex: '#0f172a' }
];

export const THEME_PRESET_CARDS = [
  {
    id: 'light' as ThemePaletteMode,
    name: 'Studio Light (Blanco Pulcro)',
    desc: 'Limpio y profesional. Máxima legibilidad y tarjetas con relieve nítido.',
    previewBg: '#f8fafc',
    previewCard: '#ffffff',
    previewText: '#0f172a',
    previewAccent: '#00b37e',
  },
  {
    id: 'dark' as ThemePaletteMode,
    name: 'Dark Titanium (Nocturno)',
    desc: 'Carbón premium con bordes de luz. Gran impacto para moda, apps y retail.',
    previewBg: '#090d16',
    previewCard: '#111827',
    previewText: '#f9fafb',
    previewAccent: '#10b981',
  },
  {
    id: 'cream' as ThemePaletteMode,
    name: 'Boutique Warm (Crema Artesanal)',
    desc: 'Cálido y orgánico. Ideal para cafeterías, reposterías y productos artesanales.',
    previewBg: '#faf7f2',
    previewCard: '#ffffff',
    previewText: '#1c1917',
    previewAccent: '#b45309',
  },
  {
    id: 'black' as ThemePaletteMode,
    name: 'Obsidian OLED (Negro Puro)',
    desc: 'Negro absoluto de contraste infinito con bordes iluminados por la marca.',
    previewBg: '#000000',
    previewCard: '#0c0d12',
    previewText: '#ffffff',
    previewAccent: '#00b37e',
  },
  {
    id: 'slate' as ThemePaletteMode,
    name: 'Slate Ejecutivo (Azul Noche)',
    desc: 'Elegancia corporativa seria para consultorías, bufetes y servicios B2B.',
    previewBg: '#0f172a',
    previewCard: '#1e293b',
    previewText: '#f8fafc',
    previewAccent: '#2563eb',
  },
  {
    id: 'rose' as ThemePaletteMode,
    name: 'Soft Rose (Cosmética & Spa)',
    desc: 'Tonos pasteles delicados ideales para estética, bienestar y accesorios.',
    previewBg: '#fff1f2',
    previewCard: '#ffffff',
    previewText: '#881337',
    previewAccent: '#e11d48',
  }
];

export function createHarmoniousTheme(
  mode: ThemePaletteMode,
  accentColor: string,
  borderStyle: CardBorderStyle = 'tinted',
  customBorder?: string,
  customPageBg?: string,
  customCardBg?: string,
  customText?: string
): StoreThemeConfig {
  const base = THEME_PRESETS[mode === 'custom' ? 'light' : mode] || THEME_PRESETS.light;
  const pageBg = customPageBg || base.pageBackground;
  const cardBg = customCardBg || base.cardBackground;
  const textColor = customText || base.textColor;
  const isDark = textColor === '#ffffff' || textColor === '#f8fafc' || pageBg.startsWith('#0') || pageBg.startsWith('#1');

  const borderColor = customBorder || computeHarmoniousBorder(pageBg, cardBg, accentColor, borderStyle);

  return {
    palette: mode,
    pageBackground: pageBg,
    cardBackground: cardBg,
    headerBackground: cardBg.startsWith('#') ? `${cardBg}f0` : cardBg,
    textColor,
    textMutedColor: isDark ? '#9ca3af' : '#64748b',
    borderColor,
    accentColor,
    borderStyle,
    borderRadius: base.borderRadius || 'rounded'
  };
}

export function resolveStoreTheme(store: TenantStore): StoreThemeConfig {
  const accent = store.themeConfig?.accentColor || store.brandColor || '#00b37e';
  
  if (store.themeConfig) {
    const borderStyle: CardBorderStyle = store.themeConfig.borderStyle || 'tinted';
    const borderColor = store.themeConfig.borderColor && store.themeConfig.borderColor !== '#e2e8f0' && store.themeConfig.borderColor !== '#1e293b'
      ? store.themeConfig.borderColor
      : computeHarmoniousBorder(
          store.themeConfig.pageBackground,
          store.themeConfig.cardBackground,
          accent,
          borderStyle
        );

    return {
      ...store.themeConfig,
      accentColor: accent,
      borderColor,
      borderStyle,
      borderRadius: store.themeConfig.borderRadius || 'rounded',
    };
  }

  return createHarmoniousTheme('light', accent, 'tinted');
}
