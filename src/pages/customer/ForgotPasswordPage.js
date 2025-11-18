import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ToastPlaceholder from '../../components/ToastPlaceholder'; // Assuming ToastPlaceholder is available
import { useNavigate, Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Simulate sending a password reset email
      // In a real application, you would send the email to your backend API
      console.log('Password reset requested for:', email);
      setToast({ message: 'Password reset email sent!', type: 'success' });

      // Optionally redirect to a confirmation page or back to login
      setTimeout(() => {
        navigate('/login'); // Redirect back to login page
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Musibau AutoWorks - Forgot Password</title>
        <meta name="description" content="Request a password reset for your Musibau AutoWorks account." />
      </Helmet>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-[#004040]">Forgot Password</h2>
        <p className="text-center text-gray-600">Enter your email address and we'll send you instructions to reset your password.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
            aria-label="Send Reset Link Button"
          >
            Send Reset Link
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Remembered your password? <Link to="/login" className="text-[#ECBE07] hover:underline"> Login</Link>
          </p>
          
          <div className="mt-6 text-center">
                    <Link to="/admin/login" className="text-primary hover:text-yellow-400 text-sm">
                      Back to Login
                    </Link>
                  </div>
        </form>
      </div>
      <ToastPlaceholder message={toast.message} type={toast.type} />
    </div>
  );
};

export default ForgotPasswordPage;
