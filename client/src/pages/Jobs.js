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

      {/* Jobs Hero Section */}
      <div
        style={{
          marginTop: "80px",
          padding: "40px 20px 20px",
          backgroundImage:
            "linear-gradient(135deg, rgba(30,125,88,0.9), rgba(45,157,111,0.85)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h1 style={{ margin: "0 0 10px 0", fontSize: "32px" }}>
            Discover Alumni Job Opportunities
          </h1>
          <p style={{ margin: 0, maxWidth: "640px", opacity: 0.9 }}>
            Explore curated roles shared by CAHCET alumni and partner companies across the globe.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "20px auto 40px", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: colors.primary, display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              src="https://img.icons8.com/fluency/32/briefcase.png"
              alt="Job openings"
              style={{ width: 28, height: 28 }}
            />
            Job Openings
          </h2>

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
            <div
              key={job._id}
              style={{
                ...styles.card,
                padding: "18px 18px 16px",
                borderTop: `4px solid ${colors.primary}`,
                background:
                  "linear-gradient(145deg, #ffffff 0%, #f5f9ff 40%, #f0f9f4 100%)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: "#e3f2fd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/briefcase.png"
                    alt="Job"
                    style={{ width: 26, height: 26 }}
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0, color: colors.primary }}>
                    {job.title}
                  </h3>
                  <p
                    style={{
                      fontWeight: "500",
                      margin: "4px 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <img
                      src="https://img.icons8.com/fluency/24/company.png"
                      alt="Company"
                      style={{ width: 18, height: 18 }}
                    />
                    {job.company}
                  </p>
                </div>
              </div>

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