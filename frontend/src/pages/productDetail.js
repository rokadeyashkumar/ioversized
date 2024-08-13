// frontend/src/pages/productDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from './dashboard/service/axios'; // Ensure the path is correct
import './style/productDetail.scss'; // Import the styling

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); // State for selected image
  const { id } = useParams(); // Get the product ID from URL

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/products/get/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.mainImage); // Set initial selected image
      } catch (error) {
        console.error('Error fetching product details:', error);
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    // Add your cart logic here
  };

  const handleBuyNow = (product) => {
    if (product.paymentLink) {
      window.open(product.paymentLink, '_blank');
    } else {
      console.error('Payment link not available');
      alert('Payment link is not available for this product.');
    }
  };

  return (
    <div className="product-detail">
      <div className="image-section">
        <div className="main-image">
          <img src={selectedImage} alt={product.name} />
        </div>
        <div className="additional-images">
          {product.mainImage && (
            <img
              src={product.mainImage}
              alt="Main view"
              className="additional-image"
              onClick={() => handleImageClick(product.mainImage)}
            />
          )}
          {product.additionalImages && product.additionalImages.length > 0 ? (
            product.additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Additional view ${index + 1}`}
                className="additional-image"
                onClick={() => handleImageClick(image)}
              />
            ))
          ) : (
            <p>No additional images available</p>
          )}
        </div>
      </div>
      <div className="info-section">
        <h2>{product.name}</h2>
        <p>{product.details || 'No details available'}</p>
        <div className="attributes">
          <div className="colors">
            <h3>Colors</h3>
            <div className="color-list">
              {product.colors && product.colors.length > 0 ? (
                product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="color-circle"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))
              ) : (
                <p>No colors available</p>
              )}
            </div>
          </div>
          <div className="sizes">
            <h3>Sizes</h3>
            <ul>
              {product.size && product.size.length > 0 ? (
                product.size.map((size, index) => (
                  <li key={index}>{size}</li>
                ))
              ) : (
                <li>No sizes available</li>
              )}
            </ul>
          </div>
        </div>
        <div className="price">
          <span className="original-price">₹{product.originalPrice}</span>
          <span className="sale-price">₹{product.salePrice}</span>
        </div>
        <div className="buttons">
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          <button onClick={() => handleBuyNow(product)}>Buy Now</button>
        </div>
        <div>
          <p>{product.info}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
