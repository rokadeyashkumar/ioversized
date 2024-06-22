// src/pages/admindashboardpage.js

import React from 'react';
import Sidebar from '../components/layout/sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from './addproduct';
import DeleteProduct from './deleteproduct';
import ProductList from './productlist';
import UserDetails from './userdetails';
import OrderDetails from './orderdetails';
import './admindashboardpage.css'; // Correct import path

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="deleteproduct" element={<DeleteProduct />} />
          <Route path="productlist" element={<ProductList />} />
          <Route path="userdetails" element={<UserDetails />} />
          <Route path="orderdetails" element={<OrderDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
