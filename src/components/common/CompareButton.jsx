import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { useToast } from '../../context/ToastContext';

export const CompareButton = ({ product, variant = 'checkbox' }) => {
  const { toggleCompare, isInCompare } = useCompare();
  const { showToast } = useToast();
  const selected = isInCompare(product.id);

  const handleClick = (e) => {
    e.stopPropagation();
    const result = toggleCompare(product);
    if (result.error) {
      showToast(result.message, 'danger');
    } else {
      showToast(result.message, result.added ? 'primary' : 'info');
    }
  };

  if (variant === 'button') {
    return (
      <button
        className={`btn btn-sm ${selected ? 'btn-danger' : 'btn-outline-secondary'} d-inline-flex align-items-center gap-1`}
        onClick={handleClick}
      >
        <i className={`bi ${selected ? 'bi-check-square-fill' : 'bi-arrow-left-right'}`}></i>
        <span>{selected ? 'Comparing' : 'Compare'}</span>
      </button>
    );
  }

  return (
    <div className="form-check m-0 d-inline-flex align-items-center" onClick={(e) => e.stopPropagation()}>
      <input
        className="form-check-input me-1"
        type="checkbox"
        id={`compare-${product.id}`}
        checked={selected}
        onChange={handleClick}
        style={{ cursor: 'pointer', accentColor: 'var(--sm-primary)' }}
      />
      <label className="form-check-label small text-muted" htmlFor={`compare-${product.id}`} style={{ cursor: 'pointer' }}>
        Compare
      </label>
    </div>
  );
};
