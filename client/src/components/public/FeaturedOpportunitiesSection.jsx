import React from 'react';
import PublicCard from './PublicCard';
import styles from './Public.module.css';

const featuredJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Innovators Inc.',
    location: 'Bangalore, India',
    description: 'Developing cutting-edge software solutions.',
  },
  {
    id: 2,
    title: 'Data Analyst',
    company: 'Global Insights Ltd.',
    location: 'Chennai, India',
    description: 'Analyzing large datasets to drive business decisions.',
  },
  {
    id: 3,
    title: 'Marketing Specialist',
    company: 'Creative Campaigns',
    location: 'Mumbai, India',
    description: 'Designing and executing digital marketing strategies.',
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Alumni Networking Mixer',
    date: 'March 15, 2026',
    location: 'Virtual',
    description: 'Connect with fellow alumni from various industries.',
  },
  {
    id: 2,
    title: 'Career Guidance Webinar',
    date: 'April 5, 2026',
    location: 'Online',
    description: 'Expert advice on career growth and development.',
  },
  {
    id: 3,
    title: 'Annual Alumni Meet',
    date: 'May 20, 2026',
    location: 'CAHCET Campus',
    description: 'Grand reunion with cultural programs and felicitations.',
  },
];

const FeaturedOpportunitiesSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Featured Opportunities</h2>
      <p className={styles.sectionSubtitle}>
        Explore the latest job openings and upcoming events exclusively for CAHCET alumni.
      </p>

      <h3>Latest Jobs</h3>
      <div className={styles.gridContainer}>
        {featuredJobs.map((job) => (
          <PublicCard key={job.id}>
            <h4>{job.title}</h4>
            <p><strong>{job.company}</strong> - {job.location}</p>
            <p>{job.description}</p>
          </PublicCard>
        ))}
      </div>

      <h3 style={{ marginTop: '50px' }}>Upcoming Events</h3>
      <div className={styles.gridContainer}>
        {upcomingEvents.map((event) => (
          <PublicCard key={event.id}>
            <h4>{event.title}</h4>
            <p><strong>{event.date}</strong> - {event.location}</p>
            <p>{event.description}</p>
          </PublicCard>
        ))}
      </div>
    </section>
  );
};

export default FeaturedOpportunitiesSection;