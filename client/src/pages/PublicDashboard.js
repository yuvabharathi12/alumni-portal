import { useState, useEffect } from "react";
import "../styles/global.css";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import axios from "axios";
import { colors } from "../styles/theme";
import AlumniSpotlightSection from "../components/public/AlumniSpotlightSection"; // Import the new component

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
    <div style={{ minHeight: "100vh", background: "transparent" }}>
      <Navbar />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" }}>
        {/* Hero / Welcome */}
        <div style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, white 100%)`, color: 'white', padding: '48px 24px', borderRadius: 12, marginBottom: 24, textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 800 }}>Welcome to CAHCET Alumni Portal</h1>
          <p style={{ margin: '10px 0 0 0', opacity: 0.95 }}>Discover opportunities, connect with alumni, and advance your career</p>
        </div>

        {/* ✅ Carousel */}
        <ImageCarousel images={images} />

        <div style={{ marginTop: "28px" }}>
          <h2 style={{ color: colors.heading, margin: '28px 0 12px' }}>About CAHCET</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <div style={card}>
              <h4>🏫 College</h4>
              <p>C Abdul Hakeem College of Engineering & Technology, established in 1998 and affiliated with Anna University.</p>
            </div>

            <div style={card}>
              <h4>🎓 Courses</h4>
              <p>Engineering, Technology, MBA, and MCA programs with modern labs and industry-focused learning.</p>
            </div>

            <div style={card}>
              <h4>💼 Placements</h4>
              <p>Strong placement record with companies like TCS, Infosys, Wipro, Zoho and many more.</p>
            </div>

            <div style={card}>
              <h4>🤝 Alumni Portal</h4>
              <p>Connect students and alumni for mentorship, networking, jobs, and career opportunities.</p>
            </div>
          </div>
        </div>

        {/* Alumni Spotlight Section */}
        <AlumniSpotlightSection />
      </div>
    </div>
  );
}

export default PublicDashboard;
