import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const OrganizationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const organizationName = "Musibau AutoWorks";


  const navLinks = [
    { to: "/organization/dashboard", label: "Dashboard" },
    { to: "/organization/team", label: "Team" },
    { to: "/organization/booking-history", label: "Bookings" },
    { to: "/organization/service-history", label: "Services" },
    { to: "/products", label: "Products" },
    { to: "/organization/profile", label: "Profile" },
    // Optional: Analytics link
    // { to: "/organization/analytics", label: "Analytics" },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
    // e.g., clear session, redirect to login
  };

  return (
    <header className="bg-navy-blue text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <div className="flex items-center">
          <NavLink to="/organization/dashboard" className="text-2xl font-bold hover:text-yellow-400">
            {organizationName}
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

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-400 transition-colors duration-200"
                }
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default OrganizationHeader;
