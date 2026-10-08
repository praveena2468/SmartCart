import { mockBrands } from '../mock/mockBrands';

export const brandService = {
  getBrands: async () => {
    return { success: true, data: mockBrands };
  },
  getBrandById: async (id) => {
    const brand = mockBrands.find(b => b.id === id);
    return { success: true, data: brand };
  }
};
