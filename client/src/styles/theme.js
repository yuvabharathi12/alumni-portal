// CAHCET Theme Colors
export const colors = {
  // Primary Colors
  primary: "#166534", // Deep green (academic/professional)
  primaryLight: "#34d399",
  primaryDark: "#0f3b26",
  // Semantic headings + text for improved contrast
  heading: "#1e3a8a",
  textPrimary: "#1f2937",
  textSecondary: "#374151",
  
  // Secondary Colors
  secondary: "#f97316", // Orange (energy/innovation)
  secondaryLight: "#fb923c",
  secondaryDark: "#c2410c",

  // Accent / alternative
  accentOrange: "#c2410c",
  
  // Neutrals
  background: "#f9fafb",
  backgroundGradient: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
  white: "#ffffff",
  text: "#111827",
  textLight: "#6b7280",
  border: "#e5e7eb",
  
  // Status
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
  // Gradients
  gradients: {
    primary: "linear-gradient(135deg, #166534 0%, #1e3a8a 100%)",
    secondary: "linear-gradient(135deg, #f97316 0%, #c2410c 100%)",
    hero: "linear-gradient(135deg, rgba(22,101,52,0.8), rgba(30,58,138,0.65))",
    background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
    backgroundLight: "linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)",
    backgroundDark: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
  },
};

// Reusable Styles
export const styles = {
  card: {
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  },
  cardPrimary: {
    background: "#f0fdf4",
    border: `1px solid #dcfce7`,
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(22, 101, 52, 0.06)",
    transition: "all 0.3s ease",
  },
  cardSecondary: {
    background: "#fff7ed",
    border: `1px solid #fed7aa`,
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(249, 115, 22, 0.06)",
    transition: "all 0.3s ease",
  },
  cardAlt: {
    background: "#f9fafb",
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    transition: "all 0.3s ease",
  },
  
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  
  input: {
    width: "100%",
    padding: "10px 12px",
    border: `1px solid ${colors.border}`,
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "12px",
    transition: "border-color 0.2s ease",
  },
};

export const spacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64];

export const typography = {
  fontFamily: { body: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" },
  fontSize: { xs: '12px', sm: '14px', base: '16px', lg: '18px', xl: '20px', '2xl': '24px', '3xl': '32px' },
  fontWeight: { normal: 400, semibold: 600, bold: 700 },
  lineHeight: { relaxed: 1.6 },
};

export const borderRadius = { sm: '6px', md: '8px', lg: '12px', xl: '16px', full: '9999px' };

export const shadows = { sm: '0 2px 8px rgba(0,0,0,0.06)', md: '0 6px 18px rgba(0,0,0,0.08)', lg: '0 12px 30px rgba(0,0,0,0.12)', xl: '0 20px 40px rgba(0,0,0,0.16)' };

export const transitions = { base: 'all 0.2s ease' };

// Backwards compatible simple tokens
export const buttonPrimary = {
  padding: '12px 20px',
  background: colors.primary,
  color: colors.white,
  borderRadius: '8px',
};

// Card background variants for color layering
export const cardBackgrounds = {
  light: "#f8f9fa",
  lightGreen: "#f0fdf4",
  lightOrange: "#e1af53",
  lightBlue: "#c18820",
  white: "#ffffff",
};

export const cardBorders = {
  subtle: "#e5e7eb",
  green: "#dcfce7",
  orange: "#fed7aa",
  blue: "#e0e7ff",
};

// UI: theme refreshed
// eslint-disable-next-line import/no-anonymous-default-export