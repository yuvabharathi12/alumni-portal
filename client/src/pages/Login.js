import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const containerStyle = {
    minHeight: '100vh',
    background: "transparent",
    display: 'flex',
    alignItems: isMobile ? 'flex-start' : 'center',
    justifyContent: 'center',
    padding: isMobile ? 0 : 20
  };

  const cardContainerStyle = {
    width: '100%',
    maxWidth: isMobile ? '100%' : 1200,
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: 0,
    alignItems: 'stretch',
    borderRadius: isMobile ? 0 : 16,
    overflow: 'hidden',
    boxShadow: isMobile ? 'none' : '0 20px 60px rgba(0,0,0,0.15)',
    minHeight: isMobile ? '100vh' : 'auto'
  };

  const imageStyle = {
    flex: isMobile ? '0 0 auto' : 1,
    backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: isMobile ? 'center' : 'flex-end',
    padding: isMobile ? '24px 20px' : 40,
    position: 'relative',
    minHeight: isMobile ? '180px' : '200px'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(45,157,106,0.85) 0%, rgba(52,211,153,0.75) 100%)',
    zIndex: 1
  };

  const imageContentStyle = {
    position: 'relative',
    zIndex: 2,
    color: colors.white
  };

  const imageHeadingStyle = {
    fontSize: isMobile ? 22 : 28,
    fontWeight: 700,
    margin: isMobile ? '0 0 12px 0' : '0 0 16px 0'
  };

  const imageTextStyle = {
    marginTop: 0,
    color: 'rgba(255,255,255,0.95)',
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.6
  };

  const formContainerStyle = {
    flex: isMobile ? 1 : '0 0 480px',
    background: colors.white,
    padding: isMobile ? '24px 20px' : 32
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: 24
  };

  const logoContainerStyle = {
    width: isMobile ? 60 : 70,
    height: isMobile ? 60 : 70,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isMobile ? 10 : 12
  };

  const logoStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
  };

  const titleStyle = {
    margin: '12px 0 4px 0',
    color: colors.heading,
    fontSize: isMobile ? 22 : 26,
    fontWeight: 700
  };

  const subtitleStyle = {
    margin: '8px 0 0 0',
    color: colors.primary,
    fontSize: isMobile ? 14 : 16,
    fontWeight: 600
  };

  const descriptionStyle = {
    margin: '8px 0 0 0',
    color: colors.textSecondary,
    fontSize: isMobile ? 13 : 14
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 6,
    color: colors.text,
    fontSize: 14,
    fontWeight: 500
  };

  const inputStyleWithResponsive = {
    ...styles.input,
    outline: 'none',
    fontSize: isMobile ? 16 : 14,
    padding: isMobile ? '12px' : styles.input.padding
  };

  const buttonContainerStyle = {
    marginTop: 12
  };

  const messageStyle = {
    marginTop: 14,
    padding: 12,
    background: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: 8,
    color: '#856404',
    fontSize: 14
  };

  const registerLinkStyle = {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 14,
    color: colors.textLight
  };

  const linkStyle = {
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: 600
  };

  return (
    <div style={containerStyle}>
      <div style={cardContainerStyle}>
        <div style={imageStyle}>
          <div style={overlayStyle}></div>
          <div style={imageContentStyle}>
            <h2 style={imageHeadingStyle}>Welcome Back</h2>
            <p style={imageTextStyle}>
              Access the alumni network, explore career opportunities, and stay connected with your community.
            </p>
          </div>
        </div>

        <div style={formContainerStyle}>
          <div style={headerStyle}>
            <div style={logoContainerStyle}>
              <img src={logo} alt="CAHCET Logo" style={logoStyle} />
            </div>
            <h2 style={titleStyle}>CAHCET</h2>
            <p style={subtitleStyle}>Alumni Portal</p>
            <p style={descriptionStyle}>Sign in to your account</p>
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={inputStyleWithResponsive}
              onFocus={(e) => (e.target.style.borderColor = colors.primary)}
              onBlur={(e) => (e.target.style.borderColor = colors.border)}
            />

            <label style={{ ...labelStyle, marginTop: 12 }}>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={inputStyleWithResponsive}
              onFocus={(e) => (e.target.style.borderColor = colors.primary)}
              onBlur={(e) => (e.target.style.borderColor = colors.border)}
            />

            <Button
              onClick={handleLogin}
              disabled={loading}
              fullWidth
              size="lg"
              style={buttonContainerStyle}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            {message && (
              <div style={messageStyle}>
                {message}
              </div>
            )}

            <div style={registerLinkStyle}>
              Don't have an account?{' '}
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;