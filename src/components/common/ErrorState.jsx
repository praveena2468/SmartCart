import React from 'react';

export const ErrorState = ({ title = 'Unable to load content', message = 'Something went wrong while connecting to SmartMart services.', onRetry }) => (
  <div className="text-center py-5 my-4 px-3">
    <div className="mb-3 text-danger">
      <i className="bi bi-exclamation-octagon-fill display-1" style={{ color: 'var(--sm-primary)' }}></i>
    </div>
    <h4 className="fw-bold text-dark mb-2">{title}</h4>
    <p className="text-muted max-w-md mx-auto mb-4">{message}</p>
    {onRetry && (
      <button className="btn btn-smartmart-primary px-4" onClick={onRetry}>
        <i className="bi bi-arrow-clockwise me-2"></i> Retry Now
      </button>
    )}
  </div>
);
