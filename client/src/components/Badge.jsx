import React from 'react';
import styles from './Badge.module.css';

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const classNames = [
    styles.badge,
    styles[size],
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classNames}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
};

export default Badge;
