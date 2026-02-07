import React from 'react';
import { colors } from '../styles/theme';

const Card = ({
  children,
  variant = 'neutral',
  className = '',
  style = {},
  hoverable = true,
  ...props
}) => {
  const variantStyles = {
    primary: {
      background: '#f0fdf4',
      border: `1px solid #dcfce7`,
      boxShadow: '0 2px 8px rgba(22, 101, 52, 0.06)',
    },
    secondary: {
      background: '#fff7ed',
      border: `1px solid #fed7aa`,
      boxShadow: '0 2px 8px rgba(249, 115, 22, 0.06)',
    },
    accent: {
      background: '#fafbff',
      border: `1px solid #e0e7ff`,
      boxShadow: '0 2px 8px rgba(30, 58, 138, 0.06)',
    },
    neutral: {
      background: '#ffffff',
      border: `1px solid #e5e7eb`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    subtle: {
      background: '#f9fafb',
      border: `1px solid #e5e7eb`,
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    },
  };

  const baseStyle = {
    borderRadius: '8px',
    padding: '20px',
    transition: 'all 0.3s ease',
    cursor: hoverable ? 'default' : 'default',
    ...variantStyles[variant] || variantStyles.neutral,
    ...style,
  };

  return (
    <div
      className={`${hoverable ? 'hover:shadow-md' : ''} ${className}`}
      style={baseStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
