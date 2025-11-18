import React, { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import RouteChangeTracker from './components/RouteChangeTracker';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import ScrollToTopButton from './components/ScrollToTopButton'; // Import ScrollToTopButton

// Layouts
import PublicLayout from './components/PublicLayout';
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
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));
const GuestBookingPage = lazy(() => import('./pages/public/GuestBookingPage'));

// Customer Pages
const LoginPageCustomer = lazy(() => import('./pages/customer/LoginPage'));
const RegistrationPage = lazy(() => import('./pages/customer/RegistrationPage'));
const CustomerDashboardPage = lazy(() => import('./pages/customer/CustomerDashboardPage')); // Corrected import
const CustomerProfilePage = lazy(() => import('./pages/customer/CustomerProfilePage.jsx')); // Added import
const ServiceHistoryPage = lazy(() => import('./pages/customer/ServiceHistoryPage')); // Added import
const BookingHistoryPage = lazy(() => import('./pages/customer/BookingHistoryPage')); // Added import
const CustomerBookingDetailPage = lazy(() => import('./pages/customer/CustomerBookingDetailPage')); // Added import
const CustomerServiceDetailPage = lazy(() => import('./pages/customer/CustomerServiceDetailPage')); // Added import

// Organization Pages
const OrganizationDashboardPage = lazy(() => import('./pages/organization/OrganizationDashboardPage'));
const OrganizationProfilePage = lazy(() => import('./pages/organization/OrganizationProfilePage'));
const OrganizationServiceHistoryPage = lazy(() => import('./pages/organization/OrganizationServiceHistoryPage')); // Added import
const OrganizationBookingHistoryPage = lazy(() => import('./pages/organization/OrganizationBookingHistoryPage')); // Added import
const TeamPage = lazy(() => import('./pages/organization/TeamPage'));
const InvoicesPage = lazy(() => import('./pages/organization/InvoicesPage'));
const ReportsPage = lazy(() => import('./pages/organization/ReportsPage'));

// Admin Pages
import AdminRoutes from './admin/routes/AdminRoutes';
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
          <Route path="/gallery" element={<ErrorBoundary><PublicLayout><GalleryPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/about" element={<ErrorBoundary><PublicLayout><AboutPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/guest-booking" element={<ErrorBoundary><PublicLayout><GuestBookingPage /></PublicLayout></ErrorBoundary>} />

          {/* Customer Routes */}
          <Route path="/login" element={<ErrorBoundary><PublicLayout><LoginPageCustomer /></PublicLayout></ErrorBoundary>} />
          <Route path="/register" element={<ErrorBoundary><PublicLayout><RegistrationPage /></PublicLayout></ErrorBoundary>} />
          {/* Customer Dashboard Route - Adjusted to match user suggestion */}
          <Route path="/customer/dashboard" element={<><CustomerDashboardPage /></>} />
          <Route path="/customer/profile" element={<><CustomerProfilePage /></>} /> {/* Updated route */}
          <Route path="/customer/service-history" element={<><ServiceHistoryPage /></>} /> {/* New route */}
          <Route path="/customer/service-history/:serviceId" element={<><CustomerServiceDetailPage /></>} /> {/* New route for service details */}
          <Route path="/customer/booking-history" element={<><BookingHistoryPage /></>} /> {/* New route */}
          <Route path="/customer/booking-history/:bookingId" element={<><CustomerBookingDetailPage /></>} /> {/* New route for booking details */}

          {/* Organization Routes */}
          <Route path="/organization/dashboard" element={<><OrganizationDashboardPage /></>} />
          <Route path="/organization/profile" element={<><OrganizationProfilePage /></>} />
          <Route path="/organization/service-history" element={<><OrganizationServiceHistoryPage /></>} /> {/* New route */}
          <Route path="/organization/booking-history" element={<><OrganizationBookingHistoryPage /></>} /> {/* New route */}
          <Route path="/organization/team" element={<><TeamPage /></>} />
          <Route path="/organization/invoices" element={<><InvoicesPage /></>} />
          <Route path="/organization/reports" element={<><ReportsPage /></>} />

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
