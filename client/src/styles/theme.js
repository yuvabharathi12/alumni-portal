// Enhanced CAHCET Alumni Portal Theme
// Modern, sophisticated design system

export const colors = {
  // Primary Palette - Sophisticated greens
  primary: {
    50: '#f0f9f4',
    100: '#daf1e4',
    200: '#b8e4cd',
    300: '#88d0ad',
    400: '#54b589',
    500: '#2d9d6f',
    600: '#1e7d58',
    700: '#186548',
    800: '#15503a',
    900: '#124231',
    main: '#1e7d58',
    light: '#2d9d6f',
    dark: '#15503a',
  },
  
  // Secondary Palette - Warm accents
  secondary: {
    50: '#fff9f0',
    100: '#fff0d9',
    200: '#ffddb3',
    300: '#ffc581',
    400: '#ffa74d',
    500: '#ff8c26',
    600: '#f06d0c',
    700: '#c7520d',
    800: '#9e4213',
    900: '#7f3813',
    main: '#ff8c26',
    light: '#ffa74d',
    dark: '#c7520d',
  },
  
  // Neutral Palette
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Semantic Colors
  background: {
    default: '#fafafa',
    paper: '#ffffff',
    elevated: '#ffffff',
    gradient: 'linear-gradient(135deg, #f0f9f4 0%, #ffffff 100%)',
  },
  
  text: {
    primary: '#212121',
    secondary: '#616161',
    disabled: '#9e9e9e',
    inverse: '#ffffff',
  },
  white: '#ffffff',
  
  // Status Colors
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    bg: '#e8f5e9',
  },
  
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    bg: '#ffebee',
  },
  
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    bg: '#fff3e0',
  },
  
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    bg: '#e1f5fe',
  },
  
  // UI Elements
  divider: 'rgba(0, 0, 0, 0.12)',
  border: '#e0e0e0',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1e7d58 0%, #2d9d6f 100%)',
    secondary: 'linear-gradient(135deg, #ff8c26 0%, #ffa74d 100%)',
    hero: 'linear-gradient(135deg, rgba(30, 125, 88, 0.95) 0%, rgba(45, 157, 111, 0.85) 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
    overlay: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
  },
};

// Typography System
export const typography = {
  fontFamily: {
    display: '"Playfair Display", Georgia, serif',
    heading: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Courier New", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing System (8px base)
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

// Shadows & Elevation
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  elevated: '0 8px 16px rgba(30, 125, 88, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)',
};

// Border Radius
export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  base: '0.5rem',   // 8px
  md: '0.75rem',    // 12px
  lg: '1rem',       // 16px
  xl: '1.5rem',     // 24px
  '2xl': '2rem',    // 32px
  full: '9999px',
};

// Transitions
export const transitions = {
  fast: 'all 0.15s ease-in-out',
  base: 'all 0.2s ease-in-out',
  slow: 'all 0.3s ease-in-out',
  slower: 'all 0.5s ease-in-out',
};

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index layers
export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modal: 1300,
  popover: 1400,
  toast: 1500,
  tooltip: 1600,
};

// Component Styles
export const components = {
  button: {
    base: {
      padding: `${spacing[3]} ${spacing[6]}`,
      borderRadius: borderRadius.md,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.body,
      border: 'none',
      cursor: 'pointer',
      transition: transitions.base,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      textDecoration: 'none',
    },
    primary: {
      background: colors.gradients.primary,
      color: colors.text.inverse,
      boxShadow: shadows.md,
    },
    secondary: {
      background: colors.secondary.main,
      color: colors.text.inverse,
      boxShadow: shadows.md,
    },
    outline: {
      background: 'transparent',
      border: `2px solid ${colors.primary.main}`,
      color: colors.primary.main,
    },
    ghost: {
      background: 'transparent',
      color: colors.primary.main,
    },
  },
  
  card: {
    base: {
      background: colors.background.paper,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      boxShadow: shadows.base,
      border: `1px solid ${colors.border}`,
      transition: transitions.base,
    },
    elevated: {
      background: colors.background.paper,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      boxShadow: shadows.elevated,
      border: 'none',
      transition: transitions.base,
    },
    interactive: {
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: shadows.xl,
      },
    },
  },
  
  input: {
    base: {
      width: '100%',
      padding: `${spacing[3]} ${spacing[4]}`,
      border: `2px solid ${colors.border}`,
      borderRadius: borderRadius.md,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.body,
      color: colors.text.primary,
      transition: transitions.base,
      backgroundColor: colors.background.paper,
    },
    focus: {
      borderColor: colors.primary.main,
      outline: 'none',
      boxShadow: `0 0 0 3px ${colors.primary[100]}`,
    },
  },
  
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${spacing[1]} ${spacing[3]}`,
      borderRadius: borderRadius.full,
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: typography.letterSpacing.wide,
    },
  },
};

// Animation Keyframes
export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  slideUp: `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  slideDown: `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  scaleIn: `
    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
};

// Utility Functions
export const utils = {
  hexToRgba: (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
  
  mediaQuery: (breakpoint) => `@media (min-width: ${breakpoints[breakpoint]})`,
  
  truncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
};

// Export legacy aliases for backward compatibility
export const styles = {
  card: components.card.base,
  button: components.button.base,
  input: components.input.base,
};

// Default export
export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  transitions,
  breakpoints,
  zIndex,
  components,
  animations,
  utils,
};
