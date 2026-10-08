import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useToast } from '../../../context/ToastContext';
import { Breadcrumb } from '../../common/Breadcrumb';
import { QuantitySelector } from '../../common/QuantitySelector';

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalMrp,
    productDiscount,
    couponDiscount,
    deliveryFee,
    tax,
    grandTotal,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = await applyCoupon(couponInput.trim());
    if (res.success) {
      showToast(res.message, 'success');
      setCouponInput('');
    } else {
      showToast(res.message, 'danger');
    }
  };

  const handleMoveToWishlist = (product) => {
    toggleWishlist(product);
    removeFromCart(product.id);
    showToast(`Moved ${product.name} to Wishlist`, 'info');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-5">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />
        <div className="text-center py-5 bg-white rounded-4 border shadow-sm my-4">
          <div className="mb-3 text-muted">
            <i className="bi bi-cart-x display-1" style={{ color: 'var(--sm-primary)' }}></i>
          </div>
          <h3 className="fw-bold font-heading">Your Shopping Cart is Empty</h3>
          <p className="text-muted max-w-md mx-auto mb-4">
            Looks like you haven't added any supermarket items to your cart yet. Explore our fresh staples and brand comparison deals!
          </p>
          <Link to="/products" className="btn btn-smartmart-primary btn-lg px-5">
            Explore Supermarket Catalogue &rarr;
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="fw-bold font-heading mb-0">Your SmartMart Cart ({cartItems.length} items)</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
          <i className="bi bi-trash me-1"></i> Clear Cart
        </button>
      </div>

      <div className="row g-4">
        {/* LEFT: CART ITEMS LIST */}
        <div className="col-lg-8">
          <div className="vstack gap-3">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white p-3 rounded-4 border shadow-sm d-flex flex-column flex-sm-row align-items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded bg-light p-2"
                  style={{ width: '90px', height: '90px', objectFit: 'contain' }}
                />

                <div className="flex-grow-1 text-center text-sm-start">
                  <div className="text-uppercase text-muted fw-bold small">{product.brand}</div>
                  <h6 className="fw-bold text-dark mb-1">{product.name}</h6>
                  <div className="small text-muted mb-2">Pack: {product.packSize}</div>

                  <div className="d-flex align-items-center justify-content-center justify-content-sm-start gap-2">
                    <span className="fw-extrabold text-dark">₹{product.price}</span>
                    {product.mrp && <span className="text-muted small text-decoration-line-through">₹{product.mrp}</span>}
                    {product.discountPercentage > 0 && <span className="badge bg-danger small">{product.discountPercentage}% OFF</span>}
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center gap-2">
                  <QuantitySelector
                    quantity={quantity}
                    onDecrease={() => updateQuantity(product.id, quantity - 1)}
                    onIncrease={() => updateQuantity(product.id, quantity + 1)}
                  />
                  <div className="fw-bold text-danger">Subtotal: ₹{product.price * quantity}</div>
                </div>

                <div className="d-flex flex-sm-column gap-2 ms-sm-2">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    title="Move to Wishlist"
                    onClick={() => handleMoveToWishlist(product)}
                  >
                    <i className="bi bi-heart"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    title="Remove item"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Link to="/products" className="btn btn-outline-dark">
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* RIGHT: CART SUMMARY */}
        <div className="col-lg-4">
          <div className="bg-white p-4 rounded-4 border shadow-sm sticky-top" style={{ top: '90px' }}>
            <h5 className="fw-bold text-dark font-heading border-bottom pb-3 mb-3">Order Summary</h5>

            {/* Coupon Code Section */}
            <div className="mb-4">
              <label className="fw-semibold small text-muted mb-2">Apply Promo Coupon</label>
              {appliedCoupon ? (
                <div className="alert alert-success d-flex align-items-center justify-content-between py-2 px-3 small mb-0">
                  <span><i className="bi bi-patch-check-fill me-1"></i> Coupon <strong>{appliedCoupon.code}</strong> Applied!</span>
                  <button className="btn-close btn-sm" onClick={removeCoupon}></button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="input-group input-group-sm">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter code (e.g. FESTIVE100)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button className="btn btn-smartmart-primary" type="submit">Apply</button>
                </form>
              )}
              {couponError && <div className="text-danger small mt-1">{couponError}</div>}
              <div className="small text-muted mt-2">
                Available: <span className="badge bg-light text-dark border me-1 cursor-pointer" onClick={() => setCouponInput('FESTIVE100')}>FESTIVE100</span>
                <span className="badge bg-light text-dark border cursor-pointer" onClick={() => setCouponInput('ATTASAVER')}>ATTASAVER</span>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="vstack gap-2 border-bottom pb-3 mb-3 small">
              <div className="d-flex justify-content-between">
                <span className="text-muted">Total Product MRP</span>
                <span>₹{totalMrp}</span>
              </div>
              <div className="d-flex justify-content-between text-success">
                <span>Product Instant Discount</span>
                <span>- ₹{productDiscount}</span>
              </div>
              {appliedCoupon && (
                <div className="d-flex justify-content-between text-success">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}
              <div className="d-flex justify-content-between">
                <span className="text-muted">Delivery Charges</span>
                <span>{deliveryFee === 0 ? <strong className="text-success">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Estimated GST Tax (5%)</span>
                <span>₹{tax}</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="d-flex align-items-baseline justify-content-between mb-4">
              <span className="fw-bold fs-5 text-dark">Total Payable</span>
              <span className="fw-extrabold fs-4" style={{ color: 'var(--sm-primary)' }}>₹{grandTotal}</span>
            </div>

            <button
              className="btn btn-smartmart-primary btn-lg w-100 shadow"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
