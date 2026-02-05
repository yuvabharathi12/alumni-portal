import React from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

const Footer = () => {
  const footerStyles = {
    background: `linear-gradient(135deg, ${colors.neutral[900]} 0%, ${colors.primary[900]} 100%)`,
    color: colors.text.inverse,
    padding: `${spacing[16]} 0 ${spacing[8]} 0`,
    marginTop: 'auto',
  };

  const containerStyles = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing[8],
    marginBottom: spacing[12],
  };

  const columnStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const headingStyles = {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[2],
    color: colors.text.inverse,
  };

  const linkStyles = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: typography.fontSize.sm,
    transition: 'all 0.2s ease',
    display: 'inline-block',
  };

  const bottomBarStyles = {
    borderTop: `1px solid rgba(255, 255, 255, 0.1)`,
    paddingTop: spacing[6],
    marginTop: spacing[8],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing[4],
  };

  const socialIconStyles = {
    display: 'flex',
    gap: spacing[3],
  };

  const iconButtonStyles = {
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.full,
    background: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.text.inverse,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    backdropFilter: 'blur(10px)',
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        {/* Main Footer Grid */}
        <div style={gridStyles}>
          {/* About Section */}
          <div style={columnStyles}>
            <h3 style={headingStyles}>🎓 CAHCET Alumni</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed 
            }}>
              Connecting alumni, fostering relationships, and building futures. Join our vibrant community of 5000+ graduates.
            </p>
          </div>

          {/* Quick Links */}
          <div style={columnStyles}>
            <h4 style={headingStyles}>Quick Links</h4>
            <a href="#about" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>About Us</a>
            <a href="#programs" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Programs</a>
            <a href="#events" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Events</a>
            <a href="#contact" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Contact</a>
          </div>

          {/* Resources */}
          <div style={columnStyles}>
            <h4 style={headingStyles}>Resources</h4>
            <a href="#careers" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Careers</a>
            <a href="#network" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Networking</a>
            <a href="#mentoring" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Mentoring</a>
            <a href="#directory" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Alumni Directory</a>
          </div>

          {/* Contact */}
          <div style={columnStyles}>
            <h4 style={headingStyles}>Contact</h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: typography.fontSize.sm, margin: 0 }}>
              📍 CAHCET, Puducherry<br/>
              💬 alumni@cahcet.edu<br/>
              📞 +91 (413) XXX-XXXX
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={bottomBarStyles}>
          <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: 'rgba(255, 255, 255, 0.6)' }}>
            © 2024 CAHCET Alumni Portal. All rights reserved.
          </p>
          
          <div style={socialIconStyles}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={iconButtonStyles} onMouseEnter={(e) => e.target.style.background = colors.accent.blue} onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>f</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={iconButtonStyles} onMouseEnter={(e) => e.target.style.background = colors.accent.cyan} onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>𝕏</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={iconButtonStyles} onMouseEnter={(e) => e.target.style.background = colors.accent.blue} onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>in</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={iconButtonStyles} onMouseEnter={(e) => e.target.style.background = colors.secondary.main} onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}>📷</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
