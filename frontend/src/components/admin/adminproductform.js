// frontend/src/components/admin/adminlogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform authentication logic here (normally you would call an API)
    if (email === 'yash@ioversized' && password === 'yash@ioversized@2003') {
      // Redirect to admin dashboard upon successful login
      navigate('/admin/dashboard'); // Use navigate instead of history.push
    } else {
      alert('Invalid credentials. Please try again.');
      // Clear form fields after unsuccessful login attempt
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
