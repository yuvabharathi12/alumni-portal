import React from 'react';
import styles from './Public.module.css';

const PublicButton = ({ children, primary, onClick, className }) => {
  const buttonClasses = `${styles.button} ${primary ? styles.primary : styles.secondary} ${className || ''}`;
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default PublicButton;