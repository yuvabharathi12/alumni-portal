import { useEffect, useState } from "react";
import "../styles/global.css";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import api from "../services/api";
import { colors, styles } from "../styles/theme";
import Button from "../components/Button";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;
  const [modalJob, setModalJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/jobs");
      setJobs(res.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      alert("Job deleted successfully");
      fetchJobs(); // Refresh the list
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete job");
    }
  };

  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <Navbar />
      <PageBanner title="Job Opportunities" subtitle="Browse open positions and career paths" />

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        {/* Post Job Button */}
        {(role === "alumni" || role === "admin") && (
          <div style={{ marginBottom: "20px" }}>
            <Link to="/jobs/post" style={{ textDecoration: 'none' }}>
              <Button variant="primary">+ Post Job</Button>
            </Link>
          </div>
        )}

        {/* Loading State */}
        {loading && <p style={{ marginTop: "20px" }}>Loading jobs...</p>}

        {/* Error State */}
        {error && <p style={{ marginTop: "20px", color: "#d32f2f" }}>{error}</p>}

        {/* Job Cards: uniform size and expandable */}
        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {jobs.map(job => {
            return (
              <div
                key={job._id}
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
                onClick={() => setModalJob(job)}
              >
                <div>
                  <h3 style={{ marginTop: 0, color: colors.heading }}>{job.title}</h3>
                  <p style={{ fontWeight: "500", marginBottom: "6px" }}>🏢 {job.company}</p>
                  <p style={{ fontSize: "14px", color: colors.textSecondary, maxHeight: '72px', overflow: 'hidden' }}>{job.description}</p>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ marginTop: "12px", fontSize: "12px", color: colors.textSecondary }}>
                    Posted on {new Date(job.createdAt).toDateString()}
                  </div>
                </div>
              </div>
            );
          })}

          {!loading && jobs.length === 0 && (<p style={{ opacity: 0.7 }}>No job postings yet.</p>)}
        </div>

        {/* Modal for job details */}
        {modalJob && (
          <div className="modal-overlay" onClick={() => setModalJob(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalJob(null)}>✕</button>
              <h2 style={{ marginTop: 0 }}>{modalJob.title}</h2>
              <p style={{ color: colors.textSecondary }}>{modalJob.description}</p>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${colors.border}`, color: colors.textSecondary }}>
                <div>🏢 {modalJob.company}</div>
                <div>📅 Posted on {new Date(modalJob.createdAt).toLocaleString()}</div>
              </div>

              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                {role === 'admin' && (
                  <Button variant="danger" onClick={async () => { await handleDelete(modalJob._id); setModalJob(null); }}>
                    Delete Job
                  </Button>
                )}

                <Button onClick={() => setModalJob(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;