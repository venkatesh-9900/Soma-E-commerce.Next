"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate standard standard website loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <ScrollReveal delay={0.1}>
        <Hero />
      </ScrollReveal>
      <ProductGrid />
      <ScrollReveal delay={0.2}>
        <Footer />
      </ScrollReveal>
    </>
  );
}
