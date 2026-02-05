import React from 'react';
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
  const [isHovered, setIsHovered] = React.useState(false);

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
      background: colors.gradients.secondary,
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
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: isHovered ? shadows.xl : shadows.md,
    },
    secondary: {
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: isHovered ? shadows.xl : shadows.md,
    },
    outline: {
      background: isHovered ? colors.primary[50] : 'transparent',
      borderColor: isHovered ? colors.primary[700] : colors.primary.main,
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    },
    ghost: {
      background: isHovered ? colors.primary[50] : 'transparent',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    },
    danger: {
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: isHovered ? shadows.xl : shadows.md,
    },
    success: {
      transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
      boxShadow: isHovered ? shadows.xl : shadows.md,
    },
  };

  const buttonStyles = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(isHovered && hoverStyles[variant]),
  };

  return (
    <button
      type={type}
      className={className}
      style={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
