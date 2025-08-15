import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getGuestActivities, clearGuestActivities } from '../../utils/guestActivity'; // Import guest activity utilities
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [toast, setToast] = useState({ message: '', type: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!data.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate a successful login
      // In a real app, you would make an API call here
      // For now, we'll simulate success and redirect
      setToast({ message: 'Login successful!', type: 'success' });
      const guestActivities = getGuestActivities(); // Corrected function name
      if (guestActivities.length > 0) {
        console.log('Guest activity found on login:', guestActivities);
        // In a real app, you would send this guestActivities to your backend
        // to attach it to the newly logged-in user.
        clearGuestActivities(); // Corrected function name
      }
      // Determine user type (simulated for now)
      // In a real app, this would come from the login API response
      // For demonstration, we'll simulate a user type.
      const userType = data.email.includes('org') ? 'organization' : 'customer'; // Simple simulation

      setTimeout(() => {
        if (userType === 'organization') {
          navigate('/organization/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      }, 1500); // Delay redirect to show toast message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Musibau AutoWorks - Login</title>
        <meta name="description" content="Login to your Musibau AutoWorks customer account." />
      </Helmet>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-[#004040]">Welcome Back</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
              aria-label="Email Address"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Password"
              aria-label="Password"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#ECBE07] focus:ring-[#ECBE07] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-[#ECBE07] hover:text-[#d4a806]">
                Forgot your password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
            aria-label="Login Button"
          >
            Login
          </button>
        </form>
      </div>
      <ToastPlaceholder message={toast.message} type={toast.type} />
    </div>
  );
};

export default LoginPage;
