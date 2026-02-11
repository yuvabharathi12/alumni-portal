import React from 'react';
import PublicCard from './PublicCard';
import styles from './Public.module.css';

const features = [
  {
    title: 'Find Jobs',
    description: 'Discover exciting career opportunities posted by alumni and partners.',
  },
  {
    title: 'Attend Events',
    description: 'Participate in webinars, workshops, and networking events.',
  },
  {
    title: 'Connect with Alumni',
    description: 'Network with a diverse community of CAHCET graduates worldwide.',
  },
  {
    title: 'Get Mentorship',
    description: 'Receive guidance and share experiences with fellow alumni.',
  },
  {
    title: 'Post Opportunities',
    description: 'Share job openings, internships, or mentorship opportunities with the community.',
  },
  {
    title: 'Success Stories',
    description: 'Read inspiring stories of alumni achievements and contributions.',
  },
];

const FeaturesSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Unlock Your Potential with CAHCET Alumni Portal</h2>
      <p className={styles.sectionSubtitle}>
        Explore the myriad ways our platform can help you grow professionally and personally.
      </p>
      <div className={styles.gridContainer}>
        {features.map((feature, index) => (
          <PublicCard key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </PublicCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;