"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

// Simulated API function for coupons
const fetchCouponDiscount = async (code: string): Promise<number | null> => {
  // In a real app, this would be an API call to your admin backend/database
  // e.g. await fetch(`/api/coupons?code=${code}`)
  return new Promise((resolve) => {
    setTimeout(() => {
      const upperCode = code.toUpperCase();
      // Dummy logic for testing admin-changeable coupons:
      if (upperCode === 'SAVE10') resolve(0.10); // 10%
      else if (upperCode === 'WELCOME20') resolve(0.20); // 20%
      else resolve(null); // Invalid
    }, 500);
  });
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  finalTotal: number;
  couponCode: string | null;
  couponError: string | null;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('soma-cart');
      if (savedCart) setCartItems(JSON.parse(savedCart));
      
      const savedCoupon = localStorage.getItem('soma-coupon');
      if (savedCoupon) {
        setCouponCode(savedCoupon);
        fetchCouponDiscount(savedCoupon).then(discount => {
           if (discount) setDiscountPercentage(discount);
        });
      }
    } catch (err) {
      console.log('Error loading cart', err);
    }
  }, []);

  // Save to localStorage when things change
  useEffect(() => {
    localStorage.setItem('soma-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    if (couponCode) localStorage.setItem('soma-coupon', couponCode);
    else localStorage.removeItem('soma-coupon');
  }, [couponCode]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountPercentage;
  const finalTotal = subtotal - discountAmount;

  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => 
      prev.map(i => i.id === id ? { ...i, quantity: newQuantity } : i)
    );
  };

  const applyCoupon = async (code: string): Promise<boolean> => {
    setCouponError(null);
    if (!code.trim()) {
      setCouponError('Please enter a coupon code.');
      return false;
    }
    
    const discount = await fetchCouponDiscount(code);
    if (discount !== null) {
      setCouponCode(code.toUpperCase());
      setDiscountPercentage(discount);
      return true;
    } else {
      setCouponError('Invalid coupon code.');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountPercentage(0);
    setCouponError(null);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      subtotal, 
      discountPercentage, 
      discountAmount, 
      finalTotal, 
      couponCode,
      couponError,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      applyCoupon,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
