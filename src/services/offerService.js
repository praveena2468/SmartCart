import { mockOffers } from '../mock/mockOffers';

export const offerService = {
  getOffers: async () => {
    return { success: true, data: mockOffers };
  },

  createOffer: async (offerData) => {
    const newOffer = {
      id: `off-${Date.now()}`,
      timesUsed: 0,
      status: 'Active',
      ...offerData
    };
    mockOffers.unshift(newOffer);
    return { success: true, data: newOffer, message: 'Offer created successfully' };
  },

  toggleOfferStatus: async (id) => {
    const off = mockOffers.find(o => o.id === id);
    if (off) {
      off.status = off.status === 'Active' ? 'Inactive' : 'Active';
      return { success: true, message: `Offer status changed to ${off.status}` };
    }
    return { success: false, message: 'Offer not found' };
  },

  deleteOffer: async (id) => {
    const idx = mockOffers.findIndex(o => o.id === id);
    if (idx !== -1) mockOffers.splice(idx, 1);
    return { success: true, message: 'Offer deleted' };
  }
};
