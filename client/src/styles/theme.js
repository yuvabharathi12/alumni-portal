// CAHCET Theme Colors
export const colors = {
  // Primary Colors
  primary: "#1a4d2e", // Deep green (academic/professional)
  primaryLight: "#2d6a4f",
  primaryDark: "#0d3320",
  
  // Secondary Colors
  secondary: "#ffa500", // Orange (energy/innovation)
  secondaryLight: "#ffb733",
  secondaryDark: "#cc8400",
  
  // Neutrals
  background: "#f8f9fa",
  white: "#ffffff",
  text: "#212529",
  textLight: "#6c757d",
  border: "#dee2e6",
  
  // Status
  success: "#28a745",
  danger: "#dc3545",
  warning: "#ffc107",
  info: "#17a2b8",
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