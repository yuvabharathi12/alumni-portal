import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { colors, styles } from "../styles/theme";

function AlumniDirectory() {
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    batchYear: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.batchYear) params.append("batchYear", filters.batchYear);
      if (filters.company) params.append("company", filters.company);

      const res = await axios.get(
        `http://localhost:5000/api/alumni/profiles?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      alert("Failed to fetch alumni");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    fetchProfiles();
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      batchYear: "",
      company: "",
    });
    setTimeout(() => fetchProfiles(), 100);
  };

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ margin: "0 0 8px 0", color: colors.primary }}>
            Alumni Directory
          </h2>
          <p style={{ margin: 0, color: colors.textLight }}>
            Connect with CAHCET alumni from across batches and departments
          </p>
        </div>

        {/* Filters Card */}
        <div
          style={{
            ...styles.card,
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              margin: "0 0 20px 0",
              color: colors.primary,
              fontSize: "18px",
            }}
          >
            Search & Filter
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: colors.text,
                }}
              >
                Department
              </label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                style={{
                  ...styles.input,
                  marginBottom: 0,
                  cursor: "pointer",
                }}
              >
                <option value="">All Departments</option>
                <option value="Computer Science and Engineering">
                  Computer Science and Engineering
                </option>
                <option value="Electronics and Communication Engineering">
                  Electronics and Communication Engineering
                </option>
                <option value="Electrical and Electronics Engineering">
                  Electrical and Electronics Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Information Technology">
                  Information Technology
                </option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: colors.text,
                }}
              >
                Batch Year
              </label>
              <input
                type="text"
                name="batchYear"
                placeholder="e.g., 2020"
                value={filters.batchYear}
                onChange={handleFilterChange}
                style={{ ...styles.input, marginBottom: 0 }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: colors.text,
                }}
              >
                Company
              </label>
              <input
                type="text"
                name="company"
                placeholder="Company name"
                value={filters.company}
                onChange={handleFilterChange}
                style={{ ...styles.input, marginBottom: 0 }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                ...styles.button,
                background: colors.primary,
                color: colors.white,
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.background = colors.primaryDark;
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.background = colors.primary;
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>

            <button
              onClick={clearFilters}
              style={{
                ...styles.button,
                background: colors.textLight,
                color: colors.white,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#5a6268";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = colors.textLight;
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div
          style={{
            marginBottom: "20px",
            padding: "12px 16px",
            background: colors.white,
            borderRadius: "6px",
            border: `1px solid ${colors.border}`,
          }}
        >
          <strong style={{ color: colors.primary }}>{profiles.length}</strong>{" "}
          <span style={{ color: colors.textLight }}>
            {profiles.length === 1 ? "alumnus" : "alumni"} found
          </span>
        </div>

        {/* Alumni Cards Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                display: "inline-block",
                width: "40px",
                height: "40px",
                border: `4px solid ${colors.border}`,
                borderTop: `4px solid ${colors.primary}`,
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ marginTop: "16px", color: colors.textLight }}>
              Loading alumni...
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {profiles.map((profile) => (
              <div
                key={profile._id}
                style={{
                  ...styles.card,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                {/* Profile Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                    paddingBottom: "16px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.white,
                      fontSize: "24px",
                      fontWeight: "600",
                      flexShrink: 0,
                    }}
                  >
                    {profile.userId?.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3
                      style={{
                        margin: "0 0 4px 0",
                        color: colors.primary,
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {profile.userId?.name}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: colors.textLight,
                      }}
                    >
                      {profile.registerNumber}
                    </p>
                  </div>
                </div>

                {/* Profile Details */}
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>🎓</span>
                    <span style={{ fontSize: "14px", color: colors.text }}>
                      {profile.department}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>📅</span>
                    <span style={{ fontSize: "14px", color: colors.text }}>
                      Batch of {profile.batchYear}
                    </span>
                  </div>

                  {profile.currentCompany && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>💼</span>
                      <span style={{ fontSize: "14px", color: colors.text }}>
                        {profile.designation
                          ? `${profile.designation} at ${profile.currentCompany}`
                          : profile.currentCompany}
                      </span>
                    </div>
                  )}

                  {profile.location && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>📍</span>
                      <span style={{ fontSize: "14px", color: colors.text }}>
                        {profile.location}
                      </span>
                    </div>
                  )}
                </div>

                {/* LinkedIn Link */}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      background: "#0077b5",
                      color: colors.white,
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "500",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "#005885";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "#0077b5";
                    }}
                  >
                    View LinkedIn Profile →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && profiles.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: colors.white,
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <div
              style={{
                fontSize: "64px",
                marginBottom: "16px",
                opacity: 0.5,
              }}
            >
              🔍
            </div>
            <h3 style={{ margin: "0 0 8px 0", color: colors.primary }}>
              No Alumni Found
            </h3>
            <p style={{ margin: 0, color: colors.textLight }}>
              Try adjusting your search filters or check back later
            </p>
          </div>
        )}
      </div>

      {/* CSS for spinner animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AlumniDirectory;