import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './dashboard/service/axios'; // Adjust path if necessary
import './style/product.scss';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/products/get");
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique product types for menu items
        const types = [...new Set(data.map(product => product.type))];
        setProductTypes(['All', ...types]); // Adding 'All' as an option to show all products
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    if (type === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.type === type));
    }
  };

  const renderColors = (colors) => {
    if (!colors || colors.length === 0) return <p>No colors available</p>;

    const displayedColors = colors.slice(0, 4);
    const additionalColorsCount = colors.length > 4 ? `+${colors.length - 4}` : '';

    return (
      <div className="color-list">
        {displayedColors.map((color, index) => (
          <div
            key={index}
            className="color-circle"
            style={{ backgroundColor: color }}
            title={color} // Optional: Show color code on hover
          />
        ))}
        {additionalColorsCount && (
          <span className="additional-colors">{additionalColorsCount}</span>
        )}
      </div>
    );
  };

  return (
    <section className="product-page">
      <div className="product-type-menu">
        {productTypes.map((type, index) => (
          <button
            key={index}
            className={`type-menu-item ${selectedType === type ? 'active' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="product-list">
        <ul>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
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
            ))
          ) : (
            <p>No products available</p>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Product;
