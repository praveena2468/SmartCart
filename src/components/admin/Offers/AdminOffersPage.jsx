import React, { useEffect, useState } from 'react';
import { offerService } from '../../../services/offerService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const { showToast } = useToast();

  const [newOffer, setNewOffer] = useState({
    title: '',
    code: '',
    discountType: 'Percentage',
    discountValue: 10,
    minOrderValue: 499,
    validTill: '2026-12-31',
    description: ''
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    const res = await offerService.getOffers();
    if (res.success) setOffers(res.data);
  };

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    const res = await offerService.createOffer(newOffer);
    if (res.success) {
      showToast(res.message, 'success');
      setNewOffer({ title: '', code: '', discountType: 'Percentage', discountValue: 10, minOrderValue: 499, validTill: '2026-12-31', description: '' });
      fetchOffers();
    }
  };

  const handleToggle = async (id) => {
    const res = await offerService.toggleOfferStatus(id);
    if (res.success) {
      showToast(res.message, 'info');
      fetchOffers();
    }
  };

  return (
    <div>
      <AdminNavbar title="Offers &amp; Coupon Management" />

      <div className="p-4">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="bg-white rounded-4 border shadow-sm p-4">
              <h5 className="fw-bold mb-3">Active Promotional Offers</h5>
              <div className="vstack gap-3">
                {offers.map(o => (
                  <div key={o.id} className="p-3 border rounded-3 bg-light d-flex align-items-center justify-content-between">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-danger">{o.code}</span>
                        <h6 className="fw-bold text-dark mb-0">{o.title}</h6>
                      </div>
                      <p className="small text-muted mb-0 mt-1">{o.description}</p>
                      <span className="small text-secondary">Valid till {o.validTill} | Used {o.timesUsed} times</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <button className={`btn btn-sm ${o.status === 'Active' ? 'btn-success' : 'btn-secondary'}`} onClick={() => handleToggle(o.id)}>
                        {o.status}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white rounded-4 border shadow-sm p-4">
              <h5 className="fw-bold mb-3">Create New Offer Coupon</h5>
              <form onSubmit={handleCreateOffer}>
                <div className="mb-2">
                  <label className="small fw-bold">Offer Title</label>
                  <input type="text" className="form-control form-control-sm" placeholder="e.g. Diwal Grocery Bonanza" value={newOffer.title} onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })} required />
                </div>
                <div className="mb-2">
                  <label className="small fw-bold">Coupon Code</label>
                  <input type="text" className="form-control form-control-sm" placeholder="e.g. DIWALI100" value={newOffer.code} onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })} required />
                </div>
                <div className="row g-2 mb-2">
                  <div className="col-6">
                    <label className="small fw-bold">Discount Value</label>
                    <input type="number" className="form-control form-control-sm" value={newOffer.discountValue} onChange={(e) => setNewOffer({ ...newOffer, discountValue: Number(e.target.value) })} required />
                  </div>
                  <div className="col-6">
                    <label className="small fw-bold">Min Order Value (₹)</label>
                    <input type="number" className="form-control form-control-sm" value={newOffer.minOrderValue} onChange={(e) => setNewOffer({ ...newOffer, minOrderValue: Number(e.target.value) })} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small fw-bold">Description</label>
                  <input type="text" className="form-control form-control-sm" value={newOffer.description} onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })} required />
                </div>
                <button type="submit" className="btn btn-smartmart-primary btn-sm w-100">Publish Offer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
