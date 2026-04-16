import React from 'react';
// import PublicCard from './PublicCard'; // No longer needed if using plain div for cards
// Removed: import styles from './Public.module.css';
import { colors } from '../../styles/theme'; // Import colors for inline styles

const alumniTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    company: 'Google',
    quote: 'The CAHCET Alumni Portal helped me connect with mentors who guided my career path in tech.',
    // photo: 'https://via.placeholder.com/100', // Placeholder image - removed
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    company: 'Microsoft',
    quote: 'Through the portal, I found my current role and reconnected with old friends. Truly invaluable!',
    // photo: 'https://via.placeholder.com/100', // Placeholder image - removed
  },
  {
    id: 3,
    name: 'Anjali Singh',
    company: 'Tesla',
    quote: 'A fantastic platform to stay engaged with the CAHCET community and discover new opportunities.',
    // photo: 'https://via.placeholder.com/100', // Placeholder image - removed
  },
];

const AlumniSpotlightSection = () => {
  const cardStyle = { // Define card style inline
    background: colors.white,
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    textAlign: 'center', // Center text within the card
  };

  const containerStyle = { // Define container style inline for grid
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
    justifyContent: 'center',
    maxWidth: '1200px', // Align with PublicDashboard's max-width
    margin: '0 auto', // Center the grid
    padding: '20px 0', // Add some vertical padding
  };

  const sectionTitleStyle = {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const sectionSubtitleStyle = {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '40px',
    textAlign: 'center',
  };

  const sectionMotivationalStyle = {
    fontSize: '1.1rem',
    color: '#4CAF50',
    fontStyle: 'italic',
    marginTop: '-20px',
    marginBottom: '40px',
    fontWeight: '500',
    textAlign: 'center',
  };


  return (
    <section style={{ padding: '60px 20px', marginBottom: '30px', textAlign: 'center' }}> {/* Inline section style */}
      <h2 style={sectionTitleStyle}>Alumni Spotlight</h2>
      <p style={sectionSubtitleStyle}>
        Hear from our successful alumni about their journey and how the portal has helped them.
      </p>
      <p style={sectionMotivationalStyle}>
        "Your journey inspires the next generation. Share your success, empower others!"
      </p>
      <div style={containerStyle}>
        {alumniTestimonials.map((alumnus) => (
          <div key={alumnus.id} style={cardStyle}> {/* Using div with inline style */}
            <h4>{alumnus.name}</h4>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>{alumnus.company}</p>
            <p style={{ fontStyle: 'italic', color: '#333' }}>"{alumnus.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlumniSpotlightSection;