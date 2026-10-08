import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register({ name, email, phone, password });
    if (res.success) {
      showToast('Account created successfully! Welcome to SmartMart.', 'success');
      navigate('/');
    }
  };

  return (
    <div className="container py-5 max-w-md">
      <div className="bg-white p-4 p-md-5 rounded-4 border shadow-lg">
        <div className="text-center mb-4">
          <h4 className="fw-bold font-heading">Create SmartMart Account</h4>
          <p className="text-muted small">Join India's smart supermarket network</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold">Full Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Email Address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Mobile Phone</label>
            <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-smartmart-primary btn-lg w-100 mt-2 shadow">
            Create Account
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="small text-muted">Already have an account? </span>
          <Link to="/login" className="small fw-bold text-danger">Sign In</Link>
        </div>
      </div>
    </div>
  );
};
