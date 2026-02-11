import { useState, useEffect } from "react";
import "../styles/global.css";
import axios from "axios";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import Button from "../components/Button";
import { colors, styles } from "../styles/theme";

// Helper: choose image URL from known fields
const getProfileImage = (profile) => {
  return (
    profile.photoUrl || profile.image || profile.avatar || profile.userId?.avatar || profile.userId?.photo || null
  );
};

function AlumniDirectory() {
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    batchYear: "",
    company: "",
    name: "",
    role: "alumni",
    designation: "", // Added designation filter
  });
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true); // State to toggle filter visibility

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, filters.department, filters.batchYear, filters.company, filters.name, filters.role, filters.designation]); // Added new filters to dependency array

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.department) params.append("department", filters.department);
      if (filters.batchYear) params.append("batchYear", filters.batchYear);
      if (filters.company) params.append("company", filters.company);
      if (filters.name) params.append("name", filters.name);
      if (filters.role && filters.role !== "all") params.append("role", filters.role);
      if (filters.designation) params.append("designation", filters.designation);

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
      name: "",
      role: "alumni",
      designation: "",
    });
    // fetchProfiles will be called by useEffect due to dependency array change
  };


  return (
    <div style={{ background: "transparent", minHeight: "100vh" }}>
      <Navbar />
      <PageBanner title="Alumni Directory" subtitle="Connect with fellow graduates" />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: colors.heading }}>Alumni Filters</h2>
          <Button onClick={() => setShowFilters(!showFilters)} variant="secondary">
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Filters Card */}
        {showFilters && (
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
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Search by name"
                value={filters.name}
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
                Designation
              </label>
              <input
                type="text"
                name="designation"
                placeholder="e.g., Software Engineer"
                value={filters.designation}
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
                Role
              </label>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                style={{
                  ...styles.input,
                  marginBottom: 0,
                  cursor: "pointer",
                }}
              >
                <option value="alumni">Alumni</option>
                <option value="admin">Admin</option>
                <option value="all">All Roles</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>

            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div> /* This closes the filter card's inner div */
        ) }

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
          <strong style={{ color: colors.heading }}>{profiles.length}</strong>{" "}
          <span style={{ color: colors.textSecondary }}>
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
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", overflow: 'hidden', flexShrink: 0 }}>
                    {getProfileImage(profile) ? (
                      <img src={getProfileImage(profile)} alt={profile.userId?.name || 'Profile'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: colors.white,
                        fontSize: '20px',
                        fontWeight: 700,
                      }}>{(profile.userId?.name || '?').charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: '0 0 4px 0', color: colors.heading, fontSize: '18px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{profile.userId?.name || 'N/A'}</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: colors.textSecondary }}>{profile.registerNumber}</p>
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