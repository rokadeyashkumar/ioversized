import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from './dashboard/service/axios'; // Ensure the path is correct
import { FaTruck } from 'react-icons/fa';
import './style/productDetail.scss'; // Import the styling

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(''); // State for selected image
  const { id } = useParams(); // Get the product ID from URL

  const [isInfoOpen, setIsInfoOpen] = useState(false); // State for Product Info dropdown
  const [isSizeFitOpen, setIsSizeFitOpen] = useState(false); // State for Size & Fit dropdown
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false); // State for Care Guide dropdown

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

  const formatProductInfo = (info) => {
    // Split info into bullet points
    return info.split('\n').map((line, index) => (
      <li key={index}>{line}</li>
    ));
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

        <div className="delivery-details">
      <FaTruck className="truck-icon" />
      <p>1F69A</p>
      <p>Delivery Time: 5-7 days</p>
    </div>

        {/* Horizontal line below the buttons */}
        <hr />

        {/* Product Info dropdown */}
        <div className="dropdown-section">
          <div className="dropdown-header" onClick={() => setIsInfoOpen(!isInfoOpen)}>
            <h3>Product Info</h3>
            <i className={`arrow ${isInfoOpen ? 'up' : 'down'}`}></i>
          </div>
          {isInfoOpen && (
            <div className="dropdown-content">
              <ul>
                {product.info ? formatProductInfo(product.info) : <li>No product info available</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Horizontal line between sections */}
        <hr />

        {/* Size & Fit dropdown */}
        <div className="dropdown-section">
          <div className="dropdown-header" onClick={() => setIsSizeFitOpen(!isSizeFitOpen)}>
            <h3>Size & Fit</h3>
            <i className={`arrow ${isSizeFitOpen ? 'up' : 'down'}`}></i>
          </div>
          {isSizeFitOpen && (
            <div className="dropdown-content">
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (in)</th>
                    <th>Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {product.sizeFit ? (
                    product.sizeFit.map((fit, index) => (
                      <tr key={index}>
                        <td>{fit.size}</td>
                        <td>{fit.chest}</td>
                        <td>{fit.length}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">Size & Fit info not available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Horizontal line between sections */}
        <hr />

        {/* Care Guide dropdown */}
        <div className="dropdown-section">
          <div className="dropdown-header" onClick={() => setIsCareGuideOpen(!isCareGuideOpen)}>
            <h3>Care Guide</h3>
            <i className={`arrow ${isCareGuideOpen ? 'up' : 'down'}`}></i>
          </div>
          {isCareGuideOpen && (
            <div className="dropdown-content">
              <ul>
                {product.careGuide ? formatProductInfo(product.careGuide) : <li>No care guide available</li>}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
