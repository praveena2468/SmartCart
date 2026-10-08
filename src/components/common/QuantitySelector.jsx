import React from 'react';

export const QuantitySelector = ({ quantity = 1, onDecrease, onIncrease, min = 1, max = 20 }) => {
  return (
    <div className="input-group input-group-sm" style={{ width: '110px' }}>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
      >
        <i className="bi bi-dash"></i>
      </button>
      <span className="form-control text-center fw-bold bg-white" style={{ minWidth: '35px' }}>
        {quantity}
      </span>
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
};
