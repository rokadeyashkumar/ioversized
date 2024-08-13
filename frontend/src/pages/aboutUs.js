import React from 'react';
import './style/aboutUs.scss';

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>
      <section className="about-us-content">
        <div className="about-us-text">
          <h2>Who We Are</h2>
          <p>
            We are a leading provider of oversized t-shirts and hoodies, dedicated to offering the best in comfort and style. Our mission is to make sure you feel great in our clothing while also making a positive impact in our community.
          </p>
          <p>
            Founded in [Year], we have been committed to quality and customer satisfaction from day one. Our team of professionals works tirelessly to bring you the latest trends and timeless classics.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to deliver comfort and style through our oversized clothing line while maintaining a commitment to sustainability and social responsibility. We aim to exceed your expectations with every product we offer.
          </p>

          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality:</strong> We prioritize top-quality materials and craftsmanship.</li>
            <li><strong>Customer Focus:</strong> Your satisfaction is our top priority.</li>
            <li><strong>Sustainability:</strong> We are committed to eco-friendly practices.</li>
            <li><strong>Innovation:</strong> We continuously strive to bring fresh designs to the market.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
