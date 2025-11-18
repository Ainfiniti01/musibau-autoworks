import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopAccountDropdownOpen, setIsDesktopAccountDropdownOpen] = useState(false);
  const [isDesktopRegisterDropdownOpen, setIsDesktopRegisterDropdownOpen] = useState(false); // New state for desktop register dropdown
  const [isMobileAccountDropdownOpen, setIsMobileAccountDropdownOpen] = useState(false);
  const [isMobileRegisterDropdownOpen, setIsMobileRegisterDropdownOpen] = useState(false);
  // Placeholder for authentication state. In a real app, this would come from context or a global state.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // To store user info if authenticated

  const logo = require('../assets/images/logo.png');

  // Simulate checking authentication status on component mount
  useEffect(() => {
    // In a real app, you'd check localStorage, cookies, or an auth context
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close account dropdowns when mobile menu is opened
    setIsMobileAccountDropdownOpen(false);
    setIsMobileRegisterDropdownOpen(false);
    setIsDesktopAccountDropdownOpen(false); // Also close desktop dropdown if it somehow gets opened
  };

  const toggleDesktopAccountDropdown = () => {
    setIsDesktopAccountDropdownOpen(!isDesktopAccountDropdownOpen);
    setIsDesktopRegisterDropdownOpen(false); // Close nested register dropdown when main account dropdown is toggled
  };

  const toggleDesktopRegisterDropdown = () => {
    setIsDesktopRegisterDropdownOpen(!isDesktopRegisterDropdownOpen);
  };

  const toggleMobileAccountDropdown = () => {
    setIsMobileAccountDropdownOpen(!isMobileAccountDropdownOpen);
    // Ensure nested dropdown is closed when main mobile account dropdown is toggled
    setIsMobileRegisterDropdownOpen(false);
  };

  const toggleMobileRegisterDropdown = () => {
    setIsMobileRegisterDropdownOpen(!isMobileRegisterDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setIsDesktopAccountDropdownOpen(false); // Close desktop dropdown on logout
    setIsDesktopRegisterDropdownOpen(false); // Close desktop register dropdown on logout
    setIsMobileAccountDropdownOpen(false); // Close mobile dropdown on logout
    setIsMobileRegisterDropdownOpen(false); // Close nested mobile dropdown on logout
    // Optionally redirect to login or home page
    // navigate('/login');
  };

  // Refs for closing dropdowns on outside click
  const desktopAccountDropdownRef = useRef(null);
  const desktopRegisterDropdownRef = useRef(null); // New ref for desktop register dropdown
  const mobileMenuSidebarRef = useRef(null); // Ref for the entire mobile menu sidebar
  const mobileAccountDropdownRef = useRef(null); // Ref for the mobile account dropdown
  const mobileRegisterDropdownRef = useRef(null);

  // Effect to close desktop account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopAccountDropdownRef.current && !desktopAccountDropdownRef.current.contains(event.target)) {
        setIsDesktopAccountDropdownOpen(false);
        setIsDesktopRegisterDropdownOpen(false); // Also close nested register dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopAccountDropdownOpen]); // Re-run effect if dropdown state changes

  // Effect to close desktop register dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (desktopRegisterDropdownRef.current && !desktopRegisterDropdownRef.current.contains(event.target)) {
        setIsDesktopRegisterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDesktopRegisterDropdownOpen]); // Re-run effect if dropdown state changes

  // Effect to close mobile menu sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuSidebarRef.current && !mobileMenuSidebarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false); // Close the entire mobile menu sidebar
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Re-run effect if sidebar state changes

  // Effect to close mobile account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileAccountDropdownRef.current && !mobileAccountDropdownRef.current.contains(event.target)) {
        setIsMobileAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileAccountDropdownOpen]); // Re-run effect if dropdown state changes

  // Effect to close mobile register dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileRegisterDropdownRef.current && !mobileRegisterDropdownRef.current.contains(event.target)) {
        setIsMobileRegisterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileRegisterDropdownOpen]); // Re-run effect if dropdown state changes


  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold font-montserrat flex items-center space-x-3">
          <img
            src={logo}
            alt="Musibau Autoworks"
            className="h-16 w-auto rounded-sm object-contain drop-shadow"
          />
          <span className="text-lg font-bold text-white">
            Musibau AutoWorks
          </span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            {!isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>About</NavLink>
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>Services</NavLink>
          <NavLink to="/gallery" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>Gallery</NavLink>
          <NavLink to="/booking" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>Booking</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>Products</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : "text-white hover:text-yellow-400 transition duration-300 font-opensans"}>Contact</NavLink>

          
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        ref={mobileMenuSidebarRef} // Reusing this ref for the sidebar itself for outside click
      >
        <div className="p-4">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none absolute top-4 right-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="mt-10"> {/* Added margin-top to push content below close button */}
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>About</NavLink>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>Home</NavLink>
            <NavLink to="/services" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>Services</NavLink>
            <NavLink to="/gallery" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>Gallery</NavLink>
            <NavLink to="/booking" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>Booking</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>Products</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link block py-2 hover:text-yellow-400 transition duration-300 font-opensans" : "block text-white py-2 hover:text-yellow-400 transition duration-300 font-opensans"} onClick={toggleMobileMenu}>Contact</NavLink>

          </div>
        </div>
      </div> {/* Closing div for the main container of the mobile menu sidebar */}
      {/* Overlay for sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden overlay"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
