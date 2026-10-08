import React, { useEffect, useState } from 'react';
import { orderService } from '../../../services/orderService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await orderService.getOrders();
    if (res.success) setOrders(res.data);
  };

  const handleStatusChange = async (id, newStatus) => {
    const res = await orderService.updateOrderStatus(id, newStatus);
    if (res.success) {
      showToast(res.message, 'success');
      fetchOrders();
    }
  };

  return (
    <div>
      <AdminNavbar title="Order Fulfilment Management" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Update Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="fw-bold">{o.id}</td>
                    <td>{o.customerName}<br /><span className="small text-muted">{o.customerPhone}</span></td>
                    <td className="small text-muted">{o.date}</td>
                    <td className="fw-bold text-dark">₹{o.totalAmount}</td>
                    <td><span className="badge bg-light text-dark border">{o.paymentMethod}</span></td>
                    <td><span className="badge bg-success">{o.status}</span></td>
                    <td>
                      <select
                        className="form-select form-select-sm"
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
