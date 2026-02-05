import { useState, useEffect } from "react";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";
import Footer from "../components/Footer";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id, newRole) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${id}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      alert("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  const containerStyles = { maxWidth: "1400px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };
  const filteredUsers = filterRole ? users.filter((u) => u.role === filterRole) : users;

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <h1 style={{ color: '#1e3a8a', marginBottom: spacing[2], fontSize: "3rem", fontWeight: 800 }}>Manage Users 👥</h1>
        <p style={{ color: '#374151', marginBottom: spacing[8], fontSize: typography.fontSize.lg }}>View and manage all portal users</p>

        {/* Filter */}
        <div style={{ marginBottom: spacing[6] }}>
          <label style={{ marginRight: spacing[4], fontWeight: 600 }}>Filter by Role:</label>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            style={{ padding: `${spacing[2]} ${spacing[4]}`, borderRadius: borderRadius.md, border: `1px solid ${colors.border}`, cursor: "pointer" }}
          >
            <option value="">All</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
            <option value="student">Student</option>
          </select>
        </div>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div style={{ overflow: "auto", borderRadius: borderRadius.lg, boxShadow: shadows.lg, background: colors.background.paper }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: '#1e3a8a', color: "white" }}>
                  <th style={{ padding: spacing[4], textAlign: "left" }}>Name</th>
                  <th style={{ padding: spacing[4], textAlign: "left" }}>Email</th>
                  <th style={{ padding: spacing[4], textAlign: "left" }}>Department</th>
                  <th style={{ padding: spacing[4], textAlign: "center" }}>Role</th>
                  <th style={{ padding: spacing[4], textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={{ padding: spacing[4] }}>{user.name}</td>
                    <td style={{ padding: spacing[4] }}>{user.email}</td>
                    <td style={{ padding: spacing[4] }}>{user.department || "N/A"}</td>
                    <td style={{ padding: spacing[4], textAlign: "center" }}>
                      <select
                        value={user.role}
                        onChange={(e) => updateRole(user._id, e.target.value)}
                        style={{ padding: `${spacing[1]} ${spacing[2]}`, borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
                      >
                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: spacing[4], textAlign: "center" }}>
                      <Button size="sm" variant="danger" onClick={() => deleteUser(user._id)}>
                        Delete
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

export default ManageUsers;
