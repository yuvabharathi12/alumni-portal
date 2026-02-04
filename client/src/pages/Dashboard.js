import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ImageCarousel from "../components/ImageCarousel";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { colors, styles } from "../styles/theme";
import axios from "axios";

function Dashboard() {
  const [carouselImages, setCarouselImages] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role = decoded.role;

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const fetchCarouselImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carousel/images");
      setCarouselImages(res.data);
    } catch (err) {
      console.error("Failed to fetch carousel images:", err);
    }
  };

  const cardStyle = {
    ...styles.card,
    cursor: "pointer",
    textDecoration: "none",
    color: colors.text,
    display: "block",
    marginBottom: "15px",
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
        {/* Carousel */}
        {carouselImages.length > 0 && (
          <div style={{ marginBottom: "30px" }}>
            <ImageCarousel images={carouselImages} />
          </div>
        )}

        {/* Welcome Section */}
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
            color: colors.white,
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: "0 0 8px 0", fontSize: "28px" }}>
            Welcome to CAHCET Alumni Portal
          </h2>
          <p style={{ margin: 0, opacity: 0.95, fontSize: "15px" }}>
            {role === "student"
              ? "Connect with alumni, explore career opportunities"
              : "Connecting alumni, fostering relationships, building futures"}
          </p>
        </div>

        {/* Admin Panel */}
        {role === "admin" && (
          <div>
            <h3 style={{ marginBottom: "20px", color: colors.primary }}>
              Admin Dashboard
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <Link
                to="/admin/approvals"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.secondary,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  ✓
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Approve Alumni
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Review and approve pending alumni registrations
                </p>
              </Link>

              <Link
                to="/admin/bulk-upload"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.success,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/upload.png"
                    alt="Bulk upload"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Bulk Upload Users
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Add multiple users at once via CSV
                </p>
              </Link>
              <Link
                to="/admin/users"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.danger,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/conference-call.png"
                    alt="Manage users"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Manage Users
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  View and delete alumni/student accounts
                </p>
              </Link>
              <Link
                to="/alumni/directory"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.info,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/conference-call.png"
                    alt="Alumni"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  View All Alumni
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Browse complete alumni directory
                </p>
              </Link>

              <Link
                to="/admin/carousel"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.warning,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/picture.png"
                    alt="Carousel"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Manage Carousel
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Add or remove carousel images
                </p>
              </Link>

              <Link
                to="/events"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.info,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/calendar.png"
                    alt="Events"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  College Events
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Browse and manage college events
                </p>
              </Link>

              <Link
                to="/jobs"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.secondary,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/briefcase.png"
                    alt="Jobs"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Job Opportunities
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  View job postings from alumni
                </p>
              </Link>
            </div>
          </div>
        )}

        {/* Alumni Panel */}
        {role === "alumni" && (
          <div>
            <h3 style={{ marginBottom: "20px", color: colors.primary }}>
              Alumni Dashboard
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <Link
                to="/alumni/profile"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.secondary,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/user-male-circle.png"
                    alt="Profile"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  My Profile
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  View and edit your alumni profile
                </p>
              </Link>

              <Link
                to="/alumni/directory"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.info,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/books.png"
                    alt="Directory"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Alumni Directory
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Connect with fellow CAHCET alumni
                </p>
              </Link>

              <Link
                to="/events"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.warning,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/calendar.png"
                    alt="Events"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  College Events
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  View upcoming college events
                </p>
              </Link>

              <Link
                to="/jobs"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.secondary,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/briefcase.png"
                    alt="Jobs"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Job Opportunities
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Post and browse job openings
                </p>
              </Link>
            </div>
          </div>
        )}

        {/* Student Panel */}
        {role === "student" && (
          <div>
            <h3 style={{ marginBottom: "20px", color: colors.primary }}>
              Student Dashboard
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              <Link
                to="/alumni/directory"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.info,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/conference-call.png"
                    alt="Alumni directory"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Alumni Directory
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Connect with CAHCET alumni for guidance
                </p>
              </Link>

              <div
                style={{
                  ...cardStyle,
                  opacity: 0.6,
                  cursor: "not-allowed",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.textLight,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/graduation-cap.png"
                    alt="Career guidance"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.textLight }}>
                  Career Guidance
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Coming soon - Connect with alumni for career advice
                </p>
              </div>

              <Link
                to="/events"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.warning,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/calendar.png"
                    alt="Events"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  College Events
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  View upcoming college events
                </p>
              </Link>

              <Link
                to="/jobs"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: colors.secondary,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                    fontSize: "24px",
                  }}
                >
                  <img
                    src="https://img.icons8.com/fluency/32/briefcase.png"
                    alt="Jobs"
                    style={{ width: 24, height: 24 }}
                  />
                </div>
                <h4 style={{ margin: "0 0 8px 0", color: colors.primary }}>
                  Job Opportunities
                </h4>
                <p style={{ margin: 0, fontSize: "14px", color: colors.textLight }}>
                  Browse jobs posted by alumni
                </p>
              </Link>
            </div>

            {/* Info Banner for Students */}
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                background: "#e7f3ff",
                border: "1px solid #b3d9ff",
                borderRadius: "8px",
              }}
            >
              <h4 style={{ margin: "0 0 10px 0", color: colors.primary, display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src="https://img.icons8.com/fluency/24/student-center.png"
                  alt="Student"
                  style={{ width: 20, height: 20 }}
                />
                Welcome, Current Student!
              </h4>
              <p style={{ margin: 0, fontSize: "14px", color: "#004085" }}>
                You can browse our alumni directory to connect with successful graduates from CAHCET. 
                Once you graduate, you'll be able to create your own alumni profile and contribute back to the community!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;