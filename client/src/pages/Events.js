import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
} from "../styles/theme";
import Footer from "../components/Footer";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "user";

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ---------------- FETCH ---------------- */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data || []);
    } catch {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedEvent(null);
      fetchEvents();
      alert("Event deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  const containerStyles = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: `${spacing[8]} ${spacing[6]}`,
    marginTop: "80px",
  };

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
        minHeight: "100vh",
      }}
    >
      <div style={containerStyles}>
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #059669 100%)",
            color: "white",
            padding: spacing[8],
            borderRadius: borderRadius.xl,
            marginBottom: spacing[12],
          }}
        >
          <h1
            style={{
              margin: 0,
              marginBottom: spacing[2],
              fontSize: typography.fontSize["4xl"],
            }}
          >
            🎉 Events & Reunions
          </h1>
          <p style={{ margin: 0, opacity: 0.95 }}>
            Reunions, meetups & campus events. Stay connected with CAHCET
          </p>
        </div>

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: spacing[6],
          }}
        >
          <h2
            style={{
              color: "#1e3a8a",
              margin: 0,
              fontSize: typography.fontSize["2xl"],
              fontWeight: 700,
            }}
          >
            Upcoming Events
          </h2>

          {(role === "admin" || role === "alumni") && (
            <Link
              to="/admin/events/create"
              style={{
                padding: `${spacing[2]} ${spacing[6]}`,
                background: colors.gradients.secondary,
                color: "white",
                textDecoration: "none",
                borderRadius: borderRadius.md,
                fontWeight: 600,
              }}
            >
              + Create Event
            </Link>
          )}
        </div>

        {/* CONTENT */}
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p style={{ color: colors.error.main }}>{error}</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: spacing[6],
            }}
          >
            {events.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)}
                style={{
                  background: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  boxShadow: shadows.md,
                  borderTop: `4px solid #1e3a8a`,
                  padding: spacing[6],

                  /* FIXED CARD SIZE */
                  height: "240px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",

                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = shadows.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = shadows.md;
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "#1e3a8a",
                      marginBottom: spacing[2],
                      fontWeight: 700,
                    }}
                  >
                    {event.title}
                  </h3>

                  <p
                    style={{
                      color: "#374151",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {event.description}
                  </p>
                </div>

                <div style={{ fontSize: typography.fontSize.sm }}>
                  📅 {new Date(event.date).toDateString()}
                  <br />
                  📍 {event.location}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= FULL MODAL ================= */}
      {selectedEvent && (
        <div
          onClick={() => setSelectedEvent(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: spacing[6],
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              borderRadius: borderRadius.xl,
              width: "700px",
              maxWidth: "95%",
              padding: spacing[8],
              boxShadow: shadows.xl,
            }}
          >
            <h2 style={{ color: "#1e3a8a" }}>{selectedEvent.title}</h2>

            <p style={{ marginTop: spacing[4], lineHeight: 1.7 }}>
              {selectedEvent.description}
            </p>

            <p>📅 {new Date(selectedEvent.date).toDateString()}</p>
            <p>📍 {selectedEvent.location}</p>

            {/* DELETE ONLY HERE */}
            {role === "admin" && (
              <button
                onClick={() => handleDelete(selectedEvent._id)}
                style={{
                  marginTop: spacing[6],
                  width: "100%",
                  background: colors.error.main,
                  color: "white",
                  border: "none",
                  borderRadius: borderRadius.md,
                  padding: spacing[3],
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Delete Event
              </button>
            )}

            <button
              onClick={() => setSelectedEvent(null)}
              style={{
                marginTop: spacing[3],
                width: "100%",
                background: colors.primary.main,
                color: "white",
                border: "none",
                borderRadius: borderRadius.md,
                padding: spacing[3],
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Events;
