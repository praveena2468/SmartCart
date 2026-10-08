import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../../services/orderService';
import { Breadcrumb } from '../../common/Breadcrumb';
import { LoadingSpinner } from '../../common/Loading';

export const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await orderService.getOrders();
      if (res.success) setOrders(res.data);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="container py-4 max-w-4xl">
      <Breadcrumb items={[{ label: 'My Orders' }]} />

      <h2 className="fw-bold font-heading mb-4">My Orders History</h2>

      {loading ? (
        <LoadingSpinner text="Fetching your supermarket orders..." />
      ) : orders.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border">
          <i className="bi bi-box-seam display-3 text-muted"></i>
          <h5 className="fw-bold mt-3">No orders found</h5>
          <Link to="/products" className="btn btn-smartmart-primary mt-2">Start Shopping</Link>
        </div>
      ) : (
        <div className="vstack gap-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-4 border shadow-sm">
              <div className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-3 mb-3 gap-2">
                <div>
                  <span className="fw-bold text-dark me-2">Order #{order.id}</span>
                  <span className="badge bg-success">{order.status}</span>
                </div>
                <div className="small text-muted">
                  Placed on {order.date}
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="small text-muted d-block">{order.items?.length || 0} Products</span>
                  <span className="fw-extrabold text-dark fs-5">₹{order.totalAmount}</span>
                </div>

                <Link to={`/orders/${order.id}`} className="btn btn-outline-danger btn-sm fw-semibold">
                  Track &amp; View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
