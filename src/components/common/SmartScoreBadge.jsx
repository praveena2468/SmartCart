import React from 'react';

export const SmartScoreBadge = ({ score = 8.5 }) => {
  return (
    <div className="badge-smart-score d-inline-flex align-items-center gap-1">
      <i className="bi bi-cpu-fill"></i>
      <span>SmartMart Score: {score}/10</span>
    </div>
  );
};
