import { useState } from "react";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";
import Footer from "../components/Footer";

function AdminBulkUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/admin/bulk-upload", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`✅ ${res.data.message}`);
      setFile(null);
    } catch (err) {
      setMessage("❌ Upload failed. Please check CSV format.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = { maxWidth: "800px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <div style={{ background: colors.gradients.secondary, color: "white", padding: spacing[8], borderRadius: borderRadius.xl, marginBottom: spacing[8] }}>
          <h1 style={{ margin: 0, fontSize: typography.fontSize['3xl'], fontWeight: 800 }}>Bulk Upload 📤</h1>
        </div>

        {message && (
          <div style={{ padding: spacing[4], background: message.includes("✅") ? colors.success.bg : colors.error.bg, color: message.includes("✅") ? colors.success.dark : colors.error.dark, borderRadius: borderRadius.md, marginBottom: spacing[6] }}>
            {message}
          </div>
        )}

        <div style={{ background: colors.background.paper, borderRadius: borderRadius.xl, padding: spacing[8], boxShadow: shadows.lg }}>
          <div style={{ marginBottom: spacing[6], padding: spacing[8], background: colors.primary[50], borderRadius: borderRadius.lg, border: `2px dashed #1e3a8a`, textAlign: "center" }}>
            <div style={{ fontSize: "48px", marginBottom: spacing[4] }}>📁</div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ width: "100%", padding: spacing[4], cursor: "pointer" }}
            />
            <p style={{ color: '#374151', margin: `${spacing[2]} 0 0 0` }}>
              {file ? `Selected: ${file.name}` : "Drag and drop CSV file or click to select"}
            </p>
          </div>

          <div style={{ background: colors.secondary[50], padding: spacing[6], borderRadius: borderRadius.lg, marginBottom: spacing[6] }}>
            <h3 style={{ margin: `0 0 ${spacing[4]} 0`, color: '#c2410c', fontSize: typography.fontSize.lg, fontWeight: 700 }}>CSV Format Requirements:</h3>
            <ul style={{ margin: 0, paddingLeft: spacing[6], color: '#374151', lineHeight: 1.8 }}>
              <li>Column 1: Name</li>
              <li>Column 2: Email</li>
              <li>Column 3: Department</li>
              <li>Column 4: Batch Year</li>
              <li>Column 5: Company (Optional)</li>
            </ul>
          </div>

          <Button variant="primary" fullWidth size="lg" onClick={handleUpload} disabled={loading || !file}>
            {loading ? "Uploading..." : "Upload CSV"}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminBulkUpload;
