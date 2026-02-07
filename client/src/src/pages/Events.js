import { useEffect, useState } from "react";
import "../styles/global.css";
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

      {/* Events Hero Section */}
      <div
        style={{
          marginTop: "80px",
          padding: "40px 20px 20px",
          backgroundImage:
            "linear-gradient(135deg, rgba(3,136,209,0.9), rgba(30,125,88,0.85)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "32px" }}>
            Reunions, Meetups & Campus Events
          </h1>
          <p style={{ margin: 0, maxWidth: "640px", opacity: 0.92 }}>
            Stay connected with CAHCET through colourful events, workshops, and alumni gatherings.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "20px auto 40px", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: colors.primary, display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src="https://img.icons8.com/fluency/32/calendar.png"
              alt="College events"
              style={{ width: 28, height: 28 }}
            />
            College Events
          </h2>

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
            <div
              key={event._id}
              style={{
                ...styles.card,
                padding: "18px 18px 16px",
                overflow: "hidden",
                background:
                  "linear-gradient(145deg, #ffffff 0%, #f4f9ff 35%, #f0f9f4 100%)",
              }}
            >
              <div
                style={{
                  height: 120,
                  borderRadius: "12px",
                  marginBottom: 14,
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <h3 style={{ marginTop: 0, color: colors.primary }}>
                {event.title}
              </h3>

              <p style={{ fontSize: "14px", color: colors.textLight }}>
                {event.description}
              </p>

              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "10px",
                  borderTop: `1px solid ${colors.border}`,
                  fontSize: "13px",
                  color: colors.textLight,
                  lineHeight: "1.6",
                  display: "grid",
                  rowGap: 6,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img
                    src="https://img.icons8.com/fluency/20/marker.png"
                    alt="Venue"
                    style={{ width: 18, height: 18 }}
                  />
                  {event.venue || "TBA"}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <img
                    src="https://img.icons8.com/fluency/20/planner.png"
                    alt="Date"
                    style={{ width: 18, height: 18 }}
                  />
                  {new Date(event.date).toDateString()}
                </span>
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