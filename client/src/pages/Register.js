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
      if (!name.trim()) {
        setMessage("Please enter your full name");
        return;
      }
      if (!email.trim()) {
        setMessage("Please enter your email");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage("Please enter a valid email");
        return;
      }
    }
    if (currentStep === 2) {
      if (!phone.trim()) {
        setMessage("Please enter your phone number");
        return;
      }
      if (!graduationYear) {
        setMessage("Please select your graduation year");
        return;
      }
      if (!department.trim()) {
        setMessage("Please select your department");
        return;
      }
    }
    setMessage("");
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setMessage("");
    setCurrentStep(currentStep - 1);
  };

  const handleRegister = async () => {
    if (!password.trim()) {
      setMessage("Please enter your password");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        role,
        phone,
        graduationYear,
        department,
        city,
        bio,
      });
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
  const departments = ["Computer Science", "Electronics and communication", "AI/DS", "Information Technology", "Mechanical", "AI/ML", "Civil", "EEE"];

  return (
    <div style={{ minHeight: '100vh', background: "transparent", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', gap: 0, alignItems: 'stretch', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
        {/* Left image section */}
        <div style={{ flex: 1, backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 40, position: 'relative' }} className="auth-visual">
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(45,157,106,0.85) 0%, rgba(52,211,153,0.75) 100%)', zIndex: 1 }}></div>
          <div style={{ position: 'relative', zIndex: 2, color: colors.white }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 16px 0' }}>Join Our Community</h2>
            <p style={{ marginTop: 0, color: 'rgba(255,255,255,0.95)', fontSize: 15, lineHeight: 1.6 }}>Create your profile, connect with alumni, discover opportunities, and build lasting relationships.</p>
          </div>
        </div>

        {/* Right form card */}
        <div style={{ flex: '0 0 480px', background: colors.white, padding: 32, overflowY: 'auto', maxHeight: '100vh' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ width: 70, height: 70, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <img src={logo} alt="CAHCET Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <h2 style={{ margin: '12px 0 4px 0', color: colors.heading, fontSize: 26, fontWeight: 700 }}>CAHCET</h2>
            <p style={{ margin: '8px 0 0 0', color: colors.primary, fontSize: 16, fontWeight: 600 }}>Alumni Portal</p>
          </div>

          {/* Progress Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28, gap: 8 }}>
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ flex: 1 }}>
                <div style={{ height: 6, background: currentStep >= step ? colors.primary : colors.border, borderRadius: 3, transition: 'background 0.3s ease' }} />
                <p style={{ textAlign: 'center', marginTop: 6, fontSize: 11, color: currentStep >= step ? colors.primary : colors.textSecondary, fontWeight: currentStep === step ? 600 : 400 }}>Step {step}</p>
              </div>
            ))}
          </div>

          <div>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <>
                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>I am a</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...styles.input, outline: 'none', cursor: 'pointer', marginBottom: 12 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)}>
                  <option value="alumni">Alumni</option>
                  <option value="student">Current Student</option>
                </select>

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Full name</label>
                <input type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} style={{ ...styles.input, outline: 'none', marginBottom: 12 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Email</label>
                <input type="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...styles.input, outline: 'none', marginBottom: 18 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />
              </>
            )}

            {/* Step 2: Profile Details */}
            {currentStep === 2 && (
              <>
                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Phone number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ ...styles.input, outline: 'none', marginBottom: 12 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Graduation year</label>
                <select value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} style={{ ...styles.input, outline: 'none', cursor: 'pointer', marginBottom: 12 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)}>
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Department</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} style={{ ...styles.input, outline: 'none', cursor: 'pointer', marginBottom: 12 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)}>
                  <option value="">Select department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>City (optional)</label>
                <input type="text" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} style={{ ...styles.input, outline: 'none', marginBottom: 18 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />
              </>
            )}

            {/* Step 3: Account Security */}
            {currentStep === 3 && (
              <>
                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Bio</label>
                <textarea placeholder="Tell us about yourself (max 100 characters)" value={bio} onChange={(e) => setBio(e.target.value.slice(0, 100))} style={{ ...styles.input, outline: 'none', marginBottom: 6, resize: 'none', height: 80 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />
                <p style={{ fontSize: 12, color: colors.textSecondary, margin: '0 0 12px 0', textAlign: 'right' }}>{bio.length}/100</p>

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Password</label>
                <input type="password" placeholder="Create a password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} style={{ ...styles.input, outline: 'none', marginBottom: 12 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />

                <label style={{ display: 'block', marginBottom: 6, color: colors.text, fontSize: 14, fontWeight: 500 }}>Confirm password</label>
                <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ ...styles.input, outline: 'none', marginBottom: 18 }} onFocus={(e) => (e.target.style.borderColor = colors.primary)} onBlur={(e) => (e.target.style.borderColor = colors.border)} />
              </>
            )}

            {message && (<div style={{ marginTop: 14, padding: 12, background: success ? '#d4edda' : '#fff3cd', border: `1px solid ${success ? '#28a745' : '#ffc107'}`, borderRadius: 8, color: success ? '#155724' : '#856404', fontSize: 14, marginBottom: 14 }}>{message}</div>)}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              {currentStep > 1 && (
                <Button onClick={handlePrevStep} fullWidth variant="outline">Back</Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={handleNextStep} fullWidth>Next</Button>
              ) : (
                <Button onClick={handleRegister} disabled={loading} fullWidth>{loading ? 'Creating...' : 'Create Account'}</Button>
              )}
            </div>

            <div style={{ marginTop: 18, textAlign: 'center', fontSize: 14, color: colors.textLight }}>Already have an account? <Link to="/login" style={{ color: colors.primary, textDecoration: 'none', fontWeight: 600 }}>Login</Link></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;