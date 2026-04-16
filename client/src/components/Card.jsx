import React from 'react';
import styles from './Card.module.css';

const Card = ({
  children,
  variant = 'neutral',
  className = '',
  style = {},
  hoverable = true,
  ...props
}) => {
  const classNames = [
    styles.card,
    styles[variant] || styles.neutral,
    hoverable ? styles.hoverable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style} {...props}>
      {children}
    </div>
  );
};

export default Card;
