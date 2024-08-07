// frontend/src/pages/home.js
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel styles
import './style/home.scss';
import axios from 'axios';

// Import images
import img1 from './img/img1.png';
import img2 from './img/img2.png';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/get');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <section className="carousel-container">
        <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
          <div>
            <img src={img1} alt="Slide 1" />
          </div>
          <div>
            <img src={img2} alt="Slide 2" />
          </div>
          {/* Add more slides as needed */}
        </Carousel>
      </section>
      <section className="products">
        <h2>Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price-original">₹{product.priceOriginal}</p>
              <p className="price-discounted">₹{product.priceDiscounted}</p>
              <p>Type: {product.type}</p>
              <div className="product-details">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </div>
              <div className="product-colors">
                {product.colors.map((color, index) => (
                  <span key={index} style={{ backgroundColor: color }} className="color-swatch" />
                ))}
              </div>
              <div className="product-sizes">
                {product.size.map((size, index) => (
                  <span key={index} className="size">{size}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
