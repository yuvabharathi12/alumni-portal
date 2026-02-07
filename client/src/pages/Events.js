import { useEffect, useState } from "react";
import "../styles/global.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;
  const [modalEvent, setModalEvent] = useState(null);

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
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <Navbar />
      <PageBanner title="College Events" subtitle="Discover upcoming events and networking opportunities" />

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        {/* Create Event Button */}
        {role === "admin" && (
          <div style={{ marginBottom: "20px" }}>
            <Link to="/admin/events/create" style={{ textDecoration: 'none' }}>
              <Button variant="primary">+ Create Event</Button>
            </Link>
          </div>
        )}

        {/* Loading State */}
        {loading && <p style={{ marginTop: "20px" }}>Loading events...</p>}

        {/* Error State */}
        {error && <p style={{ marginTop: "20px", color: "#d32f2f" }}>{error}</p>}

        {/* Events Grid: uniform card sizes and expandable */}
        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {events.map(event => {
            return (
              <div
                key={event._id}
                style={{
                  ...styles.card,
                  minHeight: 220,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
                onClick={() => setModalEvent(event)}
              >
                <div>
                  <h3 style={{ marginTop: 0, color: colors.heading }}>{event.title}</h3>
                  <p style={{ fontSize: "14px", color: colors.textSecondary, maxHeight: '72px', overflow: 'hidden' }}>{event.description}</p>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: `1px solid ${colors.border}`, fontSize: "13px", color: colors.textSecondary }}>
                    📍 {event.venue || "TBA"} <br />
                    🗓 {new Date(event.date).toDateString()}
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && events.length === 0 && (<p style={{ opacity: 0.7 }}>No events available.</p>)}
        </div>

        {/* Modal for event details */}
        {modalEvent && (
          <div className="modal-overlay" onClick={() => setModalEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalEvent(null)}>✕</button>
              <h2 style={{ marginTop: 0 }}>{modalEvent.title}</h2>
              <p style={{ color: colors.textSecondary }}>{modalEvent.description}</p>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}`, color: colors.textSecondary }}>
                <div>📍 {modalEvent.venue || 'TBA'}</div>
                <div>🗓 {new Date(modalEvent.date).toLocaleString()}</div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                {role === 'admin' && (
                  <Button variant="danger" onClick={async () => { await handleDelete(modalEvent._id); setModalEvent(null); }}>
                    Delete Event
                  </Button>
                )}

                <Button onClick={() => setModalEvent(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;