import { mockCategories } from '../mock/mockCategories';

export const categoryService = {
  getCategories: async () => {
    return { success: true, data: mockCategories };
  },
  getCategoryById: async (id) => {
    const cat = mockCategories.find(c => c.id === id);
    return { success: true, data: cat };
  }
};
