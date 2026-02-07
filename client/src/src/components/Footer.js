import React from 'react';
import "../styles/global.css";
import { Link } from 'react-router-dom';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

const Footer = () => {
  const footerStyles = {
    background: colors.primary[900],
    color: colors.text.inverse,
    padding: `${spacing[16]} 0 ${spacing[8]} 0`,
    marginTop: 'auto',
  };

  const containerStyles = {
    maxWidth: '1280px',
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
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[2],
    color: colors.text.inverse,
  };

  const linkStyles = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: typography.fontSize.sm,
    transition: 'color 0.2s ease',
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
    transition: 'all 0.2s ease',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        {/* Main Footer Grid */}
        <div style={gridStyles}>
          {/* About Section */}
          <div style={columnStyles}>
            <h3 style={headingStyles}>CAHCET Alumni</h3>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: typography.fontSize.sm,
              lineHeight: typography.lineHeight.relaxed 
            }}>
              Connecting alumni, fostering relationships, and building futures. Join our vibrant community of graduates.
            </p>
          </div>

          {/* Quick Links */}
          <div style={columnStyles}>
            <h4 style={headingStyles}>Quick Links</h4>
            <Link to="/about" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              About Us
            </Link>
            <Link to="/events" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Events
            </Link>
            <Link to="/jobs" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Job Board
            </Link>
            <Link to="/alumni/directory" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Alumni Directory
            </Link>
          </div>

          {/* Resources */}
          <div style={columnStyles}>
            <h4 style={headingStyles}>Resources</h4>
            <a href="#" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Help Center
            </a>
            <a href="#" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Privacy Policy
            </a>
            <a href="#" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Terms of Service
            </a>
            <a href="#" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.light} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>
              Contact Us
            </a>
          </div>

          {/* Newsletter */}
          <div style={columnStyles}>
            <h4 style={headingStyles}>Stay Connected</h4>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.7)', 
              fontSize: typography.fontSize.sm 
            }}>
              Subscribe to our newsletter for updates and events.
            </p>
            <div style={{ display: 'flex', gap: spacing[2], marginTop: spacing[2] }}>
              <input
                type="email"
                placeholder="Your email"
                style={{
                  flex: 1,
                  padding: spacing[2],
                  borderRadius: borderRadius.md,
                  border: 'none',
                  fontSize: typography.fontSize.sm,
                }}
              />
              <button
                style={{
                  padding: `${spacing[2]} ${spacing[4]}`,
                  background: colors.secondary.main,
                  color: colors.text.inverse,
                  border: 'none',
                  borderRadius: borderRadius.md,
                  cursor: 'pointer',
                  fontWeight: typography.fontWeight.semibold,
                  fontSize: typography.fontSize.sm,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={bottomBarStyles}>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: typography.fontSize.sm,
            margin: 0 
          }}>
            © {new Date().getFullYear()} CAHCET Alumni Portal. All rights reserved.
          </p>

          {/* Social Icons */}
          <div style={socialIconStyles}>
            <a 
              href="#" 
              style={iconButtonStyles}
              onMouseEnter={(e) => e.target.style.background = colors.secondary.main}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="#" 
              style={iconButtonStyles}
              onMouseEnter={(e) => e.target.style.background = colors.secondary.main}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a 
              href="#" 
              style={iconButtonStyles}
              onMouseEnter={(e) => e.target.style.background = colors.secondary.main}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="#" 
              style={iconButtonStyles}
              onMouseEnter={(e) => e.target.style.background = colors.secondary.main}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
