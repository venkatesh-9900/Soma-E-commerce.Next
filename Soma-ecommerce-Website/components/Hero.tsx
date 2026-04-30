import React from 'react';
import HeroButton from './HeroButton';

export default function Hero() {
  return (
    <section className="main-home">
      <div className="home-content">
        <span className="tag">Winter Collection</span>
        <h1>New Winter <br />Collection 2025</h1>
        <p>Live a Healthy Life</p>
        <div className="btn-container">
          <HeroButton />
        </div>
      </div>

      <div className="home-right">
        <div className="home-image-wrapper">
          <div className="home-image">
            <img src="/img/mango-basket.png" alt="Mango Basket Image" />
          </div>
          <div className="down-arrow">
            <a href="#trending" className="down"><i className="bx bx-down-arrow-alt"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
}
