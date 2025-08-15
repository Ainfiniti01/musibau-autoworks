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
import BookingHistory from '../pages/BookingHistory';
import ServiceHistory from '../pages/ServiceHistory';
import Organizations from '../pages/Organizations';
import CustomerDetail from '../pages/CustomerDetail';
import OrganizationDetail from '../pages/OrganizationDetail';

const EditOrganization = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    address: '',
    joinedDate: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        // Simulate fetching organization data from API
        const mockOrganization = {
          id: 1,
          name: 'Global Solutions',
          email: 'contact@globalsolutions.com',
          phone: '444-555-6666',
          address: '456 Business Ave, Metro City, USA',
          industry: 'Technology',
          joinedDate: '2022-05-10',
        };
        setOrganization(mockOrganization);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch organization data.');
        setIsLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleChange = (e) => {
    setOrganization({ ...organization, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!organization.name) {
      newErrors.name = 'Organization name is required.';
      isValid = false;
    }
    if (!organization.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organization.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!organization.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    }
    if (!organization.address) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }
    if (!organization.industry) {
      newErrors.industry = 'Industry is required.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call to update organization data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Organization updated successfully!');
      navigate(`/admin/organizations/${id}`);
    } catch (error) {
      toast.error('Failed to update organization.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Organization</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Organization Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={organization.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={organization.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={organization.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            value={organization.industry}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.industry && <p className="text-red-500 text-sm">{errors.industry}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={organization.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="joinedDate" className="block text-sm font-medium text-gray-700">
            Joined Date
          </label>
          <input
            type="date"
            id="joinedDate"
            name="joinedDate"
            value={organization.joinedDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/organizations/${id}`)}
            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    organization: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        // Simulate fetching customer data from API
        const mockCustomer = {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '123-456-7890',
          address: '123 Main St, Anytown, USA',
          organization: 'Global Solutions',
        };
        setCustomer(mockCustomer);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch customer data.');
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear error on change
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!customer.name) {
      newErrors.name = 'Customer name is required.';
      isValid = false;
    }
    if (!customer.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }
    if (!customer.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    }
    if (!customer.address) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }
    if (!customer.organization) {
      newErrors.organization = 'Organization is required.';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call to update customer data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Customer updated successfully!');
      navigate(`/admin/customers/${id}`);
    } catch (error) {
      toast.error('Failed to update customer.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
        </div>
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <input
            type="text"
            id="organization"
            name="organization"
            value={customer.organization}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          {errors.organization && <p className="text-red-500 text-sm">{errors.organization}</p>}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/customers/${id}`)}
            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const AdminRoutes = () => (
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
        <Route path="booking-form" element={<BookingForm />} />
        <Route path="reports" element={<Reports />} />
        {/* New Pages */}
        <Route path="booking-history" element={<BookingHistory />} />
        <Route path="service-history" element={<ServiceHistory />} />
        <Route path="organizations" element={<Organizations />} />
        {/* Drill-down Pages */}
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="organizations/:id" element={<OrganizationDetail />} />
        {/* Edit Pages */}
        <Route path="customers/edit/:id" element={EditCustomer} />
        <Route path="organizations/edit/:id" element={EditOrganization} />
        {/* Add more admin routes here */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </AdminAuthProvider>
);

export default AdminRoutes;
