import React from 'react';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminSettingsPage = () => {
  const { showToast } = useToast();

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Admin Platform Settings updated successfully!', 'success');
  };

  return (
    <div>
      <AdminNavbar title="System Settings" />
      <div className="p-4 max-w-2xl mx-auto">
        <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
          <h4 className="fw-bold font-heading mb-4">SmartMart System Settings</h4>

          <form onSubmit={handleSave}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Platform Store Name</label>
              <input type="text" className="form-control" defaultValue="SmartMart Intelligent Supermarket" />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Support Contact Email</label>
              <input type="email" className="form-control" defaultValue="support@smartmart.in" />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Default Express Delivery Radius (km)</label>
              <input type="number" className="form-control" defaultValue="8" />
            </div>

            <div className="form-check form-switch mb-4">
              <input className="form-check-input" type="checkbox" id="autoSync" defaultChecked />
              <label className="form-check-label fw-bold" htmlFor="autoSync">Enable Automatic API Supplier Catalog Synchronization</label>
            </div>

            <button type="submit" className="btn btn-smartmart-primary px-4">Save Platform Settings</button>
          </form>
        </div>
      </div>
    </div>
  );
};
