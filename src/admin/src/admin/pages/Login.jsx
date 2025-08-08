import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication: In a real app, you'd validate credentials against a backend
    // TODO: Integrate with real admin login/auth API
    // TODO: Add password validation & error handling
    if (email === 'admin@musibauautoworks.com' && password === 'password123') {
      // Use "adminLoggedIn" for consistency with ProtectedRoute and Header
      localStorage.setItem('adminLoggedIn', 'mock-admin-token');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white rounded p-6 text-center text-[#004040] w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-[#ECBE07]">Admin Login</h2>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-[#ECBE07] hover:bg-[#d1a906] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Login;
