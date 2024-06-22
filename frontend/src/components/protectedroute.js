// components/protectedroute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../contexts/authcontext';

const ProtectedRoute = ({ element, ...props }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Route {...props} element={element} /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
