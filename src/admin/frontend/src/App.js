import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RouteChangeTracker from './components/RouteChangeTracker';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import ScrollToTopButton from './components/ScrollToTopButton'; // Import ScrollToTopButton
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import ToastContainer CSS

// Layouts
import PublicLayout from './components/PublicLayout';
import CustomerLayout from './components/CustomerLayout';
import AdminLayout from './components/AdminLayout';
// Assuming ProtectedRoute is in admin/components based on file structure
import ProtectedRoute from './admin/components/ProtectedRoute'; // Corrected path and extension
import ErrorBoundary from './components/ErrorBoundary';
import ToastPlaceholder from './components/ToastPlaceholder'; // Import ToastPlaceholder
import LoadingSpinner from './components/LoadingSpinner';
import AdminRoutes from './admin/routes/AdminRoutes'; // Import AdminRoutes

// Page Components using React.lazy
const HomePage = lazy(() => import('./pages/public/HomePage'));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage'));
const IndividualServicePage = lazy(() => import('./pages/public/IndividualServicePage'));
const BookingPage = lazy(() => import('./pages/public/BookingPage'));
const ProductsPage = lazy(() => import('./pages/public/ProductsPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const ReviewsPage = lazy(() => import('./pages/public/ReviewsPage'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage')); // Import GalleryPage
const AboutPage = lazy(() => import('./pages/public/AboutPage')); // Import AboutPage
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Customer Pages
const LoginPageCustomer = lazy(() => import('./pages/customer/LoginPage')); // Renamed to avoid conflict
const RegistrationPage = lazy(() => import('./pages/customer/RegistrationPage'));
const CustomerDashboardPage = lazy(() => import('./pages/customer/CustomerDashboardPage'));


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
          <Route path="/gallery" element={<ErrorBoundary><PublicLayout><GalleryPage /></PublicLayout></ErrorBoundary>} /> {/* Add Gallery Route */}
          <Route path="/about" element={<ErrorBoundary><PublicLayout><AboutPage /></PublicLayout></ErrorBoundary>} /> {/* Add About Route */}

          {/* Customer Routes */}
          <Route path="/login" element={<ErrorBoundary><PublicLayout><LoginPageCustomer /></PublicLayout></ErrorBoundary>} />
          <Route path="/register" element={<ErrorBoundary><PublicLayout><RegistrationPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/customer/dashboard" element={<ErrorBoundary><CustomerLayout><CustomerDashboardPage /></CustomerLayout></ErrorBoundary>} />

          {/* Admin Routes - Handled by AdminRoutes component */}
          <Route path="/admin/*" element={<ErrorBoundary><AdminRoutes /></ErrorBoundary>} />

          {/* 404 Route */}
          <Route path="*" element={<ErrorBoundary><PublicLayout><NotFoundPage /></PublicLayout></ErrorBoundary>} />
        </Routes>
      </Suspense>
      <ScrollToTopButton /> {/* Added ScrollToTopButton */}
      <ToastPlaceholder /> {/* Add ToastPlaceholder here */}
      <ToastContainer position="top-right" autoClose={3000} /> {/* Added ToastContainer */}
    </Router>
  );
}

export default App;
