import React from 'react';
import styles from './Public.module.css';

const PublicCard = ({ children, className }) => {
  return (
    <div className={`${styles.card} ${className || ''}`}>
      {children}
    </div>
  );
};

export default PublicCard;