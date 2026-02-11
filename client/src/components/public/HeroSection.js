import React from 'react';
import PublicButton from './PublicButton';
import styles from './Public.module.css'; // Reusing the public styles

const HeroSection = () => {
  return (
    <section className={`${styles.section} ${styles.heroSection}`}>
      <h1 className={styles.sectionTitle}>Welcome to CAHCET Alumni Portal</h1>
      <p className={styles.sectionSubtitle}>
        Connecting CAHCET alumni and students for networking, mentorship, and career opportunities.
      </p>
      <div className={styles.heroButtons}>
        <PublicButton primary onClick={() => console.log('Join Now clicked')}>
          Join Now
        </PublicButton>
        <PublicButton onClick={() => console.log('Explore Jobs clicked')}>
          Explore Jobs
        </PublicButton>
      </div>
    </section>
  );
};

export default HeroSection;