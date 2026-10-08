import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { categoryService } from '../../../services/categoryService';
import { recommendationService } from '../../../services/recommendationService';
import { ProductGrid } from '../../common/ProductGrid';
import { ProductCard } from '../../common/ProductCard';
import { LoadingSpinner } from '../../common/Loading';

export const HomePage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const catRes = await categoryService.getCategories();
      const prodRes = await productService.getProducts();
      const recRes = await recommendationService.getPersonalizedRecommendations(4);

      if (catRes.success) setCategories(catRes.data);
      if (prodRes.success) setTrendingProducts(prodRes.data.slice(0, 8));
      if (recRes.success) setRecommendedProducts(recRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="home-page pb-5">
      {/* 1. HERO SECTION */}
      <section className="py-5 text-white position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #111827 0%, #D81B60 100%)' }}>
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <span className="badge bg-warning text-dark fw-bold px-3 py-2 rounded-pill mb-3">
                <i className="bi bi-stars me-1"></i> INDIA'S #1 INTELLIGENT SUPERMARKET
              </span>
              <h1 className="display-4 fw-extrabold text-white mb-3 font-heading">
                Smarter Shopping <br /><span className="text-warning">Starts Here</span>
              </h1>
              <p className="fs-5 text-light opacity-90 mb-4 max-w-xl">
                Compare products across top Indian brands, discover better offers, check SmartMart quality scores, and shop smarter with instant 15-minute delivery.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/products" className="btn btn-smartmart-secondary btn-lg px-4 shadow">
                  <i className="bi bi-bag-fill me-2"></i> Shop Now
                </Link>
                <Link to="/compare" className="btn btn-outline-light btn-lg px-4">
                  <i className="bi bi-cpu me-2"></i> Compare Products
                </Link>
                <Link to="/scan" className="btn btn-warning btn-lg px-4 text-dark fw-bold">
                  <i className="bi bi-qr-code-scan me-2"></i> In-Store Scanner
                </Link>
              </div>
            </div>

            <div className="col-lg-5 text-center">
              <div className="position-relative d-inline-block">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                  alt="SmartMart Grocery Shopping"
                  className="img-fluid rounded-4 shadow-lg border border-3 border-white"
                  style={{ maxHeight: '360px', objectFit: 'cover' }}
                />
                <div className="position-absolute bottom-0 start-0 m-3 p-3 bg-white text-dark rounded-3 shadow text-start border-start border-4 border-danger" style={{ maxWidth: '240px' }}>
                  <div className="fw-bold text-danger small"><i className="bi bi-cpu-fill me-1"></i> SmartMart Innovation</div>
                  <div className="fw-black text-dark" style={{ fontSize: '0.9rem' }}>Compare Atta &amp; Ghee Brands</div>
                  <div className="small text-muted">Save up to 25% on weekly grocery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="py-5 bg-white border-bottom">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 className="fw-bold text-dark font-heading mb-1">Explore Supermarket Categories</h2>
              <p className="text-muted small mb-0">Browse fresh groceries, daily essentials and household care</p>
            </div>
            <Link to="/products" className="btn btn-outline-danger btn-sm">
              View All &rarr;
            </Link>
          </div>

          <div className="row g-3">
            {categories.map((cat) => (
              <div key={cat.id} className="col-6 col-md-4 col-lg-3">
                <Link to={`/category/${cat.id}`} className="text-decoration-none">
                  <div className="card border-0 shadow-sm sm-card-hover text-center h-100 p-3 bg-light rounded-4">
                    <img src={cat.image} alt={cat.name} className="rounded-3 mb-2" style={{ height: '110px', objectFit: 'cover' }} />
                    <h6 className="fw-bold text-dark mb-1">{cat.name}</h6>
                    <span className="small text-muted">{cat.itemCount}+ Products</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRENDING PRODUCTS */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <span className="badge badge-smartmart-primary mb-1">POPULAR STAPLES</span>
              <h2 className="fw-bold text-dark font-heading mb-0">Trending Supermarket Products</h2>
            </div>
            <Link to="/products" className="btn btn-smartmart-outline btn-sm">
              See Full Catalog &rarr;
            </Link>
          </div>

          {loading ? <LoadingSpinner /> : <ProductGrid products={trendingProducts} />}
        </div>
      </section>

      {/* 4. SMART RECOMMENDATIONS */}
      <section className="py-5 bg-light border-top border-bottom">
        <div className="container">
          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="p-2 bg-danger text-white rounded-circle d-inline-flex"><i className="bi bi-cpu-fill"></i></span>
            <div>
              <h3 className="fw-bold text-dark font-heading mb-0">Recommended For You</h3>
              <p className="text-muted small mb-0">Algorithmic suggestions based on SmartMart Quality &amp; Price Scores</p>
            </div>
          </div>

          <div className="row g-3">
            {recommendedProducts.map((p) => (
              <div key={p.id} className="col-12 col-md-6 col-lg-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BEST DEALS PROMO BANNER */}
      <section className="py-5">
        <div className="container">
          <div className="rounded-4 p-4 p-md-5 text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #FF6F61 0%, #D81B60 100%)' }}>
            <div className="row align-items-center">
              <div className="col-md-8">
                <span className="badge bg-warning text-dark fw-bold mb-2">LIMITED TIME FESTIVE OFFERS</span>
                <h2 className="display-6 fw-extrabold mb-3">Save Extra ₹100 on Grocery Bashes!</h2>
                <p className="fs-6 opacity-90 mb-4">Use Promo Code <strong className="bg-white text-danger px-2 py-1 rounded">FESTIVE100</strong> at checkout on all orders above ₹999.</p>
                <Link to="/products" className="btn btn-dark btn-lg fw-bold shadow">
                  Claim Discount Now &rarr;
                </Link>
              </div>
              <div className="col-md-4 text-center mt-4 mt-md-0">
                <i className="bi bi-gift-fill display-1 text-warning opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SMARTMART INNOVATION: COMPARE BEFORE YOU BUY */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge badge-smartmart-primary mb-2">FLAGSHIP INNOVATION</span>
              <h2 className="display-6 fw-extrabold text-dark font-heading mb-3">
                Compare Before You Buy
              </h2>
              <p className="text-muted mb-4 fs-6">
                Why settle for a single brand? SmartMart empowers you to place products from ITC Aashirvaad, Fortune, Tata, and Pillsbury side-by-side. Compare prices per kg, customer ratings, ingredient quality, and overall SmartMart Scores!
              </p>

              <div className="vstack gap-3 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-danger text-white rounded-3"><i className="bi bi-bar-chart-fill"></i></div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">Price &amp; MRP Transparency</h6>
                    <span className="small text-muted">Instantly calculate true cost per kg / per liter</span>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-danger text-white rounded-3"><i className="bi bi-star-fill"></i></div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">Customer Satisfaction Score</h6>
                    <span className="small text-muted">Real verified buyer feedback &amp; review metrics</span>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="p-2 bg-danger text-white rounded-3"><i className="bi bi-trophy-fill"></i></div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">Automated SmartMart Winner</h6>
                    <span className="small text-muted">Intelligent AI recommendation badge for best overall choice</span>
                  </div>
                </div>
              </div>

              <Link to="/compare" className="btn btn-smartmart-primary btn-lg px-4">
                Launch Brand Comparison Tool &rarr;
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-lg rounded-4 overflow-hidden p-3 bg-light border">
                <div className="p-3 bg-dark text-white rounded-3 d-flex align-items-center justify-content-between mb-3">
                  <span className="fw-bold"><i className="bi bi-cpu text-warning me-2"></i> Live Comparison Preview</span>
                  <span className="badge bg-success">Smart Winner: Aashirvaad</span>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered bg-white text-center align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Parameter</th>
                        <th>Aashirvaad Atta</th>
                        <th>Fortune Atta</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="fw-bold text-start">Selling Price</td>
                        <td className="fw-bold text-dark">₹245</td>
                        <td className="fw-bold text-dark">₹220</td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start">Rating</td>
                        <td>4.7 ⭐</td>
                        <td>4.5 ⭐</td>
                      </tr>
                      <tr>
                        <td className="fw-bold text-start">Overall Score</td>
                        <td><span className="badge bg-danger">8.8/10</span></td>
                        <td><span className="badge bg-warning text-dark">8.6/10</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SUPERMARKET SMART CART INNOVATION */}
      <section className="py-5 bg-dark text-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="badge bg-warning text-dark fw-bold mb-2">SUPERMARKET IN-STORE CART INTEGRATION</span>
            <h2 className="display-6 fw-extrabold text-white font-heading mb-2">Scan &rarr; Add &rarr; Track &rarr; Pay</h2>
            <p className="text-secondary">Shop in physical supermarket aisles using your phone or cart-mounted display with live digital billing!</p>
          </div>

          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="display-5 text-warning mb-3"><i className="bi bi-qr-code-scan"></i></div>
                <h5 className="fw-bold text-white mb-2">1. Scan Barcode</h5>
                <p className="text-secondary small">Point your mobile scanner at any product barcode on the shelf.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="display-5 text-warning mb-3"><i className="bi bi-cart-plus"></i></div>
                <h5 className="fw-bold text-white mb-2">2. Add to Smart Cart</h5>
                <p className="text-secondary small">Product instantly adds to your running cart bill with active store discounts.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="display-5 text-warning mb-3"><i className="bi bi-bar-chart"></i></div>
                <h5 className="fw-bold text-white mb-2">3. Track Savings</h5>
                <p className="text-secondary small">Watch running totals &amp; SmartMart price recommendations live.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 rounded-4 bg-secondary bg-opacity-10 border border-secondary h-100">
                <div className="display-5 text-warning mb-3"><i className="bi bi-wallet2"></i></div>
                <h5 className="fw-bold text-white mb-2">4. 1-Tap UPI Payment</h5>
                <p className="text-secondary small">Bypass long supermarket billing queues and walk out seamlessly!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/store-cart" className="btn btn-warning btn-lg fw-bold text-dark px-4 me-2">
              <i className="bi bi-cart-check me-2"></i> Open In-Store Smart Cart Mode
            </Link>
            <Link to="/scan" className="btn btn-outline-light btn-lg px-4">
              <i className="bi bi-camera me-2"></i> Test Barcode Scanner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
