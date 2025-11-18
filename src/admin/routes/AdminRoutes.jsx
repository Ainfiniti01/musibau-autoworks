import { get } from '../../utils/api';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Login from '../pages/Login';
import Customers from '../pages/Customers';
import Services from '../pages/Services';
import Products from '../pages/Products';
import AdminSettings from '../pages/AdminSettings';
import NewBooking from '../pages/NewBooking';
import Reports from '../pages/Reports';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/ForgotPassword';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import BookingHistory from '../pages/BookingHistory';
import ServiceHistory from '../pages/ServiceHistory';
import Organizations from '../pages/Organizations';
import CustomerDetail from '../pages/CustomerDetail';
import OrganizationDetail from '../pages/OrganizationDetail';
import GuestList from '../pages/GuestList';
import GuestDetail from '../pages/GuestDetail';
import EditOrganization from '../pages/EditOrganization';
import EditCustomer from '../pages/EditCustomer';
import React, { useState, useEffect } from 'react';

const AdminRoutes = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminServices = async () => {
      try {
        const data = await get('api/services.php');
        setServices(data);
      } catch (e) {
        console.error("Error fetching services:", e);
        console.log("e.message", e.message)
        console.log("Setting error:", e.message);
        setError(e.message);
      }
    };
    fetchAdminServices();
  }, []);

  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers/Individual" element={<Customers />} />
        <Route path="customers/organization" element={<Customers />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="bookings/new" element={<NewBooking />} />
        <Route path="reports" element={<Reports />} />
        {/* New Pages */}
        <Route path="booking-history" element={<BookingHistory />} />
        <Route path="service-history" element={<ServiceHistory />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="guests" element={<GuestList />} />
        <Route path="guests/:id" element={<GuestDetail />} />
        <Route path="guest-list" element={<GuestList />} />
        <Route path="guest/:id" element={<GuestDetail />} />
        {/* Drill-down Pages */}
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="organizations/:id" element={<OrganizationDetail />} />
        {/* Edit Pages */}
<Route path="customers/edit/:id" element={<EditCustomer />} />
<Route path="organizations/edit/:id" element={<EditOrganization />} />
        {/* Add more admin routes here */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
  );
};

export default AdminRoutes;
