import React, { useEffect, useState } from 'react';
import { userService } from '../../../services/userService';
import { AdminNavbar } from '../../common/AdminNavbar';

export const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    userService.getCustomers().then(res => setCustomers(res.data));
  }, []);

  return (
    <div>
      <AdminNavbar title="Customer Database" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Contact Info</th>
                  <th>Orders</th>
                  <th>Total Spent</th>
                  <th>Tier</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}>
                    <td className="fw-bold">{c.id}</td>
                    <td className="fw-bold text-dark">{c.name}</td>
                    <td>{c.email}<br /><span className="small text-muted">{c.phone}</span></td>
                    <td>{c.ordersCount} orders</td>
                    <td className="fw-bold text-dark">₹{c.totalSpent}</td>
                    <td><span className="badge bg-warning text-dark">{c.tier}</span></td>
                    <td><span className="badge bg-success">{c.status}</span></td>
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
