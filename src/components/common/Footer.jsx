import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      {/* Customer Trust Section */}
      <div className="container border-bottom border-secondary pb-4 mb-5">
        <div className="row g-4 text-center">
          <div className="col-6 col-md-3">
            <div className="p-3 bg-secondary bg-opacity-10 rounded-3 h-100">
              <i className="bi bi-shield-check text-warning display-6 mb-2 d-block"></i>
              <h6 className="fw-bold text-white mb-1">100% Genuine Products</h6>
              <span className="small text-secondary">Directly sourced from trusted brands &amp; distributors</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 bg-secondary bg-opacity-10 rounded-3 h-100">
              <i className="bi bi-lightning-charge text-warning display-6 mb-2 d-block"></i>
              <h6 className="fw-bold text-white mb-1">Ultra Fast Delivery</h6>
              <span className="small text-secondary">Supermarket items at your door in 15-30 minutes</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 bg-secondary bg-opacity-10 rounded-3 h-100">
              <i className="bi bi-cpu text-warning display-6 mb-2 d-block"></i>
              <h6 className="fw-bold text-white mb-1">Smart Product Compare</h6>
              <span className="small text-secondary">Compare prices, quality &amp; ratings across major brands</span>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="p-3 bg-secondary bg-opacity-10 rounded-3 h-100">
              <i className="bi bi-arrow-counterclockwise text-warning display-6 mb-2 d-block"></i>
              <h6 className="fw-bold text-white mb-1">Hassle-Free Returns</h6>
              <span className="small text-secondary">Instant refund guarantee at doorstep delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mb-4">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="d-flex align-items-center mb-3">
              <div 
                className="d-flex align-items-center justify-content-center text-white rounded-3 me-2 px-2 py-1 fw-extrabold"
                style={{ background: 'var(--sm-primary)', fontSize: '1.25rem' }}
              >
                SM
              </div>
              <span className="fw-black fs-4 tracking-tight" style={{ color: 'var(--sm-primary)', fontFamily: 'Outfit, sans-serif' }}>
                SMART<span className="text-white">MART</span>
              </span>
            </div>
            <p className="text-secondary small mb-4">
              SmartMart is India's premier intelligent supermarket shopping platform combining price comparison, brand intelligence, smart cart scanning and seamless digital checkout.
            </p>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-light btn-sm rounded-circle" style={{ width: 36, height: 36 }}><i className="bi bi-facebook"></i></button>
              <button className="btn btn-outline-light btn-sm rounded-circle" style={{ width: 36, height: 36 }}><i className="bi bi-twitter"></i></button>
              <button className="btn btn-outline-light btn-sm rounded-circle" style={{ width: 36, height: 36 }}><i className="bi bi-instagram"></i></button>
              <button className="btn btn-outline-light btn-sm rounded-circle" style={{ width: 36, height: 36 }}><i className="bi bi-youtube"></i></button>
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase text-warning mb-3 small">Top Categories</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/category/foodgrains-atta" className="footer-link">Foodgrains &amp; Atta</Link></li>
              <li><Link to="/category/dairy-bakery" className="footer-link">Dairy &amp; Milk Products</Link></li>
              <li><Link to="/category/beverages" className="footer-link">Beverages &amp; Tea</Link></li>
              <li><Link to="/category/snacks-munchies" className="footer-link">Snacks &amp; Biscuits</Link></li>
              <li><Link to="/category/household-care" className="footer-link">Laundry Detergents</Link></li>
              <li><Link to="/category/personal-care" className="footer-link">Personal Hygiene</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase text-warning mb-3 small">Innovations</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/compare" className="footer-link fw-bold text-white">⚡ Brand Comparison</Link></li>
              <li><Link to="/scan" className="footer-link">📷 Barcode Scanner</Link></li>
              <li><Link to="/store-cart" className="footer-link">🛒 Smart Supermarket Cart</Link></li>
              <li><Link to="/products" className="footer-link">📊 SmartMart Score Engine</Link></li>
              <li><Link to="/admin/dashboard" className="footer-link text-warning">🛡️ Admin Management</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase text-warning mb-3 small">Customer Service</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/orders" className="footer-link">Track Order</Link></li>
              <li><Link to="/profile" className="footer-link">My Account</Link></li>
              <li><Link to="/wishlist" className="footer-link">My Wishlist</Link></li>
              <li><Link to="/cart" className="footer-link">Shopping Cart</Link></li>
              <li><a href="#faq" className="footer-link">FAQs &amp; Help</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="fw-bold text-uppercase text-warning mb-3 small">Contact Us</h6>
            <p className="text-secondary small mb-2"><i className="bi bi-geo-alt me-1"></i> SmartMart Central, Indiranagar, Bengaluru 560038</p>
            <p className="text-secondary small mb-2"><i className="bi bi-telephone me-1"></i> +91 1800-SMART-MART</p>
            <p className="text-secondary small"><i className="bi bi-envelope me-1"></i> support@smartmart.in</p>
          </div>
        </div>
      </div>

      <div className="container border-top border-secondary pt-3 text-center small text-secondary">
        <p className="mb-0">&copy; {new Date().getFullYear()} SmartMart Intelligent Supermarket Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};
