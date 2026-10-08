import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { LoadingSpinner } from '../../common/Loading';
import { useToast } from '../../../context/ToastContext';

export const AdminProductsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await productService.getProducts();
    if (res.success) setProducts(res.data);
    setLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const res = await productService.deleteProduct(id);
      if (res.success) {
        showToast(res.message, 'success');
        fetchProducts();
      }
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminNavbar title="Product Management" />

      <div className="p-4">
        <div className="bg-white p-3 rounded-4 border shadow-sm mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="input-group" style={{ maxWidth: '320px' }}>
            <span className="input-group-text bg-light border-end-0"><i className="bi bi-search"></i></span>
            <input
              type="text"
              className="form-control bg-light border-start-0"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Link to="/admin/products/add" className="btn btn-smartmart-primary shadow">
            <i className="bi bi-plus-lg me-1"></i> Add New Product
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner text="Fetching products list..." />
        ) : (
          <div className="bg-white rounded-4 border shadow-sm overflow-hidden">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>MRP</th>
                    <th>Stock</th>
                    <th>Smart Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <img src={p.image} alt={p.name} className="rounded p-1 bg-light" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                      </td>
                      <td className="fw-bold text-dark">{p.name}</td>
                      <td><span className="badge bg-light text-dark border">{p.brand}</span></td>
                      <td className="small text-muted">{p.category}</td>
                      <td className="fw-bold text-dark">₹{p.price}</td>
                      <td className="text-muted text-decoration-line-through small">₹{p.mrp}</td>
                      <td>
                        <span className={`badge ${p.stockCount > 50 ? 'bg-success' : p.stockCount > 0 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                          {p.stockCount} in stock
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-danger">{p.smartScore?.overallScore}/10</span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate(`/admin/products/edit/${p.id}`)}>
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id, p.name)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
