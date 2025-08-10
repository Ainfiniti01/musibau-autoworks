import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getGuestActivities, clearGuestActivities } from '../../utils/guestActivity'; // Import guest activity utilities

const RegistrationPage = () => {
  const [accountType, setAccountType] = useState('customer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    'confirm-password': '',
    companyName: '',
    rcNumber: '',
    contactPerson: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
    // Clear organization-specific fields if switching to customer
    if (event.target.value === 'customer') {
      setFormData((prevData) => ({
        ...prevData,
        companyName: '',
        rcNumber: '',
        contactPerson: '',
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!data.password) newErrors.password = 'Password is required';
    if (data.password !== data['confirm-password']) newErrors['confirm-password'] = 'Passwords do not match';

    if (accountType === 'organization') {
      if (!data.companyName) newErrors.companyName = 'Company Name is required';
      if (!data.rcNumber) newErrors.rcNumber = 'RC Number is required';
      if (!data.contactPerson) newErrors.contactPerson = 'Contact Person is required';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToValidate = { ...formData, accountType };

    const validationErrors = validateForm(dataToValidate);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', dataToValidate);
      // Simulate API call
      try {
        // In a real application, you would send dataToValidate to your backend
        // const response = await fetch('/api/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(dataToValidate),
        // });
        // const result = await response.json();

        // For demonstration, simulate a successful response
        const simulatedResponse = { status: 201, message: 'Registration successful' };

        if (simulatedResponse.status === 201) {
          const guestActivities = getGuestActivities(); // Corrected function name
          if (guestActivities.length > 0) {
            console.log('Guest activity found on registration:', guestActivities);
            // In a real app, you would send this guestActivities to your backend
            // to attach it to the newly registered user.
            clearGuestActivities(); // Corrected function name
          }
          navigate('/login'); // Redirect to login page on successful registration
        } else {
          // Handle registration failure (e.g., show error message from backend)
          console.error('Registration failed:', simulatedResponse.message);
          setErrors({ general: simulatedResponse.message });
        }
      } catch (error) {
        console.error('Network error or unexpected issue:', error);
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Musibau AutoWorks - Register</title>
        <meta name="description" content="Register for a new Musibau AutoWorks customer account." />
      </Helmet>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center text-3xl font-extrabold text-[#004040]">Create Your Account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Account Type Selection */}
          <div className="flex items-center justify-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="accountType"
                value="customer"
                checked={accountType === 'customer'}
                onChange={handleAccountTypeChange}
                className="form-radio text-[#ECBE07]"
                aria-label="Personal Account Type"
              />
              <span className="ml-2 text-gray-700">Personal</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="accountType"
                value="organization"
                checked={accountType === 'organization'}
                onChange={handleAccountTypeChange}
                className="form-radio text-[#ECBE07]"
                aria-label="Organization Account Type"
              />
              <span className="ml-2 text-gray-700">Organization</span>
            </label>
          </div>

          {/* Basic Fields */}
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Full Name"
              aria-label="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Email address"
              aria-label="Email Address"
              value={formData.email}
              onChange={handleChange}
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
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Password"
              aria-label="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors['confirm-password'] ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              value={formData['confirm-password']}
              onChange={handleChange}
            />
            {errors['confirm-password'] && <p className="text-red-500 text-xs italic">{errors['confirm-password']}</p>}
          </div>

          {/* Conditional organization fields */}
          {accountType === "organization" && (
            <>
              <div>
                <label htmlFor="companyName" className="sr-only">Company Name</label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Company Name"
                  aria-label="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                {errors.companyName && <p className="text-red-500 text-xs italic">{errors.companyName}</p>}
              </div>
              <div>
                <label htmlFor="rcNumber" className="sr-only">RC Number</label>
                <input
                  id="rcNumber"
                  name="rcNumber"
                  type="text"
                  autoComplete="off"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.rcNumber ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="RC Number"
                  aria-label="RC Number"
                  value={formData.rcNumber}
                  onChange={handleChange}
                />
                {errors.rcNumber && <p className="text-red-500 text-xs italic">{errors.rcNumber}</p>}
              </div>
              <div>
                <label htmlFor="contactPerson" className="sr-only">Contact Person</label>
                <input
                  id="contactPerson"
                  name="contactPerson"
                  type="text"
                  autoComplete="name"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${errors.contactPerson ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Contact Person"
                  aria-label="Contact Person"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
                {errors.contactPerson && <p className="text-red-500 text-xs italic">{errors.contactPerson}</p>}
              </div>
            </>
          )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
              aria-label="Register Button"
            >
              Register
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account? <a href="/login" className="text-[#ECBE07] hover:underline">Login</a>
            </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
