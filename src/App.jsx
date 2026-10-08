import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Styling Imports
import './styles/custom.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import { SearchProvider } from './context/SearchContext';
import { ToastProvider } from './context/ToastContext';

// Common Components
import { CustomerNavbar } from './components/common/CustomerNavbar';
import { Footer } from './components/common/Footer';
import { AdminSidebar } from './components/common/AdminSidebar';
import { ToastContainerComponent } from './components/common/Toast';
import { LoadingSpinner } from './components/common/Loading';
import { ProtectedRoute, AdminRoute } from './components/common/ProtectedRoute';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./components/customer/Home/HomePage').then(m => ({ default: m.HomePage })));
const ProductListingPage = lazy(() => import('./components/customer/ProductListing/ProductListingPage').then(m => ({ default: m.ProductListingPage })));
const ProductDetailsPage = lazy(() => import('./components/customer/ProductDetails/ProductDetailsPage').then(m => ({ default: m.ProductDetailsPage })));
const ComparePage = lazy(() => import('./components/customer/Compare/ComparePage').then(m => ({ default: m.ComparePage })));
const CartPage = lazy(() => import('./components/customer/Cart/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./components/customer/Checkout/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrdersListPage = lazy(() => import('./components/customer/Orders/OrdersListPage').then(m => ({ default: m.OrdersListPage })));
const OrderDetailsPage = lazy(() => import('./components/customer/Orders/OrderDetailsPage').then(m => ({ default: m.OrderDetailsPage })));
const WishlistPage = lazy(() => import('./components/customer/Wishlist/WishlistPage').then(m => ({ default: m.WishlistPage })));
const ProfilePage = lazy(() => import('./components/customer/Profile/ProfilePage').then(m => ({ default: m.ProfilePage })));
const LoginPage = lazy(() => import('./components/customer/Auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('./components/customer/Auth/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('./components/customer/Auth/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })));
const ScanPage = lazy(() => import('./components/customer/Scanner/ScanPage').then(m => ({ default: m.ScanPage })));
const StoreCartPage = lazy(() => import('./components/customer/StoreCart/StoreCartPage').then(m => ({ default: m.StoreCartPage })));

// Admin Pages
const AdminDashboardPage = lazy(() => import('./components/admin/Dashboard/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const AdminProductsPage = lazy(() => import('./components/admin/Products/AdminProductsPage').then(m => ({ default: m.AdminProductsPage })));
const AdminProductFormPage = lazy(() => import('./components/admin/Products/AdminProductFormPage').then(m => ({ default: m.AdminProductFormPage })));
const AdminCategoriesPage = lazy(() => import('./components/admin/Categories/AdminCategoriesPage').then(m => ({ default: m.AdminCategoriesPage })));
const AdminBrandsPage = lazy(() => import('./components/admin/Brands/AdminBrandsPage').then(m => ({ default: m.AdminBrandsPage })));
const AdminOrdersPage = lazy(() => import('./components/admin/Orders/AdminOrdersPage').then(m => ({ default: m.AdminOrdersPage })));
const AdminCustomersPage = lazy(() => import('./components/admin/Customers/AdminCustomersPage').then(m => ({ default: m.AdminCustomersPage })));
const AdminReviewsPage = lazy(() => import('./components/admin/Reviews/AdminReviewsPage').then(m => ({ default: m.AdminReviewsPage })));
const AdminOffersPage = lazy(() => import('./components/admin/Offers/AdminOffersPage').then(m => ({ default: m.AdminOffersPage })));
const AdminInventoryPage = lazy(() => import('./components/admin/Inventory/AdminInventoryPage').then(m => ({ default: m.AdminInventoryPage })));
const AdminComparisonsPage = lazy(() => import('./components/admin/Comparisons/AdminComparisonsPage').then(m => ({ default: m.AdminComparisonsPage })));
const AdminProductImportPage = lazy(() => import('./components/admin/ProductImport/AdminProductImportPage').then(m => ({ default: m.AdminProductImportPage })));
const AdminApiDataPage = lazy(() => import('./components/admin/ApiData/AdminApiDataPage').then(m => ({ default: m.AdminApiDataPage })));
const AdminAnalyticsPage = lazy(() => import('./components/admin/Analytics/AdminAnalyticsPage').then(m => ({ default: m.AdminAnalyticsPage })));
const AdminSettingsPage = lazy(() => import('./components/admin/Settings/AdminSettingsPage').then(m => ({ default: m.AdminSettingsPage })));

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return (
      <div className="d-flex min-vh-100 bg-light">
        <AdminSidebar />
        <main className="flex-grow-1 overflow-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <CustomerNavbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <SearchProvider>
              <ToastProvider>
                <Router>
                  <MainLayout>
                    <ToastContainerComponent />
                    <Suspense fallback={<LoadingSpinner text="Loading SmartMart experience..." />}>
                      <Routes>
                        {/* CUSTOMER ROUTES */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/products" element={<ProductListingPage />} />
                        <Route path="/products/:id" element={<ProductDetailsPage />} />
                        <Route path="/search" element={<ProductListingPage />} />
                        <Route path="/category/:category" element={<ProductListingPage />} />
                        <Route path="/compare" element={<ComparePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="/orders" element={<ProtectedRoute><OrdersListPage /></ProtectedRoute>} />
                        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetailsPage /></ProtectedRoute>} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/scan" element={<ScanPage />} />
                        <Route path="/store-cart" element={<StoreCartPage />} />

                        {/* ADMIN ROUTES */}
                        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                        <Route path="/admin/login" element={<LoginPage />} />
                        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
                        <Route path="/admin/products" element={<AdminRoute><AdminProductsPage /></AdminRoute>} />
                        <Route path="/admin/products/add" element={<AdminRoute><AdminProductFormPage /></AdminRoute>} />
                        <Route path="/admin/products/edit/:id" element={<AdminRoute><AdminProductFormPage /></AdminRoute>} />
                        <Route path="/admin/categories" element={<AdminRoute><AdminCategoriesPage /></AdminRoute>} />
                        <Route path="/admin/brands" element={<AdminRoute><AdminBrandsPage /></AdminRoute>} />
                        <Route path="/admin/orders" element={<AdminRoute><AdminOrdersPage /></AdminRoute>} />
                        <Route path="/admin/customers" element={<AdminRoute><AdminCustomersPage /></AdminRoute>} />
                        <Route path="/admin/reviews" element={<AdminRoute><AdminReviewsPage /></AdminRoute>} />
                        <Route path="/admin/offers" element={<AdminRoute><AdminOffersPage /></AdminRoute>} />
                        <Route path="/admin/inventory" element={<AdminRoute><AdminInventoryPage /></AdminRoute>} />
                        <Route path="/admin/comparisons" element={<AdminRoute><AdminComparisonsPage /></AdminRoute>} />
                        <Route path="/admin/product-import" element={<AdminRoute><AdminProductImportPage /></AdminRoute>} />
                        <Route path="/admin/api-data" element={<AdminRoute><AdminApiDataPage /></AdminRoute>} />
                        <Route path="/admin/analytics" element={<AdminRoute><AdminAnalyticsPage /></AdminRoute>} />
                        <Route path="/admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />

                        {/* FALLBACK */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </Suspense>
                  </MainLayout>
                </Router>
              </ToastProvider>
            </SearchProvider>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
