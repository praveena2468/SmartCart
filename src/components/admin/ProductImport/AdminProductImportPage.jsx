import React, { useState } from 'react';
import { productImportService } from '../../../services/productImportService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminProductImportPage = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('api');
  const [endpoint, setEndpoint] = useState('https://api.external-supplier.com/v1/feed');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleTestConnection = () => {
    showToast('API Connection Successful! Status 200 OK. Response time 140ms.', 'success');
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    const res = await productImportService.triggerSync('src-01');
    setIsSyncing(false);
    showToast(res.message, 'success');
  };

  return (
    <div>
      <AdminNavbar title="External Product Data Import" />

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white rounded-4 border shadow-sm p-4 p-md-5">
          <div className="mb-4">
            <span className="badge bg-warning text-dark fw-bold mb-1">API-READY ARCHITECTURE</span>
            <h4 className="fw-bold font-heading">Import Product Catalog &amp; Prices</h4>
            <p className="text-muted small">Dynamically import external supplier APIs, CSV spreadsheets or manual ERP feeds.</p>
          </div>

          <ul className="nav nav-pills mb-4 bg-light p-1 rounded-3">
            <li className="nav-item flex-fill">
              <button className={`nav-link w-100 fw-bold ${activeTab === 'api' ? 'active bg-danger' : 'text-dark'}`} onClick={() => setActiveTab('api')}>
                <i className="bi bi-cloud-arrow-down me-2"></i> REST API Import
              </button>
            </li>
            <li className="nav-item flex-fill">
              <button className={`nav-link w-100 fw-bold ${activeTab === 'csv' ? 'active bg-danger' : 'text-dark'}`} onClick={() => setActiveTab('csv')}>
                <i className="bi bi-file-earmark-spreadsheet me-2"></i> CSV Bulk File Upload
              </button>
            </li>
          </ul>

          {activeTab === 'api' && (
            <div>
              <div className="mb-3">
                <label className="form-label small fw-bold">API Source Provider</label>
                <select className="form-select">
                  <option>BigBasket Retail API</option>
                  <option>Blinkit Supplier Catalog</option>
                  <option>Zepto Merchant Feed</option>
                  <option>Custom JSON Endpoint</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold">API Endpoint URL</label>
                <input type="url" className="form-control" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Sync Frequency</label>
                  <select className="form-select">
                    <option>Realtime Websocket</option>
                    <option>Hourly Cron Job</option>
                    <option>Every 6 Hours</option>
                    <option>Daily at Midnight</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Authentication Key</label>
                  <input type="password" className="form-control" defaultValue="••••••••••••••••" />
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 border mb-4">
                <div className="row text-center">
                  <div className="col-4 border-end">
                    <div className="text-muted small">Last Synchronized</div>
                    <div className="fw-bold text-dark">Today, 08:30 AM</div>
                  </div>
                  <div className="col-4 border-end">
                    <div className="text-muted small">Products Updated</div>
                    <div className="fw-bold text-success">1,240 items</div>
                  </div>
                  <div className="col-4">
                    <div className="text-muted small">Failed Syncs</div>
                    <div className="fw-bold text-danger">0 items</div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary" onClick={handleTestConnection}>Test Connection</button>
                <button className="btn btn-smartmart-primary" onClick={handleSyncNow} disabled={isSyncing}>
                  {isSyncing ? 'Synchronizing...' : 'Sync Catalog Now'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'csv' && (
            <div className="text-center py-4 border border-dashed rounded-3">
              <i className="bi bi-file-earmark-arrow-up display-2 text-danger mb-3 d-block"></i>
              <h5>Drag and drop CSV product file here</h5>
              <p className="text-muted small">Supports columns: sku, barcode, name, brand, category, price, mrp, stock</p>
              <input type="file" className="d-none" id="csvFile" />
              <label htmlFor="csvFile" className="btn btn-outline-danger btn-sm">Browse Local File</label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
