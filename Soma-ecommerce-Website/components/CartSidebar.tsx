"use client";

import React, { useCallback, useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

interface CartSidebarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  colors?: string[];
  className?: string;
  isFixed?: boolean;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  open,
  setOpen,
  colors = ['#B19EEF', '#5227FF'], // default staggered colors
  className,
  isFixed = true,
}) => {
  const {
    cartItems,
    subtotal,
    discountPercentage,
    discountAmount,
    finalTotal,
    couponCode,
    couponError,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  // Formatting utility
  const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.cs-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      // Start offscreen to the right (100%)
      gsap.set([panel, ...preLayers], { xPercent: 100 });
    });
    return () => ctx.revert();
  }, []);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) || 100 }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent')) || 100;

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    // Optional: we can stagger animate cart items if we wanted here

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    
    closeTweenRef.current = gsap.to(all, {
      xPercent: 100, // Slide back to right
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        busyRef.current = false;
      }
    });
  }, []);

  useEffect(() => {
    if (open) playOpen();
    else playClose();
  }, [open, playOpen, playClose]);

  // Close Menu Overlay Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Removed to strictly enforce closing only via the 'X' button.
      // if (e.target === e.currentTarget) {
      //   setOpen(false);
      // }
    };
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Handle independent scrolling isolation without layout shift
  useEffect(() => {
    if (open) {
      // Calculate scrollbar width to prevent page sliding
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  const handleWrapperClick = (e: React.MouseEvent) => {
    // Removed to ensure the sidebar ONLY closes when the X button is explicitly clicked.
    // if (e.target === e.currentTarget) {
    //   setOpen(false);
    // }
  };

  const handleApplyCoupon = async () => {
    setIsApplying(true);
    await applyCoupon(inputCoupon);
    setIsApplying(false);
    setInputCoupon('');
  };

  return (
    <div
      className={`cart-sidebar-wrapper ${className || ''}`}
      style={{
        position: isFixed ? 'fixed' : 'absolute',
        pointerEvents: open ? 'auto' : 'none',
      }}
      onClick={handleWrapperClick}
    >
      <div ref={preLayersRef} className="cs-prelayers" aria-hidden="true">
        {colors.slice(0, 2).map((c, i) => (
          <div key={i} className="cs-prelayer" style={{ background: c }} />
        ))}
      </div>

      <aside id="cart-sidebar-panel" ref={panelRef} className="cart-sidebar-panel" aria-hidden={!open}>
        <button className="cs-close-btn" onClick={() => setOpen(false)} aria-label="Close cart">&times;</button>
        <h2 className="cs-title">Your Cart</h2>

        <div className="cs-panel-inner">
          {cartItems.length === 0 ? (
            <div className="cs-empty-state">
              <i className="bx bx-cart cs-empty-icon" />
              <div className="cs-empty-title">Your cart is empty</div>
              <div>Add items to get started</div>
            </div>
          ) : (
            <>
              {/* Product List */}
              <div className="cs-item-list">
                {cartItems.map(item => (
                  <div key={item.id} className="cs-item">
                    <img src={item.image} alt={item.name} className="cs-item-image" />
                    <div className="cs-item-details">
                      <h4 className="cs-item-name">{item.name}</h4>
                      <div className="cs-item-price">{formatPrice(item.price)}</div>
                      
                      <div className="cs-item-actions">
                        <div className="cs-qty-control">
                          <button className="cs-qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span className="cs-qty-value">{item.quantity}</span>
                          <button className="cs-qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button className="cs-remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                          <i className="bx bx-trash" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Section */}
              <div className="cs-coupon-section">
                {!couponCode ? (
                  <>
                    <div className="cs-coupon-input-group">
                      <input 
                        type="text" 
                        placeholder="Enter coupon code (e.g., SAVE10)" 
                        className="cs-coupon-input"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                      <button 
                        className="cs-coupon-btn" 
                        onClick={handleApplyCoupon}
                        disabled={isApplying || !inputCoupon.trim()}
                      >
                        {isApplying ? '...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && <div className="cs-coupon-message error">{couponError}</div>}
                  </>
                ) : (
                  <div className="cs-coupon-message success">
                    <span>Coupon applied: <strong>{couponCode}</strong> (-{discountPercentage * 100}%)</span>
                    <button className="cs-coupon-remove" onClick={removeCoupon}>Remove</button>
                  </div>
                )}
              </div>

              {/* Summary Section */}
              <div className="cs-summary">
                <div className="cs-summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="cs-summary-row">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="cs-summary-row total">
                  <span>Final Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button className="cs-checkout-btn">
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CartSidebar;
