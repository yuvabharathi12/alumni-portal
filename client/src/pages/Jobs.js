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

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedJob, setSelectedJob] = useState(null); // ⭐ modal

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "user";

  useEffect(() => {
    fetchJobs();
  }, []);

  /* ================= FETCH ================= */
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(res.data || []);
    } catch {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE (admin only) ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ================= STYLES ================= */
  const containerStyles = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: `${spacing[8]} ${spacing[6]}`,
    marginTop: "80px",
  };

  const cardStyles = {
    background: colors.background.paper,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    boxShadow: shadows.md,
    transition: "all 0.3s ease",
    borderLeft: `4px solid #c2410c`,
    height: "220px", // ⭐ FIXED SIZE
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  /* ================= UI ================= */
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${colors.secondary[50]} 0%, ${colors.primary[50]} 100%)`,
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
            💼 Job Openings
          </h1>
          <p style={{ margin: 0, opacity: 0.95 }}>
            Exclusive opportunities from CAHCET alumni and partner companies
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
              color: "#c2410c",
              margin: 0,
              fontSize: typography.fontSize["2xl"],
              fontWeight: 700,
            }}
          >
            Available Positions
          </h2>

          {(role === "alumni" || role === "admin") && (
            <Link
              to="/jobs/post"
              style={{
                padding: `${spacing[2]} ${spacing[6]}`,
                background: colors.gradients.secondary,
                color: "white",
                textDecoration: "none",
                borderRadius: borderRadius.md,
                fontWeight: 600,
              }}
            >
              + Post Job
            </Link>
          )}
        </div>

        {/* STATES */}
        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p style={{ color: colors.error.main }}>{error}</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: spacing[6],
            }}
          >
            {jobs.map((job) => (
              <div
                key={job._id}
                style={cardStyles}
                onClick={() => setSelectedJob(job)} // ⭐ open modal
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
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
                      color: "#c2410c",
                      marginBottom: spacing[2],
                      fontSize: typography.fontSize.lg,
                      fontWeight: 700,
                    }}
                  >
                    {job.title}
                  </h3>

                  <p style={{ fontWeight: 600, marginBottom: spacing[2] }}>
                    💼 {job.company}
                  </p>

                  <p
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: 14,
                    }}
                  >
                    {job.description}
                  </p>
                </div>

                <p style={{ fontSize: typography.fontSize.sm }}>
                  📅 {new Date(job.createdAt).toDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {selectedJob && (
        <div
          onClick={() => setSelectedJob(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: spacing[6],
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              width: "600px",
              maxWidth: "95%",
              borderRadius: borderRadius.xl,
              padding: spacing[8],
              boxShadow: shadows.lg,
            }}
          >
            <h2 style={{ color: "#c2410c" }}>{selectedJob.title}</h2>

            <h4 style={{ marginTop: spacing[2] }}>
              💼 {selectedJob.company}
            </h4>

            <p style={{ marginTop: spacing[4] }}>
              {selectedJob.description}
            </p>

            <p>
              📅 {new Date(selectedJob.createdAt).toDateString()}
            </p>

            {role === "admin" && (
              <button
                onClick={() => handleDelete(selectedJob._id)}
                style={{
                  marginTop: spacing[4],
                  background: colors.error.main,
                  color: "#fff",
                  padding: spacing[2],
                  border: "none",
                  borderRadius: borderRadius.md,
                }}
              >
                Delete Job
              </button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Jobs;
