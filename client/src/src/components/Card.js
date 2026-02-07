import React from 'react';
import "../styles/global.css";
import { colors, spacing, borderRadius, shadows, transitions } from '../styles/theme';

const Card = ({ 
  children, 
  variant = 'base',
  interactive = false,
  padding = '6',
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
      boxShadow: shadows.elevated,
      border: 'none',
      transition: transitions.base,
    },
    outlined: {
      background: 'transparent',
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
      border: `2px solid ${colors.border}`,
      transition: transitions.base,
    },
    gradient: {
      background: colors.gradients.card,
      borderRadius: borderRadius.lg,
      padding: spacing[padding],
      boxShadow: shadows.md,
      border: 'none',
      transition: transitions.base,
    },
  };

  const interactiveStyles = interactive ? {
    cursor: 'pointer',
  } : {};

  const hoverStyles = interactive && isHovered ? {
    transform: 'translateY(-4px)',
    boxShadow: shadows.xl,
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
            width: 'calc(100% + ' + (spacing[padding] * 2) + ')',
            marginLeft: `-${spacing[padding]}`,
            marginTop: `-${spacing[padding]}`,
            marginBottom: spacing[4],
            height: imageHeight,
            overflow: 'hidden',
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
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
