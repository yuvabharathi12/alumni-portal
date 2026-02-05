import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";


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

  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[4],
  };

  const cardStyles = {
    width: "100%",
    maxWidth: "480px",
    background: colors.background.paper,
    padding: spacing[10],
    borderRadius: borderRadius.xl,
    boxShadow: shadows.xl,
    border: `1px solid ${colors.border}`,
  };

  const inputStyles = {
    width: "100%",
    padding: `${spacing[3]} ${spacing[4]}`,
    border: `2px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.body,
    transition: "all 0.3s ease",
    marginBottom: spacing[4],
  };

  const labelStyles = {
    display: "block",
    marginBottom: spacing[2],
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        {/* Header */}
        <div style={{ marginBottom: spacing[8], textAlign: "center" }}>
          <h2 style={{ margin: 0, color: '#1e3a8a', marginBottom: spacing[2] }}>
            Welcome Back! 👋
          </h2>
          <p style={{ margin: 0, color: '#374151' }}>
            Sign in to your CAHCET Alumni account
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              padding: spacing[3],
              background: message.includes("success")
                ? colors.success.bg
                : colors.error.bg,
              color: message.includes("success")
                ? colors.success.dark
                : colors.error.dark,
              borderRadius: borderRadius.md,
              marginBottom: spacing[4],
              fontSize: typography.fontSize.sm,
            }}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <div>
          <label style={labelStyles}>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = '#1e3a8a';
              e.target.style.boxShadow = `0 0 0 3px #e0e7ff`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.boxShadow = "none";
            }}
          />

          <label style={labelStyles}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleLogin()}
            style={inputStyles}
            onFocus={(e) => {
              e.target.style.borderColor = '#1e3a8a';
              e.target.style.boxShadow = `0 0 0 3px #e0e7ff`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = colors.border;
              e.target.style.boxShadow = "none";
            }}
          />

<button
  onClick={handleLogin}
  disabled={loading}
  style={{
    width: "100%",
    padding: `${spacing[3]} ${spacing[4]}`,
    background: "#1e3a8a",
    color: "#fff",
    border: "none",
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontWeight: 600,
    cursor: loading ? "not-allowed" : "pointer",
    marginBottom: spacing[4],
  }}
>
  {loading ? "Signing in..." : "Login"}
</button>


          <div style={{ textAlign: "center", paddingTop: spacing[4], borderTop: `1px solid ${colors.border}` }}>
            <p style={{ color: '#374151', fontSize: typography.fontSize.sm, margin: `${spacing[2]} 0` }}>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: '#1e3a8a',
                  fontWeight: typography.fontWeight.semibold,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
