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
import { Analytics } from "@vercel/analytics/react";

// Page Components using React.lazy
const HomePage = lazy(() => import('./pages/public/HomePage'));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage'));
const BookingPage = lazy(() => import('./pages/public/BookingPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const GalleryPage = lazy(() => import('./pages/public/GalleryPage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));


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
      <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ErrorBoundary><PublicLayout><HomePage /></PublicLayout></ErrorBoundary>} />
          <Route path="/services" element={<ErrorBoundary><PublicLayout><ServicesPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/booking" element={<ErrorBoundary><PublicLayout><BookingPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/contact" element={<ErrorBoundary><PublicLayout><ContactPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/gallery" element={<ErrorBoundary><PublicLayout><GalleryPage /></PublicLayout></ErrorBoundary>} />
          <Route path="/about" element={<ErrorBoundary><PublicLayout><AboutPage /></PublicLayout></ErrorBoundary>} />

          

          {/* 404 Route */}
          <Route path="*" element={<ErrorBoundary><PublicLayout><NotFoundPage /></PublicLayout></ErrorBoundary>} />
        </Routes>
      </Suspense>
      <ScrollToTopButton />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Analytics />
    </Router>
  );
}

export default App;
