import { mockProducts } from '../mock/mockProducts';

export const inventoryService = {
  getInventory: async () => {
    const list = mockProducts.map(p => ({
      sku: p.sku,
      barcode: p.barcode,
      productId: p.id,
      productName: p.name,
      brand: p.brand,
      currentStock: p.stockCount,
      minStock: 20,
      status: p.stockCount === 0 ? 'Out of Stock' : p.stockCount < 50 ? 'Low Stock' : 'In Stock',
      lastUpdated: '2026-10-08 10:00'
    }));
    return { success: true, data: list };
  },

  updateStock: async (sku, newStock) => {
    const item = mockProducts.find(p => p.sku === sku);
    if (item) {
      item.stockCount = Number(newStock);
      item.inStock = Number(newStock) > 0;
      return { success: true, message: `Stock updated for ${item.name}` };
    }
    return { success: false, message: 'SKU not found' };
  }
};
