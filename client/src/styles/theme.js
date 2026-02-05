// Enhanced CAHCET Alumni Portal Theme
// Modern, vibrant, and sophisticated design system with improved colors

export const colors = {
  // Primary Palette - Rich Greens
  primary: {
    50: '#f0fef4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#134e4a',
    main: '#15803d',
    light: '#22c55e',
    dark: '#0d3b2b',
  },
  
  // Secondary Palette - Vibrant Orange
  secondary: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    main: '#f97316',
    light: '#fb923c',
    dark: '#7a2e0e',
  },

  // Accent Colors
  accent: {
    blue: '#3b82f6',
    purple: '#a855f7',
    pink: '#ec4899',
    cyan: '#06b6d4',
    indigo: '#6366f1',
  },

  // Status Colors
  success: {
    main: '#10b981',
    light: '#6ee7b7',
    dark: '#059669',
    bg: '#d1fae5',
  },
  
  error: {
    main: '#ef4444',
    light: '#fca5a5',
    dark: '#dc2626',
    bg: '#fee2e2',
  },
  
  warning: {
    main: '#f59e0b',
    light: '#fcd34d',
    dark: '#d97706',
    bg: '#fef3c7',
  },
  
  info: {
    main: '#3b82f6',
    light: '#93c5fd',
    dark: '#1d4ed8',
    bg: '#dbeafe',
  },

  // Neutral Palette
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },

  // Text Colors
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
    light: '#d1d5db',
    muted: '#9ca3af',
  },

  // Background Colors
  background: {
    default: '#ffffff',
    paper: '#ffffff',
    light: '#f9fafb',
    lighter: '#f3f4f6',
    dark: '#1f2937',
  },

  // Border Color
  border: '#e5e7eb',
  borderLight: '#f3f4f6',

  // Shadows
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #15803d 0%, #059669 100%)',
    secondary: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    hero: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(15, 80, 58, 0.9) 100%)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 250, 0.9) 100%)',
    accent: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    warm: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
    cool: 'linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)',
    vibrant: 'linear-gradient(135deg, #f97316 0%, #15803d 50%, #3b82f6 100%)',
  },
};

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
};

export const typography = {
  fontFamily: {
    body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    heading: "'Playfair Display', Georgia, serif",
    display: "'Playfair Display', Georgia, serif",
    mono: "'JetBrains Mono', monospace",
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
  },

  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

export const borderRadius = {
  none: '0',
  sm: '2px',
  base: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  elevated: '0 8px 16px rgba(21, 128, 61, 0.15)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
};

export const transitions = {
  fast: '0.15s ease-in-out',
  base: '0.2s ease-in-out',
  slow: '0.3s ease-in-out',
  slower: '0.4s ease-in-out',
};

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Common style objects
export const styles = {
  card: {
    background: colors.background.paper,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    boxShadow: shadows.md,
    border: `1px solid ${colors.border}`,
    transition: transitions.base,
  },

  cardElevated: {
    background: colors.background.paper,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    boxShadow: shadows.lg,
    border: 'none',
    transition: transitions.base,
  },

  buttonPrimary: {
    padding: `${spacing[3]} ${spacing[6]}`,
    background: colors.gradients.primary,
    color: colors.text.inverse,
    border: 'none',
    borderRadius: borderRadius.md,
    fontWeight: 600,
    cursor: 'pointer',
    transition: transitions.base,
    boxShadow: shadows.md,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
  },

  buttonSecondary: {
    padding: `${spacing[3]} ${spacing[6]}`,
    background: colors.gradients.secondary,
    color: colors.text.inverse,
    border: 'none',
    borderRadius: borderRadius.md,
    fontWeight: 600,
    cursor: 'pointer',
    transition: transitions.base,
    boxShadow: shadows.md,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
  },

  input: {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    border: `2px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.body,
    transition: transitions.base,
  },

  label: {
    display: 'block',
    marginBottom: spacing[2],
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },

  heroSection: {
    position: 'relative',
    width: '100%',
    height: '600px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing[6],
  },
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  styles,
};
