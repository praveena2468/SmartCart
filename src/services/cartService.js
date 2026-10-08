export const cartService = {
  applyCoupon: async (couponCode, subtotal) => {
    if (couponCode.toUpperCase() === 'FESTIVE100' && subtotal >= 999) {
      return { success: true, discount: 100, code: 'FESTIVE100', message: '₹100 Coupon discount applied!' };
    }
    if (couponCode.toUpperCase() === 'ATTASAVER' && subtotal >= 499) {
      return { success: true, discount: Math.round(subtotal * 0.1), code: 'ATTASAVER', message: '10% Grocery discount applied!' };
    }
    if (couponCode.toUpperCase() === 'SMARTCART15') {
      return { success: true, discount: Math.round(subtotal * 0.15), code: 'SMARTCART15', message: '15% Smart Cart discount applied!' };
    }
    return { success: false, discount: 0, message: 'Invalid or expired coupon code' };
  }
};
