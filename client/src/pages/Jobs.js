import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Footer from "../components/Footer";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "user";

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data || []);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = { maxWidth: "1400px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.secondary[50]} 0%, ${colors.primary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <div style={{ background: "linear-gradient(135deg, #ffffff 0%, #059669 100%)", color: "white", padding: spacing[8], borderRadius: borderRadius.xl, marginBottom: spacing[12] }}>
          <h1 style={{ margin: 0, marginBottom: spacing[2], fontSize: typography.fontSize['4xl'] }}>💼 Job Openings</h1>
          <p style={{ margin: 0, opacity: 0.95 }}>Exclusive opportunities from CAHCET alumni and partner companies</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: spacing[6] }}>
          <h2 style={{ color: '#c2410c', margin: 0, fontSize: typography.fontSize['2xl'], fontWeight: 700 }}>Available Positions</h2>
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

        {loading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p style={{ color: colors.error.main }}>{error}</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: spacing[6] }}>
            {jobs.map((job) => (
              <div
                key={job._id}
                style={{
                  background: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  padding: spacing[6],
                  boxShadow: shadows.md,
                  transition: "all 0.3s ease",
                  borderLeft: `4px solid #c2410c`,
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
                <h3 style={{ color: '#c2410c', marginBottom: spacing[2], fontSize: typography.fontSize.lg, fontWeight: 700 }}>{job.title}</h3>
                <p style={{ fontWeight: 600, marginBottom: spacing[2], color: '#1e3a8a' }}>💼 {job.company}</p>
                <p style={{ color: '#374151', marginBottom: spacing[3], lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{job.description}</p>
                <p style={{ fontSize: typography.fontSize.sm, color: '#374151' }}>
                  📅 {new Date(job.createdAt).toDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
