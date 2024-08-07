import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaShoppingCart } from 'react-icons/fa';
import './style/header.scss';
import logo from '../logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li> {/* Added Products route */}
            <li><Link to="/checkout">Checkout</Link></li> {/* Added Checkout route */}
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="icons">
          <Link to="/cart"><FaShoppingCart /></Link>
          <Link to="/login"><FaSignInAlt /></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
