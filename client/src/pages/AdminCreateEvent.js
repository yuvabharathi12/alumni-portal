import { useState } from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";

function AdminCreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'description') {
      const words = value.split(/\s+/).filter((w) => w);
      if (words.length <= 100) setForm({ ...form, [name]: value });
      else setForm({ ...form, [name]: words.slice(0, 100).join(' ') });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/events", form);
      setSuccess(true);
      setForm({ title: "", description: "", date: "", venue: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const wordCount = form.description.split(/\s+/).filter(w => w).length;

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <Navbar />
      <PageBanner title="Create Event" subtitle="Share upcoming events with the alumni community" />
      
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
                ✓ Event created successfully!
              </div>
            )}

            {/* Event Title */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                Event Title *
              </label>
              <input
                name="title"
                placeholder="e.g., Annual Alumni Meetup"
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

            {/* Event Description */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                <label style={{ fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                  Description *
                </label>
                <span style={{ fontSize: "12px", color: wordCount >= 95 ? colors.secondary : colors.textSecondary }}>
                  {wordCount}/100 words
                </span>
              </div>
              <textarea
                name="description"
                placeholder="Describe the event, what will happen, and why attendees should join..."
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

            {/* Event Date */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
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

            {/* Venue */}
            <div style={{ marginBottom: "28px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: colors.heading, fontSize: "14px" }}>
                Venue
              </label>
              <input
                name="venue"
                placeholder="e.g., Grand Hotel, New York City"
                value={form.venue}
                onChange={handleChange}
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

            {/* Submit Button */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <Button 
                type="submit" 
                disabled={loading}
                style={{ minWidth: "140px" }}
              >
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateEvent;
