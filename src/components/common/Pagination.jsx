import React from 'react';

export const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="d-flex justify-content-center">
      <ul className="pagination pagination-sm">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-item page-link" onClick={() => onPageChange(currentPage - 1)}>
            &laquo; Previous
          </button>
        </li>
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button
              className="page-link"
              style={currentPage === page ? { backgroundColor: 'var(--sm-primary)', borderColor: 'var(--sm-primary)' } : {}}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-item page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};
