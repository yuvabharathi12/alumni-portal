import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { colors, spacing, typography, shadows, borderRadius, zIndex } from '../styles/theme';
import Button from './Button';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  let role = null;
  let userName = 'User';

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
      userName = decoded.name || 'User';
    } catch (err) {
      console.error('Token decode error:', err);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isHome = location.pathname === '/';
  const navbarBgTransparent = isHome && !isScrolled;
  const navbarTextLight = navbarBgTransparent;

  const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: zIndex.fixed,
    background: navbarBgTransparent ? 'transparent' : colors.gradients.primary,
    boxShadow: isScrolled ? shadows.md : 'none',
    transition: 'background 0.3s ease, box-shadow 0.3s ease',
    borderBottom: navbarBgTransparent ? 'none' : `1px solid ${colors.border}`,
  };

  const containerStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '80px',
  };

  const logoStyles = {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: navbarTextLight ? colors.text.inverse : colors.text.inverse,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    transition: 'color 0.3s ease',
  };

  const navLinksStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[8],
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const linkStyles = {
    color: navbarTextLight ? colors.text.inverse : colors.text.inverse,
    textDecoration: 'none',
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.base,
    transition: 'color 0.2s ease',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: borderRadius.md,
    position: 'relative',
  };

  const activeLinkStyles = {
    color: colors.secondary.light,
  };

  const userMenuStyles = {
    position: 'relative',
  };

  const avatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: borderRadius.full,
    background: colors.gradients.primary,
    color: colors.text.inverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.fontWeight.bold,
    cursor: 'pointer',
    fontSize: typography.fontSize.sm,
  };

  const dropdownStyles = {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    background: colors.background.paper,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    minWidth: '200px',
    padding: spacing[2],
    zIndex: zIndex.dropdown,
    opacity: userMenuOpen ? 1 : 0,
    visibility: userMenuOpen ? 'visible' : 'hidden',
    transform: userMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.2s ease',
  };

  const dropdownItemStyles = {
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    textDecoration: 'none',
    display: 'block',
  };

  const mobileMenuStyles = {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    background: colors.background.paper,
    boxShadow: shadows.xl,
    padding: spacing[6],
    transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isMobileMenuOpen ? 1 : 0,
    visibility: isMobileMenuOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    zIndex: zIndex.dropdown,
  };

  const mobileMenuItemStyles = {
    padding: `${spacing[3]} 0`,
    borderBottom: `1px solid ${colors.border}`,
  };

  const hamburgerStyles = {
    display: 'none',
    flexDirection: 'column',
    gap: '6px',
    cursor: 'pointer',
    padding: spacing[2],
  };

  const hamburgerLineStyles = {
    width: '24px',
    height: '2px',
    background: colors.text.inverse,
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  };

  const navLinks = role === 'admin'
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/admin/approvals', label: 'Approvals' },
        { path: '/alumni/directory', label: 'Directory' },
        { path: '/events', label: 'Events' },
        { path: '/jobs', label: 'Jobs' },
      ]
    : role === 'student'
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/alumni/directory', label: 'Directory' },
        { path: '/events', label: 'Events' },
        { path: '/jobs', label: 'Jobs' },
      ]
    : [
        { path: '/', label: 'Home' },
        { path: '/events', label: 'Events' },
        { path: '/jobs', label: 'Jobs' },
      ];

  return (
    <nav style={navbarStyles}>
      <div style={containerStyles}>
        {/* Logo */}
        <Link to="/" style={logoStyles}>
          <img
            src={logo}
            alt="CAHCET Alumni Logo"
            style={{
              height: '40px',
              width: '40px',
              borderRadius: borderRadius.full,
              objectFit: 'cover',
              boxShadow: shadows.sm,
            }}
          />
          <span>CAHCET Alumni</span>
        </Link>

        {/* Desktop Navigation */}
        <ul style={{ ...navLinksStyles, '@media (max-width: 768px)': { display: 'none' } }}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={{
                  ...linkStyles,
                  ...(location.pathname === link.path ? activeLinkStyles : {}),
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(30, 125, 88, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Menu / Auth Actions */}
        {token ? (
          <div style={userMenuStyles}>
            <div
              style={avatarStyles}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              {userName.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown */}
            <div style={dropdownStyles}>
              <Link
                to="/alumni/profile"
                style={dropdownItemStyles}
                onMouseEnter={(e) => (e.target.style.background = colors.neutral[100])}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                👤 My Profile
              </Link>
              {role === 'admin' && (
                <>
                  <Link
                    to="/admin/bulk-upload"
                    style={dropdownItemStyles}
                    onMouseEnter={(e) => (e.target.style.background = colors.neutral[100])}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    📤 Bulk Upload
                  </Link>
                  <Link
                    to="/admin/carousel"
                    style={dropdownItemStyles}
                    onMouseEnter={(e) => (e.target.style.background = colors.neutral[100])}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    🖼️ Manage Carousel
                  </Link>
                  <Link
                    to="/admin/users"
                    style={dropdownItemStyles}
                    onMouseEnter={(e) => (e.target.style.background = colors.neutral[100])}
                    onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                  >
                    👥 Manage Users
                  </Link>
                </>
              )}
              <div
                style={{
                  height: '1px',
                  background: colors.border,
                  margin: `${spacing[2]} 0`,
                }}
              />
              <div
                onClick={handleLogout}
                style={{
                  ...dropdownItemStyles,
                  color: colors.error.main,
                }}
                onMouseEnter={(e) => (e.target.style.background = colors.error.bg)}
                onMouseLeave={(e) => (e.target.style.background = 'transparent')}
              >
                🚪 Logout
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: spacing[3] }}>
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div
          style={hamburgerStyles}
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div style={hamburgerLineStyles} />
          <div style={hamburgerLineStyles} />
          <div style={hamburgerLineStyles} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div style={mobileMenuStyles}>
        {navLinks.map((link) => (
          <div key={link.path} style={mobileMenuItemStyles}>
            <Link
              to={link.path}
              style={{
                ...linkStyles,
                color: colors.text.primary,
                display: 'block',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          </div>
        ))}
      </div>

      {/* Mobile Menu Styles */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
          nav ul {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
