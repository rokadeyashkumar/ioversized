// frontend/src/pages/loginpage.js

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext';

const LoginPage = () => {
  const { signIn, signOut, currentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      if (user) {
        // Redirect or show welcome message after successful login
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  if (currentUser) {
    return (
      <div className="login-page">
        <h2>Welcome, {currentUser.name}!</h2>
        <p>Discover our latest collection and shop with ease!</p>
        <button onClick={signOut}>Logout</button>
        <Navigate to="/" />
      </div>
    );
  }

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
