import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Mock authentication: replace with actual auth logic later
  // TODO: Use real auth context or token validation
  const isAuthenticated = localStorage.getItem('adminLoggedIn'); // Using "adminLoggedIn" for consistency

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
