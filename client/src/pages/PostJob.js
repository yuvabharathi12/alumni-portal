import { useState } from "react";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import "../styles/global.css";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";

function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "description") {
      const words = e.target.value.split(/\s+/).filter(Boolean);
      if (words.length > 100) {
        const trimmed = words.slice(0, 100).join(" ");
        setForm({ ...form, description: trimmed });
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
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <Navbar />
      <PageBanner title="Post a Job" subtitle="Share career opportunities with our alumni network" />
      
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ ...styles.card, padding: "40px" }}>
          <form onSubmit={handleSubmit}>
            {success && (
              <div style={{
                padding: "12px 16px",
                background: "#d4edda",
                border: "1px solid #28a745",
                borderRadius: "8px",
                color: "#155724",
                marginBottom: "20px",
                fontSize: "14px"
              }}>
                ✓ Job posted successfully!
              </div>
            )}

            {/* Job Title */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                Job Title *
              </label>
              <input
                name="title"
                placeholder="e.g., Senior Software Engineer"
                value={form.title}
                onChange={handleChange}
                required
                style={{
                  ...styles.input,
                  padding: "12px 14px",
                  fontSize: "15px",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            {/* Company Name */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                Company Name *
              </label>
              <input
                name="company"
                placeholder="e.g., Tech Corp Inc."
                value={form.company}
                onChange={handleChange}
                required
                style={{
                  ...styles.input,
                  padding: "12px 14px",
                  fontSize: "15px",
                  transition: "border-color 0.2s"
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <label style={{ fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                  Job Description *
                </label>
                <span style={{ fontSize: "12px", color: wordCount >= 95 ? colors.secondary : colors.textSecondary }}>
                  {wordCount}/100 words
                </span>
              </div>
              <textarea
                name="description"
                placeholder="Describe the job role, responsibilities, and requirements..."
                value={form.description}
                onChange={handleChange}
                style={{
                  ...styles.textarea,
                  width: "100%",
                  padding: "12px 14px",
                  fontSize: "15px",
                  minHeight: "180px",
                  maxHeight: "400px",
                  resize: "vertical",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => (e.target.style.borderColor = colors.primary)}
                onBlur={(e) => (e.target.style.borderColor = colors.border)}
              />
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <Button 
                type="submit" 
                disabled={loading}
                style={{ minWidth: "140px" }}
              >
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
