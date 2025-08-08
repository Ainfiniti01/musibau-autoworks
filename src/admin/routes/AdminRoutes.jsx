import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Services from '../pages/Services';
import Customers from '../pages/Customers';
import Bookings from '../pages/Bookings';
import Products from '../pages/Products';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="customers" element={<Customers />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
