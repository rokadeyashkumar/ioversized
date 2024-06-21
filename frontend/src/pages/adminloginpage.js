import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext'; // Assuming you have an AuthContext for authentication
import {  Navigate } from 'react-router-dom'; // Import Link and Navigate

const AdminLoginPage = () => {
  const { login, currentUser } = useAuth(); // Assuming useAuth hook provides login and currentUser
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Call login function from useAuth
      // Redirect to admin dashboard after successful login
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  if (currentUser) {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    
    </div>
  );
};

export default AdminLoginPage;
