import { mockCustomers } from '../mock/mockCustomers';

export const userService = {
  login: async (email, password) => {
    if (email === 'admin@smartmart.com') {
      return {
        success: true,
        user: { id: 'usr-admin', name: 'SmartMart Admin', email, role: 'ADMIN' },
        token: 'mock-jwt-admin-token'
      };
    }
    return {
      success: true,
      user: { id: 'usr-001', name: 'Rahul Sharma', email, role: 'CUSTOMER', phone: '+91 98765 43210' },
      token: 'mock-jwt-customer-token'
    };
  },
  register: async (userData) => {
    return {
      success: true,
      user: { id: `usr-${Date.now()}`, name: userData.name, email: userData.email, role: 'CUSTOMER' },
      token: 'mock-jwt-customer-token',
      message: 'Registration successful'
    };
  },
  getProfile: async () => {
    return {
      success: true,
      data: {
        id: 'usr-001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        phone: '+91 98765 43210',
        addresses: [
          { id: 'addr-1', isDefault: true, name: 'Rahul Sharma', houseNo: 'Flat 402, Sunshine Heights', street: 'Indiranagar 100ft Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560038' }
        ]
      }
    };
  },
  getCustomers: async () => {
    return { success: true, data: mockCustomers };
  }
};
