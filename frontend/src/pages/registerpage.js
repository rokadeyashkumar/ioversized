// frontend/src/pages/registerpage.js

import React from 'react';

const RegisterPage = () => {
  return (
    <div>
      <h2>Create Account</h2>
      <form>
        <label>Full Name:</label>
        <input type="text" />
        <label>Date of Birth:</label>
        <input type="text" />
        <label>Email:</label>
        <input type="email" />
        <label>Number:</label>
        <input type="number" />
        <label>Password:</label>
        <input type="password" />
        <label>Confirm Password:</label>
        <input type="password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
