import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      const from = location.state?.from?.pathname || (res.user.role === 'ADMIN' ? '/admin/dashboard' : '/');
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="container py-5 max-w-md">
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-lg">
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center text-white rounded-3 mb-2 px-3 py-2 fw-extrabold"
            style={{ background: 'var(--sm-primary)', fontSize: '1.5rem' }}
          >
            SMARTMART
          </div>
          <h4 className="fw-bold font-heading">Login to SmartMart</h4>
          <p className="text-muted small">Compare products &amp; track your supermarket orders</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <label className="form-label small fw-bold">Password</label>
              <Link to="/forgot-password" className="small text-danger text-decoration-none">Forgot?</Link>
            </div>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-smartmart-primary btn-lg w-100 mt-2 shadow" disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-top text-center">
          <span className="small text-muted">Demo Quick Login:</span>
          <div className="d-flex gap-2 mt-2">
            <button className="btn btn-xs btn-outline-secondary w-50" onClick={() => { setEmail('rahul.sharma@example.com'); setPassword('password'); }}>Customer Demo</button>
            <button className="btn btn-xs btn-outline-danger w-50" onClick={() => { setEmail('admin@smartmart.com'); setPassword('admin'); }}>Admin Demo</button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <span className="small text-muted">Don't have an account? </span>
          <Link to="/register" className="small fw-bold text-danger">Register Now</Link>
        </div>
      </div>
    </div>
  );
};
