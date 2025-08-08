import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const RegistrationPage = () => {
  const [accountType, setAccountType] = useState('customer');
  const [errors, setErrors] = useState({});

  const handleAccountTypeChange = (event) => {
    setAccountType(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.accountType = accountType;

    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', data);
      // TODO: Implement actual submission logic here
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
              value={accountType === 'customer' ? undefined : ''} // Clear if switching from org to customer
              onChange={(e) => { if (accountType === 'organization') e.target.value = ''; }} // Reset value if switching from org
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
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
