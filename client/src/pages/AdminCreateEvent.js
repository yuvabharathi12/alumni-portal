import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { colors, styles } from "../styles/theme";

function AdminCreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/events", form);
      alert("Event created successfully");
      setForm({ title: "", description: "", date: "", venue: "" });
    } catch (err) {
      alert("Failed to create event");
    }
  };

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "40px auto" }}>
        <div style={styles.card}>
          <h3 style={{ color: colors.primary }}>Create Event</h3>

          <form onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Event Title"
              value={form.title}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <textarea
              name="description"
              placeholder="Event Description"
              value={form.description}
              onChange={handleChange}
              style={styles.textarea}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              name="venue"
              placeholder="Venue"
              value={form.venue}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" style={styles.buttonPrimary}>
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateEvent;
