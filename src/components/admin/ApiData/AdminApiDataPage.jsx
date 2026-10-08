import React, { useEffect, useState } from 'react';
import { productImportService } from '../../../services/productImportService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminApiDataPage = () => {
  const [sources, setSources] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    productImportService.getApiSources().then(res => setSources(res.data));
  }, []);

  const handleSync = (src) => {
    showToast(`Syncing ${src.source}... 142 items updated`, 'success');
  };

  return (
    <div>
      <AdminNavbar title="External API Data Sources" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <h5 className="fw-bold mb-3">External Product Feeds</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>API Source</th>
                  <th>Status</th>
                  <th>Sync Frequency</th>
                  <th>Last Sync</th>
                  <th>Products</th>
                  <th>Updated / Failed</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sources.map(s => (
                  <tr key={s.id}>
                    <td className="fw-bold">{s.source}</td>
                    <td><span className={`badge ${s.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>{s.status}</span></td>
                    <td className="small text-muted">{s.syncFrequency}</td>
                    <td className="small text-muted">{s.lastSync}</td>
                    <td className="fw-bold">{s.products}</td>
                    <td><span className="text-success">{s.updated}</span> / <span className="text-danger">{s.failed}</span></td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-xs btn-primary" onClick={() => handleSync(s)}>Sync</button>
                        <button className="btn btn-xs btn-outline-secondary">Configure</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
