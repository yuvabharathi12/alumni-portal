import React, { useState } from "react";
import { forgotPassword } from "../services/api";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import styles from "./Login.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await forgotPassword(email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.imagePanel}>
          <div className={styles.imageOverlay} />
          <div className={styles.imageContent}>
            <h2 className={styles.imageHeading}>Forgot Your Password?</h2>
            <p className={styles.imageText}>
              Don't worry, we can help you regain access to your alumni account.
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
            <p className={styles.description}>Enter your email to receive a password reset link.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />

            <Button type="submit" disabled={loading} fullWidth size="lg" style={{ marginTop: 20 }}>
              {loading ? "Sending..." : "Request Reset Link"}
            </Button>
          </form>

          {message && <div className={styles.message}>{message}</div>}

          <div className={styles.registerLink}>
            Remembered your password?{" "}
            <Link to="/login" className={styles.link}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
