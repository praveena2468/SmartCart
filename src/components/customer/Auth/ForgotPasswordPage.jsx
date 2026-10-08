import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    showToast('Password reset link sent to your email!', 'success');
  };

  return (
    <div className="container py-5 max-w-md">
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-lg">
        <h4 className="fw-bold font-heading mb-2">Reset Password</h4>
        <p className="text-muted small mb-4">Enter your registered email address to receive password recovery instructions.</p>

        {sent ? (
          <div className="alert alert-success text-center">
            <i className="bi bi-check-circle-fill display-4 d-block mb-2 text-success"></i>
            <strong>Reset link sent!</strong> Check your email inbox.
            <div className="mt-3">
              <Link to="/login" className="btn btn-outline-success btn-sm">Return to Login</Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Email Address</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-smartmart-primary w-100">Send Reset Link</button>
          </form>
        )}
      </div>
    </div>
  );
};
