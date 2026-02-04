import React from 'react';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

const Badge = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const sizeStyles = {
    sm: {
      padding: `${spacing[1]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs,
    },
    md: {
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: typography.fontSize.xs,
    },
    lg: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
    },
  };

  const variantStyles = {
    primary: {
      background: colors.primary[100],
      color: colors.primary.dark,
    },
    secondary: {
      background: colors.secondary[100],
      color: colors.secondary.dark,
    },
    success: {
      background: colors.success.bg,
      color: colors.success.dark,
    },
    error: {
      background: colors.error.bg,
      color: colors.error.dark,
    },
    warning: {
      background: colors.warning.bg,
      color: colors.warning.dark,
    },
    info: {
      background: colors.info.bg,
      color: colors.info.dark,
    },
    neutral: {
      background: colors.neutral[200],
      color: colors.neutral[700],
    },
  };

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[1],
    borderRadius: borderRadius.full,
    fontWeight: typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.wide,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const dotStyles = {
    width: '6px',
    height: '6px',
    borderRadius: borderRadius.full,
    background: 'currentColor',
  };

  return (
    <span className={className} style={badgeStyles}>
      {dot && <span style={dotStyles} />}
      {children}
    </span>
  );
};

export default Badge;
