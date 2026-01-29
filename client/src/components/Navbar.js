import { useNavigate } from "react-router-dom";
import { colors } from "../styles/theme";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
        color: colors.white,
        padding: "0",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
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
        {/* Logo + Title Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src={logo}
            alt="CAHCET Logo"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              borderRadius: "6px",
              background: colors.white,
              padding: "4px",
            }}
          />

          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
              CAHCET Alumni Portal
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                opacity: 0.9,
                fontWeight: "300",
              }}
            >
              C Abdul Hakeem College of Engineering & Technology
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            background: colors.danger,
            color: colors.white,
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#c82333";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = colors.danger;
            e.target.style.transform = "translateY(0)";
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
