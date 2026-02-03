import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { colors, styles } from "../styles/theme";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
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

  // ✅ APPLY SEARCH + FILTER
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    const matchesRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "0 20px" }}>
        <h2 style={{ color: colors.primary }}>👥 Manage Users</h2>
        <p style={{ color: colors.textLight, marginBottom: "20px" }}>
          Search, filter and manage user accounts
        </p>

        {/* 🔍 SEARCH & FILTER BAR */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              flex: 1,
              minWidth: "220px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="all">All Roles</option>
            <option value="alumni">Alumni</option>
            <option value="student">Student</option>
          </select>
        </div>

        {loading && <p>Loading users...</p>}

        {/* 👤 USER LIST */}
        {filteredUsers.map((user) => (
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
            <div>
              <h4 style={{ color: colors.primary, marginBottom: "5px" }}>
                {user.name}
              </h4>
              <p style={{ fontSize: "14px", color: colors.textLight }}>
                {user.email}
              </p>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <span
                  style={{
                    background: colors.info,
                    color: colors.white,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {user.role}
                </span>

                <span
                  style={{
                    background:
                      user.status === "approved"
                        ? colors.success
                        : user.status === "blocked"
                        ? colors.danger
                        : colors.warning,
                    color: colors.white,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                >
                  {user.status}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {user.status === "pending" && (
                <button
                  onClick={() => handleApprove(user._id)}
                  style={{
                    padding: "8px 14px",
                    background: colors.success,
                    color: colors.white,
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Approve
                </button>
              )}

              <button
                onClick={() => handleDelete(user._id, user.name)}
                style={{
                  padding: "8px 14px",
                  background: colors.danger,
                  color: colors.white,
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {!loading && filteredUsers.length === 0 && (
          <p style={{ textAlign: "center", color: colors.textLight }}>
            No users match your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
