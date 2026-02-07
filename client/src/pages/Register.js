import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";
import logo from "../assets/logo.png";

function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("alumni");
  const [phone, setPhone] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [department, setDepartment] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!name.trim()) return setMessage("Please enter your full name");
      if (!email.trim()) return setMessage("Please enter your email");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return setMessage("Please enter a valid email");
    }
    if (currentStep === 2) {
      if (!phone.trim()) return setMessage("Please enter your phone number");
      if (!graduationYear) return setMessage("Please select your graduation year");
      if (!department.trim()) return setMessage("Please select your department");
    }
    setMessage("");
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setMessage("");
    setCurrentStep(currentStep - 1);
  };

  const handleRegister = async () => {
    if (!password.trim()) return setMessage("Please enter your password");
    if (password.length < 6)
      return setMessage("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return setMessage("Passwords do not match");

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role,
          phone,
          graduationYear,
          department,
          city,
          bio,
        }
      );
      setMessage(res.data.message);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 60 }, (_, i) => currentYear - i);
  const departments = [
    "Computer Science",
    "Electronics and communication",
    "AI/DS",
    "Information Technology",
    "Mechanical",
    "AI/ML",
    "Civil",
    "EEE",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div className="auth-container">
        {/* Left image section */}
        <div
          className="auth-visual"
          style={{
            flex: 1,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 40,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(45,157,106,0.85) 0%, rgba(52,211,153,0.75) 100%)",
              zIndex: 1,
            }}
          />
          <div style={{ position: "relative", zIndex: 2, color: colors.white }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
              Join Our Community
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>
              Create your profile, connect with alumni, discover opportunities,
              and build lasting relationships.
            </p>
          </div>
        </div>

        {/* Right form card */}
        <div className="auth-form">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                width: 70,
                height: 70,
                margin: "0 auto 12px",
              }}
            >
              <img
                src={logo}
                alt="CAHCET Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <h2
              style={{
                margin: "12px 0 4px",
                color: colors.heading,
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              CAHCET
            </h2>
            <p
              style={{
                margin: "8px 0 0",
                color: colors.primary,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              Alumni Portal
            </p>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ flex: 1 }}>
                <div
                  style={{
                    height: 6,
                    background:
                      currentStep >= step ? colors.primary : colors.border,
                    borderRadius: 3,
                  }}
                />
                <p
                  style={{
                    textAlign: "center",
                    marginTop: 6,
                    fontSize: 11,
                    color:
                      currentStep >= step
                        ? colors.primary
                        : colors.textSecondary,
                  }}
                >
                  Step {step}
                </p>
              </div>
            ))}
          </div>

          {/* Steps */}
          {currentStep === 1 && (
            <>
              <label>I am a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.input}
              >
                <option value="alumni">Alumni</option>
                <option value="student">Current Student</option>
              </select>

              <label>Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <label>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={styles.input}
              />

              <label>Graduation year</label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                style={styles.input}
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>

              <label>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={styles.input}
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </>
          )}

          {currentStep === 3 && (
            <>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />

              <label>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
              />
            </>
          )}

          {message && (
            <div
              style={{
                marginTop: 14,
                padding: 12,
                background: success ? "#d4edda" : "#fff3cd",
                borderRadius: 8,
                marginBottom: 14,
              }}
            >
              {message}
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            {currentStep > 1 && (
              <Button onClick={handlePrevStep} fullWidth variant="outline">
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={handleNextStep} fullWidth>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                disabled={loading}
                fullWidth
              >
                {loading ? "Creating..." : "Create Account"}
              </Button>
            )}
          </div>

          <div style={{ marginTop: 18, textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
