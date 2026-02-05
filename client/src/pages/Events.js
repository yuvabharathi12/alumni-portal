import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Footer from "../components/Footer";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "user";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data || []);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = { maxWidth: "1400px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <div style={{ background: "linear-gradient(135deg, #ffffff 0%, #059669 100%)", color: "white", padding: spacing[8], borderRadius: borderRadius.xl, marginBottom: spacing[12] }}>
          <h1 style={{ margin: 0, marginBottom: spacing[2], fontSize: typography.fontSize['4xl'] }}>🎉 Events & Reunions</h1>
          <p style={{ margin: 0, opacity: 0.95 }}>Reunions, meetups & campus events. Stay connected with CAHCET</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing[6] }}>
          <h2 style={{ color: '#1e3a8a', margin: 0, fontSize: typography.fontSize['2xl'], fontWeight: 700 }}>Upcoming Events</h2>
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

        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p style={{ color: colors.error.main, padding: spacing[4] }}>{error}</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: spacing[6] }}>
            {events.map((event) => (
              <div
                key={event._id}
                style={{
                  background: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  overflow: "hidden",
                  boxShadow: shadows.md,
                  transition: "all 0.3s ease",
                  borderTop: `4px solid #1e3a8a`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = shadows.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = shadows.md;
                }}
              >
                <div style={{ padding: spacing[6] }}>
                  <h3 style={{ color: '#1e3a8a', marginBottom: spacing[2], fontSize: typography.fontSize.lg, fontWeight: 700 }}>{event.title}</h3>
                  <p style={{ color: '#374151', marginBottom: spacing[3], lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{event.description}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: spacing[2], fontSize: typography.fontSize.sm, color: '#374151' }}>
                    <span>📅 {new Date(event.date).toDateString()}</span>
                    <span>📍 {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Events;
