import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomerHeader = () => {
  // Placeholder for customer name and user info
  const customerName = "Customer";


  const navLinks = [
    { to: "/customer/dashboard", label: "Dashboard" },
    { to: "/customer/booking-history", label: "Bookings" },
    { to: "/customer/service-history", label: "Services" },
    { to: "/products", label: "Products" },
    { to: "/customer/profile", label: "Profile" },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // e.g., clear session, redirect to login
  };

  return (
    <header className="bg-navy-blue text-white p-4 shadow-md">
      <div className="w-full flex justify-between items-center px-4">
        {/* Logo/Brand Name */}
        <div className="flex items-center">
          <NavLink to="/customer/dashboard" className="text-2xl font-bold hover:text-yellow-400">
            Musibau AutoWorks
          </NavLink>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "hover:text-yellow-400 transition-colors duration-200"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default CustomerHeader;
