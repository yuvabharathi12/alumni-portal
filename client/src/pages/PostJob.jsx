import { useState } from "react";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import Button from "../components/Button";
import styles from "./Page.module.css";

function PostJob() {
  const [form, setForm] = useState({ title: "", company: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      const words = e.target.value.split(/\s+/).filter(Boolean);
      if (words.length > 100) {
        setForm({ ...form, description: words.slice(0, 100).join(" ") });
        return;
      }
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/jobs", form);
      setSuccess(true);
      setForm({ title: "", company: "", description: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = form.description.split(/\s+/).filter(Boolean).length;

  return (
    <div className={styles.page}>
      <Navbar />
      <PageBanner title="Post a Job" subtitle="Share career opportunities with our alumni network" />

      <div className={styles.contentNarrow}>
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {success && <div className={styles.successMsg}>✓ Job posted successfully!</div>}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Job Title *</label>
              <input
                name="title"
                placeholder="e.g., Senior Software Engineer"
                value={form.title}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Company Name *</label>
              <input
                name="company"
                placeholder="e.g., Tech Corp Inc."
                value={form.company}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formLabelRow}>
                <label className={styles.formLabel}>Job Description *</label>
                <span className={`${styles.wordCount} ${wordCount >= 95 ? styles.wordCountWarn : ''}`}>
                  {wordCount}/100 words
                </span>
              </div>
              <textarea
                name="description"
                placeholder="Describe the job role, responsibilities, and requirements..."
                value={form.description}
                onChange={handleChange}
                className={styles.formTextarea}
              />
            </div>

            <div className={styles.formActions}>
              <Button type="submit" disabled={loading} style={{ minWidth: "140px" }}>
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
