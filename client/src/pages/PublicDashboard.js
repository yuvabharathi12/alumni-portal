import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Stats from "../components/Stats";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import { LoadingContainer } from "../components/LoadingSpinner";

function PublicDashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const statsData = [
    {
      value: "5000",
      label: "Alumni Network",
      icon: "🎓",
      color: colors.primary.main,
    },
    {
      value: "500",
      label: "Companies Hiring",
      icon: "💼",
      color: colors.secondary.main,
    },
    {
      value: "200",
      label: "Events Per Year",
      icon: "🎉",
      color: colors.accent.blue,
    },
    {
      value: "95",
      label: "Placement Rate %",
      icon: "📈",
      color: colors.success.main,
    },
  ];

  const features = [
    {
      icon: "👥",
      title: "Alumni Directory",
      description: "Connect with graduates across industries and locations. Build meaningful professional relationships.",
      gradient: colors.gradients.primary,
    },
    {
      icon: "💼",
      title: "Job Portal",
      description: "Exclusive job opportunities posted by alumni and partner companies. Grow your career.",
      gradient: colors.gradients.secondary,
    },
    {
      icon: "🎓",
      title: "Networking Events",
      description: "Attend reunions, workshops, and networking events. Stay connected with your community.",
      gradient: colors.gradients.accent,
    },
    {
      icon: "📱",
      title: "Alumni Gallery",
      description: "Relive memories with photos from college events and alumni reunions throughout the years.",
      gradient: colors.gradients.cool,
    },
    {
      icon: "🌍",
      title: "Global Community",
      description: "Connect with CAHCET alumni working in top companies worldwide. Foster global connections.",
      gradient: colors.gradients.warm,
    },
    {
      icon: "📬",
      title: "Stay Updated",
      description: "Regular newsletters, event invitations, and job postings delivered to your inbox.",
      gradient: colors.gradients.vibrant,
    },
  ];

  const containerStyles = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
  };

  const sectionStyles = {
    padding: `${spacing[20]} 0`,
    background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
    position: 'relative',
    overflow: 'hidden',
  };

  const featureGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: spacing[6],
    marginTop: spacing[12],
  };

  const featureCardStyles = {
    background: 'white',
    borderRadius: borderRadius.xl,
    padding: spacing[8],
    boxShadow: shadows.lg,
    transition: 'all 0.3s ease',
    border: `1px solid ${colors.border}`,
    textAlign: 'center',
  };

  return (
    <div style={{ background: colors.background.default }}>
      {/* Hero Section */}
      <Hero
        title="Welcome to the CAHCET Alumni Portal"
        subtitle="Connect, Network, and Grow with 5000+ Alumni Worldwide"
        backgroundImage="linear-gradient(135deg, rgba(250, 255, 252, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)"
        primaryButton={{
          label: "Join Now",
          onClick: () => navigate("/register"),
        }}
        secondaryButton={{
          label: "Sign In",
          onClick: () => navigate("/login"),
        }}
      />

      {/* Carousel */}
      {!loading && images.length > 0 && (
        <div style={{ ...containerStyles, marginTop: spacing[0] }}>
          <ImageCarousel images={images} />
        </div>
      )}

      {/* Stats Section */}
      <section style={sectionStyles}>
        <div style={containerStyles}>
          <h2 style={{ textAlign: 'center', marginBottom: spacing[12], color: '#1e3a8a', fontSize: typography.fontSize['3xl'], fontWeight: 800 }}>
            CAHCET by Numbers
          </h2>
          <Stats stats={statsData} />
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: `${spacing[20]} 0` }}>
        <div style={containerStyles}>
          <h2 style={{ textAlign: 'center', marginBottom: spacing[4], color: '#1e3a8a', fontSize: typography.fontSize['3xl'], fontWeight: 800 }}>
            Build Your Future With Us
          </h2>
          <p style={{ textAlign: 'center', fontSize: typography.fontSize.lg, color: '#374151', maxWidth: '600px', margin: '0 auto ' + spacing[12], lineHeight: typography.lineHeight.relaxed }}>
            Discover opportunities to grow your career, expand your network, and stay connected with your alma mater
          </p>
          
          <div style={featureGridStyles}>
            {features.map((feature, index) => (
              <div
                key={index}
                style={{...featureCardStyles, border: `1px solid ${colors.border}`}}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = shadows.xl;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = shadows.lg;
                }}
              >
                <div style={{ width: '70px', height: '70px', background: feature.gradient, borderRadius: borderRadius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', marginBottom: spacing[4], boxShadow: `0 6px 16px ${colors.primary.main}15`, margin: `0 auto ${spacing[4]} auto` }}>{feature.icon}</div>
                <h3 style={{ marginBottom: spacing[2], color: '#1e3a8a', fontSize: typography.fontSize.lg, fontWeight: 700 }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#374151', lineHeight: typography.lineHeight.relaxed }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: `${spacing[16]} 0`,
          background: colors.gradients.primary,
          color: colors.text.inverse,
          textAlign: 'center',
        }}
      >
        <div style={containerStyles}>
          <h2 style={{ marginBottom: spacing[4], color: 'white', fontSize: typography.fontSize['3xl'], fontWeight: 800 }}>Ready to Connect?</h2>
          <p style={{ fontSize: typography.fontSize.lg, marginBottom: spacing[8], opacity: 0.95, lineHeight: typography.lineHeight.relaxed }}>
            Be part of a thriving community of accomplished professionals
          </p>
          <div style={{ display: 'flex', gap: spacing[4], justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="secondary" size="lg" onClick={() => navigate("/register")}>
              Create Account
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PublicDashboard;
