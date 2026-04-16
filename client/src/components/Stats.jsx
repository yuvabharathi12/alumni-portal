import React from 'react';
import styles from './Stats.module.css';

const Stats = ({ stats = [] }) => {
  return (
    <div className={styles.container}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          <div
            className={styles.bgDecoration}
            style={{ background: stat.color || 'var(--color-primary)' }}
          />

          {stat.icon && (
            <div
              className={styles.iconContainer}
              style={{
                background: `${stat.color || 'var(--color-primary)'}15`,
                color: stat.color || 'var(--color-primary)',
              }}
            >
              {stat.icon}
            </div>
          )}

          <div className={styles.value}>
            {stat.prefix}{stat.value}{stat.suffix}
          </div>

          <div className={styles.label}>{stat.label}</div>

          {stat.change && (
            <div className={`${styles.change} ${stat.change > 0 ? styles.changePositive : styles.changeNegative}`}>
              {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stats;
