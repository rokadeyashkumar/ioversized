// frontend/src/pages/adminpage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAdminAuth } from '../contexts/adminauthcontext';

const AdminPage = () => {
  const { signIn } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate should work here

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      navigate('/admin/dashboard'); // Example navigation after successful login
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminPage;
