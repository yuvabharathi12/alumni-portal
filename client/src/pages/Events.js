import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { colors, styles } from "../styles/theme";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = jwtDecode(localStorage.getItem("token")).role;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/events");
      setEvents(res.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: colors.primary }}>📅 College Events</h2>

          {role === "admin" && (
            <Link to="/admin/events/create" style={styles.buttonPrimary}>
              + Create Event
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading && <p style={{ marginTop: "20px" }}>Loading events...</p>}

        {/* Error State */}
        {error && <p style={{ marginTop: "20px", color: "#d32f2f" }}>{error}</p>}

        {/* Events Grid */}
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {events.map(event => (
            <div key={event._id} style={styles.card}>
              <h3 style={{ marginTop: 0, color: colors.primary }}>
                {event.title}
              </h3>

              <p style={{ fontSize: "14px", color: colors.textLight }}>
                {event.description}
              </p>

              <div
                style={{
                  marginTop: "15px",
                  paddingTop: "10px",
                  borderTop: `1px solid ${colors.border}`,
                  fontSize: "13px",
                  color: colors.textLight,
                }}
              >
                📍 {event.venue || "TBA"} <br />
                🗓 {new Date(event.date).toDateString()}
              </div>
            </div>
          ))}

          {!loading && events.length === 0 && (
            <p style={{ opacity: 0.7 }}>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
