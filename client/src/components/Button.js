import React, { useState } from "react";
import { colors, spacing } from "../styles/theme";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  style = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const sizeStyles = {
    sm: {
      padding: `${spacing[1]}px ${spacing[3]}px`,
      fontSize: "13px",
      minHeight: "32px",
    },
    md: {
      padding: `${spacing[2]}px ${spacing[4]}px`,
      fontSize: "14px",
      minHeight: "40px",
    },
    lg: {
      padding: `${spacing[3]}px ${spacing[5]}px`,
      fontSize: "15px",
      minHeight: "48px",
    },
  };

  const variantStyles = {
    primary: {
      background: isHovered && !disabled && !loading 
        ? colors.primaryDark || "#0f3b26"
        : colors.primary || "#166534",
      color: colors.white,
      border: "none",
      boxShadow: isHovered && !disabled && !loading 
        ? "0 8px 24px rgba(22, 101, 52, 0.3)"
        : "0 2px 8px rgba(22, 101, 52, 0.12)",
    },
    secondary: {
      background: isHovered && !disabled && !loading
        ? colors.secondaryDark || "#c2410c"
        : colors.secondary || "#f97316",
      color: colors.white,
      border: "none",
      boxShadow: isHovered && !disabled && !loading
        ? "0 8px 24px rgba(249, 115, 22, 0.3)"
        : "0 2px 8px rgba(249, 115, 22, 0.12)",
    },
    outline: {
      background: "transparent",
      color: isHovered && !disabled && !loading ? colors.primary : colors.heading,
      border: `1.5px solid ${colors.border}`,
      boxShadow: isHovered && !disabled && !loading
        ? `inset 0 0 0 2px ${colors.primary}14`
        : "none",
    },
    ghost: {
      background: "transparent",
      color: colors.heading,
      border: "none",
      boxShadow: "none",
    },
    danger: {
      background: isHovered && !disabled && !loading
        ? "#c41c1c"
        : "#dc3545",
      color: colors.white,
      border: "none",
      boxShadow: isHovered && !disabled && !loading
        ? "0 8px 24px rgba(220, 53, 69, 0.3)"
        : "0 2px 8px rgba(220, 53, 69, 0.12)",
    },
  };

  const baseStyle = {
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    fontWeight: 600,
    letterSpacing: "0.3px",
    borderRadius: "8px",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2] + "px",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.6 : 1,
    outline: "none",
    position: "relative",
    userSelect: "none",
    whiteSpace: "nowrap",
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  const focusRingStyle = isFocused ? {
    outline: `2px solid ${colors.primary}`,
    outlineOffset: "2px",
  } : {};

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{ ...baseStyle, ...focusRingStyle }}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          style={{
            display: "inline-block",
            width: "14px",
            height: "14px",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderTop: "2px solid white",
            borderRadius: "50%",
            animation: "spin 0.6s linear infinite",
            marginRight: "4px",
          }}
        />
      )}
      {children}
    </button>
  );
};

export default Button;
