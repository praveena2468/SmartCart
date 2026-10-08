export const mockAnalytics = {
  summary: {
    totalRevenue: 1842900,
    revenueGrowth: '+18.4%',
    totalOrders: 3420,
    ordersGrowth: '+12.1%',
    totalCustomers: 8940,
    customersGrowth: '+24.5%',
    avgOrderValue: 538,
    activeOffersCount: 6,
    lowStockCount: 4,
    comparisonScans: 14200
  },
  salesTrend: [
    { month: 'May', revenue: 240000, orders: 480 },
    { month: 'Jun', revenue: 280000, orders: 520 },
    { month: 'Jul', revenue: 310000, orders: 590 },
    { month: 'Aug', revenue: 340000, orders: 630 },
    { month: 'Sep', revenue: 390000, orders: 710 },
    { month: 'Oct', revenue: 482900, orders: 890 }
  ],
  categoryPerformance: [
    { category: 'Foodgrains & Atta', percentage: 38, revenue: 700302 },
    { category: 'Dairy & Bakery', percentage: 22, revenue: 405438 },
    { category: 'Beverages', percentage: 16, revenue: 294864 },
    { category: 'Snacks & Munchies', percentage: 14, revenue: 258006 },
    { category: 'Household Care', percentage: 10, revenue: 184290 }
  ],
  mostComparedGroups: [
    { group: 'Whole Wheat Atta 5kg', comparisons: 4820, winner: 'Aashirvaad Superior MP Atta' },
    { group: 'Pure Cow Ghee 1L', comparisons: 3910, winner: 'Amul Pure Cow Ghee' },
    { group: 'Toned Milk 1L', comparisons: 2840, winner: 'Amul Taaza Milk' },
    { group: 'Laundry Detergent 2kg', comparisons: 1820, winner: 'Surf Excel Easy Wash' }
  ],
  topSellingProducts: [
    { name: 'Aashirvaad Superior MP Atta 5kg', sales: 1240, revenue: 303800 },
    { name: 'Amul Pure Cow Ghee 1L', sales: 890, revenue: 560700 },
    { name: 'Amul Taaza Toned Milk 1L', sales: 2150, revenue: 154800 },
    { name: 'Fortune Chakki Fresh Atta 5kg', sales: 940, revenue: 206800 }
  ]
};
