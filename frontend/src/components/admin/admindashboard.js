import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import AddProduct from './addproduct';
import DeleteProduct from './deleteproduct';
import ProductList from './productlist';
import UserDetails from './userdetails';
import OrderDetails from './orderdetails';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <main>
        <Routes>
          <Route path="/admin/dashboard/addproduct" element={<AddProduct />} />
          <Route path="/admin/dashboard/deleteproduct" element={<DeleteProduct />} />
          <Route path="/admin/dashboard/productlist" element={<ProductList />} />
          <Route path="/admin/dashboard/userdetails" element={<UserDetails />} />
          <Route path="/admin/dashboard/orderdetails" element={<OrderDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
