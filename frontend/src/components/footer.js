import React from 'react';
import './style/footer.scss';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Import social media icons

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Learn more about our story and mission.</p>
          </div>
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/shipping">Shipping Information</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.facebook.com/profile.php?id=100092350096485" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.instagram.com/ioversized/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 ioversized. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
