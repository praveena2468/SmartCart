export const mockOrders = [
  {
    id: 'ORD-2026-98101',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.sharma@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-10-06 14:30',
    totalAmount: 1152,
    discountAmount: 168,
    deliveryFee: 0,
    taxAmount: 54,
    paymentMethod: 'UPI (Google Pay)',
    paymentStatus: 'Paid',
    status: 'Out for Delivery',
    items: [
      {
        productId: 'prod-atta-01',
        name: 'Aashirvaad Superior MP Whole Wheat Atta',
        packSize: '5 kg',
        price: 245,
        mrp: 290,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
      },
      {
        productId: 'prod-ghee-01',
        name: 'Amul Pure Cow Ghee Jar',
        packSize: '1 L Tin',
        price: 630,
        mrp: 690,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80'
      },
      {
        productId: 'prod-snack-01',
        name: 'Britannia Good Day Cashew Cookies Pack',
        packSize: '600 g (Family Pack)',
        price: 32,
        mrp: 40,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80'
      }
    ],
    deliveryAddress: {
      name: 'Rahul Sharma',
      houseNo: 'Flat 402, Sunshine Heights',
      street: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038'
    },
    timeline: [
      { status: 'Ordered', timestamp: '2026-10-06 14:30', completed: true, details: 'Order placed successfully' },
      { status: 'Confirmed', timestamp: '2026-10-06 14:35', completed: true, details: 'Payment received via UPI' },
      { status: 'Packed', timestamp: '2026-10-06 16:10', completed: true, details: 'Items packed in SmartMart Eco Bag' },
      { status: 'Shipped', timestamp: '2026-10-06 18:00', completed: true, details: 'Dispatched from Bengaluru Central Hub' },
      { status: 'Out for Delivery', timestamp: '2026-10-08 09:15', completed: true, details: 'Delivery executive Suresh (Ph: 9876512345) is on the way' },
      { status: 'Delivered', timestamp: 'Expected Today by 1:00 PM', completed: false, details: 'Arriving soon' }
    ]
  },
  {
    id: 'ORD-2026-97845',
    customerName: 'Priya Sundaram',
    customerEmail: 'priya.s@example.com',
    customerPhone: '+91 91234 56789',
    date: '2026-10-04 11:15',
    totalAmount: 647,
    discountAmount: 110,
    deliveryFee: 29,
    taxAmount: 32,
    paymentMethod: 'Credit Card (HDFC)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    items: [
      {
        productId: 'prod-tea-01',
        name: 'Tata Tea Premium Desh Ki Chai',
        packSize: '500 g',
        price: 260,
        mrp: 310,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80'
      },
      {
        productId: 'prod-det-01',
        name: 'Surf Excel Easy Wash Detergent Powder',
        packSize: '2 kg',
        price: 295,
        mrp: 350,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
      }
    ],
    deliveryAddress: {
      name: 'Priya Sundaram',
      houseNo: 'No 14, 2nd Cross',
      street: 'T. Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600017'
    },
    timeline: [
      { status: 'Ordered', timestamp: '2026-10-04 11:15', completed: true },
      { status: 'Confirmed', timestamp: '2026-10-04 11:18', completed: true },
      { status: 'Packed', timestamp: '2026-10-04 13:00', completed: true },
      { status: 'Shipped', timestamp: '2026-10-04 15:30', completed: true },
      { status: 'Out for Delivery', timestamp: '2026-10-05 08:45', completed: true },
      { status: 'Delivered', timestamp: '2026-10-05 11:30', completed: true }
    ]
  }
];
