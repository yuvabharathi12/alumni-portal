// client/src/components/OpportunityCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './OpportunityCard.css'; // New: import OpportunityCard-specific CSS

const OpportunityCard = ({ title, company, description, ctaLink, ctaText = 'Learn More' }) => {
  return (
    <div className="opportunity-card">
      <h3 className="opportunity-card-title">{title}</h3>
      <p className="opportunity-card-company">{company}</p>
      <p className="opportunity-card-description">{description}</p>
      <Link to={ctaLink} className="btn btn-primary btn-small">
        {ctaText}
      </Link>
    </div>
  );
};

export default OpportunityCard;
