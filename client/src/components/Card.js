import React from 'react';
import { colors, spacing, borderRadius, shadows, transitions } from '../styles/theme';

const Card = ({ 
  children, 
  variant = 'base',
  interactive = false,
  padding = 6,
  image = null,
  imageHeight = '200px',
  className = '',
  onClick,
  ...props 
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const variantStyles = {
    base: {
      background: colors.background.paper,
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
      boxShadow: shadows.base,
      border: `1px solid ${colors.border}`,
      transition: transitions.base,
    },
    elevated: {
      background: colors.background.paper,
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
      boxShadow: shadows.lg,
      border: 'none',
      transition: transitions.base,
    },
    outlined: {
      background: 'transparent',
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
      border: `2px solid ${colors.primary.main}`,
      transition: transitions.base,
    },
    gradient: {
      background: colors.gradients.card,
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
      boxShadow: shadows.md,
      border: 'none',
      transition: transitions.base,
      backdropFilter: 'blur(10px)',
    },
  };

  const interactiveStyles = interactive ? {
    cursor: 'pointer',
  } : {};

  const hoverStyles = interactive && isHovered ? {
    transform: 'translateY(-10px)',
    boxShadow: shadows.xl,
    borderColor: isHovered && variant === 'outlined' ? colors.primary[600] : colors.border,
  } : {};

  const cardStyles = {
    ...variantStyles[variant],
    ...interactiveStyles,
    ...hoverStyles,
    overflow: 'hidden',
  };

  return (
    <div
      className={className}
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={interactive ? onClick : undefined}
      {...props}
    >
      {image && (
        <div
          style={{
            width: `calc(100% + ${spacing[padding] * 2}px)`,
            marginLeft: `-${spacing[padding]}px`,
            marginTop: `-${spacing[padding]}px`,
            marginBottom: spacing[4],
            height: imageHeight,
            overflow: 'hidden',
            borderRadius: `${borderRadius.lg} ${borderRadius.lg} 0 0`,
          }}
        >
          <img
            src={image}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: transitions.slow,
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
