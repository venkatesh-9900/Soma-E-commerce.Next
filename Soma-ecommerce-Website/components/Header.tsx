"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ThemeToggle from './ThemeToggle';
import { User, ShoppingCart, Menu } from 'lucide-react';
import HamburgerCheckbox from './HamburgerCheckbox';
import SignInButton from './SignInButton';
import StaggeredMenu from './StaggeredMenu';
import CartSidebar from './CartSidebar';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Shop', ariaLabel: 'View our shop', link: '/#shop' },
  { label: 'Page', ariaLabel: 'View extra pages', link: '/#page' },
  { label: 'About Us', ariaLabel: 'Learn about us', link: '/#about' }
];


export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cartCount, cartItems } = useCart();

  const userRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setIsUserSettingsOpen(false);
      }
      // CartSidebar handles its own outside clicks via its overlay wrapper,
      // so we should not close it here. Doing so would close it when interacting with items inside it!
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={isSticky ? "sticky" : ""} style={{ zIndex: 100 }}>
      {/* 1. Left Group: Logo + Theme Toggle */}
      <div className="header-left" style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '20px' }}>
        <div className="logo">
          <img src="/img/logo.png" alt="Soma Farms Logo" />
        </div>
        <ThemeToggle />
      </div>

      {/* 2. Center Group: Navigation Menu */}
      <ul className={`navmenu ${isMenuOpen ? "active" : ""}`} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <li><Link href="#" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link href="#" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
        <li><Link href="#" onClick={() => setIsMenuOpen(false)}>Page</Link></li>
        <li><Link href="#" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
      </ul>

      {/* 3. Right Group: User, Cart, Hamburger */}
      <div className="icons" style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end', gap: '20px', background: 'transparent' }}>
        
        <SignInButton />

        {/* User Account */}
        <div ref={userRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'transparent' }}>
          <User 
            size={24} 
            className="cursor-pointer text-black transition-all hover:scale-105"
            onClick={() => setIsUserSettingsOpen(!isUserSettingsOpen)} 
          />
          <div className={`user-settings ${isUserSettingsOpen ? "" : "hidden"}`} id="user-settings" style={{
            position: 'absolute', top: 'calc(100% + 15px)', right: '-10px', backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', width: '120px', padding: '4px 0', zIndex: 50
          }}>
            <Link href="#" style={{ display: 'block', padding: '8px 16px', fontSize: '14px', color: '#374151', textDecoration: 'none' }}>Profile</Link>
            <Link href="#" style={{ display: 'block', padding: '8px 16px', fontSize: '14px', color: '#374151', textDecoration: 'none' }}>Orders</Link>
            <Link href="#" style={{ display: 'block', padding: '8px 16px', fontSize: '14px', color: '#374151', textDecoration: 'none' }}>Logout</Link>
          </div>
        </div>
        
        {/* Cart */}
        <div ref={cartRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'transparent' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingCart 
              size={24} 
              className="text-black transition-all hover:scale-105"
            />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-8px', backgroundColor: '#ef4444', color: '#fff',
                height: '18px', width: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </div>
        </div>

        <HamburgerCheckbox checked={isMenuOpen} onChange={(e) => setIsMenuOpen(e.target.checked)} />

        {/* Mobile Menu Icon */}
        <div className="mobile-menu-icon hidden" style={{ background: 'transparent' }}>
          <Menu 
            size={28} 
            className="cursor-pointer text-black transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
          />
        </div>
      </div>
      {/* GSAP Staggered Navigation Modal */}
      <StaggeredMenu 
        open={isMenuOpen}
        setOpen={setIsMenuOpen}
        items={menuItems}
        position="right"
        displaySocials={false}
        displayItemNumbering={true}
        colors={['#B19EEF', '#5227FF']}
        accentColor="#5227FF"
      />
      {/* GSAP Staggered Cart Sidebar */}
      <CartSidebar 
        open={isCartOpen} 
        setOpen={setIsCartOpen} 
        colors={['#FFB74D', '#FF9800']} 
      />
    </header>
  );
}
