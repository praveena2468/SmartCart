import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { reviewService } from '../../../services/reviewService';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useToast } from '../../../context/ToastContext';
import { Breadcrumb } from '../../common/Breadcrumb';
import { PriceDisplay } from '../../common/PriceDisplay';
import { ProductRating } from '../../common/ProductRating';
import { SmartScoreBadge } from '../../common/SmartScoreBadge';
import { QuantitySelector } from '../../common/QuantitySelector';
import { CompareButton } from '../../common/CompareButton';
import { LoadingSpinner } from '../../common/Loading';
import { ProductCard } from '../../common/ProductCard';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);

  // Add Review Form state
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await productService.getProductById(id);
      if (res.success && res.data) {
        setProduct(res.data);
        setSelectedImage(res.data.image);

        const simRes = await productService.getSimilarProducts(id);
        if (simRes.success) setSimilarProducts(simRes.data);

        const revRes = await reviewService.getReviews(id);
        if (revRes.success) setReviews(revRes.data);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="container py-5"><LoadingSpinner text="Fetching product details..." /></div>;
  if (!product) return <div className="container py-5 text-center"><h4>Product not found.</h4></div>;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} x ${product.name} to cart`, 'success', 'Added to Cart');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleAddReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewComment.trim()) return;
    const res = await reviewService.addReview({
      productId: product.id,
      productName: product.name,
      customerName: 'You (Verified Customer)',
      rating: Number(newReviewRating),
      title: newReviewTitle || 'Great Product',
      comment: newReviewComment,
      verifiedPurchase: true
    });
    if (res.success) {
      showToast('Thank you! Your review has been published.', 'success');
      setReviews([res.data, ...reviews]);
      setNewReviewTitle('');
      setNewReviewComment('');
    }
  };

  return (
    <div className="container py-4">
      <Breadcrumb items={[
        { label: 'Products', path: '/products' },
        { label: product.category, path: `/category/${product.categoryId}` },
        { label: product.name }
      ]} />

      <div className="bg-white p-4 rounded-4 border shadow-sm mb-5">
        <div className="row g-4">
          {/* LEFT: IMAGES */}
          <div className="col-md-5">
            <div className="bg-light p-3 rounded-4 text-center mb-3 position-relative border" style={{ minHeight: '320px' }}>
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="img-fluid"
                style={{ maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
            {product.images?.length > 1 && (
              <div className="d-flex gap-2 overflow-auto pb-2">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumb ${idx}`}
                    className={`rounded border p-1 cursor-pointer ${selectedImage === img ? 'border-danger border-2' : ''}`}
                    style={{ width: '64px', height: '64px', objectFit: 'contain' }}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="col-md-7">
            <div className="d-flex align-items-center justify-content-between">
              <span className="text-uppercase text-muted fw-bold small">{product.brand}</span>
              <SmartScoreBadge score={product.smartScore?.overallScore} />
            </div>

            <h2 className="fw-bold text-dark font-heading mt-1 mb-2">{product.name}</h2>
            <div className="d-flex align-items-center gap-3 mb-3">
              <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-muted small">|</span>
              <span className="text-muted small"><i className="bi bi-box-seam me-1"></i> Pack: <strong>{product.packSize}</strong></span>
              <span className="text-muted small">|</span>
              <span className={`badge ${product.inStock ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger'}`}>
                {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
              </span>
            </div>

            <div className="p-3 bg-light rounded-3 mb-4 border">
              <PriceDisplay price={product.price} mrp={product.mrp} discountPercentage={product.discountPercentage} unitSize={`₹${(product.price / 5).toFixed(1)} / kg approx`} />
            </div>

            {product.offers?.length > 0 && (
              <div className="alert alert-warning py-2 px-3 small mb-4 rounded-3 border-warning">
                <i className="bi bi-tag-fill me-2 text-danger"></i>
                <strong>Available Offer:</strong> {product.offers[0]}
              </div>
            )}

            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="fw-bold text-dark">Quantity:</span>
              <QuantitySelector quantity={quantity} onDecrease={() => setQuantity(q => Math.max(1, q - 1))} onIncrease={() => setQuantity(q => q + 1)} />
            </div>

            <div className="d-flex flex-wrap gap-2 mb-4">
              <button className="btn btn-smartmart-primary btn-lg px-4" onClick={handleAddToCart} disabled={!product.inStock}>
                <i className="bi bi-cart-plus me-2"></i> Add to Cart
              </button>
              <button className="btn btn-smartmart-secondary btn-lg px-4" onClick={handleBuyNow} disabled={!product.inStock}>
                Buy Now
              </button>
              <button className="btn btn-outline-secondary btn-lg" onClick={() => toggleWishlist(product)}>
                <i className={`bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
              </button>
              <CompareButton product={product} variant="button" />
            </div>

            {/* Smart Comparison CTA Banner */}
            <div className="p-3 bg-danger bg-opacity-10 border border-danger rounded-3 d-flex align-items-center justify-content-between">
              <div>
                <div className="fw-bold text-danger"><i className="bi bi-cpu-fill me-1"></i> Compare with Alternative Brands</div>
                <div className="small text-muted">See how this product scores against competitor brands in Atta &amp; Staples</div>
              </div>
              <Link to="/compare" className="btn btn-sm btn-danger fw-bold">
                Compare Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER TABS SECTION */}
      <div className="bg-white rounded-4 border shadow-sm p-4">
        <ul className="nav nav-tabs border-bottom mb-4">
          {['description', 'specifications', 'nutrition', 'reviews', 'similar'].map(tab => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link text-uppercase fw-bold ${activeTab === tab ? 'active border-bottom border-danger text-danger border-0 border-bottom-3' : 'text-muted'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'description' && 'Description'}
                {tab === 'specifications' && 'Specifications'}
                {tab === 'nutrition' && 'Nutrition'}
                {tab === 'reviews' && `Reviews (${reviews.length})`}
                {tab === 'similar' && 'Similar Products'}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === 'description' && (
          <div>
            <h5 className="fw-bold mb-3">Product Overview</h5>
            <p className="text-muted leading-relaxed">{product.description}</p>
            {product.ingredients && (
              <div className="mt-3">
                <h6 className="fw-bold">Ingredients:</h6>
                <p className="text-muted small">{product.ingredients}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div>
            <h5 className="fw-bold mb-3">Specifications</h5>
            <table className="table table-striped table-bordered max-w-xl">
              <tbody>
                {product.specifications && Object.entries(product.specifications).map(([key, val]) => (
                  <tr key={key}>
                    <td className="fw-bold text-muted w-50">{key}</td>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div>
            <h5 className="fw-bold mb-3">Nutritional Information (per 100g)</h5>
            <table className="table table-bordered max-w-md">
              <thead className="table-light">
                <tr><th>Nutrient</th><th>Amount</th></tr>
              </thead>
              <tbody>
                {product.nutrition && Object.entries(product.nutrition).map(([k, v]) => (
                  <tr key={k}>
                    <td className="fw-semibold">{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="row g-4">
              <div className="col-md-7">
                <h5 className="fw-bold mb-3">Customer Reviews</h5>
                {reviews.map(r => (
                  <div key={r.id} className="p-3 border-bottom mb-3">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <strong className="text-dark">{r.customerName}</strong>
                      <span className="small text-muted">{r.date}</span>
                    </div>
                    <ProductRating rating={r.rating} />
                    <h6 className="fw-bold text-dark mt-2 mb-1">{r.title}</h6>
                    <p className="small text-muted mb-0">{r.comment}</p>
                  </div>
                ))}
              </div>

              {/* Add Review Form */}
              <div className="col-md-5">
                <div className="p-3 bg-light rounded-3 border">
                  <h6 className="fw-bold mb-3">Write a Customer Review</h6>
                  <form onSubmit={handleAddReviewSubmit}>
                    <div className="mb-2">
                      <label className="small fw-bold text-muted">Rating:</label>
                      <select className="form-select form-select-sm" value={newReviewRating} onChange={(e) => setNewReviewRating(e.target.value)}>
                        <option value="5">5 ⭐ - Excellent</option>
                        <option value="4">4 ⭐ - Very Good</option>
                        <option value="3">3 ⭐ - Average</option>
                        <option value="2">2 ⭐ - Poor</option>
                        <option value="1">1 ⭐ - Terrible</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="small fw-bold text-muted">Review Title:</label>
                      <input type="text" className="form-control form-control-sm" placeholder="e.g. Fresh &amp; soft rotis" value={newReviewTitle} onChange={(e) => setNewReviewTitle(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                      <label className="small fw-bold text-muted">Detailed Comment:</label>
                      <textarea className="form-control form-control-sm" rows="3" placeholder="Share your experience with this product..." value={newReviewComment} onChange={(e) => setNewReviewComment(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-smartmart-primary btn-sm w-100">Submit Review</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'similar' && (
          <div>
            <h5 className="fw-bold mb-3">Similar Products in {product.category}</h5>
            <div className="row g-3">
              {similarProducts.map(p => (
                <div key={p.id} className="col-6 col-md-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
