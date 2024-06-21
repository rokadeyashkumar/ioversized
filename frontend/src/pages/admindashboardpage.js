// frontend/src/pages/admindashboardpage.js

import React from 'react';
import Sidebar from '../components/admin/sidebar'; // Corrected path
import StatsCard from '../components/admin/statscard'; // Corrected path
import { useAuth } from '../contexts/authcontext';

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="content">
        <h1>Welcome, {currentUser?.email}</h1>
        <div className="stats">
          <StatsCard title="Total Sales" value="$5000" />
          <StatsCard title="Total Orders" value="150" />
          <StatsCard title="Total Users" value="300" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
