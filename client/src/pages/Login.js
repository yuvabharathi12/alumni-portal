import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
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

  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    background: colors.background.default,
  };

  const leftPanelStyles = {
    flex: 1,
    background: colors.gradients.primary,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[12],
    color: colors.text.inverse,
    position: 'relative',
    overflow: 'hidden',
  };

  const rightPanelStyles = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[8],
  };

  const formCardStyles = {
    width: '100%',
    maxWidth: '480px',
    background: colors.background.paper,
    padding: spacing[10],
    borderRadius: borderRadius.xl,
    boxShadow: shadows.xl,
  };

  const inputStyles = {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    border: `2px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.body,
    transition: 'all 0.2s ease',
    marginBottom: spacing[4],
  };

  const labelStyles = {
    display: 'block',
    marginBottom: spacing[2],
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  };

  return (
    <div style={containerStyles}>
      {/* Left Panel - Branding */}
      <div style={leftPanelStyles} className="hide-on-mobile">
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: borderRadius.full,
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '400px',
            height: '400px',
            borderRadius: borderRadius.full,
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '500px' }}>
          <div
            style={{
              width: '100px',
              height: '100px',
              margin: '0 auto',
              marginBottom: spacing[6],
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: borderRadius.xl,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
          >
            <img
              src={logo}
              alt="CAHCET Alumni"
              style={{ width: 70, height: 70, borderRadius: borderRadius.full, objectFit: 'cover', boxShadow: shadows.sm }}
            />
          </div>

          <h1
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing[4],
              lineHeight: typography.lineHeight.tight,
            }}
          >
            CAHCET Alumni
          </h1>
          
          <p
            style={{
              fontSize: typography.fontSize.xl,
              opacity: 0.9,
              lineHeight: typography.lineHeight.relaxed,
              marginBottom: spacing[8],
            }}
          >
            Connect with 5000+ alumni, explore career opportunities, and build lasting professional relationships
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: spacing[8],
              marginTop: spacing[12],
            }}
          >
            <div>
              <div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold }}>
                5000+
              </div>
              <div style={{ fontSize: typography.fontSize.sm, opacity: 0.8 }}>Alumni</div>
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold }}>
                500+
              </div>
              <div style={{ fontSize: typography.fontSize.sm, opacity: 0.8 }}>Companies</div>
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold }}>
                95%
              </div>
              <div style={{ fontSize: typography.fontSize.sm, opacity: 0.8 }}>Placement</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div style={rightPanelStyles}>
        <div style={formCardStyles}>
          <div style={{ marginBottom: spacing[8] }}>
            <h2
              style={{
                fontFamily: typography.fontFamily.heading,
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                marginBottom: spacing[2],
              }}
            >
              Welcome Back
            </h2>
            <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.base }}>
              Sign in to access your alumni dashboard
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div style={{ marginBottom: spacing[5] }}>
              <label style={labelStyles}>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                style={inputStyles}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary.main;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div style={{ marginBottom: spacing[2] }}>
              <label style={labelStyles}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                style={inputStyles}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.primary.main;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: spacing[6] }}>
              <a
                href="#"
                style={{
                  color: colors.primary.main,
                  fontSize: typography.fontSize.sm,
                  textDecoration: 'none',
                  fontWeight: typography.fontWeight.medium,
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Forgot password?
              </a>
            </div>

            {message && (
              <div
                style={{
                  marginBottom: spacing[6],
                  padding: spacing[4],
                  background: colors.error.bg,
                  border: `1px solid ${colors.error.main}`,
                  borderRadius: borderRadius.md,
                  color: colors.error.dark,
                  fontSize: typography.fontSize.sm,
                }}
              >
                {message}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: `${spacing[6]} 0`,
              }}
            >
              <div style={{ flex: 1, height: '1px', background: colors.border }} />
              <span style={{ padding: `0 ${spacing[4]}`, color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
                OR
              </span>
              <div style={{ flex: 1, height: '1px', background: colors.border }} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.base, margin: 0 }}>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{
                    color: colors.primary.main,
                    textDecoration: 'none',
                    fontWeight: typography.fontWeight.semibold,
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: spacing[6] }}>
              <Link
                to="/"
                style={{
                  color: colors.text.secondary,
                  fontSize: typography.fontSize.sm,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing[2],
                }}
                onMouseEnter={(e) => e.target.style.color = colors.primary.main}
                onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Login;
