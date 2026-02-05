import { useState, useEffect } from "react";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Button from "../components/Button";
import Footer from "../components/Footer";

function AdminCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newImage, setNewImage] = useState({ title: "", description: "", imageUrl: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carousel/images");
      setImages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addImage = async () => {
    try {
      await axios.post("http://localhost:5000/api/carousel/images", newImage, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchImages();
      setNewImage({ title: "", description: "", imageUrl: "" });
      alert("Image added successfully!");
    } catch (err) {
      alert("Failed to add image");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/carousel/images/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchImages();
    } catch (err) {
      alert("Failed to delete image");
    }
  };

  const containerStyles = { maxWidth: "1200px", margin: "0 auto", padding: `${spacing[8]} ${spacing[6]}`, marginTop: "80px" };

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={containerStyles}>
        <h1 style={{ color: '#1e3a8a', marginBottom: spacing[2], fontSize: "3rem", fontWeight: 800 }}>Carousel Management 🖼️</h1>
        <p style={{ color: '#374151', marginBottom: spacing[8], fontSize: typography.fontSize.lg }}>Manage homepage carousel images</p>

        {/* Add Image Form */}
        <div style={{ background: colors.background.paper, borderRadius: borderRadius.xl, padding: spacing[8], marginBottom: spacing[8], boxShadow: shadows.lg }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: spacing[4], fontSize: typography.fontSize['2xl'], fontWeight: 700 }}>Add New Image</h2>
          <div style={{ marginBottom: spacing[4] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Title</label>
            <input
              type="text"
              placeholder="Image title"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
            />
          </div>
          <div style={{ marginBottom: spacing[4] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Description</label>
            <textarea
              placeholder="Description"
              value={newImage.description}
              onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
              style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}`, minHeight: "80px" }}
            />
          </div>
          <div style={{ marginBottom: spacing[6] }}>
            <label style={{ display: "block", marginBottom: spacing[2], fontWeight: 600 }}>Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={newImage.imageUrl}
              onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })}
              style={{ width: "100%", padding: spacing[2], borderRadius: borderRadius.md, border: `1px solid ${colors.border}` }}
            />
          </div>
          <Button variant="primary" onClick={addImage}>
            Add Image
          </Button>
        </div>

        {/* Images List */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: spacing[6] }}>
            {images.map((img) => (
              <div key={img._id} style={{ background: colors.background.paper, borderRadius: borderRadius.lg, overflow: "hidden", boxShadow: shadows.md }}>
                <img src={img.imageUrl} alt={img.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                <div style={{ padding: spacing[4] }}>
                  <h3 style={{ color: '#1e3a8a', marginBottom: spacing[2] }}>{img.title}</h3>
                  <p style={{ color: '#374151', fontSize: typography.fontSize.sm, marginBottom: spacing[4] }}>{img.description}</p>
                  <Button variant="danger" size="sm" fullWidth onClick={() => deleteImage(img._id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AdminCarousel;
