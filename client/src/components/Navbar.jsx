import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.wrapper}>
          {/* Logo */}
          <Link to="/" className={styles.logoSection} title="Home">
            <div className={styles.logo}>
              <img src={logo} alt="CAHCET Logo" />
            </div>
            <h1 className={styles.logoText}>CAHCET</h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className={styles.navLinks}>
            <NavLink to="/" label="Home" />
            <NavLink to="/events" label="Events" />
            <NavLink to="/jobs" label="Jobs" />
            <NavLink to="/alumni/directory" label="Alumni" />
            {isLoggedIn && <NavLink to="/dashboard" label="Dashboard" />}
          </div>

          {/* Desktop CTA Section */}
          <div className={styles.ctaSection}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="secondary" size="sm">Sign In</Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button variant="secondary" size="sm">Register</Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} variant="secondary" size="sm">Logout</Button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <NavLink to="/" label="Home" mobile />
          <NavLink to="/events" label="Events" mobile />
          <NavLink to="/jobs" label="Jobs" mobile />
          <NavLink to="/alumni/directory" label="Alumni" mobile />
          {isLoggedIn && <NavLink to="/dashboard" label="Dashboard" mobile />}

          <div className={styles.mobileDivider}>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className={styles.mobileCtaLink}>
                  <Button variant="secondary" size="sm" fullWidth>Sign In</Button>
                </Link>
                <Link to="/register" className={styles.mobileCtaLink}>
                  <Button variant="secondary" size="sm" fullWidth>Register</Button>
                </Link>
              </>
            ) : (
              <Button onClick={handleLogout} variant="secondary" size="sm" fullWidth>Logout</Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, label, mobile }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  const linkClass = mobile
    ? `${styles.navLinkMobile} ${isActive ? styles.navLinkMobileActive : ''}`
    : `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;

  return (
    <Link to={to} className={linkClass}>
      {label}
    </Link>
  );
}

export default Navbar;
