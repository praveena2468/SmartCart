import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('smartmart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    localStorage.setItem('smartmart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: newQty } : item));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + ((item.product.mrp || item.product.price) * item.quantity), 0);
  const productDiscount = Math.max(0, totalMrp - subtotal);
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const totalDiscount = productDiscount + couponDiscount;
  const deliveryFee = subtotal > 499 || cartItems.length === 0 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryFee + tax);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (code) => {
    setCouponError('');
    const res = await cartService.applyCoupon(code, subtotal);
    if (res.success) {
      setAppliedCoupon(res);
      return { success: true, message: res.message };
    } else {
      setCouponError(res.message);
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      totalMrp,
      productDiscount,
      couponDiscount,
      totalDiscount,
      deliveryFee,
      tax,
      grandTotal,
      totalItems,
      appliedCoupon,
      couponError,
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
