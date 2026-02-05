import React from 'react';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

const Stats = ({ stats = [], columns = 4 }) => {
  const containerStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`,
    gap: spacing[6],
    marginBottom: spacing[12],
  };

  const statCardStyles = {
    background: `linear-gradient(135deg, ${colors.background.paper} 0%, ${colors.primary[50]} 100%)`,
    borderRadius: borderRadius.xl,
    padding: spacing[8],
    boxShadow: shadows.lg,
    border: `1px solid ${colors.primary[100]}`,
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const iconContainerStyles = {
    width: '64px',
    height: '64px',
    margin: '0 auto',
    marginBottom: spacing[4],
    borderRadius: borderRadius.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    position: 'relative',
    zIndex: 2,
  };

  const valueStyles = {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.main,
    marginBottom: spacing[2],
    fontFamily: typography.fontFamily.display,
  };

  const labelStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  };

  const backgroundDecorationStyles = {
    position: 'absolute',
    top: '-30px',
    right: '-30px',
    width: '120px',
    height: '120px',
    borderRadius: borderRadius.full,
    opacity: 0.05,
  };

  return (
    <div style={containerStyles}>
      {stats.map((stat, index) => (
        <div
          key={index}
          style={statCardStyles}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-12px)';
            e.currentTarget.style.boxShadow = shadows.xl;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = shadows.lg;
          }}
        >
          {/* Background Decoration */}
          <div
            style={{
              ...backgroundDecorationStyles,
              background: stat.color || colors.primary.main,
            }}
          />

          {/* Icon */}
          {stat.icon && (
            <div
              style={{
                ...iconContainerStyles,
                background: `${stat.color || colors.primary.main}15`,
                color: stat.color || colors.primary.main,
              }}
            >
              {stat.icon}
            </div>
          )}

          {/* Value */}
          <div style={valueStyles}>
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </div>

          {/* Label */}
          <div style={labelStyles}>{stat.label}</div>

          {/* Change Indicator */}
          {stat.change && (
            <div
              style={{
                marginTop: spacing[3],
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: stat.change > 0 ? colors.success.main : colors.error.main,
              }}
            >
              {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stats;
