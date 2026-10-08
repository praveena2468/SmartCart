import { mockProducts } from './mockProducts';

export const getSmartRecommendations = (limit = 4) => {
  return mockProducts.map(p => ({
    ...p,
    recommendationReason: p.recommendationTag === 'Best Value' 
      ? 'Lowest cost per kg in its category with 4.5+ star rating'
      : p.recommendationTag === 'Best Overall'
      ? 'Highest combined SmartMart score (Quality + Price + Satisfaction)'
      : p.recommendationTag === 'Best Rated'
      ? 'Customer favorite with over 95% positive feedback'
      : 'Top choice among SmartMart shoppers'
  })).slice(0, limit);
};
