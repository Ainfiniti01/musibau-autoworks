import React, { Suspense, lazy, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RouteChangeTracker from './components/RouteChangeTracker';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import ScrollToTopButton from './components/ScrollToTopButton'; // Import ScrollToTopButton

// Layouts
import PublicLayout from './components/PublicLayout';
import CustomerLayout from './components/CustomerLayout'; // Still needed for other customer routes if any
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
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
const CustomerProfilePage = lazy(() => import('./pages/customer/CustomerProfilePage.js')); // Added import

// Admin Pages
const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes'));
// Customer Pages
const ForgotPasswordPage = lazy(() => import('./pages/customer/ForgotPasswordPage'));

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const isGitHub = window.location.hostname.includes("github.io");

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
          <Route path="/customer/profile" element={<CustomerProfilePage />} /> {/* Updated route */}

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Forgot Password Route */}
          <Route path="/forgot-password" element={<ErrorBoundary><PublicLayout><ForgotPasswordPage /></PublicLayout></ErrorBoundary>} />

          {/* 404 Route */}
          <Route path="*" element={<ErrorBoundary><PublicLayout><NotFoundPage /></PublicLayout></ErrorBoundary>} />
        </Routes>
      </Suspense>
      <ScrollToTopButton />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Router>
  );
}

export default App;
