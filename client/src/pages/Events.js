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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      alert("Event deleted successfully");
      fetchEvents(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event");
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

              {/* Delete Button (Admin Only) */}
              {role === "admin" && (
                <button
                  onClick={() => handleDelete(event._id)}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    background: colors.danger,
                    color: colors.white,
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#c82333";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = colors.danger;
                  }}
                >
                  Delete Event
                </button>
              )}
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