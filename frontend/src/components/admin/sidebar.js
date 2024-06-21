// frontend/src/components/admin/sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';

const Sidebar = () => {
  const { currentUser } = useAuth();

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <p>Welcome, {currentUser?.email}</p>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
