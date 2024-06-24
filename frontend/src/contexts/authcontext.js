import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        setCurrentUser(user); // Set the current user after successful login
        return user;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signOut = () => {
    setCurrentUser(null); // Clear current user on logout
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export { AuthContextProvider, useAuth };
