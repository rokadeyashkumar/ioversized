// frontend/src/components/protectedroute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      element={
        currentUser ? <Component {...rest} /> : <Navigate to="/login" replace />
      }
    />
  );
};

export default ProtectedRoute;
