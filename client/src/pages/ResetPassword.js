import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/api";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";
import logo from "../assets/logo.png"; // Import the logo

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setIsError(true);
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, password);
      setMessage(response.data.message);
      setIsError(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  // --- Styling constants (copied from Login.js) ---
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

  const messageStyle = {
    marginTop: 14,
    padding: 12,
    background: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: 8,
    color: '#856404',
    fontSize: 14
  };

  const backToLoginLinkStyle = {
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
  // --- End Styling constants ---

  return (
    <div style={containerStyle}>
      <div style={cardContainerStyle}>
        {/* Left image section */}
        <div style={imageStyle}>
          <div style={overlayStyle}></div>
          <div style={imageContentStyle}>
            <h2 style={imageHeadingStyle}>Set New Password</h2>
            <p style={imageTextStyle}>
              Enter and confirm your new password to regain access to your account.
            </p>
          </div>
        </div>

        {/* Right form container */}
        <div style={formContainerStyle}>
          <div style={headerStyle}>
            <div style={logoContainerStyle}>
              <img src={logo} alt="CAHCET Logo" style={logoStyle} />
            </div>
            <h2 style={titleStyle}>CAHCET</h2>
            <p style={subtitleStyle}>Alumni Portal</p>
            <p style={descriptionStyle}>Enter your new password below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyleWithResponsive}
              onFocus={(e) => (e.target.style.borderColor = colors.primary)}
              onBlur={(e) => (e.target.style.borderColor = colors.border)}
            />
            <label style={{ ...labelStyle, marginTop: 12 }}>Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={inputStyleWithResponsive}
              onFocus={(e) => (e.target.style.borderColor = colors.primary)}
              onBlur={(e) => (e.target.style.borderColor = colors.border)}
            />

            <Button type="submit" disabled={loading} fullWidth size="lg" style={{ marginTop: 20 }}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          {message && (
            <div style={messageStyle}>
              {message}
            </div>
          )}

          <div style={backToLoginLinkStyle}>
            Back to{' '}
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
