import React, { useEffect, useState } from 'react';
import { reviewService } from '../../../services/reviewService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const res = await reviewService.getReviews();
    if (res.success) setReviews(res.data);
  };

  const handleStatus = async (id, status) => {
    const res = await reviewService.updateReviewStatus(id, status);
    if (res.success) {
      showToast(res.message, 'success');
      fetchReviews();
    }
  };

  const handleDelete = async (id) => {
    const res = await reviewService.deleteReview(id);
    if (res.success) {
      showToast(res.message, 'danger');
      fetchReviews();
    }
  };

  return (
    <div>
      <AdminNavbar title="Customer Reviews Moderation" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Review Title &amp; Comment</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(r => (
                  <tr key={r.id}>
                    <td className="fw-bold small">{r.productName}</td>
                    <td>{r.customerName}</td>
                    <td><span className="badge bg-warning text-dark">{r.rating} ⭐</span></td>
                    <td>
                      <strong className="d-block">{r.title}</strong>
                      <span className="small text-muted">{r.comment}</span>
                    </td>
                    <td className="small text-muted">{r.date}</td>
                    <td><span className={`badge ${r.status === 'Approved' ? 'bg-success' : 'bg-secondary'}`}>{r.status}</span></td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-xs btn-success" onClick={() => handleStatus(r.id, 'Approved')}>Approve</button>
                        <button className="btn btn-xs btn-warning text-dark" onClick={() => handleStatus(r.id, 'Rejected')}>Reject</button>
                        <button className="btn btn-xs btn-danger" onClick={() => handleDelete(r.id)}>Delete</button>
                      </div>
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
