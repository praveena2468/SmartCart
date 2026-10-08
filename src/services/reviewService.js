import { mockReviews } from '../mock/mockReviews';

export const reviewService = {
  getReviews: async (productId) => {
    if (productId) {
      return { success: true, data: mockReviews.filter(r => r.productId === productId) };
    }
    return { success: true, data: mockReviews };
  },
  addReview: async (reviewPayload) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
      likes: 0,
      status: 'Approved',
      ...reviewPayload
    };
    mockReviews.unshift(newRev);
    return { success: true, data: newRev, message: 'Review submitted successfully!' };
  },
  updateReviewStatus: async (id, status) => {
    const rev = mockReviews.find(r => r.id === id);
    if (rev) rev.status = status;
    return { success: true, message: `Review status changed to ${status}` };
  },
  deleteReview: async (id) => {
    const idx = mockReviews.findIndex(r => r.id === id);
    if (idx !== -1) mockReviews.splice(idx, 1);
    return { success: true, message: 'Review deleted' };
  }
};
