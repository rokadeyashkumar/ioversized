// frontend/src/pages/products.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from './dashboard/service/axios'; // Adjust path if necessary
import './style/product.scss';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/get');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-page">
      <h1>All Products</h1>
      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`} className="product-card">
              <img src={product.mainImage} alt={product.name} />
              <div className="product-info">
                <h2>{product.name}</h2>
                <p className="original-price">₹{product.originalPrice}</p>
                <p className="sale-price">₹{product.salePrice}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default Products;
