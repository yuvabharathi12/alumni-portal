import React from 'react';
import "../styles/global.css";
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import Button from './Button';

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage,
  overlay = true,
  height = '600px',
  primaryButton,
  secondaryButton,
  centered = true,
  children,
  gradient = colors.gradients.hero,
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
  };

  const overlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: overlay ? gradient : 'transparent',
  };

  const contentStyles = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1200px',
    padding: `0 ${spacing[6]}`,
    textAlign: centered ? 'center' : 'left',
    color: colors.text.inverse,
    animation: 'slideUp 0.8s ease-out',
  };

  const titleStyles = {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['6xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[4],
    lineHeight: typography.lineHeight.tight,
    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.regular,
    marginBottom: spacing[8],
    opacity: 0.95,
    maxWidth: '700px',
    margin: centered ? '0 auto' : '0',
    marginBottom: spacing[8],
    lineHeight: typography.lineHeight.relaxed,
  };

  const buttonGroupStyles = {
    display: 'flex',
    gap: spacing[4],
    justifyContent: centered ? 'center' : 'flex-start',
    flexWrap: 'wrap',
  };

  return (
    <div style={heroStyles}>
      {/* Background Image */}
      <div style={backgroundStyles} />
      
      {/* Overlay */}
      <div style={overlayStyles} />

      {/* Content */}
      <div style={contentStyles}>
        {title && <h1 style={titleStyles}>{title}</h1>}
        {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
        
        {(primaryButton || secondaryButton) && (
          <div style={buttonGroupStyles}>
            {primaryButton && (
              <Button
                variant="secondary"
                size="lg"
                onClick={primaryButton.onClick}
                icon={primaryButton.icon}
              >
                {primaryButton.text}
              </Button>
            )}
            {secondaryButton && (
              <Button
                variant="outline"
                size="lg"
                onClick={secondaryButton.onClick}
                icon={secondaryButton.icon}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: colors.text.inverse,
                  color: colors.text.inverse,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {secondaryButton.text}
              </Button>
            )}
          </div>
        )}
        
        {children}
      </div>

      {/* Decorative Elements */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(250, 250, 250, 0.3) 50%, rgba(250, 250, 250, 1) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Hero;
