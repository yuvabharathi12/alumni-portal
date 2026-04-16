import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import styles from "./Page.module.css";

function AdminCarousel() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { fetchImages(); }, []);

  const fetchImages = async () => {
    try { const res = await api.get("/carousel/images"); setImages(res.data); } catch (err) { console.error(err); }
  };

  const handleAddImage = async () => {
    if (!title || !imageUrl) { setMessage("Title and Image URL are required"); return; }
    try {
      await api.post("/carousel/images", { title, imageUrl, description });
      setMessage("Image added successfully");
      setTitle(""); setImageUrl(""); setDescription("");
      fetchImages();
    } catch (err) { setMessage("Failed to add image"); }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try { await api.delete(`/carousel/images/${id}`); setMessage("Image deleted successfully"); fetchImages(); }
    catch (err) { setMessage("Failed to delete image"); }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.content}>
        <h2>Manage Carousel Images</h2>

        <div className={styles.formCard} style={{ marginBottom: 30 }}>
          <h3>Add New Image</h3>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Title *</label>
            <input type="text" placeholder="e.g., Annual Day 2024" value={title} onChange={(e) => setTitle(e.target.value)} className={styles.formInput} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Image URL *</label>
            <input type="text" placeholder="https://example.com/image.jpg" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={styles.formInput} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description (Optional)</label>
            <textarea placeholder="Brief description of the image" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className={styles.formTextarea} style={{ minHeight: 80 }} />
          </div>
          <Button onClick={handleAddImage}>Add Image</Button>

          {message && (
            <div className={message.includes("success") ? styles.successMsg : styles.successMsg} style={!message.includes("success") ? { background: "#fff3cd", borderColor: "#ffc107", color: "#856404" } : undefined}>
              {message}
            </div>
          )}
        </div>

        <div className={styles.formCard}>
          <h3>Current Images ({images.length})</h3>
          {images.length === 0 ? (
            <p className={styles.emptyText}>No images added yet. Add your first image above.</p>
          ) : (
            <div className={styles.grid} style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
              {images.map((image) => (
                <div key={image._id} className={styles.card} style={{ padding: 0, minHeight: "auto" }}>
                  <img src={image.imageUrl} alt={image.title} style={{ width: "100%", height: 180, objectFit: "cover", borderRadius: "8px 8px 0 0" }} />
                  <div style={{ padding: 12 }}>
                    <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{image.title}</h4>
                    {image.description && <p style={{ margin: "0 0 12px 0", fontSize: 13, opacity: 0.7 }}>{image.description}</p>}
                    <Button variant="danger" fullWidth size="sm" onClick={() => handleDeleteImage(image._id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminCarousel;