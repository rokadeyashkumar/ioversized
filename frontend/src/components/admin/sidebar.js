// src/components/layout/sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css'; // Create this CSS file for basic styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/admin/dashboard/addproduct">Add Product</Link></li>
        <li><Link to="/admin/dashboard/deleteproduct">Delete Product</Link></li>
        <li><Link to="/admin/dashboard/productlist">Product List</Link></li>
        <li><Link to="/admin/dashboard/userdetails">User Details</Link></li>
        <li><Link to="/admin/dashboard/orderdetails">Order Details</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
