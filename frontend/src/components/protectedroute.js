// src/components/protectedroute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext'; // Adjust according to your auth context

const ProtectedRoute = ({ element, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      element={currentUser ? element : <Navigate to="/admin/login" replace />}
    />
  );
};

export default ProtectedRoute;
