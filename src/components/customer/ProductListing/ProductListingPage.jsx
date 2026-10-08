import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { productService } from '../../../services/productService';
import { categoryService } from '../../../services/categoryService';
import { brandService } from '../../../services/brandService';
import { ProductGrid } from '../../common/ProductGrid';
import { Breadcrumb } from '../../common/Breadcrumb';
import { LoadingSpinner } from '../../common/Loading';
import { Pagination } from '../../common/Pagination';

export const ProductListingPage = () => {
  const { category: categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState('relevance');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const catRes = await categoryService.getCategories();
      const brandRes = await brandService.getBrands();
      if (catRes.success) setCategories(catRes.data);
      if (brandRes.success) setBrands(brandRes.data);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      const res = await productService.getProducts({
        category: selectedCategory,
        brand: selectedBrand,
        search: searchQuery,
        minPrice,
        maxPrice,
        rating: ratingFilter,
        discount: discountFilter,
        inStockOnly,
        sort: sortOption
      });
      if (res.success) {
        setProducts(res.data);
      }
      setLoading(false);
      setCurrentPage(1);
    };
    fetchFilteredProducts();
  }, [selectedCategory, selectedBrand, searchQuery, minPrice, maxPrice, ratingFilter, discountFilter, inStockOnly, sortOption]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('');
    setMinPrice('');
    setMaxPrice('');
    setRatingFilter('');
    setDiscountFilter('');
    setInStockOnly(false);
    setSortOption('relevance');
    setSearchParams({});
  };

  // Pagination slicing
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Products', path: '/products' }, ...(selectedCategory !== 'all' ? [{ label: selectedCategory }] : [])]} />

      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 className="fw-bold font-heading mb-0">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== 'all' ? `Category: ${selectedCategory}` : 'All Supermarket Products'}
          </h2>
          <span className="text-muted small">Showing {products.length} products with SmartMart Score ratings</span>
        </div>

        {/* Sort Dropdown */}
        <div className="d-flex align-items-center gap-2">
          <label className="fw-semibold small text-muted text-nowrap">Sort By:</label>
          <select
            className="form-select form-select-sm shadow-none border-secondary"
            style={{ minWidth: '180px' }}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="discount">Discount Percentage</option>
            <option value="satisfaction">Customer Satisfaction Score</option>
          </select>
        </div>
      </div>

      <div className="row g-4">
        {/* LEFT SIDEBAR FILTERS */}
        <div className="col-lg-3">
          <div className="bg-white p-3 rounded-3 border shadow-sm sticky-top" style={{ top: '90px' }}>
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
              <h5 className="fw-bold mb-0 text-dark font-heading"><i className="bi bi-funnel-fill text-danger me-2"></i>Filters</h5>
              <button className="btn btn-link text-danger text-decoration-none btn-sm p-0 fw-semibold" onClick={handleResetFilters}>
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="fw-bold small text-dark mb-2 text-uppercase">Category</label>
              <select
                className="form-select form-select-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="mb-4">
              <label className="fw-bold small text-dark mb-2 text-uppercase">Brand</label>
              <select
                className="form-select form-select-sm"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <label className="fw-bold small text-dark mb-2 text-uppercase">Price Range (₹)</label>
              <div className="d-flex gap-2">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="align-self-center text-muted">-</span>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <label className="fw-bold small text-dark mb-2 text-uppercase">Minimum Rating</label>
              <div className="vstack gap-1">
                {[4, 3, 2].map(star => (
                  <div className="form-check" key={star}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="ratingFilter"
                      id={`rating-${star}`}
                      checked={ratingFilter === String(star)}
                      onChange={() => setRatingFilter(String(star))}
                    />
                    <label className="form-check-label small" htmlFor={`rating-${star}`}>
                      {star}⭐ &amp; Above
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Checkbox */}
            <div className="mb-3 form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="inStockCheck"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label className="form-check-label small fw-semibold text-dark" htmlFor="inStockCheck">
                In Stock Only
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT PRODUCT GRID */}
        <div className="col-lg-9">
          {loading ? (
            <LoadingSpinner text="Searching SmartMart catalogue..." />
          ) : (
            <>
              <ProductGrid products={currentProducts} />

              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
