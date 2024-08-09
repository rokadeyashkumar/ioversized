// frontend/src/pages/home.js
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import './style/home.scss';
import axios from './dashboard/service/axios'; // Adjust path if necessary

// Import images
import img1 from './img/img1.png';
import img2 from './img/img2.png';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get('/products/get');
        console.log("Product data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchdata();
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
      
      <section className="product-list">
        <h2>Products</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.mainImage} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.details}</p>
                  <div className="price">
                    <span className="original-price">₹{product.originalPrice}.00</span>
                    <span className="sale-price">₹{product.salePrice}.00</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
