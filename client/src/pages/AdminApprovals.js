import { useEffect, useState } from "react";
import "../styles/global.css";
import api from "../services/api";
import Navbar from "../components/Navbar";

function AdminApprovals() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPendingUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchPendingUsers = async () => {
    try {
      const res = await api.get("/admin/pending-users");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch pending users");
    }
  };

  const approveUser = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      fetchPendingUsers();
    } catch (err) {
      alert("Approval failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>

        {users.length === 0 ? (
          <p>No pending users.</p>
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => approveUser(u._id)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminApprovals;
