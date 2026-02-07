import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/global.css";
import { colors } from "../styles/theme";
import logo from "../assets/logo.png";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Handle window resize to show/hide hamburger menu
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navStyles = {
    container: {
      background: colors.primary || "#166534",
      color: colors.white,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 4px 16px rgba(22, 101, 52, 0.15)",
      borderBottom: "none",
    },
    wrapper: {
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "0 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "70px",
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      textDecoration: "none",
      cursor: "pointer",
      minWidth: "fit-content",
    },
    logo: {
      width: "48px",
      height: "48px",
      background: colors.primary,
      borderRadius: "8px",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logoText: {
      margin: 0,
      fontSize: "18px",
      fontWeight: "700",
      color: colors.white,
      letterSpacing: "-0.5px",
    },
    navLinks: {
      desktop: {
        display: "flex",
        gap: "32px",
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
      },
      mobile: {
        display: "none",
      },
    },
    navLink: {
      color: colors.white,
      textDecoration: "none",
      fontWeight: "500",
      fontSize: "15px",
      padding: "8px 0",
      borderBottom: "2px solid transparent",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    navLinkHover: {
      color: colors.primaryLight,
      borderBottomColor: colors.primaryLight,
    },
    ctaSection: {
      desktop: {
        display: "flex",
        gap: "12px",
        alignItems: "center",
      },
      mobile: {
        display: "none",
      },
    },
    hamburger: {
      display: "none",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "8px",
      fontSize: "24px",
      color: colors.white,
      transition: "color 0.3s ease",
    },
    mobileMenu: {
      position: "absolute",
      top: "70px",
      left: 0,
      right: 0,
      background: colors.white,
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      display: mobileMenuOpen ? "flex" : "none",
      flexDirection: "column",
      padding: "20px",
      gap: "12px",
    },
  };

  return (
    <>
      <nav style={navStyles.container}>
        <div style={navStyles.wrapper}>
          {/* Logo */}
          <Link to="/" style={navStyles.logoSection} title="Home">
            <div style={navStyles.logo}>
              <img src={logo} alt="CAHCET Logo" style={{ width: "100%", height: "100%" }} />
            </div>
            <h1 style={navStyles.logoText}>CAHCET</h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={navStyles.navLinks.desktop}>
            <NavLink to="/" label="Home" />
            <NavLink to="/events" label="Events" />
            <NavLink to="/jobs" label="Jobs" />
            <NavLink to="/alumni/directory" label="Alumni" />
            {isLoggedIn && <NavLink to="/dashboard" label="Dashboard" />}
          </div>

          {/* Desktop CTA Section */}
          <div style={navStyles.ctaSection.desktop}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="secondary" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button variant="secondary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            style={{
              ...navStyles.hamburger,
              display: isMobile ? "block" : "none",
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={navStyles.mobileMenu}>
          <NavLink to="/" label="Home" mobile />
          <NavLink to="/events" label="Events" mobile />
          <NavLink to="/jobs" label="Jobs" mobile />
          <NavLink to="/alumni/directory" label="Alumni" mobile />
          {isLoggedIn && <NavLink to="/dashboard" label="Dashboard" mobile />}
          
          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: "12px", marginTop: "12px" }}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" style={{ textDecoration: "none", display: "block", marginBottom: "8px" }}>
                  <Button variant="secondary" size="sm" style={{ width: "100%" }}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button variant="secondary" size="sm" style={{ width: "100%" }}>
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} variant="secondary" size="sm" style={{ width: "100%" }}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

/* ================= NAV LINK COMPONENT ================= */

function NavLink({ to, label, mobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  const linkStyle = {
    color: isActive ? colors.primaryLight : colors.white,
    textDecoration: "none",
    fontWeight: isActive ? "700" : "500",
    fontSize: mobile ? "16px" : "15px",
    padding: mobile ? "12px 0" : "8px 0",
    borderBottom: isActive ? `2px solid ${colors.primaryLight}` : "2px solid transparent",
    transition: "all 0.3s ease",
    display: "block",
    cursor: "pointer",
  };

  return (
    <Link
      to={to}
      style={{
        ...linkStyle,
        ...(isHovered && !isActive && {
          color: colors.primaryLight,
          borderBottomColor: colors.primaryLight,
        }),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </Link>
  );
}

export default Navbar;

