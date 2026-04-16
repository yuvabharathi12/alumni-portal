import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.col}>
          <h3 className={styles.colTitle}>CAHCET Alumni</h3>
          <p className={styles.colText}>
            Connecting alumni, fostering relationships, and building futures. Join our vibrant community of 5000+ graduates.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colSubtitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li>About</li>
            <li>Directory</li>
            <li>Events</li>
            <li>Jobs</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colSubtitle}>Resources</h4>
          <ul className={styles.linkList}>
            <li>Careers</li>
            <li>Mentoring</li>
            <li>Gallery</li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colSubtitle}>Contact</h4>
          <p className={styles.colText}>alumni@cahcet.edu</p>
          <div className={styles.socialLinks}>
            <button type="button" className={styles.socialBtn}>f</button>
            <button type="button" className={styles.socialBtn}>in</button>
            <button type="button" className={styles.socialBtn}>🐦</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} CAHCET Alumni Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
