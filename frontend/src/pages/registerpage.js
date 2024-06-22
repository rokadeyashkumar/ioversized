// frontend/src/pages/registerpage.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/customers/register', formData);
      console.log(response.data); // Log response from backend
      // Clear form data after successful submission if needed
      setFormData({
        name: '',
        dob: '',
        email: '',
        number: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label>Date of Birth:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Number:</label>
        <input type="number" name="number" value={formData.number} onChange={handleChange} required />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <label>Confirm Password:</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
