import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { colors, styles } from "../styles/theme";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users"); // ✅ FIXED
      setUsers(res.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await api.delete(`/admin/users/${id}`);
      alert("User deleted successfully");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete user");
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      alert("User approved successfully");
      fetchUsers();
    } catch (err) {
      alert("Failed to approve user");
    }
  };

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        <h2 style={{ color: colors.primary }}>👥 Manage Users</h2>
        <p style={{ color: colors.textLight, marginBottom: "30px" }}>
          View and manage alumni and student accounts
        </p>

        {loading && <p>Loading users...</p>}

        <div style={{ marginTop: "20px" }}>
          {users.map((user) => (
            <div
              key={user._id}
              style={{
                ...styles.card,
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <div style={{ flex: 1, minWidth: "200px" }}>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  {user.name}
                </h4>
                <p style={{ margin: "4px 0", fontSize: "14px", color: colors.textLight }}>
                  {user.email}
                </p>

                <div style={{ marginTop: "8px", display: "flex", gap: "8px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      background:
                        user.role === "admin"
                          ? colors.danger
                          : user.role === "alumni"
                          ? colors.info
                          : colors.success,
                      color: colors.white,
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {user.role}
                  </span>

                  <span
                    style={{
                      padding: "4px 12px",
                      background:
                        user.status === "approved"
                          ? colors.success
                          : user.status === "blocked"
                          ? colors.danger
                          : colors.warning,
                      color: colors.white,
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {user.status}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {user.status === "pending" && (
                  <button
                    onClick={() => handleApprove(user._id)}
                    style={{
                      padding: "8px 16px",
                      background: colors.success,
                      color: colors.white,
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => handleDelete(user._id, user.name)}
                  style={{
                    padding: "8px 16px",
                    background: colors.danger,
                    color: colors.white,
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {!loading && users.length === 0 && (
            <p style={{ textAlign: "center", color: colors.textLight, marginTop: "40px" }}>
              No users found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
