import React, { useEffect, useState } from 'react';
import { useCompare } from '../../../context/CompareContext';
import { useCart } from '../../../context/CartContext';
import { useToast } from '../../../context/ToastContext';
import { comparisonService } from '../../../services/comparisonService';
import { productService } from '../../../services/productService';
import { Breadcrumb } from '../../common/Breadcrumb';
import { PriceDisplay } from '../../common/PriceDisplay';
import { ProductRating } from '../../common/ProductRating';
import { RecommendationBadge } from '../../common/RecommendationBadge';
import { LoadingSpinner } from '../../common/Loading';

export const ComparePage = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [comparisonGroups, setComparisonGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState('atta-5kg');
  const [productsToCompare, setProductsToCompare] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await comparisonService.getComparisonGroups();
      if (res.success) {
        setComparisonGroups(res.data);
      }
    };
    fetchGroups();
  }, []);

  // Fetch products based on compareList OR active comparisonGroup
  useEffect(() => {
    const fetchCompareProducts = async () => {
      setLoading(true);
      if (compareList.length > 0) {
        const ids = compareList.map(p => p.id);
        const res = await comparisonService.compareProducts(ids);
        if (res.success) {
          setProductsToCompare(res.data.products);
        }
      } else {
        // Load default group products
        const group = comparisonGroups.find(g => g.groupId === activeGroup);
        if (group) {
          const res = await comparisonService.compareProducts(group.productIds);
          if (res.success) {
            setProductsToCompare(res.data.products);
          }
        }
      }
      setLoading(false);
    };
    fetchCompareProducts();
  }, [compareList, activeGroup, comparisonGroups]);

  const handleGroupSelect = (groupId) => {
    clearCompare();
    setActiveGroup(groupId);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    showToast(`Added ${product.name} to cart from comparison`, 'success');
  };

  // Find winner product
  const winner = productsToCompare.reduce((prev, current) => {
    return (prev?.smartScore?.overallScore > current?.smartScore?.overallScore) ? prev : current;
  }, productsToCompare[0]);

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Brand Comparison' }]} />

      {/* Header Banner */}
      <div className="p-4 p-md-5 rounded-4 text-white mb-4 shadow-lg position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #111827 0%, #D81B60 100%)' }}>
        <div className="row align-items-center">
          <div className="col-md-8">
            <span className="badge bg-warning text-dark fw-bold mb-2">⚡ SMARTMART INNOVATION</span>
            <h1 className="fw-extrabold text-white font-heading mb-2">Product &amp; Brand Comparison</h1>
            <p className="fs-6 opacity-90 mb-3">
              Compare prices per kg, quality specs, customer satisfaction, and active offers across competing Indian brands. Let SmartMart Score pick the best value!
            </p>
            {compareList.length > 0 ? (
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-light text-dark">{compareList.length} Custom Products Selected</span>
                <button className="btn btn-outline-light btn-sm" onClick={clearCompare}>Clear Selection</button>
              </div>
            ) : (
              <span className="small text-warning"><i className="bi bi-info-circle me-1"></i> Showing preset category benchmark. Or check "Compare" on any product card.</span>
            )}
          </div>
          <div className="col-md-4 text-center mt-3 mt-md-0">
            <div className="p-3 bg-white bg-opacity-10 rounded-4 border border-light">
              <i className="bi bi-cpu display-4 text-warning d-block mb-1"></i>
              <div className="fw-bold text-white small">SMARTMART ENGINE</div>
              <div className="small text-light">Algorithmic Brand Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Presets Selector if not using custom list */}
      {compareList.length === 0 && (
        <div className="mb-4 bg-white p-3 rounded-4 border shadow-sm">
          <label className="fw-bold text-muted small text-uppercase mb-2 d-block">Select Staple Comparison Group:</label>
          <div className="d-flex flex-wrap gap-2">
            {comparisonGroups.map((g) => (
              <button
                key={g.groupId}
                className={`btn btn-sm rounded-pill px-3 fw-semibold ${activeGroup === g.groupId ? 'btn-danger' : 'btn-outline-secondary'}`}
                onClick={() => handleGroupSelect(g.groupId)}
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <LoadingSpinner text="Computing SmartMart Scores &amp; Comparison matrix..." />
      ) : productsToCompare.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border">
          <i className="bi bi-arrow-left-right display-3 text-muted"></i>
          <h5 className="fw-bold mt-3">No products selected for comparison</h5>
          <p className="text-muted small">Go to the products page and click the "Compare" checkbox on 2 or more products.</p>
        </div>
      ) : (
        <>
          {/* Winner Recommendation Banner */}
          {winner && (
            <div className="p-4 bg-warning bg-opacity-15 border border-warning rounded-4 mb-4">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge-winner"><i className="bi bi-trophy-fill me-1"></i> BEST OVERALL CHOICE</span>
                    <span className="badge bg-danger">Score: {winner.smartScore?.overallScore}/10</span>
                  </div>
                  <h4 className="fw-extrabold text-dark font-heading mb-1">{winner.name} ({winner.brand})</h4>
                  <p className="text-dark small mb-0">
                    <strong>Why SmartMart recommends this:</strong> Higher customer satisfaction rating ({winner.rating}⭐), superior stone-ground chakki flour quality, and best overall value per kg at ₹{winner.price}.
                  </p>
                </div>
                <div className="col-md-4 text-end mt-3 mt-md-0">
                  <button className="btn btn-smartmart-primary btn-lg shadow" onClick={() => handleAddToCart(winner)}>
                    <i className="bi bi-cart-plus me-2"></i> Buy Winner (₹{winner.price})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MAIN COMPARISON TABLE */}
          <div className="bg-white rounded-4 border shadow-sm overflow-hidden mb-5">
            <div className="table-responsive">
              <table className="table table-bordered align-middle text-center mb-0">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: '200px' }} className="text-start p-3">Comparison Parameter</th>
                    {productsToCompare.map(p => (
                      <th key={p.id} style={{ minWidth: '220px' }} className="p-3 position-relative">
                        {p.id === winner?.id && (
                          <span className="position-absolute top-0 start-50 translate-middle-x badge bg-warning text-dark fw-bold px-2 py-1 rounded-bottom">
                            🏆 WINNER
                          </span>
                        )}
                        <button
                          className="btn-close btn-close-white position-absolute top-0 end-0 m-2"
                          title="Remove from comparison"
                          onClick={() => removeFromCompare(p.id)}
                        ></button>
                        <div className="mt-2">
                          <img src={p.image} alt={p.name} className="bg-white p-2 rounded mb-2" style={{ width: '100px', height: '90px', objectFit: 'contain' }} />
                          <div className="small text-warning text-uppercase fw-bold">{p.brand}</div>
                          <div className="fw-bold text-white small text-truncate" title={p.name}>{p.name}</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* 1. BASIC INFO */}
                  <tr className="table-secondary">
                    <td colSpan={productsToCompare.length + 1} className="fw-bold text-start px-3 text-uppercase small">
                      <i className="bi bi-info-circle me-1"></i> Basic Information
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Brand Name</td>
                    {productsToCompare.map(p => <td key={p.id} className="fw-bold">{p.brand}</td>)}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Category</td>
                    {productsToCompare.map(p => <td key={p.id} className="small text-muted">{p.category}</td>)}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Pack Size</td>
                    {productsToCompare.map(p => <td key={p.id} className="fw-semibold">{p.packSize}</td>)}
                  </tr>

                  {/* 2. PRICING */}
                  <tr className="table-secondary">
                    <td colSpan={productsToCompare.length + 1} className="fw-bold text-start px-3 text-uppercase small">
                      <i className="bi bi-currency-rupee me-1"></i> Pricing &amp; Value
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Current Price</td>
                    {productsToCompare.map(p => (
                      <td key={p.id} className={`fw-extrabold fs-5 ${p.price === Math.min(...productsToCompare.map(x => x.price)) ? 'text-success bg-success-subtle' : ''}`}>
                        ₹{p.price}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Original MRP</td>
                    {productsToCompare.map(p => <td key={p.id} className="text-muted text-decoration-line-through">₹{p.mrp}</td>)}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Discount Saved</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        <span className="badge bg-danger">{p.discountPercentage}% OFF</span>
                      </td>
                    ))}
                  </tr>

                  {/* 3. CUSTOMER SATISFACTION */}
                  <tr className="table-secondary">
                    <td colSpan={productsToCompare.length + 1} className="fw-bold text-start px-3 text-uppercase small">
                      <i className="bi bi-star me-1"></i> Customer Satisfaction
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Average Rating</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        <ProductRating rating={p.rating} reviewCount={p.reviewCount} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Positive Feedback</td>
                    {productsToCompare.map(p => <td key={p.id} className="fw-bold text-success">{(p.rating * 20).toFixed(0)}% Positive</td>)}
                  </tr>

                  {/* 4. OFFERS */}
                  <tr className="table-secondary">
                    <td colSpan={productsToCompare.length + 1} className="fw-bold text-start px-3 text-uppercase small">
                      <i className="bi bi-percent me-1"></i> Offers &amp; Bundles
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Active Promotion</td>
                    {productsToCompare.map(p => (
                      <td key={p.id} className="small">
                        {p.offers?.[0] ? <span className="text-danger fw-bold"><i className="bi bi-tag-fill me-1"></i>{p.offers[0]}</span> : <span className="text-muted">Standard Offer</span>}
                      </td>
                    ))}
                  </tr>

                  {/* 5. QUALITY & NUTRITION */}
                  <tr className="table-secondary">
                    <td colSpan={productsToCompare.length + 1} className="fw-bold text-start px-3 text-uppercase small">
                      <i className="bi bi-shield-check me-1"></i> Quality &amp; Ingredients
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Primary Ingredient</td>
                    {productsToCompare.map(p => <td key={p.id} className="small text-muted">{p.ingredients || 'Natural Supermarket Staples'}</td>)}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Certifications</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        {p.certifications?.map((c, i) => <span key={i} className="badge bg-light text-dark border me-1 small">{c}</span>)}
                      </td>
                    ))}
                  </tr>

                  {/* 6. SMARTMART SCORE BREAKDOWN */}
                  <tr className="table-secondary">
                    <td colSpan={productsToCompare.length + 1} className="fw-bold text-start px-3 text-uppercase small">
                      <i className="bi bi-cpu me-1"></i> SmartMart Score Breakdown
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Price Score</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        <div className="fw-bold text-dark">{p.smartScore?.priceScore}/10</div>
                        <div className="score-bar-bg max-w-xs mx-auto"><div className="score-bar-fill" style={{ width: `${p.smartScore?.priceScore * 10}%` }}></div></div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Quality Score</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        <div className="fw-bold text-dark">{p.smartScore?.qualityScore}/10</div>
                        <div className="score-bar-bg max-w-xs mx-auto"><div className="score-bar-fill" style={{ width: `${p.smartScore?.qualityScore * 10}%` }}></div></div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="fw-semibold text-start px-3">Customer Score</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        <div className="fw-bold text-dark">{p.smartScore?.customerScore}/10</div>
                        <div className="score-bar-bg max-w-xs mx-auto"><div className="score-bar-fill" style={{ width: `${p.smartScore?.customerScore * 10}%` }}></div></div>
                      </td>
                    ))}
                  </tr>
                  <tr className="table-light">
                    <td className="fw-extrabold text-start px-3 fs-6">OVERALL SMART SCORE</td>
                    {productsToCompare.map(p => (
                      <td key={p.id}>
                        <span className="badge-smart-score fs-6">
                          {p.smartScore?.overallScore}/10
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* ACTION BUTTON ROW */}
                  <tr>
                    <td className="fw-bold text-start px-3">Action</td>
                    {productsToCompare.map(p => (
                      <td key={p.id} className="p-3">
                        <button className="btn btn-smartmart-primary w-100 btn-sm mb-1" onClick={() => handleAddToCart(p)}>
                          <i className="bi bi-cart-plus me-1"></i> Add to Cart
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
