import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { QuantitySelector } from '../../common/QuantitySelector';

export const StoreCartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, grandTotal, totalItems, subtotal } = useCart();
  const { showToast } = useToast();

  const handlePayCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your smart cart is empty. Scan items to add!', 'warning');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="store-cart-tablet-view">
      <div className="container-fluid max-w-6xl">
        {/* TOP SMART CART BAR */}
        <div className="store-cart-card p-3 mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="p-3 bg-danger text-white rounded-3 fs-3 fw-bold">
              <i className="bi bi-cart-check-fill"></i>
            </div>
            <div>
              <div className="badge bg-warning text-dark fw-bold">PHYSICAL CART MOUNTED DISPLAY</div>
              <h3 className="fw-extrabold mb-0 text-white font-heading">SmartMart In-Store Cart #04</h3>
              <span className="small text-slate-400">Scan &rarr; Add &rarr; Track &rarr; Pay</span>
            </div>
          </div>

          {/* LARGE RUNNING TOTAL DISPLAY */}
          <div className="text-end bg-dark p-3 rounded-3 border border-secondary">
            <div className="text-uppercase text-secondary small fw-bold">Running Total Bill</div>
            <div className="display-6 fw-extrabold text-warning">₹{grandTotal}</div>
            <span className="small text-slate-300">{totalItems} Products Scanned</span>
          </div>
        </div>

        <div className="row g-4">
          {/* LEFT: SCANNED ITEMS LIST */}
          <div className="col-lg-8">
            <div className="store-cart-card p-4 mb-4">
              <div className="d-flex align-items-center justify-content-between border-bottom border-slate-700 pb-3 mb-3">
                <h5 className="fw-bold text-white mb-0"><i className="bi bi-upc-scan me-2 text-danger"></i>Scanned Cart Items ({cartItems.length})</h5>
                <button className="btn btn-sm btn-outline-warning" onClick={() => navigate('/scan')}>
                  <i className="bi bi-camera me-1"></i> Scan Next Barcode
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-cart-x display-3 text-slate-500 mb-3 d-block"></i>
                  <h5 className="text-slate-300">No items scanned in smart cart yet</h5>
                  <p className="text-slate-400 small">Use the camera scanner on shelf products to populate your live bill.</p>
                  <button className="btn btn-warning fw-bold mt-2" onClick={() => navigate('/scan')}>
                    Open Barcode Scanner &rarr;
                  </button>
                </div>
              ) : (
                <div className="vstack gap-3 max-h-96 overflow-auto pe-2">
                  {cartItems.map(({ product, quantity }) => (
                    <div key={product.id} className="bg-slate-800 p-3 rounded-3 border border-slate-700 d-flex align-items-center justify-content-between gap-3">
                      <img src={product.image} alt={product.name} className="rounded bg-white p-1" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />

                      <div className="flex-grow-1">
                        <div className="text-warning small fw-bold">{product.brand}</div>
                        <h6 className="fw-bold text-white mb-0">{product.name}</h6>
                        <span className="text-slate-400 small">₹{product.price} / pack</span>
                      </div>

                      <QuantitySelector
                        quantity={quantity}
                        onDecrease={() => updateQuantity(product.id, quantity - 1)}
                        onIncrease={() => updateQuantity(product.id, quantity + 1)}
                      />

                      <div className="text-end" style={{ minWidth: '90px' }}>
                        <div className="fw-extrabold text-warning fs-5">₹{product.price * quantity}</div>
                        <button className="btn btn-xs btn-link text-danger text-decoration-none p-0" onClick={() => removeFromCart(product.id)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: SMART SUGGESTIONS & INSTANT PAY */}
          <div className="col-lg-4">
            <div className="store-cart-card p-4 mb-4">
              <h5 className="fw-bold text-white border-bottom border-slate-700 pb-3 mb-3">
                <i className="bi bi-lightbulb text-warning me-2"></i>Smart In-Store Suggestions
              </h5>
              <div className="alert alert-info py-2 small bg-slate-800 text-slate-200 border-slate-700 mb-3">
                <i className="bi bi-tag-fill me-1 text-warning"></i> Shoppers buying Atta also picked up <strong>Amul Ghee 1L</strong>!
              </div>

              <button
                className="btn btn-warning btn-lg w-100 fw-extrabold shadow py-3 text-dark mb-3"
                onClick={handlePayCheckout}
              >
                <i className="bi bi-lightning-fill me-2"></i> 1-Tap Pay &amp; Checkout (₹{grandTotal})
              </button>

              <button className="btn btn-outline-light w-100 btn-sm" onClick={() => navigate('/')}>
                Exit Smart Cart Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
