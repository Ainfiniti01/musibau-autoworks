import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Mock authentication: replace with actual auth logic later
  const isAuthenticated = localStorage.getItem('adminToken'); // Example: check for a token

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
