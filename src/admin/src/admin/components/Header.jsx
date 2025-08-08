import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    // Clear the authentication state from localStorage
    localStorage.removeItem("adminLoggedIn"); // Using "adminLoggedIn" as per user's plan
    // Redirect to the admin login page
    navigate("/admin/login");
  };

  return (
    <header className="bg-[#004040] shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <div>
        {/* Placeholder for user info */}
        <span className="mr-4 text-white">Welcome, Admin!</span>
        {/* Logout Button */}
        {/* TODO: Add logout button with functionality (already implemented) */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:text-[#ECBE07] text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
