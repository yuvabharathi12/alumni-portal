import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors, styles } from "../styles/theme";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: colors.white,
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Logo/Header */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              background: colors.secondary,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "24px",
              color: colors.white,
              margin: "0 auto 16px",
            }}
          >
            CA
          </div>
          <h2 style={{ margin: "0 0 8px 0", color: colors.primary }}>
            Welcome Back
          </h2>
          <p style={{ margin: 0, color: colors.textLight, fontSize: "14px" }}>
            CAHCET Alumni Portal
          </p>
        </div>

        {/* Form */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              ...styles.input,
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.primary)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          />

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              ...styles.input,
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.primary)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...styles.button,
              width: "100%",
              background: loading ? colors.textLight : colors.primary,
              color: colors.white,
              marginTop: "8px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: "600",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.background = colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.background = colors.primary;
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                background: "#fff3cd",
                border: `1px solid #ffc107`,
                borderRadius: "6px",
                color: "#856404",
                fontSize: "14px",
              }}
            >
              {message}
            </div>
          )}

          <div
            style={{
              marginTop: "24px",
              textAlign: "center",
              fontSize: "14px",
              color: colors.textLight,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: colors.primary,
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;