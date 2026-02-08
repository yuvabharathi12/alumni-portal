import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const containerStyle = {
    minHeight: "100vh",
    background: "transparent",
    display: "flex",
    alignItems: isMobile ? 'flex-start' : 'center',
    justifyContent: "center",
    padding: isMobile ? 0 : 20,
  };

  const authContainerStyle = {
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

  const visualStyle = {
    flex: isMobile ? '0 0 auto' : 1,
    backgroundImage: "url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: isMobile ? 'center' : 'flex-end',
    padding: isMobile ? '24px 20px' : 40,
    position: "relative",
    minHeight: isMobile ? '180px' : '200px'
  };

  const overlayStyle = {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(45,157,106,0.85) 0%, rgba(52,211,153,0.75) 100%)",
    zIndex: 1,
  };

  const visualContentStyle = {
    position: "relative",
    zIndex: 2,
    color: colors.white
  };

  const visualHeadingStyle = {
    fontSize: isMobile ? 22 : 28,
    fontWeight: 700,
    marginBottom: isMobile ? 12 : 16
  };

  const visualTextStyle = {
    fontSize: isMobile ? 14 : 15,
    lineHeight: 1.6
  };

  const formContainerStyle = {
    flex: isMobile ? 1 : '0 0 480px',
    background: colors.white,
    padding: isMobile ? '24px 20px' : 32
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: 24
  };

  const logoContainerStyle = {
    width: isMobile ? 60 : 70,
    height: isMobile ? 60 : 70,
    margin: "0 auto 12px",
  };

  const logoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  };

  const titleStyle = {
    margin: "12px 0 4px",
    color: colors.heading,
    fontSize: isMobile ? 22 : 26,
    fontWeight: 700,
  };

  const subtitleStyle = {
    margin: "8px 0 0",
    color: colors.primary,
    fontSize: isMobile ? 14 : 16,
    fontWeight: 600,
  };

  const progressContainerStyle = {
    display: "flex",
    gap: 8,
    marginBottom: 28
  };

  const progressStepStyle = {
    flex: 1
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 6,
    marginTop: 12,
    color: colors.text,
    fontSize: 14,
    fontWeight: 500
  };

  const inputStyleWithResponsive = {
    ...styles.input,
    fontSize: isMobile ? 16 : 14,
    padding: isMobile ? '12px' : styles.input.padding
  };

  const messageStyle = {
    marginTop: 14,
    padding: 12,
    background: success ? "#d4edda" : "#fff3cd",
    borderRadius: 8,
    marginBottom: 14,
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: 12,
    marginTop: 16
  };

  const footerStyle = {
    marginTop: 18,
    textAlign: "center",
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
      <div style={authContainerStyle}>
        {/* Left image section */}
        <div style={visualStyle}>
          <div style={overlayStyle} />
          <div style={visualContentStyle}>
            <h2 style={visualHeadingStyle}>
              Join Our Community
            </h2>
            <p style={visualTextStyle}>
              Create your profile, connect with alumni, discover opportunities,
              and build lasting relationships.
            </p>
          </div>
        </div>

        {/* Right form card */}
        <div style={formContainerStyle}>
          <div style={headerStyle}>
            <div style={logoContainerStyle}>
              <img
                src={logo}
                alt="CAHCET Logo"
                style={logoStyle}
              />
            </div>
            <h2 style={titleStyle}>
              CAHCET
            </h2>
            <p style={subtitleStyle}>
              Alumni Portal
            </p>
          </div>

          {/* Progress Indicator */}
          <div style={progressContainerStyle}>
            {[1, 2, 3].map((step) => (
              <div key={step} style={progressStepStyle}>
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
              <label style={labelStyle}>I am a</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyleWithResponsive}
              >
                <option value="alumni">Alumni</option>
                <option value="student">Current Student</option>
              </select>

              <label style={labelStyle}>Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyleWithResponsive}
              />

              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyleWithResponsive}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <label style={labelStyle}>Phone number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={inputStyleWithResponsive}
              />

              <label style={labelStyle}>Graduation year</label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                style={inputStyleWithResponsive}
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>

              <label style={labelStyle}>Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={inputStyleWithResponsive}
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
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyleWithResponsive}
              />

              <label style={labelStyle}>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyleWithResponsive}
              />
            </>
          )}

          {message && (
            <div style={messageStyle}>
              {message}
            </div>
          )}

          {/* Buttons */}
          <div style={buttonContainerStyle}>
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

          <div style={footerStyle}>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;