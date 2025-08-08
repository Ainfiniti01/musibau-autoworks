import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Services from '../pages/Services';
import Customers from '../pages/Customers';
import Bookings from '../pages/Bookings';
import Products from '../pages/Products';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="services" element={<Services />} />
              <Route path="customers" element={<Customers />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="products" element={<Products />} />
              {/* Add a default redirect or 404 for /admin/* if needed */}
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AdminRoutes;
