import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";
import Badge from "../components/Badge";
import logo from "../assets/logo.png";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "alumni",
    graduationYear: "",
    department: "",
    currentCompany: "",
    linkedin: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    background: colors.background.default,
  };

  const leftPanelStyles = {
    flex: 1,
    background: colors.gradients.secondary,
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
    overflowY: 'auto',
  };

  const formCardStyles = {
    width: '100%',
    maxWidth: '520px',
    background: colors.background.paper,
    padding: spacing[10],
    borderRadius: borderRadius.xl,
    boxShadow: shadows.xl,
    margin: `${spacing[8]} 0`,
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

  const progressSteps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Profile" },
    { number: 3, label: "Complete" },
  ];

  return (
    <div style={containerStyles}>
      {/* Left Panel */}
      <div style={leftPanelStyles} className="hide-on-mobile">
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
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing[4],
            }}
          >
            Join the CAHCET Alumni Network
          </h1>
          
          <p style={{ fontSize: typography.fontSize.lg, opacity: 0.9, lineHeight: typography.lineHeight.relaxed }}>
            Connect with fellow alumni, access exclusive job opportunities, and stay engaged with your alma mater
          </p>

          <div style={{ marginTop: spacing[12], textAlign: 'left' }}>
            <div style={{ marginBottom: spacing[4], display: 'flex', alignItems: 'center', gap: spacing[3] }}>
              <div style={{ fontSize: '2rem' }}>✓</div>
              <div>
                <div style={{ fontWeight: typography.fontWeight.semibold }}>Network with 5000+ Alumni</div>
                <div style={{ fontSize: typography.fontSize.sm, opacity: 0.8 }}>Build valuable connections</div>
              </div>
            </div>
            <div style={{ marginBottom: spacing[4], display: 'flex', alignItems: 'center', gap: spacing[3] }}>
              <div style={{ fontSize: '2rem' }}>✓</div>
              <div>
                <div style={{ fontWeight: typography.fontWeight.semibold }}>Exclusive Job Opportunities</div>
                <div style={{ fontSize: typography.fontSize.sm, opacity: 0.8 }}>Posted by alumni & partners</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
              <div style={{ fontSize: '2rem' }}>✓</div>
              <div>
                <div style={{ fontWeight: typography.fontWeight.semibold }}>Attend Alumni Events</div>
                <div style={{ fontSize: typography.fontSize.sm, opacity: 0.8 }}>Networking & reunions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Registration Form */}
      <div style={rightPanelStyles}>
        <div style={formCardStyles}>
          {/* Progress Indicator */}
          <div style={{ marginBottom: spacing[8] }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[6] }}>
              {progressSteps.map((s) => (
                <div key={s.number} style={{ flex: 1, textAlign: 'center' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: borderRadius.full,
                      background: step >= s.number ? colors.primary.main : colors.neutral[200],
                      color: step >= s.number ? colors.text.inverse : colors.text.secondary,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: typography.fontWeight.bold,
                      marginBottom: spacing[2],
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {s.number}
                  </div>
                  <div style={{ fontSize: typography.fontSize.xs, color: colors.text.secondary }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <h2
              style={{
                fontFamily: typography.fontFamily.heading,
                fontSize: typography.fontSize['3xl'],
                fontWeight: typography.fontWeight.bold,
                color: colors.text.primary,
                marginBottom: spacing[2],
              }}
            >
              Create Your Account
            </h2>
            <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.base }}>
              {step === 1 && "Let's start with your basic information"}
              {step === 2 && "Tell us more about your professional background"}
              {step === 3 && "Review and complete your registration"}
            </p>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: spacing[5] }}>
                <label style={labelStyles}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
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

              <div style={{ marginBottom: spacing[5] }}>
                <label style={labelStyles}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
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

              <div style={{ marginBottom: spacing[5] }}>
                <label style={labelStyles}>Password *</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
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
                <div style={{ fontSize: typography.fontSize.xs, color: colors.text.secondary }}>
                  At least 8 characters with numbers and letters
                </div>
              </div>

              <div style={{ marginBottom: spacing[6] }}>
                <label style={labelStyles}>I am a *</label>
                <div style={{ display: 'flex', gap: spacing[3] }}>
                  <label
                    style={{
                      flex: 1,
                      padding: spacing[4],
                      border: `2px solid ${formData.role === 'alumni' ? colors.primary.main : colors.border}`,
                      borderRadius: borderRadius.md,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: formData.role === 'alumni' ? colors.primary[50] : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="alumni"
                      checked={formData.role === 'alumni'}
                      onChange={handleChange}
                      style={{ marginRight: spacing[2] }}
                    />
                    Alumni
                  </label>
                  <label
                    style={{
                      flex: 1,
                      padding: spacing[4],
                      border: `2px solid ${formData.role === 'student' ? colors.primary.main : colors.border}`,
                      borderRadius: borderRadius.md,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      background: formData.role === 'student' ? colors.primary[50] : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={formData.role === 'student'}
                      onChange={handleChange}
                      style={{ marginRight: spacing[2] }}
                    />
                    Student
                  </label>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => setStep(2)}
              >
                Continue →
              </Button>
            </div>
          )}

          {/* Step 2: Profile Info */}
          {step === 2 && (
            <div>
              <div style={{ marginBottom: spacing[5] }}>
                <label style={labelStyles}>Graduation Year *</label>
                <input
                  type="number"
                  name="graduationYear"
                  placeholder="2020"
                  value={formData.graduationYear}
                  onChange={handleChange}
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

              <div style={{ marginBottom: spacing[5] }}>
                <label style={labelStyles}>Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  style={inputStyles}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                  <option value="EEE">Electrical</option>
                  <option value="IT">Information Technology</option>
                </select>
              </div>

              {formData.role === 'alumni' && (
                <>
                  <div style={{ marginBottom: spacing[5] }}>
                    <label style={labelStyles}>Current Company</label>
                    <input
                      type="text"
                      name="currentCompany"
                      placeholder="Google, Microsoft, etc."
                      value={formData.currentCompany}
                      onChange={handleChange}
                      style={inputStyles}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.primary.main;
                        e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = colors.border;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: spacing[6] }}>
                    <label style={labelStyles}>LinkedIn Profile</label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedin}
                      onChange={handleChange}
                      style={inputStyles}
                      onFocus={(e) => {
                        e.target.style.borderColor = colors.primary.main;
                        e.target.style.boxShadow = `0 0 0 3px ${colors.primary[100]}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = colors.border;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: spacing[3] }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(1)}
                  style={{ flex: 1 }}
                >
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(3)}
                  style={{ flex: 1 }}
                >
                  Continue →
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {step === 3 && (
            <div>
              <div
                style={{
                  background: colors.neutral[50],
                  padding: spacing[6],
                  borderRadius: borderRadius.lg,
                  marginBottom: spacing[6],
                }}
              >
                <h4 style={{ marginBottom: spacing[4], color: colors.text.primary }}>
                  Review Your Information
                </h4>
                <div style={{ fontSize: typography.fontSize.sm, lineHeight: '2' }}>
                  <div><strong>Name:</strong> {formData.name}</div>
                  <div><strong>Email:</strong> {formData.email}</div>
                  <div><strong>Role:</strong> <Badge variant="primary">{formData.role}</Badge></div>
                  <div><strong>Graduation Year:</strong> {formData.graduationYear}</div>
                  <div><strong>Department:</strong> {formData.department}</div>
                  {formData.currentCompany && <div><strong>Company:</strong> {formData.currentCompany}</div>}
                </div>
              </div>

              {message && (
                <div
                  style={{
                    marginBottom: spacing[6],
                    padding: spacing[4],
                    background: message.includes('successful') ? colors.success.bg : colors.error.bg,
                    border: `1px solid ${message.includes('successful') ? colors.success.main : colors.error.main}`,
                    borderRadius: borderRadius.md,
                    color: message.includes('successful') ? colors.success.dark : colors.error.dark,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {message}
                </div>
              )}

              <div style={{ display: 'flex', gap: spacing[3] }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setStep(2)}
                  style={{ flex: 1 }}
                >
                  ← Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  {loading ? "Registering..." : "Complete Registration"}
                </Button>
              </div>
            </div>
          )}

          {/* Login Link */}
          <div style={{ textAlign: 'center', marginTop: spacing[8] }}>
            <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.base, margin: 0 }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: colors.primary.main,
                  textDecoration: 'none',
                  fontWeight: typography.fontWeight.semibold,
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Sign In
              </Link>
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: spacing[4] }}>
            <Link
              to="/"
              style={{
                color: colors.text.secondary,
                fontSize: typography.fontSize.sm,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.target.style.color = colors.primary.main}
              onMouseLeave={(e) => e.target.style.color = colors.text.secondary}
            >
              ← Back to Home
            </Link>
          </div>
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

export default Register;
