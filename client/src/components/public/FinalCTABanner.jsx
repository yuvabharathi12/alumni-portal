import React from 'react';
import PublicButton from './PublicButton';
import styles from './Public.module.css';

const FinalCTABanner = () => {
  return (
    <section className={`${styles.section} ${styles.finalCtaBanner}`}>
      <h2 className={styles.sectionTitle}>Join the CAHCET Alumni Community Today!</h2>
      <p className={styles.sectionSubtitle}>
        Don't miss out on exclusive opportunities to connect, grow, and contribute.
      </p>
      <PublicButton primary onClick={() => console.log('Sign Up clicked')}>
        Sign Up Now
      </PublicButton>
    </section>
  );
};

export default FinalCTABanner;