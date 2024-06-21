// frontend/src/components/layout/header.js

import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import logo from '../../assets/images/ioversized.svg'; // Ensure the correct path and file name

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
