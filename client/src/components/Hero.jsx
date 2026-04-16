import React from 'react';
import styles from './Hero.module.css';
import Button from './Button';

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  overlay = true,
  height = '520px',
  primaryButton,
  secondaryButton,
  centered = true,
}) => {
  return (
    <section
      className={`${styles.hero} ${centered ? styles.heroCentered : styles.heroLeft}`}
      style={{ height }}
    >
      <div
        className={`${styles.background} ${backgroundImage ? styles.backgroundWithImage : ''}`}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
      />
      {overlay && <div className={styles.overlay} />}
      <div className={`${styles.content} ${centered ? styles.contentCentered : ''}`}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {(primaryButton || secondaryButton) && (
          <div className={`${styles.actions} ${centered ? styles.actionsCentered : ''}`}>
            {primaryButton && (
              <Button onClick={primaryButton.onClick} variant={primaryButton.variant || 'primary'}>
                {primaryButton.label}
              </Button>
            )}
            {secondaryButton && (
              <Button onClick={secondaryButton.onClick} variant={secondaryButton.variant || 'outline'}>
                {secondaryButton.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
