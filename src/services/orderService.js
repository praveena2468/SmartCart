import { mockOrders } from '../mock/mockOrders';

export const orderService = {
  getOrders: async () => {
    return { success: true, data: mockOrders };
  },
  getOrderById: async (id) => {
    const found = mockOrders.find(o => o.id === id);
    return { success: true, data: found || mockOrders[0] };
  },
  createOrder: async (orderPayload) => {
    const newOrder = {
      id: `ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Confirmed',
      paymentStatus: 'Paid',
      timeline: [
        { status: 'Ordered', timestamp: 'Just now', completed: true, details: 'Order submitted' },
        { status: 'Confirmed', timestamp: 'Just now', completed: true, details: 'Payment verified' },
        { status: 'Packed', timestamp: 'Pending', completed: false },
        { status: 'Shipped', timestamp: 'Pending', completed: false },
        { status: 'Out for Delivery', timestamp: 'Pending', completed: false },
        { status: 'Delivered', timestamp: 'Pending', completed: false }
      ],
      ...orderPayload
    };
    mockOrders.unshift(newOrder);
    return { success: true, data: newOrder, message: 'Order placed successfully!' };
  },
  updateOrderStatus: async (id, status) => {
    const order = mockOrders.find(o => o.id === id);
    if (order) {
      order.status = status;
      const stepIndex = order.timeline.findIndex(t => t.status.toLowerCase() === status.toLowerCase());
      if (stepIndex !== -1) {
        order.timeline[stepIndex].completed = true;
        order.timeline[stepIndex].timestamp = 'Updated just now';
      }
      return { success: true, data: order, message: `Order status changed to ${status}` };
    }
    return { success: false, message: 'Order not found' };
  }
};
