import { getSmartRecommendations } from '../mock/mockRecommendations';

export const recommendationService = {
  getPersonalizedRecommendations: async (limit = 4) => {
    const list = getSmartRecommendations(limit);
    return { success: true, data: list };
  }
};
