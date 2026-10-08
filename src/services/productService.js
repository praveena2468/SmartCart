import apiClient from './api';
import { mockProducts } from '../mock/mockProducts';

export const productService = {
  getProducts: async (filters = {}) => {
    try {
      // API call structure ready for backend connection
      // const res = await apiClient.get('/products', { params: filters });
      // return res.data;

      // Mock filter implementation for frontend demo
      let list = [...mockProducts];
      if (filters.category && filters.category !== 'all') {
        list = list.filter(p => p.categoryId === filters.category || p.category.toLowerCase().includes(filters.category.toLowerCase()));
      }
      if (filters.brand) {
        list = list.filter(p => p.brandId === filters.brand || p.brand.toLowerCase() === filters.brand.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
      }
      if (filters.minPrice) {
        list = list.filter(p => p.price >= Number(filters.minPrice));
      }
      if (filters.maxPrice) {
        list = list.filter(p => p.price <= Number(filters.maxPrice));
      }
      if (filters.rating) {
        list = list.filter(p => p.rating >= Number(filters.rating));
      }
      if (filters.discount) {
        list = list.filter(p => p.discountPercentage >= Number(filters.discount));
      }
      if (filters.inStockOnly) {
        list = list.filter(p => p.inStock);
      }

      // Sorting
      if (filters.sort) {
        if (filters.sort === 'price-low') list.sort((a, b) => a.price - b.price);
        if (filters.sort === 'price-high') list.sort((a, b) => b.price - a.price);
        if (filters.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
        if (filters.sort === 'discount') list.sort((a, b) => b.discountPercentage - a.discountPercentage);
        if (filters.sort === 'satisfaction') list.sort((a, b) => b.smartScore.customerScore - a.smartScore.customerScore);
      }

      return { success: true, data: list, count: list.length };
    } catch (error) {
      return { success: false, data: mockProducts, error: error.message };
    }
  },

  getProductById: async (id) => {
    try {
      const found = mockProducts.find(p => p.id === id);
      return { success: true, data: found || mockProducts[0] };
    } catch (error) {
      return { success: false, data: mockProducts[0] };
    }
  },

  getProductByBarcode: async (barcode) => {
    const found = mockProducts.find(p => p.barcode === barcode || p.sku === barcode);
    return { success: true, data: found || mockProducts[0] };
  },

  getSimilarProducts: async (productId) => {
    const current = mockProducts.find(p => p.id === productId);
    if (!current) return { success: true, data: mockProducts.slice(0, 4) };
    const list = mockProducts.filter(p => p.id !== productId && p.categoryId === current.categoryId);
    return { success: true, data: list.length > 0 ? list : mockProducts.slice(0, 4) };
  },

  createProduct: async (productData) => {
    const newProd = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 4.5,
      reviewCount: 1,
      smartScore: { priceScore: 8.5, qualityScore: 9.0, customerScore: 8.8, offerScore: 8.0, overallScore: 8.6 }
    };
    mockProducts.unshift(newProd);
    return { success: true, data: newProd, message: 'Product created successfully' };
  },

  updateProduct: async (id, productData) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return { success: true, data: mockProducts[index], message: 'Product updated successfully' };
    }
    return { success: false, message: 'Product not found' };
  },

  deleteProduct: async (id) => {
    const idx = mockProducts.findIndex(p => p.id === id);
    if (idx !== -1) mockProducts.splice(idx, 1);
    return { success: true, message: 'Product deleted successfully' };
  }
};
