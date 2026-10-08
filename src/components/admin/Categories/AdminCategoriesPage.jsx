import React, { useEffect, useState } from 'react';
import { categoryService } from '../../../services/categoryService';
import { AdminNavbar } from '../../common/AdminNavbar';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryService.getCategories().then(res => setCategories(res.data));
  }, []);

  return (
    <div>
      <AdminNavbar title="Category Management" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <h5 className="fw-bold mb-3">Active Categories</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Category</th>
                  <th>ID</th>
                  <th>Product Count</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(c => (
                  <tr key={c.id}>
                    <td className="fw-bold">{c.name}</td>
                    <td><code>{c.id}</code></td>
                    <td><span className="badge bg-danger">{c.itemCount} Items</span></td>
                    <td className="small text-muted">{c.description}</td>
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
