import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import ImageCarousel from "../components/ImageCarousel";
import Footer from "../components/Footer";
import axios from "axios";

function Dashboard() {
  const [carouselImages, setCarouselImages] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const decoded = token ? jwtDecode(token) : {};
  const role = decoded.role || "user";
  const userName = decoded.name || "User";

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

  const containerStyles = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: `0 ${spacing[6]}`,
    marginTop: "80px",
  };

  const cardStyle = {
    background: colors.background.paper,
    borderRadius: borderRadius.lg,
    padding: spacing[6],
    boxShadow: shadows.md,
    border: `1px solid ${colors.border}`,
    textDecoration: "none",
    color: colors.text.primary,
    display: "block",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const adminMenuItems = [
    { title: "📋 View Approvals", link: "/admin/approvals", icon: "✓" },
    { title: "📤 Bulk Upload", link: "/admin/bulk-upload", icon: "⬆️" },
    { title: "🖼️ Carousel", link: "/admin/carousel", icon: "🎨" },
    { title: "📅 Create Event", link: "/admin/events/create", icon: "➕" },
    { title: "👥 Manage Users", link: "/admin/users", icon: "⚙️" },
  ];

  const userMenuItems = [
    { title: "📋 My Profile", link: "/alumni/profile", icon: "👤" },
    { title: "👥 Alumni Directory", link: "/alumni-directory", icon: "🔍" },
    { title: "🎉 Events", link: "/events", icon: "📅" },
    { title: "💼 Job Board", link: "/jobs", icon: "💻" },
  ];

  return (
    <div style={{ background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`, minHeight: "100vh" }}>
      <div style={{ ...containerStyles, padding: `${spacing[8]} ${spacing[6]}` }}>
        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #059669 100%)",
            color: colors.text.inverse,
            padding: spacing[8],
            borderRadius: borderRadius.xl,
            marginBottom: spacing[12],
            boxShadow: shadows.lg,
          }}
        >
          <h1 style={{ margin: 0, marginBottom: spacing[2], fontSize: typography.fontSize['4xl'] }}>
            Welcome, {userName}! 👋
          </h1>
          <p style={{ margin: 0, opacity: 0.95, fontSize: typography.fontSize.lg }}>
            {role === "admin"
              ? "Manage the CAHCET Alumni Portal and keep our community thriving"
              : "Discover opportunities, connect with alumni, and advance your career"}
          </p>
        </div>

        {/* Carousel */}
        {carouselImages.length > 0 && (
          <div style={{ marginBottom: spacing[12] }}>
            <h2 style={{ marginBottom: spacing[4], color: '#1e3a8a' }}>Featured Events</h2>
            <ImageCarousel images={carouselImages} />
          </div>
        )}

        {/* Admin Panel */}
        {role === "admin" && (
          <div>
            <h2 style={{ marginBottom: spacing[6], color: '#1e3a8a', fontSize: typography.fontSize['2xl'] }}>
              Administration
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: spacing[6], marginBottom: spacing[12] }}>
              {adminMenuItems.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  style={{...cardStyle, padding: spacing[8]}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = shadows.lg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = shadows.md;
                  }}
                >
                  <div style={{ width: '60px', height: '60px', background: `linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%)`, borderRadius: borderRadius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: "32px", marginBottom: spacing[3], boxShadow: `0 4px 12px ${colors.primary.main}20` }}>{item.icon}</div>
                  <h3 style={{ margin: 0, color: '#1e3a8a', marginBottom: spacing[2], fontSize: typography.fontSize.lg, fontWeight: 700 }}>
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* User Menu */}
        <div>
          <h2 style={{ marginBottom: spacing[6], color: '#1e3a8a', fontSize: typography.fontSize['2xl'], fontWeight: 700 }}>
            Quick Access
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: spacing[6] }}>
            {userMenuItems.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                style={{...cardStyle, padding: spacing[8]}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = shadows.lg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = shadows.md;
                }}
              >
                <div style={{ width: '60px', height: '60px', background: `linear-gradient(135deg, ${colors.secondary.main} 0%, ${colors.secondary.light} 100%)`, borderRadius: borderRadius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: "32px", marginBottom: spacing[3], boxShadow: `0 4px 12px ${colors.secondary.main}20` }}>{item.icon}</div>
                <h3 style={{ margin: 0, color: '#1e3a8a', marginBottom: spacing[2], fontSize: typography.fontSize.lg, fontWeight: 700 }}>
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
