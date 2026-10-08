import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { Breadcrumb } from '../../common/Breadcrumb';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Profile' }]} />

      <div className="row g-4">
        {/* Left Sidebar */}
        <div className="col-md-3">
          <div className="bg-white p-3 rounded-4 border shadow-sm text-center mb-3">
            <div className="rounded-circle bg-danger text-white d-inline-flex align-items-center justify-content-center mb-2 fs-3 fw-bold" style={{ width: 64, height: 64 }}>
              {user?.name?.[0] || 'U'}
            </div>
            <h5 className="fw-bold text-dark mb-0">{user?.name || 'Customer'}</h5>
            <span className="small text-muted">{user?.email}</span>
            <span className="badge bg-warning text-dark d-block mt-2">Gold Member</span>
          </div>

          <div className="bg-white rounded-4 border shadow-sm overflow-hidden">
            <div className="list-group list-group-flush">
              <button className={`list-group-item list-group-item-action ${activeTab === 'info' ? 'active bg-danger border-danger' : ''}`} onClick={() => setActiveTab('info')}>
                <i className="bi bi-person me-2"></i> Personal Information
              </button>
              <button className={`list-group-item list-group-item-action ${activeTab === 'addresses' ? 'active bg-danger border-danger' : ''}`} onClick={() => setActiveTab('addresses')}>
                <i className="bi bi-geo-alt me-2"></i> Saved Addresses
              </button>
              <button className={`list-group-item list-group-item-action ${activeTab === 'preferences' ? 'active bg-danger border-danger' : ''}`} onClick={() => setActiveTab('preferences')}>
                <i className="bi bi-sliders me-2"></i> Account Preferences
              </button>
              <button className="list-group-item list-group-item-action text-danger" onClick={logout}>
                <i className="bi bi-box-arrow-right me-2"></i> Logout
              </button>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="col-md-9">
          <div className="bg-white p-4 rounded-4 border shadow-sm">
            {activeTab === 'info' && (
              <div>
                <h5 className="fw-bold text-dark font-heading mb-4">Personal Information</h5>
                <form>
                  <div className="row g-3 max-w-xl">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Full Name</label>
                      <input type="text" className="form-control" defaultValue={user?.name || 'Rahul Sharma'} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Email Address</label>
                      <input type="email" className="form-control" defaultValue={user?.email || 'rahul.sharma@example.com'} disabled />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Phone Number</label>
                      <input type="text" className="form-control" defaultValue="+91 98765 43210" />
                    </div>
                    <div className="col-12 mt-4">
                      <button type="button" className="btn btn-smartmart-primary">Save Changes</button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <h5 className="fw-bold text-dark font-heading mb-4">Saved Delivery Addresses</h5>
                <div className="p-3 border rounded-3 bg-light max-w-lg mb-3">
                  <span className="badge bg-danger mb-2">DEFAULT</span>
                  <h6 className="fw-bold text-dark">Rahul Sharma</h6>
                  <p className="small text-muted mb-0">
                    Flat 402, Sunshine Heights, Indiranagar 100ft Road<br />
                    Bengaluru, Karnataka - 560038
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h5 className="fw-bold text-dark font-heading mb-4">Communication &amp; App Preferences</h5>
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="pref1" defaultChecked />
                  <label className="form-check-label fw-bold" htmlFor="pref1">SmartMart Offer Notifications (SMS / WhatsApp)</label>
                </div>
                <div className="form-check form-switch mb-3">
                  <input className="form-check-input" type="checkbox" id="pref2" defaultChecked />
                  <label className="form-check-label fw-bold" htmlFor="pref2">Price drop alerts on Wishlist products</label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
