# SmartMart — Intelligent Supermarket & E-Commerce Platform

SmartMart is a modern, production-quality frontend web application for an intelligent supermarket shopping platform. It combines online product shopping, product discovery, brand comparison, price/satisfaction intelligence, barcode scanning, supermarket in-store cart integration, order tracking, and an extensive admin management dashboard.

---

## 🌟 Key Innovations

1. **Product & Brand Comparison Engine (`/compare`)**:
   - Compare competing Indian supermarket brands (e.g. ITC Aashirvaad, Fortune, Tata Sampann, Pillsbury, Amul, Surf Excel, Nestlé) side-by-side.
   - Comprehensive comparison matrix covering:
     - Basic Information (Brand, Category, Pack Size)
     - Pricing & Unit Cost (Current Price, MRP, Discount %, Price/kg)
     - Customer Satisfaction (Ratings, Reviews, Positive Feedback %)
     - Active Offers & Coupons
     - Product Quality & Ingredients (Certifications, FSSAI seals)
     - Automated **SmartMart Score** (10-point weighted rating: Price, Quality, Customer Satisfaction, Offers)
     - Algorithmic Winner Recommendation Badge (**Best Overall Choice**, **Best Value**).

2. **Digital Barcode Scanner Workflow (`/scan`)**:
   - Simulated live camera viewport with scanning laser animation.
   - Clickable barcode scanner simulation (or manual barcode input) matching real FMCG barcodes (`8901058852101`, `8901262010052`, etc.).
   - Instant overlay of product details, SmartMart Score, and 1-tap cart addition.

3. **Supermarket In-Store Smart Cart (`/store-cart`)**:
   - High-contrast interface designed for tablet or mobile mounting on physical supermarket carts.
   - Prominent running total bill display.
   - Live scanned product list with quantity controls.
   - Smart cross-selling recommendations & active store offers.
   - 1-tap UPI payment & instant checkout to bypass checkout queues.

4. **API-Ready Architecture**:
   - Decoupled service architecture in `src/services/` with environment variable `VITE_API_BASE_URL`.
   - Ready for backend connection (Express/Node.js/MySQL) without modifying UI components.

5. **Comprehensive Admin Management Portal (`/admin/*`)**:
   - 14 modular admin interfaces covering Dashboard, Products, Categories, Brands, Orders, Customers, Reviews, Offers & Coupons, Inventory, Comparison Weightage Matrix, Product Data API Import, External Data Sources, Analytics, and System Settings.

---

## 🎨 Design System & Color Palette

- **Primary**: Deep Magenta / Raspberry (`#D81B60`)
- **Secondary**: Coral / Orange (`#FF6F61`)
- **Accent**: Warm Yellow (`#FFC107`)
- **Neutrals**: White (`#FFFFFF`), Off White (`#FAFAFA`), Dark (`#111827`, `#1F2937`)
- **Typography**: `Outfit` for headings and `Plus Jakarta Sans` for body text.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Bootstrap 5 + Bootstrap Icons + Custom CSS Tokens (`src/styles/custom.css`)
- **Routing**: React Router DOM v7 (Lazy loaded routes)
- **HTTP Client**: Axios with request/response interceptors (`src/services/api.js`)
- **State Management**: React Context API (`AuthContext`, `CartContext`, `WishlistContext`, `CompareContext`, `SearchContext`, `ToastContext`) with `localStorage` persistence.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The application will run on `http://localhost:5173`.

### 3. Build Production Bundle
```bash
npm run build
```

---

## 🔑 Demo Quick Credentials

- **Customer Login**: `rahul.sharma@example.com` / `password`
- **Admin Login**: `admin@smartmart.com` / `admin`

---

## 📂 Project Structure

```
src/
├── styles/
│   └── custom.css                # Custom CSS variables, design tokens & Bootstrap overrides
├── mock/
│   ├── mockProducts.js           # FMCG products with SmartMart Score parameters
│   ├── mockCategories.js         # Supermarket category data
│   ├── mockBrands.js             # Indian brand profiles
│   ├── mockOrders.js             # Customer order tracking timeline
│   ├── mockReviews.js            # Product review moderation entries
│   ├── mockOffers.js             # Festival coupons & promo offers
│   ├── mockComparison.js         # Benchmark comparison groups
│   ├── mockCustomers.js          # Customer profiles
│   ├── mockAnalytics.js          # Revenue trends & category metrics
│   └── mockRecommendations.js    # Recommendation algorithms
├── services/
│   ├── api.js                    # Axios instance with VITE_API_BASE_URL
│   ├── productService.js
│   ├── categoryService.js
│   ├── brandService.js
│   ├── cartService.js
│   ├── orderService.js
│   ├── userService.js
│   ├── reviewService.js
│   ├── comparisonService.js
│   ├── recommendationService.js
│   ├── inventoryService.js
│   ├── offerService.js
│   ├── adminService.js
│   └── productImportService.js
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   ├── CompareContext.jsx
│   ├── SearchContext.jsx
│   └── ToastContext.jsx
├── components/
│   ├── common/                   # Reusable UI components (Navbar, Footer, ProductCard, PriceDisplay, etc.)
│   ├── customer/                 # Customer application pages (Home, ProductListing, ProductDetails, Compare, Cart, Checkout, Orders, Wishlist, Profile, Scan, StoreCart)
│   └── admin/                    # Admin portal pages (Dashboard, Products, Orders, Inventory, Analytics, Import, etc.)
├── App.jsx                       # Main router & layout configuration
└── main.jsx                      # App entry point
```
