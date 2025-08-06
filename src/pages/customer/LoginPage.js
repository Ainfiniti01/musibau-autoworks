import React, { useState } from 'react';
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <ToastPlaceholder message={toast.message} type={toast.type} />
    </div>
  );
};

export default LoginPage;
