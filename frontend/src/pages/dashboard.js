import React, { useState, useEffect } from 'react';
import './style/dashboard.scss';
import AddProduct from './dashboard/addproduct';
import ProductDetails from './dashboard/productdetails';
import UserDetails from './dashboard/userdetails';
import OrderDetails from './dashboard/orderdetails';
import EditHomePage from './dashboard/edithomepage';

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('addProduct');

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className={`menu-item ${activeMenu === 'addProduct' && 'active'}`} onClick={() => setActiveMenu('addProduct')}>Add Product</div>
        <hr />
        <div className={`menu-item ${activeMenu === 'productDetails' && 'active'}`} onClick={() => setActiveMenu('productDetails')}>Product Details</div>
        <hr />
        <div className={`menu-item ${activeMenu === 'userDetails' && 'active'}`} onClick={() => setActiveMenu('userDetails')}>User Details</div>
        <hr />
        <div className={`menu-item ${activeMenu === 'orderDetails' && 'active'}`} onClick={() => setActiveMenu('orderDetails')}>Order Details</div>
        <hr />
        <div className={`menu-item ${activeMenu === 'editSliders' && 'active'}`} onClick={() => setActiveMenu('editSliders')}>Edit Home Page Sliders</div>
      </div>

      <div className="content">
        {activeMenu === 'addProduct' && <AddProduct />}
        {activeMenu === 'productDetails' && <ProductDetails />}
        {activeMenu === 'userDetails' && <UserDetails />}
        {activeMenu === 'orderDetails' && <OrderDetails />}
        {activeMenu === 'editSliders' && <EditHomePage />}
      </div>
    </div>
  );
};

export default Dashboard;
