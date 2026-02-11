import React from 'react';
import PublicCard from './PublicCard';
import styles from './Public.module.css';

const alumniTestimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    company: 'Google',
    quote: 'The CAHCET Alumni Portal helped me connect with mentors who guided my career path in tech.',
    photo: 'https://via.placeholder.com/100', // Placeholder image
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    company: 'Microsoft',
    quote: 'Through the portal, I found my current role and reconnected with old friends. Truly invaluable!',
    photo: 'https://via.placeholder.com/100', // Placeholder image
  },
  {
    id: 3,
    name: 'Anjali Singh',
    company: 'Tesla',
    quote: 'A fantastic platform to stay engaged with the CAHCET community and discover new opportunities.',
    photo: 'https://via.placeholder.com/100', // Placeholder image
  },
];

const AlumniSpotlightSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Alumni Spotlight</h2>
      <p className={styles.sectionSubtitle}>
        Hear from our successful alumni about their journey and how the portal has helped them.
      </p>
      <div className={styles.gridContainer}>
        {alumniTestimonials.map((alumnus) => (
          <PublicCard key={alumnus.id} className={styles.alumniCard}>
            <img src={alumnus.photo} alt={alumnus.name} className={styles.alumniPhoto} />
            <h4>{alumnus.name}</h4>
            <p className={styles.alumniCompany}>{alumnus.company}</p>
            <p className={styles.alumniQuote}>"{alumnus.quote}"</p>
          </PublicCard>
        ))}
      </div>
    </section>
  );
};

export default AlumniSpotlightSection;