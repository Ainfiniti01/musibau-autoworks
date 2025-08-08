import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteChangeTracker from './components/RouteChangeTracker';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import ScrollToTopButton from './components/ScrollToTopButton'; // Import ScrollToTopButton

// Layouts
import PublicLayout from './components/PublicLayout';
import CustomerLayout from './components/CustomerLayout'; // Still needed for other customer routes if any
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
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
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Customer Pages
const LoginPageCustomer = lazy(() => import('./pages/customer/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/customer/RegistrationPage'));
const CustomerDashboardPage = lazy(() => import('./pages/customer/CustomerDashboardPage')); // Corrected import

// Admin Pages
const AdminLogin = lazy(() => import('./admin/pages/Login.jsx'));
const AdminDashboard = lazy(() => import('./admin/pages/Dashboard.jsx'));
const AdminServices = lazy(() => import('./admin/pages/Services.jsx'));
const AdminCustomers = lazy(() => import('./admin/pages/Customers.jsx'));
const AdminBookings = lazy(() => import('./admin/pages/Bookings.jsx'));
const AdminProducts = lazy(() => import('./admin/pages/Products.jsx'));


function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

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
          <Route path="/gallery" element={<ErrorBoundary><PublicLayout><GalleryPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/about" element={<ErrorBoundary><PublicLayout><AboutPage /></PublicLayout></ErrorBoundary>} />

          {/* Customer Routes */}
          <Route path="/login" element={<ErrorBoundary><PublicLayout><LoginPageCustomer /></PublicLayout></ErrorBoundary>} />
          <Route path="/register" element={<ErrorBoundary><PublicLayout><RegistrationPage /></PublicLayout></ErrorBoundary>} />
          {/* Customer Dashboard Route - Adjusted to match user suggestion */}
          <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<ErrorBoundary><PublicLayout><AdminLogin /></PublicLayout></ErrorBoundary>} />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          {/* Admin Services */}
          <Route path="/admin/services" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminServices />
                </AdminLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          {/* Admin Customers */}
          <Route path="/admin/customers" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminCustomers />
                </AdminLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          {/* Admin Bookings */}
          <Route path="/admin/bookings" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminBookings />
                </AdminLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          {/* Admin Products */}
          <Route path="/admin/products" element={
            <ErrorBoundary>
              <ProtectedRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </ProtectedRoute>
            </ErrorBoundary>
          } />

          {/* 404 Route */}
          <Route path="*" element={<ErrorBoundary><PublicLayout><NotFoundPage /></PublicLayout></ErrorBoundary>} />
        </Routes>
      </Suspense>
      <ScrollToTopButton />
      <ToastPlaceholder />
    </Router>
  );
}

export default App;
