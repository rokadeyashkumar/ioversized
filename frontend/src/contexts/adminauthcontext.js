// frontend/src/contexts/adminauthcontext.js

import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuthContext = createContext();

const AdminAuthContextProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();

  const signIn = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAdminUser(data.admin);
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard'); // Redirect to admin dashboard after successful login
      } else {
        throw new Error('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setAdminUser(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthContextProvider');
  }
  return context;
};

export { AdminAuthContextProvider, useAdminAuth };
