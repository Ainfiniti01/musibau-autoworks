import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RouteChangeTracker from './components/RouteChangeTracker';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS

// Layouts
import PublicLayout from './components/PublicLayout';
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';
import ErrorBoundary from './components/ErrorBoundary';
import ToastPlaceholder from './components/ToastPlaceholder'; // Import ToastPlaceholder
import LoadingSpinner from './components/LoadingSpinner';

// Page Components using React.lazy
const HomePage = lazy(() => import('./pages/public/HomePage'));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage'));
const IndividualServicePage = lazy(() => import('./pages/public/IndividualServicePage'));
const BookingPage = lazy(() => import('./pages/public/BookingPage'));
const ProductsPage = lazy(() => import('./pages/public/ProductsPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const ReviewsPage = lazy(() => import('./pages/public/ReviewsPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));
const WebInquiryForm = lazy(() => import('./components/WebInquiryForm'));

// Customer Pages
const LoginPage = lazy(() => import('./pages/customer/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/customer/RegistrationPage'));
const CustomerDashboardPage = lazy(() => import('./pages/customer/CustomerDashboardPage'));

// Admin Pages
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const ManageServicesPage = lazy(() => import('./pages/admin/ManageServicesPage'));
const ManageCustomersPage = lazy(() => import('./pages/admin/ManageCustomersPage'));
const ManageBookingsPage = lazy(() => import('./pages/admin/ManageBookingsPage'));
const ManageProductsPage = lazy(() => import('./pages/admin/ManageProductsPage'));

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - while the element is visible.
      easing: 'ease-in-out', // Default easing
    });
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <Router>
      <RouteChangeTracker />
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
      <ToastPlaceholder /> {/* Add ToastPlaceholder here */}
    </Router>
  );
}

export default App;
