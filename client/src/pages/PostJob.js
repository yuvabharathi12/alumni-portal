import { useState } from "react";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";
import Footer from "../components/Footer";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "Full-time",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Limit description and requirements to word count
    if (name === "description" || name === "requirements") {
      const words = value.split(/\s+/).filter(w => w);
      if (words.length <= 100) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("✅ Job posted successfully!");
      setFormData({ title: "", company: "", description: "", requirements: "", salary: "", location: "", jobType: "Full-time" });
    } catch (err) {
      setMessage("❌ Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = { maxWidth: "800px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.secondary[50]} 0%, ${colors.primary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <div style={{ background: colors.gradients.secondary, color: "white", padding: spacing[8], borderRadius: borderRadius.xl, marginBottom: spacing[8] }}>
          <h1 style={{ margin: 0, fontSize: typography.fontSize['3xl'], fontWeight: 800 }}>Post a Job Opening 💼</h1>
        </div>

        {message && (
          <div style={{ padding: spacing[4], background: message.includes("✅") ? colors.success.bg : colors.error.bg, color: message.includes("✅") ? colors.success.dark : colors.error.dark,borderRadius: borderRadius.md, marginBottom: spacing[6] }}>
            {message}
          </div>
        )}

        <div style={{ background: colors.background.paper, borderRadius: borderRadius.xl, padding: spacing[8], boxShadow: shadows.lg }}>
          <div style={{ marginBottom: spacing[4] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Job Title</label>
            <input type="text" name="title" placeholder="e.g., Senior Software Engineer" value={formData.title} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }} />
          </div>

          <div style={{ marginBottom: spacing[4] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Company Name</label>
            <input type="text" name="company" placeholder="Company name" value={formData.company} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }} />
          </div>

          <div style={{ marginBottom: spacing[4] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Description (Max 100 words)</label>
            <textarea name="description" placeholder="Job description" value={formData.description} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}`, minHeight: "100px", fontFamily: 'inherit', resize: 'vertical' }} />
            <small style={{ color: '#374151', fontSize: typography.fontSize.xs, marginTop: spacing[1], display: 'block' }}>{formData.description.split(/\s+/).filter(w => w).length}/100 words</small>
          </div>

          <div style={{ marginBottom: spacing[4] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Requirements (Max 100 words)</label>
            <textarea name="requirements" placeholder="Required skills" value={formData.requirements} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}`, minHeight: "80px", fontFamily: 'inherit', resize: 'vertical' }} />
            <small style={{ color: '#374151', fontSize: typography.fontSize.xs, marginTop: spacing[1], display: 'block' }}>{formData.requirements.split(/\s+/).filter(w => w).length}/100 words</small>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: spacing[4], marginBottom: spacing[4] }}>
            <div>
              <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Salary (Optional)</label>
              <input type="text" name="salary" placeholder="e.g., 10-15 LPA" value={formData.salary} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }} />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Location</label>
              <input type="text" name="location" placeholder="City / Remote" value={formData.location} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }} />
            </div>
          </div>

          <div style={{ marginBottom: spacing[6] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Job Type</label>
            <select name="jobType" value={formData.jobType} onChange={handleChange} style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <Button variant="primary" fullWidth size="lg" onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PostJob;
