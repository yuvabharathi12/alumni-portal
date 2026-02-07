import React from 'react';  
import "../styles/global.css";

const Footer = () => {
  const footerStyles = {
    background: 'linear-gradient(180deg, rgba(15,59,38,0.95) 0%, rgba(14,40,57,0.98) 100%)',
    color: '#d1fae5',
    padding: '48px 24px',
    marginTop: '48px',
    animation: 'fadeUp 0.8s ease both',
  };

  const col = { flex: 1, minWidth: 200 };

  return (
    <footer style={footerStyles}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div style={col}>
          <h3 style={{ margin: 0, color: '#bbf7d0' }}>CAHCET Alumni</h3>
          <p style={{ marginTop: 12, color: '#9ae6b4', lineHeight: 1.6 }}>
            Connecting alumni, fostering relationships, and building futures. Join our vibrant community of 5000+ graduates.
          </p>
        </div>

        <div style={col}>
          <h4 style={{ marginTop: 0, color: '#bbf7d0' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, color: '#9ae6b4' }}>
            <li>About</li>
            <li>Directory</li>
            <li>Events</li>
            <li>Jobs</li>
          </ul>
        </div>

        <div style={col}>
          <h4 style={{ marginTop: 0, color: '#bbf7d0' }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, color: '#9ae6b4' }}>
            <li>Careers</li>
            <li>Mentoring</li>
            <li>Gallery</li>
          </ul>
        </div>

        <div style={col}>
          <h4 style={{ marginTop: 0, color: '#bbf7d0' }}>Contact</h4>
          <p style={{ marginTop: 12, color: '#9ae6b4' }}>alumni@cahcet.edu</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button type="button" style={{ width: 36, height: 36, borderRadius: 36, background: 'rgba(255,255,255,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#d1fae5', textDecoration: 'none', border: 'none', cursor: 'pointer' }}>f</button>
            <button type="button" style={{ width: 36, height: 36, borderRadius: 36, background: 'rgba(255,255,255,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#d1fae5', textDecoration: 'none', border: 'none', cursor: 'pointer' }}>in</button>
            <button type="button" style={{ width: 36, height: 36, borderRadius: 36, background: 'rgba(255,255,255,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#d1fae5', textDecoration: 'none', border: 'none', cursor: 'pointer' }}>🐦</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '28px auto 0', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 20, color: '#9ae6b4', fontSize: 13 }}>
        © {new Date().getFullYear()} CAHCET Alumni Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
