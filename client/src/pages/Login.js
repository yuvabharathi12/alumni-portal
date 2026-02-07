import { useState } from "react";
import "../styles/global.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";
import logo from "../assets/logo.png";

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
    <div style={{ minHeight: '100vh', background: "transparent", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', gap: 0, alignItems: 'stretch', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        {/* Left image section */}
        <div style={{ flex: 1, backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 40, position: 'relative' }} className="auth-visual">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(45,157,106,0.85) 0%, rgba(52,211,153,0.75) 100%)', zIndex: 1 }}></div>
          <div style={{ position: 'relative', zIndex: 2, color: colors.white }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0' }}>Welcome Back</h2>
            <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.95)', fontSize: 15, lineHeight: 1.6 }}>Access the alumni network, explore career opportunities, and stay connected with your community.</p>
          </div>
        </div>

        {/* Right form card */}
        <div style={{ flex: '0 0 480px', background: colors.white, padding: 32 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 70, height: 70, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <img src={logo} alt="CAHCET Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h2 style={{ margin: '12px 0 4px 0', color: colors.heading, fontSize: 26, fontWeight: 700 }}>CAHCET</h2>
            <p style={{ margin: '8px 0 0 0', color: colors.primary, fontSize: 16, fontWeight: 600 }}>Alumni Portal</p>
            <p style={{ margin: '8px 0 0 0', color: colors.textSecondary, fontSize: 14 }}>Sign in to your account</p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Email</label>
            <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress} style={{ ...styles.input, outline: 'none' }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />

            <label style={{ display: 'block', marginBottom: 6, marginTop: 12, color: colors.text, fontSize: 14, fontWeight: 500 }}>Password</label>
            <input type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} style={{ ...styles.input, outline: 'none' }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />

            <Button onClick={handleLogin} disabled={loading} fullWidth size="lg" style={{ marginTop: 12 }}>{loading ? 'Signing in...' : 'Sign In'}</Button>

            {message && (<div style={{ marginTop: 14, padding: 12, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8, color: '#856404', fontSize: 14 }}>{message}</div>)}

            <div style={{ marginTop: 18, textAlign: 'center', fontSize: 14, color: colors.textLight }}>Don't have an account? <Link to="/register" style={{ color: colors.primary, textDecoration: 'none', fontWeight: 600 }}>Register</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;