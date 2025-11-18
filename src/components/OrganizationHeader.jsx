import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa'; // Import hamburger icons

const OrganizationHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const logo = require('../assets/images/logo.png');

  const activeLinkStyle = {
    color: 'var(--color-primary)', // Using CSS variable for primary color
    textDecoration: 'underline',
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close dropdown and mobile menu when a link is clicked
  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="text-white p-4 shadow-md bg-gray-800">
      <nav className="max-w-7xl mx-auto flex justify-between items-center container">
        {/* Logo/Brand */}
        <Link to="/" className="text-primary text-2xl font-bold font-montserrat flex items-center space-x-3">
            <img
              src={logo}
              alt="Musibau Autoworks"
              className="h-16 w-auto rounded-sm object-contain drop-shadow"
            />
            <span className="text-lg-3 font-bold text-primary">
              <strong>Musibau AutoWorks</strong>
            </span>
          </Link>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="focus:outline-none text-primary">
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden" onClick={toggleMobileMenu}></div>
        )}
        <ul className={`fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-lg z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden flex flex-col items-center space-y-4 py-8 overflow-y-auto`}>
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 focus:outline-none text-primary">
            <FaTimes className="w-6 h-6" />
          </button>
          <li><NavLink to="/organization/dashboard" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Dashboard</NavLink></li>
          <li><NavLink to="/organization/booking-history" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Bookings</NavLink></li>
          <li><NavLink to="/services" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Services</NavLink></li>
          <li><NavLink to="/products" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Products</NavLink></li>
          <li><NavLink to="/organization/team" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Team</NavLink></li>
          <li><NavLink to="/organization/invoices" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Invoices</NavLink></li>
          <li><NavLink to="/organization/reports" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>Reports</NavLink></li>
          <li className="relative">
            <button onClick={toggleDropdown} className="hover:text-primary focus:outline-none flex items-center">
              Account <span className="ml-2">&#9662;</span>
            </button>
            {isDropdownOpen && (
              <ul className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-700 rounded-md shadow-lg z-10 py-1.5 w-32 text-center">
                <li>
                  <NavLink to="/organization/profile" className="text-primary px-2 py-1 rounded inline-flex items-center justify-center w-full hover:bg-gray-600" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>
                    <FaUser className="inline-block mr-1" />Profile
                  </NavLink>
                </li>
                <li>
                  <button onClick={closeMenus} className="bg-red-500 text-white px-2 py-1 rounded inline-flex items-center justify-center w-full hover:bg-red-600">
                    <FaSignOutAlt className="inline-block mr-1" />Logout
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 items-center ml-auto">
          <li><NavLink to="/organization/dashboard" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Dashboard</NavLink></li>
          <li><NavLink to="/organization/booking-history" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Bookings</NavLink></li>          
          <li><NavLink to="/organization/service-history" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Services</NavLink></li>         
          <li><NavLink to="/products" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Products</NavLink></li>          
          <li><NavLink to="/organization/team" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Team</NavLink></li>          
          <li><NavLink to="/organization/invoices" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Invoices</NavLink></li>          
          <li><NavLink to="/organization/reports" className="hover:text-primary" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Reports</NavLink></li>          
          <li className="relative">
            <button onClick={toggleDropdown} className="hover:text-primary focus:outline-none flex items-center">
              Account <span className="ml-2">&#9662;</span>
            </button>
            {isDropdownOpen && (

              <ul className="absolute mt-3 bg-gray-700 rounded-md shadow-lg z-10 py-1.5 w-32">
                <li>
                  <NavLink to="/organization/profile" className="text-primary px-2 py-1 rounded inline-flex items-center w-full hover:bg-gray-600" style={({ isActive }) => isActive ? activeLinkStyle : undefined} onClick={closeMenus}>
                    <FaUser className="inline-block mr-1" />Profile
                  </NavLink>
                </li>
                
                <li>
                  <button onClick={closeMenus} className="bg-red-500 text-white px-2 py-1 rounded inline-flex items-center w-full hover:bg-red-600">
                    <FaSignOutAlt className="inline-block mr-1" />Logout
                  </button>
                </li>        
              </ul> 
            )}
          </li>
        
        </ul>
      </nav>
    </header>
  );
};

export { OrganizationHeader };
