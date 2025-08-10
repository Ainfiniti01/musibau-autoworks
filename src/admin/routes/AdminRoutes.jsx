import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Login from '../pages/Login';
import Customers from '../pages/Customers';
import Services from '../pages/Services';
import Products from '../pages/Products';
import AdminSettings from '../pages/AdminSettings';
import BookingForm from '../pages/BookingForm';
import Reports from '../pages/Reports';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/ForgotPassword';
import { AdminAuthProvider } from '../context/AdminAuthContext';

const AdminRoutes = () => (
  <AdminAuthProvider>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="services" element={<Services />} />
        <Route path="products" element={<Products />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="booking-form" element={<BookingForm />} />
        <Route path="reports" element={<Reports />} />
        {/* Add more admin routes here */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default AdminRoutes;
