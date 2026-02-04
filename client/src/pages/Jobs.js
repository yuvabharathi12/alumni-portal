import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { colors, styles } from "../styles/theme";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = jwtDecode(localStorage.getItem("token")).role;

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
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: colors.primary }}>💼 Job Openings</h2>

          {(role === "alumni" || role === "admin") && (
            <Link to="/jobs/post" style={styles.buttonPrimary}>
              + Post Job
            </Link>
          )}
        </div>

        {/* Loading State */}
        {loading && <p style={{ marginTop: "20px" }}>Loading jobs...</p>}

        {/* Error State */}
        {error && <p style={{ marginTop: "20px", color: "#d32f2f" }}>{error}</p>}

        {/* Job Cards */}
        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {jobs.map(job => (
            <div key={job._id} style={styles.card}>
              <h3 style={{ marginTop: 0, color: colors.primary }}>
                {job.title}
              </h3>

              <p style={{ fontWeight: "500", marginBottom: "6px" }}>
                🏢 {job.company}
              </p>

              <p style={{ fontSize: "14px", color: colors.textLight }}>
                {job.description}
              </p>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  color: colors.textLight,
                }}
              >
                Posted on {new Date(job.createdAt).toDateString()}
              </div>

              {/* Delete Button (Admin Only) */}
              {role === "admin" && (
                <button
                  onClick={() => handleDelete(job._id)}
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
                  Delete Job
                </button>
              )}
            </div>
          ))}

          {!loading && jobs.length === 0 && (
            <p style={{ opacity: 0.7 }}>No job postings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;