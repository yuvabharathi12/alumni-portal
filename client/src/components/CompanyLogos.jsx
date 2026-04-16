// client/src/components/CompanyLogos.js
import React from 'react';
import './CompanyLogos.css';

const companyLogos = [
  // Replace with actual logo paths or use placeholder images
  { id: 1, name: 'Tech Solutions', src: 'https://via.placeholder.com/150x50?text=Company+1' },
  { id: 2, name: 'Innovate Corp', src: 'https://via.placeholder.com/150x50?text=Company+2' },
  { id: 3, name: 'Global Connect', src: 'https://via.placeholder.com/150x50?text=Company+3' },
  { id: 4, name: 'Future Systems', src: 'https://via.placeholder.com/150x50?text=Company+4' },
  { id: 5, name: 'Creative Hub', src: 'https://via.placeholder.com/150x50?text=Company+5' },
];

const CompanyLogos = () => {
  return (
    <section className="company-logos-section">
      <h3>Trusted by top companies and our alumni network</h3>
      <div className="logos-container">
        {companyLogos.map(logo => (
          <div key={logo.id} className="company-logo-item">
            <img src={logo.src} alt={logo.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyLogos;
