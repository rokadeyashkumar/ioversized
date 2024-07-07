// frontend/src/pages/loginpage.js

import React, { useState } from 'react';
import { useAuth } from '../contexts/authcontext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, signIn, signOut } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {!currentUser ? (
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
        </form>
      ) : (
        <div>
          <p>Welcome, {currentUser.name}!</p>
          <h3>Experience the Best in Fashion</h3>
          <p>Discover our latest collection and enjoy a seamless shopping experience with us!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
