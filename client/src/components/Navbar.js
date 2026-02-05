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

  const navbarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: zIndex.fixed,
    background: navbarBgTransparent 
      ? 'rgba(255, 255, 255, 0.05)' 
      : colors.gradients.primary,
    boxShadow: isScrolled ? shadows.xl : 'none',
    transition: 'all 0.3s ease',
    borderBottom: navbarBgTransparent ? 'none' : `1px solid ${colors.primary[100]}`,
    backdropFilter: 'blur(10px)',
  };

  const containerStyles = {
    maxWidth: '1400px',
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
    background: 'linear-gradient(135deg, #15803d 0%, #059669 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: navbarBgTransparent ? '#15803d' : 'white',
    background: navbarBgTransparent ? 'none' : colors.gradients.primary,
    color: navbarBgTransparent ? '#15803d' : 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    transition: 'all 0.3s ease',
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
    color: navbarBgTransparent ? '#1f2937' : colors.text.inverse,
    textDecoration: 'none',
    fontWeight: typography.fontWeight.medium,
    fontSize: typography.fontSize.base,
    transition: 'all 0.2s ease',
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: borderRadius.md,
    position: 'relative',
  };

  const userMenuStyles = {
    position: 'relative',
  };

  const avatarStyles = {
    width: '44px',
    height: '44px',
    borderRadius: borderRadius.full,
    background: colors.gradients.secondary,
    color: colors.text.inverse,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.fontWeight.bold,
    cursor: 'pointer',
    fontSize: typography.fontSize.sm,
    boxShadow: shadows.md,
    transition: 'all 0.3s ease',
  };

  const dropdownStyles = {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    background: colors.background.paper,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.xl,
    minWidth: '220px',
    padding: spacing[2],
    zIndex: zIndex.dropdown,
    opacity: userMenuOpen ? 1 : 0,
    visibility: userMenuOpen ? 'visible' : 'hidden',
    transform: userMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.2s ease',
    border: `1px solid ${colors.border}`,
  };

  const dropdownItemStyles = {
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    textDecoration: 'none',
    display: 'block',
  };

  return (
    <nav style={navbarStyles}>
      <div style={containerStyles}>
        {/* Logo */}
        <Link to="/" style={logoStyles}>
          {logo && <img src={logo} alt="CAHCET" style={{ width: 32, height: 32, borderRadius: borderRadius.full }} />}
          <span>CAHCET</span>
        </Link>

        {/* Nav Links */}
        {!isMobileMenuOpen && (
          <ul style={navLinksStyles}>
            <li><Link to="/" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.main} onMouseLeave={(e) => e.target.style.color = navbarBgTransparent ? '#1f2937' : 'white'}>Home</Link></li>
            {token && (
              <>
                <li><Link to="/dashboard" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.main} onMouseLeave={(e) => e.target.style.color = navbarBgTransparent ? '#1f2937' : 'white'}>Dashboard</Link></li>
                <li><Link to="/alumni-directory" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.main} onMouseLeave={(e) => e.target.style.color = navbarBgTransparent ? '#1f2937' : 'white'}>Alumni</Link></li>
                <li><Link to="/events" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.main} onMouseLeave={(e) => e.target.style.color = navbarBgTransparent ? '#1f2937' : 'white'}>Events</Link></li>
                <li><Link to="/jobs" style={linkStyles} onMouseEnter={(e) => e.target.style.color = colors.secondary.main} onMouseLeave={(e) => e.target.style.color = navbarBgTransparent ? '#1f2937' : 'white'}>Jobs</Link></li>
              </>
            )}
          </ul>
        )}

        {/* Auth Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
          {!token ? (
            <>
              <Link to="/login" style={{ ...linkStyles, color: navbarBgTransparent ? '#1f2937' : 'white' }}>Login</Link>
              <Button variant="secondary" size="sm" onClick={() => navigate('/register')}>Sign Up</Button>
            </>
          ) : (
            <div style={userMenuStyles}>
              <div
                style={avatarStyles}
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <div
                style={dropdownStyles}
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <div style={{ padding: spacing[2], borderBottom: `1px solid ${colors.border}`, marginBottom: spacing[2] }}>
                  <p style={{ margin: 0, fontWeight: 600, color: colors.text.primary }}>{userName}</p>
                  <p style={{ margin: 0, fontSize: typography.fontSize.xs, color: colors.text.secondary }}>{role}</p>
                </div>
                <Link to="/profile" style={{ ...dropdownItemStyles, display: 'block' }} onMouseEnter={(e) => e.target.style.background = colors.primary[50]} onMouseLeave={(e) => e.target.style.background = 'transparent'}>👤 Profile</Link>
                <div style={{ ...dropdownItemStyles, display: 'block', borderTop: `1px solid ${colors.border}`, marginTop: spacing[2], paddingTop: spacing[2] }} onClick={handleLogout} onMouseEnter={(e) => e.target.style.background = colors.error.bg} onMouseLeave={(e) => e.target.style.background = 'transparent'}>🚪 Logout</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
