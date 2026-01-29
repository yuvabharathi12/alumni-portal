import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { colors, styles } from "../styles/theme";

function AdminCarousel() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

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
    }
  };

  const handleAddImage = async () => {
    if (!title || !imageUrl) {
      setMessage("Title and Image URL are required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/carousel/images",
        {
          title,
          imageUrl,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Image added successfully");
      setTitle("");
      setImageUrl("");
      setDescription("");
      fetchImages();
    } catch (err) {
      setMessage("Failed to add image");
    }
  };

  const handleDeleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/carousel/images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Image deleted successfully");
      fetchImages();
    } catch (err) {
      setMessage("Failed to delete image");
    }
  };

  return (
    <div style={{ background: colors.background, minHeight: "100vh" }}>
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h2 style={{ margin: "0 0 30px 0", color: colors.primary }}>
          Manage Carousel Images
        </h2>

        {/* Add Image Form */}
        <div style={{ ...styles.card, marginBottom: "30px" }}>
          <h3 style={{ margin: "0 0 20px 0", color: colors.primary }}>
            Add New Image
          </h3>

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Title *
          </label>
          <input
            type="text"
            placeholder="e.g., Annual Day 2024"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Image URL *
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            style={styles.input}
          />

          <label
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Description (Optional)
          </label>
          <textarea
            placeholder="Brief description of the image"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ ...styles.input, resize: "vertical" }}
          />

          <button
            onClick={handleAddImage}
            style={{
              ...styles.button,
              background: colors.primary,
              color: colors.white,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = colors.primary;
            }}
          >
            Add Image
          </button>

          {message && (
            <p
              style={{
                marginTop: "16px",
                padding: "12px",
                background: message.includes("success")
                  ? "#d4edda"
                  : "#fff3cd",
                border: `1px solid ${
                  message.includes("success") ? "#28a745" : "#ffc107"
                }`,
                borderRadius: "6px",
                color: message.includes("success") ? "#155724" : "#856404",
              }}
            >
              {message}
            </p>
          )}
        </div>

        {/* Current Images */}
        <div style={styles.card}>
          <h3 style={{ margin: "0 0 20px 0", color: colors.primary }}>
            Current Images ({images.length})
          </h3>

          {images.length === 0 ? (
            <p style={{ color: colors.textLight, textAlign: "center", padding: "40px 0" }}>
              No images added yet. Add your first image above.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >
              {images.map((image) => (
                <div
                  key={image._id}
                  style={{
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "12px" }}>
                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "16px",
                        color: colors.primary,
                      }}
                    >
                      {image.title}
                    </h4>
                    {image.description && (
                      <p
                        style={{
                          margin: "0 0 12px 0",
                          fontSize: "13px",
                          color: colors.textLight,
                        }}
                      >
                        {image.description}
                      </p>
                    )}
                    <button
                      onClick={() => handleDeleteImage(image._id)}
                      style={{
                        ...styles.button,
                        background: colors.danger,
                        color: colors.white,
                        width: "100%",
                        padding: "8px",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#c82333";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = colors.danger;
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Text */}
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#e7f3ff",
            border: "1px solid #b3d9ff",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#004085",
          }}
        >
          <strong>💡 Tip:</strong> For best results, use images with a 16:9 aspect ratio
          (1920x1080px recommended). You can use free image hosting services like{" "}
          <a
            href="https://imgur.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.primary }}
          >
            Imgur
          </a>{" "}
          or{" "}
          <a
            href="https://imgbb.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: colors.primary }}
          >
            ImgBB
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default AdminCarousel;