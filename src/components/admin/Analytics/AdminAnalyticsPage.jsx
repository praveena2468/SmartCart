import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/adminService';
import { AdminNavbar } from '../../common/AdminNavbar';
import { LoadingSpinner } from '../../common/Loading';

export const AdminAnalyticsPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAnalytics().then(res => {
      if (res.success) setData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4"><LoadingSpinner text="Building SmartMart Intelligence reports..." /></div>;

  return (
    <div>
      <AdminNavbar title="Platform Analytics &amp; Insights" />

      <div className="p-4">
        {/* SUMMARY CARDS */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm text-center">
              <span className="text-muted small fw-bold">TOTAL REVENUE</span>
              <h3 className="fw-extrabold text-dark mb-0 font-heading">₹{(data.summary?.totalRevenue / 100000).toFixed(2)} Lakhs</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm text-center">
              <span className="text-muted small fw-bold">AVERAGE ORDER VALUE</span>
              <h3 className="fw-extrabold text-dark mb-0 font-heading">₹{data.summary?.avgOrderValue}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm text-center">
              <span className="text-muted small fw-bold">COMPARISON ENGAGEMENT</span>
              <h3 className="fw-extrabold text-danger mb-0 font-heading">{data.summary?.comparisonScans}</h3>
            </div>
          </div>
          <div className="col-md-3">
            <div className="bg-white p-3 rounded-4 border shadow-sm text-center">
              <span className="text-muted small fw-bold">ACTIVE CUSTOMERS</span>
              <h3 className="fw-extrabold text-dark mb-0 font-heading">{data.summary?.totalCustomers}</h3>
            </div>
          </div>
        </div>

        {/* REVENUE TREND & CATEGORIES */}
        <div className="row g-4 mb-4">
          <div className="col-lg-7">
            <div className="bg-white p-4 rounded-4 border shadow-sm h-100">
              <h5 className="fw-bold mb-3 font-heading"><i className="bi bi-graph-up text-danger me-2"></i>Monthly Revenue Growth (2026)</h5>
              <div className="vstack gap-3">
                {data.salesTrend?.map(st => (
                  <div key={st.month}>
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>{st.month}</span>
                      <span>₹{(st.revenue / 1000).toFixed(0)}k ({st.orders} Orders)</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div className="progress-bar bg-danger" style={{ width: `${(st.revenue / 500000) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white p-4 rounded-4 border shadow-sm h-100">
              <h5 className="fw-bold mb-3 font-heading"><i className="bi bi-pie-chart text-danger me-2"></i>Category Revenue Share</h5>
              <div className="vstack gap-3">
                {data.categoryPerformance?.map(cp => (
                  <div key={cp.category}>
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>{cp.category}</span>
                      <span>{cp.percentage}%</span>
                    </div>
                    <div className="progress" style={{ height: 10 }}>
                      <div className="progress-bar bg-warning text-dark" style={{ width: `${cp.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MOST COMPARED GROUPS */}
        <div className="bg-white p-4 rounded-4 border shadow-sm">
          <h5 className="fw-bold mb-3 font-heading"><i className="bi bi-cpu text-danger me-2"></i>Most Compared Product Groups</h5>
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Comparison Group</th>
                  <th>Total Scans</th>
                  <th>Smart Winner</th>
                </tr>
              </thead>
              <tbody>
                {data.mostComparedGroups?.map((cg, i) => (
                  <tr key={i}>
                    <td className="fw-bold">{cg.group}</td>
                    <td><span className="badge bg-danger">{cg.comparisons} scans</span></td>
                    <td className="fw-bold text-success"><i className="bi bi-trophy me-1"></i>{cg.winner}</td>
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
