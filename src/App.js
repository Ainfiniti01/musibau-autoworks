import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './components/PublicLayout';
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';
import ToastPlaceholder from './components/ToastPlaceholder'; // Import ToastPlaceholder

// Public Pages
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import IndividualServicePage from './pages/public/IndividualServicePage';
import BookingPage from './pages/public/BookingPage';
import ProductsPage from './pages/public/ProductsPage';
import ContactPage from './pages/public/ContactPage';
import ReviewsPage from './pages/public/ReviewsPage';
import NotFoundPage from './pages/public/NotFoundPage';
import WebInquiryForm from './components/WebInquiryForm'; // Corrected import path

// Customer Pages
import LoginPage from './pages/customer/LoginPage';
import RegistrationPage from './pages/customer/RegistrationPage';
import CustomerDashboardPage from './pages/customer/CustomerDashboardPage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManageCustomersPage from './pages/admin/ManageCustomersPage';
import ManageBookingsPage from './pages/admin/ManageBookingsPage';
import ManageProductsPage from './pages/admin/ManageProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<ErrorBoundary><PublicLayout><HomePage /></PublicLayout></ErrorBoundary>} />
        <Route path="/services" element={<ErrorBoundary><PublicLayout><ServicesPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/services/:serviceId" element={<ErrorBoundary><PublicLayout><IndividualServicePage /></PublicLayout></ErrorBoundary>} />
        <Route path="/booking" element={<ErrorBoundary><PublicLayout><BookingPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/products" element={<ErrorBoundary><PublicLayout><ProductsPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/contact" element={<ErrorBoundary><PublicLayout><ContactPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/reviews" element={<ErrorBoundary><PublicLayout><ReviewsPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/web-inquiry" element={<ErrorBoundary><PublicLayout><WebInquiryForm /></PublicLayout></ErrorBoundary>} />

        {/* Customer Routes */}
        <Route path="/login" element={<ErrorBoundary><PublicLayout><LoginPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/register" element={<ErrorBoundary><PublicLayout><RegistrationPage /></PublicLayout></ErrorBoundary>} />
        <Route path="/customer/dashboard" element={<ErrorBoundary><CustomerLayout><CustomerDashboardPage /></CustomerLayout></ErrorBoundary>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<ErrorBoundary><AdminLayout><AdminDashboardPage /></AdminLayout></ErrorBoundary>} />
        <Route path="/admin/services" element={<ErrorBoundary><AdminLayout><ManageServicesPage /></AdminLayout></ErrorBoundary>} />
        <Route path="/admin/customers" element={<ErrorBoundary><AdminLayout><ManageCustomersPage /></AdminLayout></ErrorBoundary>} />
        <Route path="/admin/bookings" element={<ErrorBoundary><AdminLayout><ManageBookingsPage /></AdminLayout></ErrorBoundary>} />
        <Route path="/admin/products" element={<ErrorBoundary><AdminLayout><ManageProductsPage /></AdminLayout></ErrorBoundary>} />

        {/* 404 Route */}
        <Route path="*" element={<ErrorBoundary><PublicLayout><NotFoundPage /></PublicLayout></ErrorBoundary>} />
      </Routes>
      <ToastPlaceholder /> {/* Add ToastPlaceholder here */}
    </Router>
  );
}

export default App;
