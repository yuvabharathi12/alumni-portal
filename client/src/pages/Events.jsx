import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import Button from "../components/Button";
import styles from "./Page.module.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;
  const [modalEvent, setModalEvent] = useState(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true); setError(null);
      const res = await api.get("/events");
      setEvents(res.data || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events");
      setEvents([]);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      alert("Event deleted successfully");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <PageBanner title="College Events" subtitle="Discover upcoming events and networking opportunities" />

      <div className={styles.content}>
        {role === "admin" && (
          <div className={styles.actionBar}>
            <Link to="/admin/events/create" className={styles.actionBarLink}>
              <Button variant="primary">+ Create Event</Button>
            </Link>
          </div>
        )}

        {loading && <p className={styles.loadingText}>Loading events...</p>}
        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.grid}>
          {events.map(event => (
            <div key={event._id} className={styles.card} onClick={() => setModalEvent(event)}>
              <div>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardText}>{event.description}</p>
              </div>
              <div className={styles.cardMeta}>
                📍 {event.venue || "TBA"} <br />
                🗓 {new Date(event.date).toDateString()}
              </div>
            </div>
          ))}
          {!loading && events.length === 0 && <p className={styles.emptyText}>No events available.</p>}
        </div>

        {modalEvent && (
          <div className="modal-overlay" onClick={() => setModalEvent(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalEvent(null)}>✕</button>
              <h2 style={{ marginTop: 0 }}>{modalEvent.title}</h2>
              <p>{modalEvent.description}</p>
              <div className={styles.modalMeta}>
                <div>📍 {modalEvent.venue || 'TBA'}</div>
                <div>🗓 {new Date(modalEvent.date).toLocaleString()}</div>
              </div>
              <div className={styles.modalActions}>
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