import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AdminNavbar = ({ title = 'Admin Dashboard' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-bottom px-4 py-3 d-flex align-items-center justify-content-between sticky-top shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <h4 className="fw-bold mb-0 text-dark font-heading">{title}</h4>
      </div>

      <div className="d-flex align-items-center gap-3">
        <div className="input-group input-group-sm" style={{ width: '220px' }}>
          <span className="input-group-text bg-light border-end-0"><i className="bi bi-search"></i></span>
          <input type="text" className="form-control bg-light border-start-0" placeholder="Search admin..." />
        </div>

        <button className="btn btn-light position-relative rounded-circle p-2">
          <i className="bi bi-bell fs-5 text-dark"></i>
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </button>

        <div className="dropdown">
          <button className="btn btn-light rounded-pill px-3 py-1 d-flex align-items-center gap-2 border" type="button" data-bs-toggle="dropdown">
            <i className="bi bi-person-circle fs-5 text-primary"></i>
            <span className="fw-semibold small">{user?.name || 'Admin'}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
            <li><button className="dropdown-item" onClick={() => navigate('/admin/settings')}><i className="bi bi-gear me-2"></i>Settings</button></li>
            <li><button className="dropdown-item" onClick={() => navigate('/')}><i className="bi bi-shop me-2"></i>Go to Shop</button></li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
          </ul>
        </div>
      </div>
    </header>
  );
};
