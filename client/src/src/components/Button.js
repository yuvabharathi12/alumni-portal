import React from 'react';
import "../styles/global.css";
import { colors, spacing, borderRadius, typography, shadows, transitions } from '../styles/theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  icon = null,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    fontFamily: typography.fontFamily.body,
    fontWeight: typography.fontWeight.semibold,
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: transitions.base,
    textDecoration: 'none',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles = {
    sm: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
    },
    md: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base,
    },
    lg: {
      padding: `${spacing[4]} ${spacing[8]}`,
      fontSize: typography.fontSize.lg,
    },
  };

  const variantStyles = {
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
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: colors.primary.main,
      boxShadow: 'none',
    },
    danger: {
      background: colors.error.main,
      color: colors.text.inverse,
      boxShadow: shadows.md,
    },
    success: {
      background: colors.success.main,
      color: colors.text.inverse,
      boxShadow: shadows.md,
    },
  };

  const hoverStyles = {
    primary: {
      transform: 'translateY(-2px)',
      boxShadow: shadows.lg,
    },
    secondary: {
      transform: 'translateY(-2px)',
      boxShadow: shadows.lg,
    },
    outline: {
      background: colors.primary[50],
    },
    ghost: {
      background: colors.primary[50],
    },
    danger: {
      transform: 'translateY(-2px)',
      boxShadow: shadows.lg,
    },
    success: {
      transform: 'translateY(-2px)',
      boxShadow: shadows.lg,
    },
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const combinedStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(isHovered && !disabled ? hoverStyles[variant] : {}),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
