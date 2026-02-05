import { useState, useEffect } from "react";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";
import Footer from "../components/Footer";

function AdminApprovals() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert("Failed to approve user");
    }
  };

  const containerStyles = { maxWidth: "1200px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <h1 style={{ color: '#1e3a8a', marginBottom: spacing[2], fontSize: "3rem", fontWeight: 800 }}>Pending Approvals ✓</h1>
        <p style={{ color: '#374151', marginBottom: spacing[8], fontSize: typography.fontSize.lg }}>Review and approve new alumni registrations</p>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p style={{ padding: spacing[6], background: colors.background.paper, borderRadius: borderRadius.lg }}>No pending approvals</p>
        ) : (
          <div style={{ overflow: "auto", borderRadius: borderRadius.lg, boxShadow: shadows.lg }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: '#1e3a8a', color: "white" }}>
                  <th style={{ padding: spacing[4], textAlign: "left" }}>Name</th>
                  <th style={{ padding: spacing[4], textAlign: "left" }}>Email</th>
                  <th style={{ padding: spacing[4], textAlign: "left" }}>Department</th>
                  <th style={{ padding: spacing[4], textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={{ borderBottom: `1px solid ${colors.border}`, background: colors.background.paper }}>
                    <td style={{ padding: spacing[4] }}>{user.name}</td>
                    <td style={{ padding: spacing[4] }}>{user.email}</td>
                    <td style={{ padding: spacing[4] }}>{user.department}</td>
                    <td style={{ padding: spacing[4], textAlign: "center" }}>
                      <Button size="sm" variant="primary" onClick={() => approveUser(user._id)}>
                        Approve
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AdminApprovals;
