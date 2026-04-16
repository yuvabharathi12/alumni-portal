import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PageBanner from "../components/PageBanner";
import Button from "../components/Button";
import styles from "./Page.module.css";

function AdminBulkUpload() {
  const [users, setUsers] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const parseCSV = (csvText) => {
    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      const user = {};
      headers.forEach((header, index) => { user[header] = values[index]; });
      if (user.email) data.push(user);
    }
    return data;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadResult(null);
      const reader = new FileReader();
      reader.onload = (event) => { setUsers(parseCSV(event.target.result)); };
      reader.readAsText(selectedFile);
    }
  };

  const handleBulkUpload = async () => {
    if (users.length === 0) { alert("Please select a CSV file with users"); return; }
    setUploading(true);
    try {
      const response = await api.post("/admin/bulk-upload", { users });
      setUploadResult(response.data.results);
      setUsers([]);
      alert(`Upload completed: ${response.data.results.success.length} succeeded, ${response.data.results.failed.length} failed`);
    } catch (err) {
      alert("Bulk upload failed: " + (err.response?.data?.message || err.message));
    } finally { setUploading(false); }
  };

  const downloadTemplate = () => {
    const csv = "name,email,password,role\nJohn Doe,john@example.com,password123,alumni\nJane Smith,jane@example.com,password456,alumni";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "user-template.csv"; a.click();
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <PageBanner title="Bulk Upload Users" subtitle="Add multiple users at once via CSV" />

      <div className={styles.contentNarrow}>
        <h2>Bulk User Upload</h2>

        <div className={styles.formCard} style={{ marginBottom: 20 }}>
          <h3>Instructions:</h3>
          <ol>
            <li>Download the CSV template below</li>
            <li>Fill in user details: name, email, password, role</li>
            <li>Upload the CSV file</li>
            <li>Review the preview and submit</li>
          </ol>
          <Button onClick={downloadTemplate}>Download CSV Template</Button>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Select CSV File:</label>
          <input type="file" accept=".csv" onChange={handleFileChange} className={styles.formInput} />
        </div>

        {users.length > 0 && (
          <div className={styles.formGroup}>
            <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? "Hide" : "Show"} Preview ({users.length} users)
            </Button>

            {showPreview && (
              <div style={{ marginTop: 15, overflowX: "auto" }}>
                <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
                  <tbody>
                    {users.slice(0, 20).map((user, idx) => (
                      <tr key={idx}><td>{user.name}</td><td>{user.email}</td><td>{user.role || "alumni"}</td></tr>
                    ))}
                  </tbody>
                </table>
                {users.length > 20 && <p>... and {users.length - 20} more users</p>}
              </div>
            )}
          </div>
        )}

        {users.length > 0 && (
          <Button onClick={handleBulkUpload} disabled={uploading} style={{ marginBottom: 20 }}>
            {uploading ? "Uploading..." : "Upload Users"}
          </Button>
        )}

        {uploadResult && (
          <div className={styles.formCard}>
            <h3>Upload Results</h3>
            {uploadResult.success.length > 0 && (
              <div style={{ marginBottom: 15 }}>
                <h4 style={{ color: "green" }}>✓ Successfully Added ({uploadResult.success.length})</h4>
                <ul>{uploadResult.success.slice(0, 10).map((u, idx) => <li key={idx}>{u.name} ({u.email})</li>)}</ul>
                {uploadResult.success.length > 10 && <p>... and {uploadResult.success.length - 10} more</p>}
              </div>
            )}
            {uploadResult.failed.length > 0 && (
              <div>
                <h4 style={{ color: "red" }}>✗ Failed ({uploadResult.failed.length})</h4>
                <ul>{uploadResult.failed.slice(0, 10).map((u, idx) => <li key={idx}>{u.email}: {u.reason}</li>)}</ul>
                {uploadResult.failed.length > 10 && <p>... and {uploadResult.failed.length - 10} more</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBulkUpload;
