import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminBulkUpload() {
  const [users, setUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const token = localStorage.getItem("token");

  // Parse CSV file
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const user = {};

      headers.forEach((header, index) => {
        user[header] = values[index];
      });

      // Only add if it has at least email
      if (user.email) {
        data.push(user);
      }
    }

    return data;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadResult(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target.result;
        const parsedUsers = parseCSV(csv);
        setUsers(parsedUsers);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleBulkUpload = async () => {
    if (users.length === 0) {
      alert("Please select a CSV file with users");
      return;
    }

    setUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/bulk-upload",
        { users },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUploadResult(response.data.results);
      setUsers([]);
      alert(
        `Upload completed: ${response.data.results.success.length} succeeded, ${response.data.results.failed.length} failed`
      );
    } catch (err) {
      console.error(err);
      alert("Bulk upload failed: " + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const csv = "name,email,password,role\nJohn Doe,john@example.com,password123,alumni\nJane Smith,jane@example.com,password456,alumni";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "user-template.csv";
    a.click();
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2>Bulk User Upload</h2>

        {/* Instructions */}
        <div
          style={{
            backgroundColor: "#e8f4f8",
            padding: "15px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h3>Instructions:</h3>
          <ol>
            <li>Download the CSV template below</li>
            <li>Fill in user details: name, email, password, role</li>
            <li>Upload the CSV file</li>
            <li>Review the preview and submit</li>
          </ol>
          <button
            onClick={downloadTemplate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Download CSV Template
          </button>
        </div>

        {/* File Upload */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "10px" }}>
            <strong>Select CSV File:</strong>
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Preview */}
        {users.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={() => setShowPreview(!showPreview)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {showPreview ? "Hide" : "Show"} Preview ({users.length} users)
            </button>

            {showPreview && (
              <div style={{ marginTop: "15px", overflowX: "auto" }}>
                <table
                  border="1"
                  cellPadding="10"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 20).map((user, idx) => (
                      <tr key={idx}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role || "alumni"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length > 20 && (
                  <p style={{ marginTop: "10px", color: "#666" }}>
                    ... and {users.length - 20} more users
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Upload Button */}
        {users.length > 0 && (
          <button
            onClick={handleBulkUpload}
            disabled={uploading}
            style={{
              padding: "12px 30px",
              backgroundColor: uploading ? "#ccc" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: uploading ? "not-allowed" : "pointer",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            {uploading ? "Uploading..." : "Upload Users"}
          </button>
        )}

        {/* Results */}
        {uploadResult && (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "5px",
              border: "1px solid #dee2e6",
            }}
          >
            <h3>Upload Results</h3>

            {uploadResult.success.length > 0 && (
              <div style={{ marginBottom: "15px" }}>
                <h4 style={{ color: "green" }}>
                  ✓ Successfully Added ({uploadResult.success.length})
                </h4>
                <ul>
                  {uploadResult.success.slice(0, 10).map((u, idx) => (
                    <li key={idx}>
                      {u.name} ({u.email})
                    </li>
                  ))}
                </ul>
                {uploadResult.success.length > 10 && (
                  <p>... and {uploadResult.success.length - 10} more</p>
                )}
              </div>
            )}

            {uploadResult.failed.length > 0 && (
              <div>
                <h4 style={{ color: "red" }}>
                  ✗ Failed ({uploadResult.failed.length})
                </h4>
                <ul>
                  {uploadResult.failed.slice(0, 10).map((u, idx) => (
                    <li key={idx}>
                      {u.email}: {u.reason}
                    </li>
                  ))}
                </ul>
                {uploadResult.failed.length > 10 && (
                  <p>... and {uploadResult.failed.length - 10} more</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBulkUpload;
