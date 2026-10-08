import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../../services/adminService';
import { orderService } from '../../../services/orderService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { LoadingSpinner } from '../../common/Loading';

export const AdminDashboardPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const mRes = await adminService.getDashboardMetrics();
      const oRes = await orderService.getOrders();
      if (mRes.success) setMetrics(mRes.data.summary);
      if (oRes.success) setOrders(oRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-4"><LoadingSpinner text="Loading SmartMart Admin Portal..." /></div>;

  return (
    <div>
      <AdminNavbar title="Executive Overview" />

      <div className="p-4">
        {/* KPI CARDS GRID */}
        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-xl-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-bold">TOTAL REVENUE</span>
                  <h3 className="fw-extrabold text-dark mb-0 font-heading">₹{(metrics?.totalRevenue / 1000).toFixed(1)}k</h3>
                  <span className="badge bg-success-subtle text-success small">{metrics?.revenueGrowth} this month</span>
                </div>
                <div className="p-3 bg-danger text-white rounded-3 fs-3"><i className="bi bi-wallet2"></i></div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-bold">TOTAL ORDERS</span>
                  <h3 className="fw-extrabold text-dark mb-0 font-heading">{metrics?.totalOrders}</h3>
                  <span className="badge bg-success-subtle text-success small">{metrics?.ordersGrowth} growth</span>
                </div>
                <div className="p-3 bg-warning text-dark rounded-3 fs-3"><i className="bi bi-bag-check"></i></div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-bold">TOTAL CUSTOMERS</span>
                  <h3 className="fw-extrabold text-dark mb-0 font-heading">{metrics?.totalCustomers}</h3>
                  <span className="badge bg-success-subtle text-success small">{metrics?.customersGrowth} new</span>
                </div>
                <div className="p-3 bg-primary text-white rounded-3 fs-3"><i className="bi bi-people"></i></div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm h-100">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-muted small fw-bold">COMPARISON ENGINE SCANS</span>
                  <h3 className="fw-extrabold text-dark mb-0 font-heading">{metrics?.comparisonScans}</h3>
                  <span className="badge bg-danger-subtle text-danger small">High Engagement</span>
                </div>
                <div className="p-3 bg-dark text-warning rounded-3 fs-3"><i className="bi bi-cpu"></i></div>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS BAR */}
        <div className="bg-white p-3 rounded-4 border shadow-sm mb-4 d-flex flex-wrap gap-2">
          <Link to="/admin/products/add" className="btn btn-smartmart-primary btn-sm">
            <i className="bi bi-plus-lg me-1"></i> Add Product
          </Link>
          <Link to="/admin/product-import" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-cloud-upload me-1"></i> Import API Products
          </Link>
          <Link to="/admin/offers" className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-percent me-1"></i> Manage Coupons
          </Link>
          <Link to="/admin/analytics" className="btn btn-outline-danger btn-sm ms-auto">
            <i className="bi bi-graph-up me-1"></i> View Detailed Analytics
          </Link>
        </div>

        {/* RECENT ORDERS TABLE */}
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="fw-bold text-dark font-heading mb-0">Recent Supermarket Orders</h5>
            <Link to="/admin/orders" className="btn btn-link text-danger text-decoration-none btn-sm">View All Orders &rarr;</Link>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date &amp; Time</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map(o => (
                  <tr key={o.id}>
                    <td className="fw-bold">{o.id}</td>
                    <td>{o.customerName}</td>
                    <td className="small text-muted">{o.date}</td>
                    <td className="fw-bold text-dark">₹{o.totalAmount}</td>
                    <td><span className="badge bg-light text-dark border">{o.paymentMethod}</span></td>
                    <td><span className="badge bg-success">{o.status}</span></td>
                    <td>
                      <Link to={`/admin/orders`} className="btn btn-sm btn-outline-secondary">Details</Link>
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
