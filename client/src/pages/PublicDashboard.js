import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import axios from "axios";
import { colors } from "../styles/theme";

function PublicDashboard() {
  const [images, setImages] = useState([]);

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

  const card = {
    background: colors.white,
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  };

  return (
    <div style={{ minHeight: "100vh", background: colors.background }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        {/* ✅ Carousel */}
        <ImageCarousel images={images} />

        {/* College Info */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ color: colors.primary, marginBottom: "20px" }}>
            About CAHCET
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <div style={card}>
              <h4>🏫 College</h4>
              <p>
                C Abdul Hakeem College of Engineering & Technology, established
                in 1998 and affiliated with Anna University.
              </p>
            </div>

            <div style={card}>
              <h4>🎓 Courses</h4>
              <p>
                Engineering, Technology, MBA, and MCA programs with modern labs
                and industry-focused learning.
              </p>
            </div>

            <div style={card}>
              <h4>💼 Placements</h4>
              <p>
                Strong placement record with companies like TCS, Infosys,
                Wipro, Zoho and many more.
              </p>
            </div>

            <div style={card}>
              <h4>🤝 Alumni Portal</h4>
              <p>
                Connect students and alumni for mentorship, networking, jobs,
                and career opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicDashboard;
