import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { colors, spacing, typography, borderRadius, shadows } from "../styles/theme";
import "../styles/global.css";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Stats from "../components/Stats";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import { LoadingContainer } from "../components/LoadingSpinner";
import imagee from '../assets/imagee.png';

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

  // Stats data
  const statsData = [
    {
      value: "5000+",
      label: "Alumni Network",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/conference-call.png"
          alt="Alumni network"
          style={{ width: 40, height: 40 }}
        />
      ),
      color: colors.primary.main,
    },
    {
      value: "500+",
      label: "Companies Hiring",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/briefcase.png"
          alt="Companies"
          style={{ width: 40, height: 40 }}
        />
      ),
      color: colors.secondary.main,
    },
    {
      value: "200+",
      label: "Events Per Year",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/calendar.png"
          alt="Events"
          style={{ width: 40, height: 40 }}
        />
      ),
      color: colors.info.main,
    },
    {
      value: "95%",
      label: "Placement Rate",
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/combo-chart.png"
          alt="Placement rate"
          style={{ width: 40, height: 40 }}
        />
      ),
      color: colors.success.main,
    },
  ];

  // Features data
  const features = [
    {
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/conference-call.png"
          alt="Alumni directory"
          style={{ width: 36, height: 36 }}
        />
      ),
      title: "Alumni Directory",
      description:
        "Connect with graduates across industries, locations, and graduating years. Build meaningful professional relationships.",
      color: colors.info.main,
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/briefcase.png"
          alt="Job opportunities"
          style={{ width: 36, height: 36 }}
        />
      ),
      title: "Job Opportunities",
      description:
        "Access exclusive job postings from alumni-owned businesses and partner companies. Advance your career.",
      color: colors.secondary.main,
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/calendar.png"
          alt="Networking events"
          style={{ width: 36, height: 36 }}
        />
      ),
      title: "Networking Events",
      description:
        "Attend reunions, webinars, and networking sessions. Stay connected with your alma mater and peers.",
      color: colors.warning.main,
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/fluency/48/graduation-cap.png"
          alt="Mentorship programs"
          style={{ width: 36, height: 36 }}
        />
      ),
      title: "Mentorship Programs",
      description:
        "Get guidance from experienced alumni or mentor current students. Give back to the community.",
      color: colors.primary.main,
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      batch: "Class of 2018",
      quote: "The alumni portal helped me connect with seniors who guided my career path. I'm now working at my dream company!",
      image: "https://ui-avatars.com/api/?name=Priya+Sharma&background=1e7d58&color=fff&size=200",
    },
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO, TechStart",
      batch: "Class of 2015",
      quote: "I found my first employees and investors through the alumni network. This community is incredibly supportive.",
      image: "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=ff8c26&color=fff&size=200",
    },
    {
      name: "Aisha Patel",
      role: "Data Scientist at Amazon",
      batch: "Class of 2019",
      quote: "The mentorship program connected me with amazing professionals who helped shape my career in data science.",
      image: "https://ui-avatars.com/api/?name=Aisha+Patel&background=0288d1&color=fff&size=200",
    },
  ];

  const sectionStyles = {
    padding: `${spacing[16]} ${spacing[6]}`,
    maxWidth: '1280px',
    margin: '0 auto',
  };

  const sectionHeadingStyles = {
    fontFamily: typography.fontFamily.display,
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing[4],
    color: colors.text.primary,
  };

  const sectionSubheadingStyles = {
    fontSize: typography.fontSize.xl,
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: spacing[12],
    maxWidth: '700px',
    margin: `0 auto ${spacing[12]} auto`,
  };

  if (loading) {
    return <LoadingContainer message="Loading alumni portal..." />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.background.default,
        paddingTop: "80px", // offset for fixed navbar
      }}
    >
      {/* Hero Section with Carousel */}
      {images.length > 0 ? (
        <div style={{ position: 'relative', marginBottom: spacing[12] }}>
          <ImageCarousel images={images} />
          <div
            style={{
              position: 'absolute',
              bottom: spacing[12],
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 10,
            }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/register')}
            >
              Join Our Community
            </Button>
          </div>
        </div>
      ) : (
        <Hero
          title="Welcome to CAHCET Alumni Network"
          subtitle="Connect with 5000+ alumni, explore career opportunities, and build lasting professional relationships"
          backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop"
          primaryButton={{
            text: "Join Now",
            onClick: () => navigate('/register'),
          }}
          secondaryButton={{
            text: "Learn More",
            onClick: () => window.scrollTo({ top: 800, behavior: 'smooth' }),
          }}
        />
      )}

      {/* Stats Section */}
      <div style={sectionStyles}>
        <Stats stats={statsData} />
      </div>

      {/* About Section */}
      <div
        style={{
          ...sectionStyles,
          background: colors.background.paper,
          padding: `${spacing[16]} ${spacing[6]}`,
          margin: 0,
          width: '100%',
        }}
      >
        <h2 style={sectionHeadingStyles}>About CAHCET</h2>
        <p style={sectionSubheadingStyles}>
          C Abdul Hakeem College of Engineering & Technology, established in 1998, 
          is affiliated with Anna University and has been shaping future engineers for over two decades.
        </p>

        {/* Campus Image */}
        <div
          style={{
            maxWidth: '1200px',
            margin: `0 auto ${spacing[10]} auto`,
            borderRadius: borderRadius['2xl'],
            overflow: 'hidden',
            boxShadow: shadows.lg,
          }}
        >
          <img
            src={imagee}
            alt="CAHCET campus and students"
            style={{ width: '100%', height: '320px', objectFit: 'cover' }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: spacing[6],
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <Card
            interactive
            variant="elevated"
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                marginBottom: spacing[4],
                background: `${colors.primary.main}15`,
                borderRadius: borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://img.icons8.com/fluency/64/university.png"
                alt="Premier institution"
                style={{ width: 48, height: 48 }}
              />
            </div>
            <h4 style={{ 
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing[2],
            }}>
              Premier Institution
            </h4>
            <p style={{ color: colors.text.secondary, lineHeight: typography.lineHeight.relaxed }}>
              25+ years of excellence in engineering education with state-of-the-art facilities and industry partnerships.
            </p>
          </Card>

          <Card
            interactive
            variant="elevated"
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                marginBottom: spacing[4],
                background: `${colors.secondary.main}15`,
                borderRadius: borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://img.icons8.com/fluency/64/graduation-cap.png"
                alt="Diverse programs"
                style={{ width: 48, height: 48 }}
              />
            </div>
            <h4 style={{ 
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing[2],
            }}>
              Diverse Programs
            </h4>
            <p style={{ color: colors.text.secondary, lineHeight: typography.lineHeight.relaxed }}>
              Engineering, Technology, MBA, and MCA programs designed for modern industry needs.
            </p>
          </Card>

          <Card
            interactive
            variant="elevated"
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                marginBottom: spacing[4],
                background: `${colors.success.main}15`,
                borderRadius: borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://img.icons8.com/fluency/64/briefcase.png"
                alt="Industry connect"
                style={{ width: 48, height: 48 }}
              />
            </div>
            <h4 style={{ 
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing[2],
            }}>
              Industry Connect
            </h4>
            <p style={{ color: colors.text.secondary, lineHeight: typography.lineHeight.relaxed }}>
              Strong placement record with top companies like TCS, Infosys, Wipro, Zoho, and more.
            </p>
          </Card>

          <Card
            interactive
            variant="elevated"
            style={{ textAlign: 'center' }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                marginBottom: spacing[4],
                background: `${colors.info.main}15`,
                borderRadius: borderRadius.xl,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="https://img.icons8.com/fluency/64/handshake.png"
                alt="Alumni network"
                style={{ width: 48, height: 48 }}
              />
            </div>
            <h4 style={{ 
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              marginBottom: spacing[2],
            }}>
              Alumni Network
            </h4>
            <p style={{ color: colors.text.secondary, lineHeight: typography.lineHeight.relaxed }}>
              Join 5000+ alumni for mentorship, networking, jobs, and lifelong connections.
            </p>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ ...sectionStyles, paddingTop: spacing[12] }}>
        <h2 style={sectionHeadingStyles}>Why Join Our Alumni Network?</h2>
        <p style={sectionSubheadingStyles}>
          Discover the benefits of being part of one of the most active and supportive alumni communities
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: spacing[8],
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              interactive
              variant="base"
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  marginBottom: spacing[4],
                  background: `${feature.color}15`,
                  borderRadius: borderRadius.xl,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: typography.fontSize.xl,
                fontWeight: typography.fontWeight.bold,
                marginBottom: spacing[3],
                color: feature.color,
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: colors.text.secondary,
                lineHeight: typography.lineHeight.relaxed,
                margin: 0,
              }}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div
        style={{
          background: colors.background.paper,
          padding: `${spacing[16]} ${spacing[6]}`,
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={sectionHeadingStyles}>Success Stories</h2>
          <p style={sectionSubheadingStyles}>
            Hear from alumni who've leveraged our network to achieve their career goals
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: spacing[8],
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                variant="elevated"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: spacing[4],
                }}
              >
                <div style={{ 
                  fontSize: typography.fontSize['4xl'],
                  color: colors.primary.light,
                  lineHeight: 1,
                }}>
                  "
                </div>
                <p style={{ 
                  fontSize: typography.fontSize.base,
                  lineHeight: typography.lineHeight.relaxed,
                  color: colors.text.primary,
                  fontStyle: 'italic',
                  flex: 1,
                }}>
                  {testimonial.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: borderRadius.full,
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <div style={{ 
                      fontWeight: typography.fontWeight.bold,
                      color: colors.text.primary,
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{ 
                      fontSize: typography.fontSize.sm,
                      color: colors.text.secondary,
                    }}>
                      {testimonial.role}
                    </div>
                    <div style={{ 
                      fontSize: typography.fontSize.xs,
                      color: colors.primary.main,
                      fontWeight: typography.fontWeight.medium,
                    }}>
                      {testimonial.batch}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{ ...sectionStyles, paddingTop: spacing[12], paddingBottom: spacing[16] }}>
        <div
          style={{
            background: colors.gradients.primary,
            borderRadius: borderRadius['2xl'],
            padding: `${spacing[16]} ${spacing[8]}`,
            textAlign: 'center',
            color: colors.text.inverse,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: borderRadius.full,
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: '-80px',
              width: '250px',
              height: '250px',
              borderRadius: borderRadius.full,
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ 
              ...sectionHeadingStyles,
              color: colors.text.inverse,
              marginBottom: spacing[4],
            }}>
              Ready to Join the Network?
            </h2>
            <p style={{ 
              fontSize: typography.fontSize.xl,
              marginBottom: spacing[8],
              maxWidth: '600px',
              margin: `0 auto ${spacing[8]} auto`,
              opacity: 0.95,
            }}>
              Create your profile today and start connecting with fellow alumni from CAHCET
            </p>
            <div style={{ display: 'flex', gap: spacing[4], justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/register')}
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/login')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: colors.text.inverse,
                  color: colors.text.inverse,
                  backdropFilter: 'blur(10px)',
                }}
              >
                Already a Member? Login
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PublicDashboard;
