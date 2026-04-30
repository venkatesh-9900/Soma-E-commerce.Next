import React from 'react';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';

const products = [
  { id: '1', name: 'Alphonso Mango(Ratnagiri) 3+kgs box', image: '/img/Alph.png', badge: 'Top Rated', discount: '-21%', currentPrice: '₹799.00', mrp: '₹999.00' },
  { id: '2', name: 'Malgova Mango 3+kgs box', image: '/img/malgova.png', badge: 'sale', discount: '-16%', currentPrice: '₹499.00', mrp: '₹599.00' },
  { id: '3', name: 'Raspuri Mango 3+kgs box', image: '/img/Raspuri.jpg', badge: 'sale', discount: '-22%', currentPrice: '₹550.00', mrp: '₹699.00' },
  { id: '4', name: 'Dasheri Mango 3+kgs box', image: '/img/dasheri.jpg', badge: 'sale', discount: '-21%', currentPrice: '₹399.00', mrp: '₹499.00' },
  { id: '5', name: 'Mallika Mango 3+kgs box', image: '/img/mallika.png', badge: 'sale', discount: '-21%', currentPrice: '₹399.00', mrp: '₹499.00' },
  { id: '6', name: 'Jackfruit 1 kg', image: '/img/jackfruit.jpg', badge: 'sale', discount: '-65%', currentPrice: '₹50.00', mrp: '₹110.00' },
  { id: '7', name: 'Avacado 3+kgs box', image: '/img/avacado.jpg', badge: 'sale', discount: '-17%', currentPrice: '₹499.00', mrp: '₹599.00' },
  { id: '8', name: 'Rose-Apples 1+kg', image: '/img/rose apples.jpg', badge: 'sale', discount: '-26%', currentPrice: '₹59.00', mrp: '₹79.00' },
];

export default function ProductGrid() {
  return (
    <section className="trending-product" id="trending">
      <div className="center-text">
        <h2>Our Trending <span>Products</span></h2>
      </div>
      <div className="product-grid-container" style={{ marginTop: '2.5rem' }}>
        {products.map((p, index) => (
          <ScrollReveal key={p.id} delay={index * 0.1}>
            <ProductCard {...p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
