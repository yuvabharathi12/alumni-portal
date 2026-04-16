import React from 'react';
import styles from './LoadingSpinner.module.css';

export const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClass = {
    sm: styles.spinnerSm,
    md: styles.spinnerMd,
    lg: styles.spinnerLg,
  };

  return <div className={`${styles.spinner} ${sizeClass[size]}`} />;
};

export const LoadingContainer = ({ children, message = 'Loading...' }) => {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner size="lg" />
      <p className={styles.loadingMessage}>{message}</p>
      {children}
    </div>
  );
};

export const Skeleton = ({
  width = '100%',
  height = '20px',
  variant = 'text',
  className = '',
  style = {},
}) => {
  const variantClass = {
    text: styles.skeletonText,
    circular: styles.skeletonCircular,
    rectangular: styles.skeletonRectangular,
  };

  return (
    <div
      className={`${styles.skeleton} ${variantClass[variant]} ${className}`}
      style={{ width: variant === 'circular' ? height : width, height, ...style }}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className={styles.skeletonCard}>
      <Skeleton height="200px" variant="rectangular" style={{ marginBottom: 16 }} />
      <Skeleton height="24px" style={{ marginBottom: 8 }} />
      <Skeleton height="16px" style={{ marginBottom: 16 }} />
      <Skeleton height="16px" width="80%" />
    </div>
  );
};

export default LoadingSpinner;
