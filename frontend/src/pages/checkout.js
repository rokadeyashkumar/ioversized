import React, { useState } from 'react';
import './style/checkout.scss';

const Checkout = () => {
  const [promoCode, setPromoCode] = useState('');
  const [orderType, setOrderType] = useState('self-order');

  const handlePromoCodeChange = (e) => {
    setPromoCode(e.target.value);
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="checkout-details">
          <h2>Customer Details</h2>
          <form>
            <label htmlFor="order-type">Order Type</label>
            <select id="order-type" name="order-type" value={orderType} onChange={handleOrderTypeChange}>
              <option value="self-order">Self Order</option>
              <option value="gift">Gift</option>
            </select>
            
            <h3>Delivery Details</h3>
            <label htmlFor="country">Country/Region*</label>
            <select id="country" name="country" required>
              <option value="india">India</option>
            </select>
            
            <label htmlFor="address">Address*</label>
            <input type="text" id="address" name="address" required />
            
            <label htmlFor="city">City*</label>
            <input type="text" id="city" name="city" required />
            
            <label htmlFor="region">Region*</label>
            <select id="region" name="region" required>
              <option value="maharashtra">Maharashtra</option>
            </select>
            
            <label htmlFor="zip">Zip / Postal Code*</label>
            <input type="text" id="zip" name="zip" placeholder="Enter a zip/postal code." required />

            <h3>Customer Contact Details</h3>
            <label htmlFor="phone">Phone*</label>
            <input type="text" id="phone" name="phone" required />
            
            <button type="button" className="continue-button">Continue</button>
          </form>
        </div>
        
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-card">
            <img src="path/to/product-image.jpg" alt="Product" className="product-image" />
            <div className="summary-details">
              
              <div className="summary-item">
                <span className="item-label">Price:</span>
                <span className="item-value">₹1,494.40</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Regular Price:</span>
                <span className="item-value">₹1,868.00</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Qty:</span>
                <span className="item-value">1</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Subtotal:</span>
                <span className="item-value">₹1,494.40</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Delivery:</span>
                <span className="item-value">Free</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Taxes:</span>
                <span className="item-value">₹0.00</span>
              </div>
              <div className="summary-item">
                <span className="item-label">Total:</span>
                <span className="item-value">₹1,494.40</span>
              </div>
              <button type="button" className="secure-checkout-button">Secure Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
