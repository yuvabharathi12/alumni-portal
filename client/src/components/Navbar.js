import { useNavigate, Link } from "react-router-dom";
import { colors } from "../styles/theme";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navLink = {
    color: colors.white,
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "14px",
  };

  const buttonStyle = {
    background: colors.white,
    color: colors.primary,
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  };

  return (
    <nav
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        color: colors.white,
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={logo}
            alt="CAHCET Logo"
            style={{
              width: "55px",
              height: "55px",
              background: colors.white,
              borderRadius: "6px",
              padding: "4px",
            }}
          />

          <h3 style={{ margin: 0 }}>CAHCET Alumni Portal</h3>
        </div>

        {/* Right side links */}
        <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
          {/* Home */}
          <Link to="/" style={navLink}>
            Home
          </Link>

          {/* Dashboard (ONLY when logged in) */}
          {isLoggedIn && (
            <Link to="/dashboard" style={navLink}>
              Dashboard
            </Link>
          )}

          {/* Login / Logout */}
          {!isLoggedIn ? (
            <Link to="/login" style={buttonStyle}>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
