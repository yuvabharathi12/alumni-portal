import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { colors, styles } from "../styles/theme";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("alumni"); // Default to alumni
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
      });
      setMessage(res.data.message);
      setSuccess(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("alumni");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      setSuccess(false);
    } finally {
      setLoading(false);
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
            Join CAHCET Portal
          </h2>
          <p style={{ margin: 0, color: colors.textLight, fontSize: "14px" }}>
            Create your account
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
            I am a *
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              ...styles.input,
              outline: "none",
              cursor: "pointer",
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.primary)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          >
            <option value="alumni">Alumni</option>
            <option value="student">Current Student</option>
          </select>

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              color: colors.text,
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Email Address
          </label>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...styles.input,
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = colors.primary)}
            onBlur={(e) => (e.target.style.borderColor = colors.border)}
          />

          <button
            onClick={handleRegister}
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
            {loading ? "Registering..." : "Register"}
          </button>

          {message && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                background: success ? "#d4edda" : "#fff3cd",
                border: `1px solid ${success ? "#28a745" : "#ffc107"}`,
                borderRadius: "6px",
                color: success ? "#155724" : "#856404",
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
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: colors.primary,
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;