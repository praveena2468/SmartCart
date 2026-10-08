import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { PriceDisplay } from './PriceDisplay';
import { ProductRating } from './ProductRating';
import { SmartScoreBadge } from './SmartScoreBadge';
import { CompareButton } from './CompareButton';
import { QuantitySelector } from './QuantitySelector';

export const QuickViewModal = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    showToast(`Added ${qty} x ${product.name} to cart`, 'success');
    onClose();
  };

  const handleFullDetails = () => {
    onClose();
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="modal show d-block fade" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-muted small">PRODUCT QUICK VIEW</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            <div className="row g-4 align-items-center">
              <div className="col-md-5 text-center bg-light p-3 rounded-3">
                <img src={product.image} alt={product.name} className="img-fluid" style={{ maxHeight: '250px', objectFit: 'contain' }} />
              </div>
              <div className="col-md-7">
                <div className="text-uppercase text-muted fw-bold small">{product.brand}</div>
                <h4 className="fw-bold text-dark mb-2">{product.name}</h4>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
                  <SmartScoreBadge score={product.smartScore?.overallScore} />
                </div>

                <div className="mb-3">
                  <PriceDisplay price={product.price} mrp={product.mrp} discountPercentage={product.discountPercentage} unitSize={product.packSize} />
                </div>

                <p className="text-muted small mb-3">{product.description}</p>

                {product.offers?.length > 0 && (
                  <div className="alert alert-warning py-2 small mb-3">
                    <i className="bi bi-tag-fill me-1"></i> {product.offers[0]}
                  </div>
                )}

                <div className="d-flex align-items-center gap-3 mb-4">
                  <span className="fw-bold text-muted small">Quantity:</span>
                  <QuantitySelector quantity={qty} onDecrease={() => setQty(q => Math.max(1, q - 1))} onIncrease={() => setQty(q => q + 1)} />
                </div>

                <div className="d-flex flex-wrap gap-2 align-items-center">
                  <button className="btn btn-smartmart-primary px-4" onClick={handleAddToCart}>
                    <i className="bi bi-cart-plus me-1"></i> Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary" onClick={() => toggleWishlist(product)}>
                    <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'} me-1`}></i>
                    {isLiked ? 'Saved' : 'Wishlist'}
                  </button>
                  <CompareButton product={product} variant="button" />
                  <button className="btn btn-link text-decoration-none text-muted ms-auto" onClick={handleFullDetails}>
                    View Full Details &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
