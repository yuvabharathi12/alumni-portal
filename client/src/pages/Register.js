import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";

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
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("❌ " + (error.response?.data?.message || "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    minHeight: "100vh",
    display: "flex",
    background: `linear-gradient(135deg, ${colors.secondary[50]} 0%, ${colors.primary[50]} 100%)`,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing[4],
  };

  const cardStyles = {
    width: "100%",
    maxWidth: "520px",
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

  const progressSteps = [
    { number: 1, label: "Account" },
    { number: 2, label: "Profile" },
    { number: 3, label: "Complete" },
  ];

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        {/* Header */}
        <div style={{ marginBottom: spacing[8], textAlign: "center" }}>
          <h2 style={{ margin: 0, color: '#c2410c', marginBottom: spacing[2] }}>
            Join CAHCET Alumni 🎓
          </h2>
          <p style={{ margin: 0, color: '#374151' }}>
            Create your account and connect with alumni worldwide
          </p>
        </div>

        {/* Progress Indicator */}
        <div style={{ marginBottom: spacing[8] }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: spacing[4] }}>
            {progressSteps.map((s) => (
              <div key={s.number} style={{ flex: 1, textAlign: "center" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: borderRadius.full,
                    background: step >= s.number ? colors.secondary.main : colors.neutral[200],
                    color: step >= s.number ? colors.text.inverse : '#9ca3af',
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: typography.fontWeight.bold,
                    marginBottom: spacing[2],
                  }}
                >
                  {step > s.number ? "✓" : s.number}
                </div>
                <div style={{ fontSize: typography.fontSize.xs, fontWeight: typography.fontWeight.semibold }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              height: "4px",
              background: colors.neutral[200],
              borderRadius: borderRadius.full,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: colors.gradients.secondary,
                width: `${(step / 3) * 100}%`,
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            style={{
              padding: spacing[3],
              background: message.includes("✅") ? colors.success.bg : colors.error.bg,
              color: message.includes("✅") ? colors.success.dark : colors.error.dark,
              borderRadius: borderRadius.md,
              marginBottom: spacing[4],
              fontSize: typography.fontSize.sm,
            }}
          >
            {message}
          </div>
        )}

        {/* Form */}
        {step === 1 && (
          <div>
            <label style={labelStyles}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              style={inputStyles}
            />

            <label style={labelStyles}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={inputStyles}
            />

            <label style={labelStyles}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={inputStyles}
            />

            <Button
              fullWidth
              size="lg"
              variant="primary"
              onClick={() => setStep(2)}
            >
              Continue to Profile
            </Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={labelStyles}>Graduation Year</label>
            <input
              type="number"
              name="graduationYear"
              placeholder="2020"
              value={formData.graduationYear}
              onChange={handleChange}
              style={inputStyles}
            />

            <label style={labelStyles}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={inputStyles}
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics">Electronics</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>

            <label style={labelStyles}>Current Company (Optional)</label>
            <input
              type="text"
              name="currentCompany"
              placeholder="Company Name"
              value={formData.currentCompany}
              onChange={handleChange}
              style={inputStyles}
            />

            <div style={{ display: "flex", gap: spacing[4] }}>
              <Button
                fullWidth
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="primary"
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label style={labelStyles}>LinkedIn Profile (Optional)</label>
            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/in/yourprofile"
              value={formData.linkedin}
              onChange={handleChange}
              style={inputStyles}
            />

            <div
              style={{
                padding: spacing[4],
                background: colors.primary[50],
                borderRadius: borderRadius.md,
                marginBottom: spacing[4],
              }}
            >
              <p style={{ margin: 0, fontSize: typography.fontSize.sm, color: '#374151' }}>
                ✓ Name: <strong>{formData.name}</strong><br/>
                ✓ Year: <strong>{formData.graduationYear}</strong><br/>
                ✓ Dept: <strong>{formData.department}</strong>
              </p>
            </div>

            <div style={{ display: "flex", gap: spacing[4] }}>
              <Button
                fullWidth
                size="lg"
                variant="outline"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>

            <div style={{ textAlign: "center", paddingTop: spacing[4], borderTop: `1px solid ${colors.border}` }}>
              <p style={{ color: '#374151', fontSize: typography.fontSize.sm, margin: spacing[2] }}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: '#1e3a8a', fontWeight: typography.fontWeight.semibold }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
