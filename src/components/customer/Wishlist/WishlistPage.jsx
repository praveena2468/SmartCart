import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { Breadcrumb } from '../../common/Breadcrumb';
import { ProductGrid } from '../../common/ProductGrid';

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
        <div className="bg-white p-5 rounded-4 border shadow-sm my-4">
          <i className="bi bi-heart display-1 text-muted"></i>
          <h3 className="fw-bold font-heading mt-3">Your Wishlist is Empty</h3>
          <p className="text-muted">Save your favorite staples &amp; brand deals to access them quickly anytime.</p>
          <Link to="/products" className="btn btn-smartmart-primary px-4 mt-2">Browse Supermarket Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Wishlist' }]} />
      <h2 className="fw-bold font-heading mb-4">Saved Products Wishlist ({wishlistItems.length})</h2>

      <ProductGrid products={wishlistItems} />
    </div>
  );
};
