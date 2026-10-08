export const productImportService = {
  getApiSources: async () => {
    return {
      success: true,
      data: [
        { id: 'src-01', source: 'BigBasket API Feed', status: 'Active', lastSync: '2026-10-08 08:30', products: 1240, updated: 42, failed: 0, syncFrequency: 'Hourly' },
        { id: 'src-02', source: 'Blinkit Retail Catalog', status: 'Active', lastSync: '2026-10-08 07:15', products: 890, updated: 18, failed: 1, syncFrequency: '6 Hours' },
        { id: 'src-03', source: 'Zepto Grocery Supplier API', status: 'Active', lastSync: '2026-10-07 23:00', products: 1560, updated: 85, failed: 0, syncFrequency: 'Daily' },
        { id: 'src-04', source: 'JioMart Merchant Feed', status: 'Disabled', lastSync: '2026-09-30 12:00', products: 640, updated: 0, failed: 12, syncFrequency: 'Manual' }
      ]
    };
  },

  triggerSync: async (sourceId) => {
    return {
      success: true,
      message: `Data synchronization initialized for source ${sourceId}. 142 items updated successfully.`,
      timestamp: new Date().toISOString()
    };
  }
};
