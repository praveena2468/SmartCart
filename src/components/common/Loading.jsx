import React from 'react';

export const LoadingSpinner = ({ text = 'Loading SmartMart products...' }) => (
  <div className="text-center py-5 my-3">
    <div className="spinner-border text-danger mb-3" style={{ width: '3rem', height: '3rem', color: 'var(--sm-primary)' }} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="text-muted font-heading fw-semibold">{text}</p>
  </div>
);

export const ProductSkeleton = ({ count = 4 }) => (
  <div className="row g-3">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card border-0 shadow-sm rounded-3 p-3 h-100 placeholder-glow">
          <div className="placeholder bg-secondary opacity-25 rounded mb-3" style={{ height: '160px', width: '100%' }}></div>
          <div className="placeholder col-4 bg-secondary opacity-25 mb-2"></div>
          <div className="placeholder col-8 bg-secondary opacity-25 mb-3"></div>
          <div className="placeholder col-6 bg-secondary opacity-25 mb-3"></div>
          <div className="placeholder col-10 bg-secondary opacity-25 py-3 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);
