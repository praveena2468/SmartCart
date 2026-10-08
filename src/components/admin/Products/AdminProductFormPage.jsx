import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Aashirvaad',
    brandId: 'aashirvaad',
    category: 'Foodgrains & Atta',
    categoryId: 'foodgrains-atta',
    packSize: '5 kg',
    price: 240,
    mrp: 280,
    discountPercentage: 14,
    stockCount: 100,
    sku: 'SMART-PROD-SKU',
    barcode: '8901058899000',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    description: 'High quality supermarket staple item.',
    ingredients: '100% Whole Grains',
    inStock: true
  });

  useEffect(() => {
    if (isEdit) {
      const loadProduct = async () => {
        const res = await productService.getProductById(id);
        if (res.success && res.data) {
          setFormData(res.data);
        }
      };
      loadProduct();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      const res = await productService.updateProduct(id, formData);
      if (res.success) {
        showToast(res.message, 'success');
        navigate('/admin/products');
      }
    } else {
      const res = await productService.createProduct(formData);
      if (res.success) {
        showToast(res.message, 'success');
        navigate('/admin/products');
      }
    }
  };

  return (
    <div>
      <AdminNavbar title={isEdit ? 'Edit Supermarket Product' : 'Add New Product'} />

      <div className="p-4 max-w-4xl mx-auto">
        <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm">
          <form onSubmit={handleSubmit}>
            <h5 className="fw-bold font-heading border-bottom pb-2 mb-3">1. Basic Information</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-8">
                <label className="form-label small fw-bold">Product Name</label>
                <input type="text" className="form-control" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Pack Size / Weight</label>
                <input type="text" className="form-control" value={formData.packSize} onChange={(e) => setFormData({ ...formData, packSize: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Brand</label>
                <select className="form-select" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })}>
                  <option value="Aashirvaad">Aashirvaad</option>
                  <option value="Fortune">Fortune</option>
                  <option value="Tata Sampann">Tata Sampann</option>
                  <option value="Amul">Amul</option>
                  <option value="Britannia">Britannia</option>
                  <option value="Surf Excel">Surf Excel</option>
                  <option value="Nestlé">Nestlé</option>
                  <option value="Parle">Parle</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Category</label>
                <select className="form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="Foodgrains & Atta">Foodgrains &amp; Atta</option>
                  <option value="Dairy & Bakery">Dairy &amp; Bakery</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Snacks & Munchies">Snacks &amp; Munchies</option>
                  <option value="Household Care">Household Care</option>
                </select>
              </div>
            </div>

            <h5 className="fw-bold font-heading border-bottom pb-2 mb-3">2. Pricing &amp; Inventory</h5>
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label small fw-bold">Selling Price (₹)</label>
                <input type="number" className="form-control" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">MRP (₹)</label>
                <input type="number" className="form-control" value={formData.mrp} onChange={(e) => setFormData({ ...formData, mrp: Number(e.target.value) })} required />
              </div>
              <div className="col-md-4">
                <label className="form-label small fw-bold">Stock Count</label>
                <input type="number" className="form-control" value={formData.stockCount} onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">SKU Code</label>
                <input type="text" className="form-control" value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} required />
              </div>
              <div className="col-md-6">
                <label className="form-label small fw-bold">Barcode Number</label>
                <input type="text" className="form-control" value={formData.barcode} onChange={(e) => setFormData({ ...formData, barcode: e.target.value })} required />
              </div>
            </div>

            <h5 className="fw-bold font-heading border-bottom pb-2 mb-3">3. Media &amp; Details</h5>
            <div className="mb-3">
              <label className="form-label small fw-bold">Product Image URL</label>
              <input type="url" className="form-control" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} required />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold">Description</label>
              <textarea className="form-control" rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
            </div>

            <div className="d-flex justify-content-between">
              <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/admin/products')}>Cancel</button>
              <button type="submit" className="btn btn-smartmart-primary px-5">{isEdit ? 'Update Product' : 'Save Product'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
