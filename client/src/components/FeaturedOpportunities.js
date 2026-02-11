// client/src/components/FeaturedOpportunities.js
import React from 'react';
import OpportunityCard from './OpportunityCard'; // Import the card component
import './FeaturedOpportunities.css'; // New: import FeaturedOpportunities-specific CSS

const featuredOpportunitiesData = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    description: 'Seeking experienced software engineer to lead backend development for our new SaaS platform.',
    ctaLink: '/jobs/123',
  },
  {
    id: 2,
    title: 'Alumni Networking Event',
    company: 'CAHCET Alumni Association',
    description: 'Annual networking event connecting current students with successful alumni. RSVP today!',
    ctaLink: '/events/456',
  },
  {
    id: 3,
    title: 'Product Manager - AI',
    company: 'FutureTech Solutions',
    description: 'Opportunity to define and drive the product roadmap for our cutting-edge AI initiatives.',
    ctaLink: '/jobs/789',
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="featured-opportunities-section">
      <h2 className="featured-opportunities-heading">Featured Opportunities</h2>
      <div className="opportunities-grid">
        {featuredOpportunitiesData.map(opportunity => (
          <OpportunityCard
            key={opportunity.id}
            title={opportunity.title}
            company={opportunity.company}
            description={opportunity.description}
            ctaLink={opportunity.ctaLink}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
