import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import { SearchBar } from './SearchBar';

export const CustomerNavbar = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky-top bg-white border-bottom shadow-sm" style={{ zIndex: 1040 }}>
      {/* Top Banner Bar */}
      <div className="bg-dark text-white py-1 px-3 small d-none d-md-block">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <span><i className="bi bi-geo-alt text-warning me-1"></i> Deliver to: <strong>Bengaluru 560038</strong></span>
            <span><i className="bi bi-clock me-1"></i> Delivery in <strong>15-30 mins</strong></span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/scan" className="text-white text-decoration-none hover-warning">
              <i className="bi bi-qr-code-scan me-1"></i> Barcode Scanner
            </Link>
            <span className="text-secondary">|</span>
            <Link to="/store-cart" className="text-warning fw-bold text-decoration-none">
              <i className="bi bi-cart-check me-1"></i> Smart In-Store Cart
            </Link>
            <span className="text-secondary">|</span>
            {user ? (
              <span className="text-light">Hi, {user.name}</span>
            ) : (
              <Link to="/login" className="text-white text-decoration-none">Login / Register</Link>
            )}
            {isAdmin && (
              <Link to="/admin/dashboard" className="btn btn-xs btn-outline-warning ms-2">Admin Portal</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container-fluid py-2 px-3">
        <div className="d-flex align-items-center justify-content-between gap-3">
          {/* Logo */}
          <Link to="/" className="navbar-brand d-flex align-items-center me-3 text-decoration-none">
            <div 
              className="d-flex align-items-center justify-content-center text-white rounded-3 me-2 px-2 py-1 fw-extrabold"
              style={{ background: 'var(--sm-primary)', fontSize: '1.25rem', letterSpacing: '0.5px' }}
            >
              SM
            </div>
            <div>
              <span className="fw-black fs-4 tracking-tight" style={{ color: 'var(--sm-primary)', fontFamily: 'Outfit, sans-serif' }}>
                SMART<span className="text-dark">MART</span>
              </span>
              <div className="text-muted" style={{ fontSize: '0.65rem', marginTop: '-4px', fontWeight: 600 }}>
                COMPARE &amp; SHOP SMARTER
              </div>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="d-none d-lg-block flex-grow-1 mx-4 max-w-xl">
            <SearchBar />
          </div>

          {/* Desktop Quick Links */}
          <div className="d-none d-lg-flex align-items-center gap-3">
            {/* Compare Badge */}
            <Link to="/compare" className="btn btn-outline-secondary position-relative rounded-pill px-3 py-1 d-flex align-items-center gap-1">
              <i className="bi bi-arrow-left-right text-primary"></i>
              <span className="fw-semibold small">Compare</span>
              {compareCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="btn btn-outline-secondary position-relative rounded-pill px-3 py-1 d-flex align-items-center gap-1">
              <i className="bi bi-heart text-danger"></i>
              <span className="fw-semibold small">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="btn btn-smartmart-primary rounded-pill px-3 py-1 d-flex align-items-center gap-2">
              <i className="bi bi-cart3 fs-5"></i>
              <div className="text-start leading-tight">
                <div className="fw-bold" style={{ fontSize: '0.85rem' }}>Cart</div>
                <div style={{ fontSize: '0.7rem' }}>{totalItems} items</div>
              </div>
            </Link>

            {/* Account dropdown */}
            {user ? (
              <div className="dropdown">
                <button className="btn btn-light rounded-circle p-2 shadow-sm" type="button" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle fs-5 text-dark"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li><h6 className="dropdown-header">{user.name} ({user.role})</h6></li>
                  <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
                  <li><Link className="dropdown-item" to="/orders"><i className="bi bi-box-seam me-2"></i>My Orders</Link></li>
                  <li><Link className="dropdown-item" to="/wishlist"><i className="bi bi-heart me-2"></i>Wishlist</Link></li>
                  {isAdmin && (
                    <li><Link className="dropdown-item text-danger fw-bold" to="/admin/dashboard"><i className="bi bi-speedometer2 me-2"></i>Admin Dashboard</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="btn btn-outline-dark rounded-pill px-3">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="d-flex d-lg-none align-items-center gap-2">
            <Link to="/compare" className="btn btn-sm btn-light position-relative">
              <i className="bi bi-arrow-left-right fs-5"></i>
              {compareCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{compareCount}</span>}
            </Link>

            <Link to="/cart" className="btn btn-sm btn-smartmart-primary position-relative">
              <i className="bi bi-cart3 fs-5"></i>
              {totalItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">{totalItems}</span>}
            </Link>

            <button
              className="btn btn-light border-0 ms-1"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`bi ${mobileMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-3`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="d-lg-none mt-2">
          <SearchBar />
        </div>
      </div>

      {/* Navigation Links Bar */}
      <nav className="bg-light border-top border-bottom py-1 px-3 d-none d-lg-block">
        <div className="container-fluid d-flex align-items-center gap-3">
          <NavLink to="/" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            All Products
          </NavLink>
          <NavLink to="/category/foodgrains-atta" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            Foodgrains &amp; Atta
          </NavLink>
          <NavLink to="/category/dairy-bakery" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            Dairy &amp; Bakery
          </NavLink>
          <NavLink to="/category/beverages" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            Beverages
          </NavLink>
          <NavLink to="/category/snacks-munchies" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            Snacks &amp; Munchies
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `nav-link-smartmart text-decoration-none fw-bold text-danger ${isActive ? 'active' : ''}`}>
            <i className="bi bi-cpu me-1"></i> Product Compare
          </NavLink>
          <NavLink to="/scan" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            <i className="bi bi-qr-code-scan me-1"></i> Barcode Scanner
          </NavLink>
          <NavLink to="/store-cart" className={({ isActive }) => `nav-link-smartmart text-decoration-none ${isActive ? 'active' : ''}`}>
            <i className="bi bi-cart-check me-1"></i> Smart Supermarket Cart
          </NavLink>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="bg-white border-bottom p-3 d-lg-none shadow">
          <ul className="nav flex-column gap-2 mb-3">
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold" to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold" to="/products" onClick={() => setMobileMenuOpen(false)}>Products Catalog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-danger fw-bold" to="/compare" onClick={() => setMobileMenuOpen(false)}>⚡ Compare Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold" to="/scan" onClick={() => setMobileMenuOpen(false)}>📷 Scan Barcode</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark fw-bold" to="/store-cart" onClick={() => setMobileMenuOpen(false)}>🛒 Smart In-Store Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/wishlist" onClick={() => setMobileMenuOpen(false)}>Wishlist ({wishlistCount})</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className="nav-link text-danger fw-bold" to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};
