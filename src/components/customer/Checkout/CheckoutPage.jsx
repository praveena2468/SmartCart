import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { orderService } from '../../../services/orderService';
import { Breadcrumb } from '../../common/Breadcrumb';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, grandTotal, deliveryFee, tax, clearCart } = useCart();
  const { showToast } = useToast();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [address, setAddress] = useState({
    name: 'Rahul Sharma',
    houseNo: 'Flat 402, Sunshine Heights',
    street: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    phone: '+91 98765 43210'
  });

  const [deliverySpeed, setDeliverySpeed] = useState('express');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    showToast('Verifying payment & placing order...', 'primary');

    setTimeout(async () => {
      const orderPayload = {
        totalAmount: grandTotal,
        items: cartItems.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image
        })),
        deliveryAddress: address,
        paymentMethod: paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'netbanking' ? 'Net Banking' : 'Cash on Delivery',
        customerName: address.name,
        customerPhone: address.phone
      };

      const res = await orderService.createOrder(orderPayload);
      setIsProcessing(false);

      if (res.success) {
        clearCart();
        showToast('Order placed successfully!', 'success');
        navigate(`/orders/${res.data.id}`);
      }
    }, 2000);
  };

  return (
    <div className="container py-4 max-w-4xl">
      <Breadcrumb items={[{ label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />

      {/* Checkout Progress Stepper */}
      <div className="bg-white p-3 rounded-4 border shadow-sm mb-4">
        <div className="d-flex justify-content-around text-center">
          <div className={`fw-bold ${step >= 1 ? 'text-danger' : 'text-muted'}`}>
            <span className={`badge rounded-circle me-1 ${step >= 1 ? 'bg-danger' : 'bg-secondary'}`}>1</span> Address
          </div>
          <div className="text-muted">&rarr;</div>
          <div className={`fw-bold ${step >= 2 ? 'text-danger' : 'text-muted'}`}>
            <span className={`badge rounded-circle me-1 ${step >= 2 ? 'bg-danger' : 'bg-secondary'}`}>2</span> Delivery Slot
          </div>
          <div className="text-muted">&rarr;</div>
          <div className={`fw-bold ${step >= 3 ? 'text-danger' : 'text-muted'}`}>
            <span className={`badge rounded-circle me-1 ${step >= 3 ? 'bg-danger' : 'bg-secondary'}`}>3</span> Payment
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          {/* STEP 1: ADDRESS */}
          {step === 1 && (
            <div className="bg-white p-4 rounded-4 border shadow-sm">
              <h5 className="fw-bold text-dark font-heading mb-3"><i className="bi bi-geo-alt me-2 text-danger"></i>Select Delivery Address</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Full Name</label>
                  <input type="text" className="form-control" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">House / Flat No.</label>
                  <input type="text" className="form-control" value={address.houseNo} onChange={(e) => setAddress({ ...address, houseNo: e.target.value })} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Street / Area</label>
                  <input type="text" className="form-control" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">City</label>
                  <input type="text" className="form-control" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">State</label>
                  <input type="text" className="form-control" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Pincode</label>
                  <input type="text" className="form-control" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} required />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold">Phone Number</label>
                  <input type="text" className="form-control" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} required />
                </div>
              </div>
              <button className="btn btn-smartmart-primary btn-lg w-100 mt-4" onClick={() => setStep(2)}>
                Continue to Delivery Slot &rarr;
              </button>
            </div>
          )}

          {/* STEP 2: DELIVERY SLOT */}
          {step === 2 && (
            <div className="bg-white p-4 rounded-4 border shadow-sm">
              <h5 className="fw-bold text-dark font-heading mb-3"><i className="bi bi-truck me-2 text-danger"></i>Choose Delivery Option</h5>
              <div className="vstack gap-3 mb-4">
                <div className={`p-3 border rounded-3 cursor-pointer ${deliverySpeed === 'express' ? 'border-danger bg-danger-subtle' : ''}`} onClick={() => setDeliverySpeed('express')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="speed" id="express" checked={deliverySpeed === 'express'} onChange={() => setDeliverySpeed('express')} />
                    <label className="form-check-label fw-bold text-dark" htmlFor="express">
                      ⚡ Supermarket Express Delivery (15 - 30 Mins)
                    </label>
                    <div className="small text-muted">Items picked from nearest SmartMart Bengaluru Hub</div>
                  </div>
                </div>

                <div className={`p-3 border rounded-3 cursor-pointer ${deliverySpeed === 'standard' ? 'border-danger bg-danger-subtle' : ''}`} onClick={() => setDeliverySpeed('standard')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="speed" id="standard" checked={deliverySpeed === 'standard'} onChange={() => setDeliverySpeed('standard')} />
                    <label className="form-check-label fw-bold text-dark" htmlFor="standard">
                      📅 Scheduled Delivery Slot (Today, 6 PM - 8 PM)
                    </label>
                    <div className="small text-muted">No additional delivery charge</div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={() => setStep(1)}>&larr; Back</button>
                <button className="btn btn-smartmart-primary" onClick={() => setStep(3)}>Proceed to Payment &rarr;</button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {step === 3 && (
            <div className="bg-white p-4 rounded-4 border shadow-sm">
              <h5 className="fw-bold text-dark font-heading mb-3"><i className="bi bi-wallet2 me-2 text-danger"></i>Select Payment Method</h5>

              <div className="vstack gap-3 mb-4">
                <div className={`p-3 border rounded-3 ${paymentMethod === 'upi' ? 'border-danger bg-danger-subtle' : ''}`} onClick={() => setPaymentMethod('upi')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                    <label className="form-check-label fw-bold text-dark" htmlFor="upi">
                      📱 Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                    </label>
                    <div className="small text-muted">Scan QR or enter UPI ID at popup</div>
                  </div>
                </div>

                <div className={`p-3 border rounded-3 ${paymentMethod === 'card' ? 'border-danger bg-danger-subtle' : ''}`} onClick={() => setPaymentMethod('card')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <label className="form-check-label fw-bold text-dark" htmlFor="card">
                      💳 Credit / Debit Card (Visa, MasterCard, RuPay)
                    </label>
                  </div>
                </div>

                <div className={`p-3 border rounded-3 ${paymentMethod === 'netbanking' ? 'border-danger bg-danger-subtle' : ''}`} onClick={() => setPaymentMethod('netbanking')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} />
                    <label className="form-check-label fw-bold text-dark" htmlFor="netbanking">
                      🏦 Net Banking (HDFC, ICICI, SBI, Axis)
                    </label>
                  </div>
                </div>

                <div className={`p-3 border rounded-3 ${paymentMethod === 'cod' ? 'border-danger bg-danger-subtle' : ''}`} onClick={() => setPaymentMethod('cod')}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <label className="form-check-label fw-bold text-dark" htmlFor="cod">
                      💵 Cash on Delivery (COD)
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-secondary" onClick={() => setStep(2)} disabled={isProcessing}>&larr; Back</button>
                <button className="btn btn-smartmart-primary btn-lg px-4" onClick={handlePlaceOrder} disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing Payment...
                    </>
                  ) : (
                    `Pay ₹${grandTotal} & Place Order`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="col-md-4">
          <div className="bg-white p-4 rounded-4 border shadow-sm">
            <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">Order Items ({cartItems.length})</h6>
            <div className="vstack gap-2 mb-3 max-h-64 overflow-auto">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="d-flex align-items-center justify-content-between small">
                  <span className="text-truncate max-w-xs">{product.name} x {quantity}</span>
                  <span className="fw-bold">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-top pt-3 vstack gap-2 small">
              <div className="d-flex justify-content-between">
                <span className="text-muted">Delivery Charge</span>
                <span>{deliveryFee === 0 ? <span className="text-success fw-bold">FREE</span> : `₹${deliveryFee}`}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">GST Tax</span>
                <span>₹{tax}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-6 text-dark border-top pt-2">
                <span>Grand Total</span>
                <span style={{ color: 'var(--sm-primary)' }}>₹{grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
