import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products = [], columns = { desktop: 4, tablet: 3, mobile: 2 } }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5 my-3 bg-white rounded-3 p-4 border">
        <i className="bi bi-search display-3 text-muted"></i>
        <h5 className="fw-bold mt-3">No products match your criteria</h5>
        <p className="text-muted small">Try clearing your search query or adjusting your category/price filters.</p>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {products.map((product) => (
        <div key={product.id} className="col-6 col-md-4 col-lg-3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};
