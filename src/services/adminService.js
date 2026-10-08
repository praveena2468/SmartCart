import { mockAnalytics } from '../mock/mockAnalytics';

export const adminService = {
  getDashboardMetrics: async () => {
    return { success: true, data: mockAnalytics };
  },

  getAnalytics: async () => {
    return { success: true, data: mockAnalytics };
  }
};
