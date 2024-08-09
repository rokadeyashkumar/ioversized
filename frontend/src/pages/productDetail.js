import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from './dashboard/service/axios'; // Ensure path is correct
import './style/productDetail.scss'; // Import the styling

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the product ID from URL

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/products/get/${id}`); // Ensure URL matches backend route
        console.log('Product Detail Response:', response.data); // Log response data
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product detail:', error.response ? error.response.data : error.message);
        setError('Error fetching product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product details available.</p>;

  return (
    <div className="product-detail">
      <img src={product.mainImage} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <div className="price">
          <span className="original-price">₹{product.originalPrice}</span>
          <span className="sale-price">₹{product.salePrice}</span>
        </div>
        <p>{product.details}</p>
        <div className="buttons">
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button onClick={() => handleBuyNow(product)}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const handleAddToCart = (product) => {
  console.log('Adding to cart:', product);
  // Add your cart logic here
};

const handleBuyNow = (product) => {
  console.log('Buying now:', product);
  // Add your buy logic here
};

export default ProductDetail;
