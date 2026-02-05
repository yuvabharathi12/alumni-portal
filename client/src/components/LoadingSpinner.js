import React from 'react';
import { colors, spacing, borderRadius } from '../styles/theme';

// Loading Spinner
export const LoadingSpinner = ({ size = 'md', color = colors.primary.main }) => {
  const sizeMap = {
    sm: '20px',
    md: '40px',
    lg: '60px',
  };

  const spinnerStyles = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: `4px solid ${colors.neutral[200]}`,
    borderTop: `4px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  return (
    <>
      <div style={spinnerStyles} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

// Loading Container
export const LoadingContainer = ({ children, message = 'Loading...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        gap: spacing[4],
        background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
        borderRadius: borderRadius.lg,
        padding: spacing[8],
      }}
    >
      <LoadingSpinner size="lg" />
      <p style={{ color: colors.text.secondary, fontSize: '1rem', fontWeight: 500 }}>{message}</p>
      {children}
    </div>
  );
};

// Skeleton Loader
export const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  variant = 'text',
  className = '' 
}) => {
  const variantStyles = {
    text: {
      width,
      height,
      borderRadius: borderRadius.base,
    },
    circular: {
      width: height,
      height,
      borderRadius: borderRadius.full,
    },
    rectangular: {
      width,
      height,
      borderRadius: borderRadius.lg,
    },
  };

  const skeletonStyles = {
    ...variantStyles[variant],
    background: `linear-gradient(90deg, ${colors.neutral[200]} 25%, ${colors.neutral[300]} 50%, ${colors.neutral[200]} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite',
  };

  return (
    <>
      <div className={className} style={skeletonStyles} />
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </>
  );
};

// Skeleton Card
export const SkeletonCard = () => {
  return (
    <div
      style={{
        background: colors.background.paper,
        borderRadius: borderRadius.lg,
        padding: spacing[6],
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Skeleton height="200px" variant="rectangular" style={{ marginBottom: spacing[4] }} />
      <Skeleton height="24px" style={{ marginBottom: spacing[2] }} />
      <Skeleton height="16px" style={{ marginBottom: spacing[4] }} />
      <Skeleton height="16px" width="80%" />
    </div>
  );
};

export default LoadingSpinner;
