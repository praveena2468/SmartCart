import React, { useEffect, useState } from 'react';
import { brandService } from '../../../services/brandService';
import { AdminNavbar } from '../../common/AdminNavbar';

export const AdminBrandsPage = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    brandService.getBrands().then(res => setBrands(res.data));
  }, []);

  return (
    <div>
      <AdminNavbar title="Brand Management" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <h5 className="fw-bold mb-3">Partner Brands</h5>
          <div className="row g-3">
            {brands.map(b => (
              <div key={b.id} className="col-md-4">
                <div className="p-3 border rounded-3 bg-light h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="fw-bold text-dark mb-0">{b.logo} {b.name}</h5>
                    <span className="badge bg-success">Verified</span>
                  </div>
                  <p className="small text-muted mb-0">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
