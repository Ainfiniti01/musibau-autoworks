import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-[#004040]">404</h1>
      <p className="text-2xl mt-4 mb-8">Page Not Found</p>
      <p className="text-lg text-center max-w-md">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/admin/dashboard" className="mt-8 px-6 py-3 bg-[#ECBE07] text-[#004040] font-semibold rounded-md hover:bg-[#d1a906] transition duration-300">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
