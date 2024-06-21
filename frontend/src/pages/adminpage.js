// frontend/src/pages/adminpage.js

import React, { useState } from 'react';
import { useAuth } from '../contexts/authcontext';
import './adminpage.scss';

const AdminPage = () => {
  const { login, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="admin-login">
        <form onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {currentUser.email}!</p>
      {/* Admin functionalities go here */}
    </div>
  );
};

export default AdminPage;
