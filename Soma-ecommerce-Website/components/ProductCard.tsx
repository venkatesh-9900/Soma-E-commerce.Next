"use client";

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import FavoriteButton from './FavoriteButton';

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  badge?: string;
  discount: string;
  currentPrice: string;
  mrp: string;
}

export default function ProductCard({ id, name, image, badge, discount, currentPrice, mrp }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleShop = (e: React.MouseEvent) => {
    e.preventDefault();
    const priceNumeric = parseFloat(currentPrice.replace(/[^0-9.]/g, '')) || 0;
    
    addToCart({
      id,
      name,
      image,
      price: priceNumeric,
      quantity
    });
  };

  return (
    <div className="product-card relative flex flex-col h-full w-full min-h-[460px]">
      <img src={image} alt={name} loading="lazy" />
      <div className="product-info flex flex-col flex-grow p-4 pb-6 gap-2">
        {badge && (
          <div className="products-text">
            <h5>{badge}</h5>
          </div>
        )}
        <FavoriteButton />
        
        {/* Title */}
        <h4 className="min-h-[48px] m-0 leading-tight">{name}</h4>
        
        {/* Bottom Section */}
        <div className="mt-auto flex flex-col" style={{ width: '100%' }}>
          
          {/* Price Row: Center aligned discount with gap */}
          <div className="w-full mt-2" style={{ display: 'flex', justifyContent: 'flex-start', gap: '16px', alignItems: 'center' }}>
            <span className="current-price m-0 font-bold" style={{ textAlign: 'left' }}>{currentPrice}</span>
            <span className="discount m-0">{discount}</span>
          </div>

          {/* MRP: mt-1 */}
          <div className="mrp m-0 mt-1 text-sm opacity-80" style={{ textAlign: 'left' }}>
            M.R.P.: <span className="original-price">{mrp}</span>
          </div>
          
          {/* Quantity + Button Row: Pushed down via mt-6 / mt-8 */}
          <div className="w-full mt-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="qty-counter m-0" style={{ flexShrink: 0, marginLeft: 0 }}>
              <span className="qty-btn minus" onClick={handleMinus}>-</span>
              <span className="qty-value">{quantity}</span>
              <span className="qty-btn plus" onClick={handlePlus}>+</span>
            </div>

            <a href="#" className="shop-button m-0 px-6 gap-2" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleShop}>
              <span>Shop</span> <i className="bx bx-cart text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
