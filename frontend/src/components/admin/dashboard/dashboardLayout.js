// src/components/dashboard/dashboardLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <ul>
          <li><Link to="/admin/dashboard">Dashboard Home</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/admin/orders">Manage Orders</Link></li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
