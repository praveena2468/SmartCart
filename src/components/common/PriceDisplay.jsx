import React from 'react';

export const PriceDisplay = ({ price, mrp, discountPercentage, unitSize }) => {
  return (
    <div className="d-flex align-items-baseline flex-wrap gap-1">
      <span className="sm-price-current">₹{price}</span>
      {mrp && mrp > price && (
        <span className="sm-price-mrp">₹{mrp}</span>
      )}
      {discountPercentage > 0 && (
        <span className="sm-price-discount">{discountPercentage}% OFF</span>
      )}
      {unitSize && (
        <div className="w-100 sm-price-unit">({unitSize})</div>
      )}
    </div>
  );
};
