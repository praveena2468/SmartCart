import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../../services/orderService';
import { Breadcrumb } from '../../common/Breadcrumb';
import { LoadingSpinner } from '../../common/Loading';

export const OrderDetailsPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      const res = await orderService.getOrderById(id);
      if (res.success) setOrder(res.data);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="container py-5"><LoadingSpinner text="Fetching order tracking status..." /></div>;
  if (!order) return <div className="container py-5 text-center"><h4>Order not found</h4></div>;

  return (
    <div className="container py-4 max-w-4xl">
      <Breadcrumb items={[{ label: 'Orders', path: '/orders' }, { label: `Order #${order.id}` }]} />

      {/* Header Banner */}
      <div className="bg-white p-4 rounded-4 border shadow-sm mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div>
            <span className="badge bg-success mb-1">Status: {order.status}</span>
            <h3 className="fw-bold font-heading mb-1 text-dark">Order #{order.id}</h3>
            <span className="text-muted small"><i className="bi bi-calendar3 me-1"></i> Placed on {order.date}</span>
          </div>

          <div className="text-end">
            <div className="text-muted small">Total Amount</div>
            <div className="fw-extrabold fs-4" style={{ color: 'var(--sm-primary)' }}>₹{order.totalAmount}</div>
          </div>
        </div>
      </div>

      {/* VISUAL ORDER TIMELINE */}
      <div className="bg-white p-4 rounded-4 border shadow-sm mb-4">
        <h5 className="fw-bold text-dark font-heading mb-4"><i className="bi bi-clock-history me-2 text-danger"></i>Live Delivery Tracking</h5>

        <div className="row g-3 text-center">
          {order.timeline?.map((step, idx) => (
            <div key={idx} className="col">
              <div className={`p-3 rounded-3 border h-100 ${step.completed ? 'bg-success bg-opacity-10 border-success' : 'bg-light text-muted'}`}>
                <div className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${step.completed ? 'bg-success text-white' : 'bg-secondary text-white'}`} style={{ width: 36, height: 36 }}>
                  {step.completed ? <i className="bi bi-check-lg"></i> : (idx + 1)}
                </div>
                <div className={`fw-bold small ${step.completed ? 'text-success' : 'text-muted'}`}>{step.status}</div>
                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{step.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERED PRODUCTS */}
      <div className="bg-white p-4 rounded-4 border shadow-sm mb-4">
        <h5 className="fw-bold text-dark font-heading mb-3"><i className="bi bi-bag-check me-2 text-danger"></i>Ordered Items</h5>
        <div className="vstack gap-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="d-flex align-items-center gap-3 border-bottom pb-3">
              <img src={item.image} alt={item.name} className="rounded bg-light p-2" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
              <div className="flex-grow-1">
                <h6 className="fw-bold text-dark mb-0">{item.name}</h6>
                <span className="small text-muted">Quantity: {item.quantity} x ₹{item.price}</span>
              </div>
              <div className="fw-bold text-dark">₹{item.price * item.quantity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DELIVERY & PAYMENT DETAILS */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100">
            <h6 className="fw-bold text-dark mb-3"><i className="bi bi-geo-alt me-2 text-danger"></i>Delivery Address</h6>
            <p className="mb-1 fw-bold">{order.deliveryAddress?.name}</p>
            <p className="small text-muted mb-0">
              {order.deliveryAddress?.houseNo}, {order.deliveryAddress?.street}<br />
              {order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="bg-white p-4 rounded-4 border shadow-sm h-100">
            <h6 className="fw-bold text-dark mb-3"><i className="bi bi-credit-card me-2 text-danger"></i>Payment Summary</h6>
            <div className="d-flex justify-content-between small mb-2">
              <span className="text-muted">Payment Method:</span>
              <span className="fw-bold">{order.paymentMethod}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span className="text-muted">Payment Status:</span>
              <span className="badge bg-success">{order.paymentStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
