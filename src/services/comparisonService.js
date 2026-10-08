import { mockComparisonGroups } from '../mock/mockComparison';
import { mockProducts } from '../mock/mockProducts';

export const comparisonService = {
  getComparisonGroups: async () => {
    return { success: true, data: mockComparisonGroups };
  },

  compareProducts: async (productIds = []) => {
    const products = mockProducts.filter(p => productIds.includes(p.id));
    if (products.length === 0) return { success: false, message: 'No valid products to compare' };

    // Calculate score breakdown and determine winner
    let highestScore = -1;
    let winnerId = null;

    const summary = products.map(p => {
      const overall = p.smartScore.overallScore;
      if (overall > highestScore) {
        highestScore = overall;
        winnerId = p.id;
      }
      return p;
    });

    return {
      success: true,
      data: {
        products: summary,
        winnerId,
        winnerProduct: products.find(p => p.id === winnerId),
        recommendationText: `SmartMart algorithms recommend ${products.find(p => p.id === winnerId)?.name} as the Best Overall Choice, providing maximum value across Quality, Pricing, and Customer Satisfaction scores.`
      }
    };
  }
};
