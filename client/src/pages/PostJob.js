import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { colors, styles } from "../styles/theme";

function PostJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs", form);
      alert("Job posted successfully");
      setForm({ title: "", company: "", description: "" });
    } catch (err) {
      alert("Failed to post job");
    }
  };

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <div style={styles.card}>
          <h3 style={{ color: colors.primary }}>Post a Job</h3>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Job Title"
              value={form.title}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <textarea
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
            />

            <button type="submit" style={styles.buttonPrimary}>
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;
