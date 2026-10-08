import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { PriceDisplay } from './PriceDisplay';
import { ProductRating } from './ProductRating';
import { CompareButton } from './CompareButton';
import { QuickViewModal } from './QuickViewModal';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [showQuickView, setShowQuickView] = useState(false);

  const isLiked = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart`, 'success', 'Cart Updated');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    if (!isLiked) {
      showToast(`Added ${product.name} to wishlist`, 'primary', 'Wishlist');
    }
  };

  const handleQuickViewOpen = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div 
        className="sm-card sm-card-hover h-100 d-flex flex-column position-relative cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Wishlist Icon */}
        <button
          className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-2 shadow-sm z-2"
          onClick={handleWishlist}
          title={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{ width: '32px', height: '32px', padding: 0 }}
        >
          <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
        </button>

        {/* Offer Tag */}
        {product.discountPercentage > 0 && (
          <span className="badge-smartmart-offer position-absolute top-0 start-0 m-2 z-2">
            {product.discountPercentage}% OFF
          </span>
        )}

        {/* Image Box */}
        <div className="position-relative bg-light text-center py-2">
          <img
            src={product.image}
            alt={product.name}
            className="sm-product-img"
            loading="lazy"
          />
          <button
            className="btn btn-sm btn-dark rounded-pill px-3 sm-quick-view-btn shadow"
            onClick={handleQuickViewOpen}
          >
            <i className="bi bi-eye me-1"></i> Quick View
          </button>
        </div>

        {/* Product Details */}
        <div className="p-3 d-flex flex-column flex-grow-1">
          <div className="text-uppercase text-muted fw-semibold" style={{ fontSize: '0.725rem' }}>
            {product.brand}
          </div>
          <h6 className="fw-bold text-dark mb-1 text-truncate" title={product.name}>
            {product.name}
          </h6>
          <div className="text-muted mb-2" style={{ fontSize: '0.8rem' }}>
            Pack: {product.packSize}
          </div>

          <div className="mb-2">
            <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          <div className="mt-auto pt-2 border-top">
            <PriceDisplay price={product.price} mrp={product.mrp} discountPercentage={product.discountPercentage} />
          </div>

          {/* Action Row */}
          <div className="d-flex align-items-center justify-content-between mt-3 pt-2 gap-2">
            <CompareButton product={product} />

            <button
              className="btn btn-smartmart-primary btn-sm d-flex align-items-center gap-1"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <i className="bi bi-cart-plus"></i>
              <span>{product.inStock ? 'Add' : 'Out of Stock'}</span>
            </button>
          </div>
        </div>
      </div>

      {showQuickView && (
        <QuickViewModal product={product} onClose={() => setShowQuickView(false)} />
      )}
    </>
  );
};
