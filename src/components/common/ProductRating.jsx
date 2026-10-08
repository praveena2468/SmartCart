import React from 'react';

export const ProductRating = ({ rating = 4.5, reviewCount }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="d-inline-flex align-items-center gap-1 bg-light px-2 py-1 rounded" style={{ fontSize: '0.8rem' }}>
      <span className="fw-bold text-dark">{rating}</span>
      <div className="text-warning d-flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <i
            key={i}
            className={`bi ${
              i < fullStars
                ? 'bi-star-fill'
                : i === fullStars && hasHalfStar
                ? 'bi-star-half'
                : 'bi-star'
            }`}
          ></i>
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-muted ms-1">({reviewCount})</span>
      )}
    </div>
  );
};
