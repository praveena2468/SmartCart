import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb" className="py-2">
      <ol className="breadcrumb mb-0 small">
        <li className="breadcrumb-item">
          <Link to="/" className="text-decoration-none text-muted">Home</Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return isLast ? (
            <li key={idx} className="breadcrumb-item active fw-semibold text-dark" aria-current="page">
              {item.label}
            </li>
          ) : (
            <li key={idx} className="breadcrumb-item">
              <Link to={item.path} className="text-decoration-none text-muted">{item.label}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
