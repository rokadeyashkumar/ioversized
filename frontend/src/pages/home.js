import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom"; // Import Link
import "./style/home.scss";
import axios from "./dashboard/service/axios"; // Adjust path if necessary

// Import images
import img1 from "./img/img1.png";
import img2 from "./img/img2.png";
import saleimg1 from "./img/sale-banner-1.png";
import saleimg2 from "./img/sale-banner-2.png";
import winterCollectionImg from "./img/winter-collection.png"; // New image for winter collection
import bannerImg1 from "./img/banner-img1.png"; // Ensure correct path and extension

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("/products/get");
        console.log("Product data:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchdata();
  }, []);

  const renderColors = (colors) => {
    if (!colors || colors.length === 0) return <p>No colors available</p>;

    const displayedColors = colors.slice(0, 4);
    const additionalColorsCount = colors.length - 4;

    return (
      <div className="color-list">
        {displayedColors.map((color, index) => (
          <div
            key={index}
            className="color-circle"
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
        {additionalColorsCount > 0 && (
          <span
            className="additional-colors"
            title={`+${additionalColorsCount}`}
          >
            +{additionalColorsCount}
          </span>
        )}
      </div>
    );
  };

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

      <section className="sale-banner-1">
        <img src={saleimg1} alt="sale-banner-1" />
        <div className="sale-banner-content">
          <h2>Bestsellers you'll love</h2>
          <p>Starting at ₹499—get yours before it's gone!</p>
          <Link to="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="banner-2">
        <img src={bannerImg1} alt="banner-2" />
        <div className="banner-content">
          <h2>New Urban Uniform</h2>
          <Link to="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="product-list">
        <ul>
          {products.slice(0, 6).map((product) => (
            <li key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={product.mainImage} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="price">
                    <span className="sale-price">₹{product.salePrice}.99</span>
                    <span className="original-price">
                      ₹{product.originalPrice}.99
                    </span>
                  </div>
                  {renderColors(product.colors)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="new-feature">
        <img src={winterCollectionImg} alt="Winter Collection" />
        <Link to="/products">
          <button className="new-feature-btn">Explore</button>
        </Link>
      </div>

      <section className="sale-banner-3">
        <img src={saleimg2} alt="sale-banner-3" />
        <div className="sale-banner-content">
          <h2>Bestsellers you'll love</h2>
          <p>Starting at ₹499—get yours before it's gone!</p>
          <Link to="/products">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
