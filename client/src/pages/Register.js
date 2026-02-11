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
  const [otp, setOtp] = useState("");
  const [emailVerifiedToken, setEmailVerifiedToken] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false); // Controls visibility of OTP input
  const [isEmailSent, setIsEmailSent] = useState(false); // Tracks if OTP has been sent
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Tracks if email has been verified
  const [isFormDisabled, setIsFormDisabled] = useState(true); // Disables form fields until email is verified
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
    setMessage("");
    // The "Next" button should only be active if email is verified for step 1
    if (currentStep === 1 && !isEmailVerified) {
      setMessage("Please verify your email address first.");
      setSuccess(false);
      return;
    }

    if (currentStep === 1) {
      if (!name.trim()) {
        setMessage("Please enter your full name");
        setSuccess(false);
        return;
      }
    }
    if (currentStep === 2) {
      if (!phone.trim()) {
        setMessage("Please enter your phone number");
        setSuccess(false);
        return;
      }
      if (!graduationYear) {
        setMessage("Please select your graduation year");
        setSuccess(false);
        return;
      }
      if (!department.trim()) {
        setMessage("Please select your department");
        setSuccess(false);
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setMessage("");
    setSuccess(false);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSendOtp = async () => {
    setMessage("");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email to send OTP.");
      setSuccess(false);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      setMessage("OTP sent to your email. Please check your inbox.");
      setSuccess(true);
      setShowOtpInput(true);
      setIsEmailSent(true);
      setIsFormDisabled(true); // Disable other fields initially
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });
      setEmailVerifiedToken(res.data.emailVerifiedToken);
      setMessage(res.data.message);
      setSuccess(true);
      setIsEmailVerified(true);
      setShowOtpInput(false); // Hide OTP input after verification
      setIsFormDisabled(false); // Unlock other fields
    } catch (error) {
      setMessage(
        error.response?.data?.message || "OTP verification failed."
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage("");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", { email });
      setMessage("New OTP sent to your email.");
      setSuccess(true);
      setIsEmailSent(true);
      setShowOtpInput(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to resend OTP."
      );
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!password.trim()) {
      setMessage("Please enter your password");
      setSuccess(false);
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setSuccess(false);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setSuccess(false);
      return;
    }
    if (!isEmailVerified || !emailVerifiedToken) {
      setMessage("Please verify your email first.");
      setSuccess(false);
      return;
    }

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
          emailVerifiedToken,
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
                disabled={isFormDisabled || loading}
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
                disabled={isFormDisabled || loading}
              />

              <label style={labelStyle}>Email</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyleWithResponsive}
                disabled={isEmailSent || isEmailVerified || loading}
              />

              {(!isEmailVerified && !isEmailSent) && (
                <div style={{ marginTop: 12 }}>
                  <Button onClick={handleSendOtp} disabled={loading} fullWidth>
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </Button>
                </div>
              )}

              {showOtpInput && !isEmailVerified && (
                <>
                  <label style={labelStyle}>OTP</label>
                  <input
                    type="text"
                    placeholder="Enter the OTP sent to your email"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={inputStyleWithResponsive}
                    disabled={loading}
                  />
                  <div style={buttonContainerStyle}>
                    <Button onClick={handleVerifyOtp} disabled={loading} fullWidth>
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <Button onClick={handleResendOtp} disabled={loading} fullWidth variant="outline">
                      Resend OTP
                    </Button>
                  </div>
                </>
              )}
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
                disabled={isFormDisabled || loading}
              />

              <label style={labelStyle}>Graduation year</label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                style={inputStyleWithResponsive}
                disabled={isFormDisabled || loading}
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
                disabled={isFormDisabled || loading}
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
                disabled={isFormDisabled || loading}
              />

              <label style={labelStyle}>Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={inputStyleWithResponsive}
                disabled={isFormDisabled || loading}
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
              <Button onClick={handlePrevStep} fullWidth variant="outline" disabled={loading}>
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button onClick={handleNextStep} fullWidth disabled={loading || !isEmailVerified}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleRegister}
                disabled={loading || !isEmailVerified}
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