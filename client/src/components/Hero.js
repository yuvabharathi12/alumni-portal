import React from 'react';
import "../styles/global.css";
import { colors, spacing, typography, borderRadius } from '../styles/theme';
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
  const heroStyles = {
    position: 'relative',
    width: '100%',
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: centered ? 'center' : 'flex-start',
    overflow: 'hidden',
    marginBottom: spacing[12],
    marginTop: '80px',
  };

  const backgroundStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: backgroundImage ? 'saturate(0.9) brightness(0.7)' : 'none',
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: overlay ? 'linear-gradient(135deg, rgba(22,101,52,0.75), rgba(28,46,116,0.65))' : 'transparent',
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    padding: `0 ${spacing[6]}`,
    textAlign: centered ? 'center' : 'left',
    color: 'white',
  };

  return (
    <section style={heroStyles}>
      <div style={backgroundStyles} />
      <div style={overlayStyles} />
      <div style={contentStyles}>
        {title && <h1 style={{ margin: 0, fontSize: typography.fontSize['3xl'], fontWeight: 800 }}>{title}</h1>}
        {subtitle && <p style={{ marginTop: spacing[4], fontSize: typography.fontSize.lg }}>{subtitle}</p>}
        {(primaryButton || secondaryButton) && (
          <div style={{ marginTop: spacing[6], display: 'flex', gap: spacing[4], justifyContent: centered ? 'center' : 'flex-start' }}>
            {primaryButton && <Button onClick={primaryButton.onClick} variant={primaryButton.variant || 'primary'}>{primaryButton.label}</Button>}
            {secondaryButton && <Button onClick={secondaryButton.onClick} variant={secondaryButton.variant || 'outline'}>{secondaryButton.label}</Button>}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
