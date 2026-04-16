import { useState } from "react";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import Button from "../components/Button";
import styles from "./Page.module.css";

function AdminCreateEvent() {
  const [form, setForm] = useState({ title: "", description: "", date: "", venue: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description") {
      const words = value.split(/\s+/).filter((w) => w);
      if (words.length <= 100) setForm({ ...form, [name]: value });
      else setForm({ ...form, [name]: words.slice(0, 100).join(" ") });
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

  const wordCount = form.description.split(/\s+/).filter((w) => w).length;

  return (
    <div className={styles.page}>
      <Navbar />
      <PageBanner title="Create Event" subtitle="Share upcoming events with the alumni community" />

      <div className={styles.contentNarrow}>
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            {success && <div className={styles.successMsg}>✓ Event created successfully!</div>}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Event Title *</label>
              <input name="title" placeholder="e.g., Annual Alumni Meetup" value={form.title} onChange={handleChange} required className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.formLabelRow}>
                <label className={styles.formLabel}>Description *</label>
                <span className={`${styles.wordCount} ${wordCount >= 95 ? styles.wordCountWarn : ""}`}>{wordCount}/100 words</span>
              </div>
              <textarea name="description" placeholder="Describe the event..." value={form.description} onChange={handleChange} className={styles.formTextarea} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required className={styles.formInput} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Venue</label>
              <input name="venue" placeholder="e.g., Grand Hotel, New York City" value={form.venue} onChange={handleChange} className={styles.formInput} />
            </div>

            <div className={styles.formActions}>
              <Button type="submit" disabled={loading} style={{ minWidth: "140px" }}>
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
