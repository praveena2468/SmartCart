import React, { useEffect, useState } from 'react';
import { inventoryService } from '../../../services/inventoryService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminInventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    const res = await inventoryService.getInventory();
    if (res.success) setInventory(res.data);
  };

  const handleUpdateStock = async (sku, currentVal) => {
    const newStock = prompt('Enter new stock quantity:', currentVal);
    if (newStock !== null) {
      const res = await inventoryService.updateStock(sku, newStock);
      if (res.success) {
        showToast(res.message, 'success');
        fetchInventory();
      }
    }
  };

  return (
    <div>
      <AdminNavbar title="Inventory Control &amp; Reorder Alerts" />
      <div className="p-4">
        <div className="bg-white rounded-4 border shadow-sm p-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>SKU Code</th>
                  <th>Barcode</th>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Min Level</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.sku}>
                    <td><code>{item.sku}</code></td>
                    <td><span className="small text-muted">{item.barcode}</span></td>
                    <td className="fw-bold">{item.productName}</td>
                    <td className="fw-extrabold fs-6">{item.currentStock}</td>
                    <td className="small text-muted">{item.minStock}</td>
                    <td>
                      <span className={`badge ${item.status === 'In Stock' ? 'bg-success' : item.status === 'Low Stock' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleUpdateStock(item.sku, item.currentStock)}>
                        <i className="bi bi-pencil-square me-1"></i> Update Stock
                      </button>
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
