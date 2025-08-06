import React, { useState } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import ToastPlaceholder from '../../components/ToastPlaceholder'; // Corrected import path

const LoginPage = () => {
  const [toast, setToast] = useState({ message: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful login
    setToast({ message: 'Login successful!', type: 'success' });
    // In a real app, you would handle actual login logic here
  };

  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Login</title>
        <meta name="description" content="Login to your Musibau AutoWorks customer account." />
      </Helmet>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" aria-label="Email Address" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" aria-label="Password" />
        </div>
        <button type="submit" aria-label="Login Button">Login</button>
      </form>
      <ToastPlaceholder message={toast.message} type={toast.type} />
    </div>
  );
};

export default LoginPage;
