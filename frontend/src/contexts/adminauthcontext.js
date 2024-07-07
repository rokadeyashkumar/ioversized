import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext();

export const AdminAuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = async (adminId, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admins/login', { adminId, password });
      setCurrentUser(response.data.admin);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };
  
    

  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ currentUser, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
