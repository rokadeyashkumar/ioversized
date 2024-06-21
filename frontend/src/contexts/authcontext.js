// frontend/src/contexts/authcontext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signIn = (user) => {
    setCurrentUser(user);
  };

  const signOut = () => {
    setCurrentUser(null);
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

export { AuthContextProvider, useAuth }; // Named exports
