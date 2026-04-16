import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import styles from "./Login.module.css";

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
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.imagePanel}>
          <div className={styles.imageOverlay} />
          <div className={styles.imageContent}>
            <h2 className={styles.imageHeading}>Welcome Back</h2>
            <p className={styles.imageText}>
              Access the alumni network, explore career opportunities, and stay connected with your community.
            </p>
          </div>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.header}>
            <div className={styles.logoContainer}>
              <img src={logo} alt="CAHCET Logo" className={styles.logoImg} />
            </div>
            <h2 className={styles.title}>CAHCET</h2>
            <p className={styles.subtitle}>Alumni Portal</p>
            <p className={styles.description}>Sign in to your account</p>
          </div>

          <div>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />

            <label className={`${styles.label} ${styles.labelSpaced}`}>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className={styles.input}
            />

            <div className={styles.forgotLink}>
              <Link to="/forgot-password" className={styles.link}>
                Forgot password?
              </Link>
            </div>

            <Button
              onClick={handleLogin}
              disabled={loading}
              fullWidth
              size="lg"
              className={styles.buttonWrap}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {message && <div className={styles.message}>{message}</div>}

            <div className={styles.registerLink}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.link}>Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;