import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../services/api";
import Button from "../components/Button";
import logo from "../assets/logo.png";
import styles from "./Login.module.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, password);
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
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
            <h2 className={styles.imageHeading}>Set New Password</h2>
            <p className={styles.imageText}>
              Enter and confirm your new password to regain access to your account.
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
            <p className={styles.description}>Enter your new password below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
            <label className={`${styles.label} ${styles.labelSpaced}`}>Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />

            <Button type="submit" disabled={loading} fullWidth size="lg" style={{ marginTop: 20 }}>
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>

          {message && <div className={styles.message}>{message}</div>}

          <div className={styles.registerLink}>
            Back to{" "}
            <Link to="/login" className={styles.link}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
