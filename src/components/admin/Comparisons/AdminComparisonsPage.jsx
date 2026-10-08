import React, { useEffect, useState } from 'react';
import { comparisonService } from '../../../services/comparisonService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { useToast } from '../../../context/ToastContext';

export const AdminComparisonsPage = () => {
  const [groups, setGroups] = useState([]);
  const { showToast } = useToast();

  const [weights, setWeights] = useState({
    priceWeight: 30,
    qualityWeight: 35,
    customerWeight: 20,
    offerWeight: 15
  });

  useEffect(() => {
    comparisonService.getComparisonGroups().then(res => setGroups(res.data));
  }, []);

  const handleSaveWeights = (e) => {
    e.preventDefault();
    showToast('SmartMart Score weightage matrix updated successfully!', 'success');
  };

  return (
    <div>
      <AdminNavbar title="SmartMart Comparison Engine Configuration" />

      <div className="p-4">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="bg-white rounded-4 border shadow-sm p-4">
              <h5 className="fw-bold mb-3">Active Product Comparison Benchmark Groups</h5>
              <div className="vstack gap-3">
                {groups.map(g => (
                  <div key={g.groupId} className="p-3 border rounded-3 bg-light">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h6 className="fw-bold text-dark mb-0">{g.title}</h6>
                      <span className="badge bg-danger">{g.category}</span>
                    </div>
                    <p className="small text-muted mb-2">{g.smartRecommendation}</p>
                    <span className="small fw-semibold text-success"><i className="bi bi-trophy me-1"></i> Current Winner: {g.winnerId}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white rounded-4 border shadow-sm p-4">
              <h5 className="fw-bold mb-3"><i className="bi bi-sliders me-2 text-danger"></i>Smart Score Weightage Matrix</h5>
              <p className="small text-muted mb-4">Adjust algorithmic weights used to calculate the 10-point SmartMart Score.</p>

              <form onSubmit={handleSaveWeights}>
                <div className="mb-3">
                  <label className="small fw-bold d-flex justify-content-between">
                    <span>Price Score Weightage</span>
                    <span className="text-danger">{weights.priceWeight}%</span>
                  </label>
                  <input type="range" className="form-range" min="10" max="50" value={weights.priceWeight} onChange={(e) => setWeights({ ...weights, priceWeight: Number(e.target.value) })} />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold d-flex justify-content-between">
                    <span>Quality &amp; Ingredient Weightage</span>
                    <span className="text-danger">{weights.qualityWeight}%</span>
                  </label>
                  <input type="range" className="form-range" min="10" max="50" value={weights.qualityWeight} onChange={(e) => setWeights({ ...weights, qualityWeight: Number(e.target.value) })} />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold d-flex justify-content-between">
                    <span>Customer Feedback Rating Weightage</span>
                    <span className="text-danger">{weights.customerWeight}%</span>
                  </label>
                  <input type="range" className="form-range" min="10" max="50" value={weights.customerWeight} onChange={(e) => setWeights({ ...weights, customerWeight: Number(e.target.value) })} />
                </div>

                <div className="mb-4">
                  <label className="small fw-bold d-flex justify-content-between">
                    <span>Active Offer &amp; Coupon Weightage</span>
                    <span className="text-danger">{weights.offerWeight}%</span>
                  </label>
                  <input type="range" className="form-range" min="5" max="30" value={weights.offerWeight} onChange={(e) => setWeights({ ...weights, offerWeight: Number(e.target.value) })} />
                </div>

                <button type="submit" className="btn btn-smartmart-primary btn-sm w-100">Save Weightage Configuration</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
