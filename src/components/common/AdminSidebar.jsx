import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/admin/products', icon: 'bi-box-seam', label: 'Products' },
    { path: '/admin/categories', icon: 'bi-grid-3x3-gap', label: 'Categories' },
    { path: '/admin/brands', icon: 'bi-tags', label: 'Brands' },
    { path: '/admin/orders', icon: 'bi-receipt', label: 'Orders' },
    { path: '/admin/customers', icon: 'bi-people', label: 'Customers' },
    { path: '/admin/reviews', icon: 'bi-star-half', label: 'Reviews' },
    { path: '/admin/offers', icon: 'bi-percent', label: 'Offers & Coupons' },
    { path: '/admin/inventory', icon: 'bi-boxes', label: 'Inventory' },
    { path: '/admin/comparisons', icon: 'bi-cpu', label: 'Comparison Engine' },
    { path: '/admin/product-import', icon: 'bi-file-earmark-arrow-up', label: 'Product Import' },
    { path: '/admin/api-data', icon: 'bi-cloud-download', label: 'API Data Sources' },
    { path: '/admin/analytics', icon: 'bi-graph-up-arrow', label: 'Analytics' },
    { path: '/admin/settings', icon: 'bi-gear', label: 'Settings' }
  ];

  return (
    <aside className="admin-sidebar p-3 d-flex flex-column border-end shadow-sm">
      <div className="mb-4 text-center border-bottom pb-3">
        <Link to="/admin/dashboard" className="text-decoration-none">
          <h4 className="fw-extrabold text-white mb-0" style={{ color: 'var(--sm-primary)', fontFamily: 'Outfit, sans-serif' }}>
            SMART<span className="text-warning">MART</span> ADMIN
          </h4>
          <span className="badge bg-danger mt-1 small">Management Portal</span>
        </Link>
      </div>

      <nav className="nav flex-column flex-grow-1 overflow-auto pe-1">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-3 border-top mt-auto">
        <Link to="/" className="btn btn-outline-light w-100 btn-sm">
          <i className="bi bi-box-arrow-up-right me-2"></i> Return to Store
        </Link>
      </div>
    </aside>
  );
};
