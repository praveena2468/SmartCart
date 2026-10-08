import React from 'react';

export const RecommendationBadge = ({ tag = 'Best Overall' }) => {
  const badgeClasses = {
    'Best Value': 'bg-success text-white',
    'Best Rated': 'bg-warning text-dark',
    'Lowest Price': 'bg-info text-white',
    'Best Offer': 'bg-danger text-white',
    'Most Popular': 'bg-primary text-white',
    'Best Overall': 'badge-winner'
  };

  const isWinner = tag === 'Best Overall';

  return (
    <span className={isWinner ? 'badge-winner' : `badge ${badgeClasses[tag] || 'bg-secondary'} px-2 py-1`}>
      {isWinner && <i className="bi bi-trophy-fill me-1"></i>}
      {tag}
    </span>
  );
};
