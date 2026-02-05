import { useState, useEffect } from "react";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Footer from "../components/Footer";

function AlumniDirectory() {
  const [profiles, setProfiles] = useState([]);
  const [filters, setFilters] = useState({ department: "", batchYear: "", company: "" });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async (filterParams = filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterParams.department) params.append("department", filterParams.department);
      if (filterParams.batchYear) params.append("batchYear", filterParams.batchYear);
      if (filterParams.company) params.append("company", filterParams.company);

      const res = await axios.get(`http://localhost:5000/api/alumni/profiles?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfiles(res.data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = { maxWidth: "1400px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <h1 style={{ color: '#1e3a8a', marginBottom: spacing[2], fontSize: "3rem", fontWeight: 800 }}>Alumni Directory 👥</h1>
        <p style={{ color: '#374151', marginBottom: spacing[8], fontSize: typography.fontSize.lg }}>
          Connect with CAHCET alumni from across batches and departments
        </p>

        {/* Filters */}
        <div style={{ background: colors.background.paper, padding: spacing[6], borderRadius: borderRadius.lg, marginBottom: spacing[8], boxShadow: shadows.md }}>
          <h3 style={{ margin: `0 0 ${spacing[4]} 0`, color: '#1e3a8a' }}>Search & Filter</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: spacing[4] }}>
            <div>
              <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Department</label>
              <select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
              >
                <option value="">All Departments</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Batch Year</label>
              <input
                type="number"
                placeholder="e.g., 2020"
                value={filters.batchYear}
                onChange={(e) => setFilters({ ...filters, batchYear: e.target.value })}
                style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Company</label>
              <input
                type="text"
                placeholder="Company name"
                value={filters.company}
                onChange={(e) => setFilters({ ...filters, company: e.target.value })}
                style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
              />
            </div>
          </div>
          <div style={{ display: "flex", gap: spacing[4], marginTop: spacing[4] }}>
            <button
              onClick={() => fetchProfiles(filters)}
              style={{ padding: `${spacing[2]} ${spacing[6]}`, background: colors.gradients.primary, color: "white", border: "none", borderRadius: borderRadius.md, cursor: "pointer", fontWeight: 600 }}
            >
              Search
            </button>
            <button
              onClick={() => { 
                const emptyFilters = { department: "", batchYear: "", company: "" };
                setFilters(emptyFilters);
                fetchProfiles(emptyFilters);
              }}
              style={{ padding: `${spacing[2]} ${spacing[6]}`, background: "transparent", color: '#1e3a8a', border: `1px solid #1e3a8a`, borderRadius: borderRadius.md, cursor: "pointer", fontWeight: 600 }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <p>Loading profiles...</p>
        ) : profiles.length === 0 ? (
          <div style={{ padding: spacing[8], background: colors.background.paper, borderRadius: borderRadius.lg, textAlign: 'center' }}>
            <p style={{ color: '#374151', margin: 0 }}>No alumni profiles found. Try adjusting your filters or click Clear to see all alumni.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: spacing[6] }}>
            {profiles.map((profile) => (
              <div
                key={profile._id}
                style={{
                  background: colors.background.paper,
                  borderRadius: borderRadius.lg,
                  padding: spacing[6],
                  boxShadow: shadows.md,
                  transition: "all 0.3s ease",
                  border: `1px solid ${colors.border}`,
                  overflow: 'hidden',
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
                <div style={{ width: '100%', height: '160px', background: `linear-gradient(135deg, #1e3a8a 0%, #c2410c 100%)`, borderRadius: '8px 8px 0 0', marginBottom: spacing[4], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '56px', fontWeight: 'bold' }}>
                  {((profile.userId?.name) || 'A').charAt(0).toUpperCase()}
                </div>
                <h3 style={{ margin: `0 0 ${spacing[2]} 0`, color: '#1e3a8a', fontSize: typography.fontSize.lg, fontWeight: 700 }}>{profile.userId?.name || 'N/A'}</h3>
                <p style={{ margin: `0 0 ${spacing[1]} 0`, color: '#374151', fontSize: typography.fontSize.sm }}>{profile.department || 'N/A'}</p>
                <p style={{ margin: `0 0 ${spacing[3]} 0`, color: '#374151', fontSize: typography.fontSize.sm }}>Batch: {profile.batchYear || 'N/A'}</p>
                {profile.currentCompany && <p style={{ margin: 0, color: '#166534', fontWeight: 600, fontSize: typography.fontSize.sm }}>💼 {profile.currentCompany}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AlumniDirectory;
