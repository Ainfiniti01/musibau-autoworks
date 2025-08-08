import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import DarkModeToggle from './DarkModeToggle';
import { FaBars, FaUserCircle, FaFacebook, FaYoutube, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Import social and contact icons
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
// import backgroundImage from '../assets/images/logo.jpg'; // This import is not used

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const location = useLocation(); // Get current location

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  // Function to determine if a link should be active
  const getActiveClass = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };

  return (
    <header className="fixed top-0 w-full bg-gray-800 p-4 shadow-md z-50"> {/* Added fixed positioning */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link to="/" className="text-white text-2xl font-bold font-montserrat flex items-center">
            {/* Removed unused backgroundImage import and used a placeholder or removed image tag */}
            {/* <img src="..assets/images/logo.jpg" alt="Logo" className="h-8 mr-2" /> */}
            Musibau AutoWorks
          </Link>
        </div>

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
          <Link to="/about" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/about')}`}>About</Link>
          <Link to="/" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/')}`}>Home</Link>
          <Link to="/services" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/services')}`}>Services</Link>
          <Link to="/gallery" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/gallery')}`}>Gallery</Link>
           <Link to="/products" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/products')}`}>Products</Link>
          <Link to="/booking" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/booking')}`}>Booking</Link>
          <Link to="/contact" className={`text-white hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/contact')}`}>Contact</Link>
          <DarkModeToggle /> {/* Added DarkModeToggle */}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Conditionally render the mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-28 left-0 right-0 z-50 w-full bg-gray-700 py-2 shadow-md`}>
        <Link to="/about" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/about')}`} onClick={toggleMobileMenu}>About</Link>
        <Link to="/" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/')}`} onClick={toggleMobileMenu}>Home</Link>
        <Link to="/services" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/services')}`} onClick={toggleMobileMenu}>Services</Link>
        <Link to="/gallery" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/gallery')}`} onClick={toggleMobileMenu}>Gallery</Link>
        <Link to="/booking" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/booking')}`} onClick={toggleMobileMenu}>Booking</Link>
        <Link to="/products" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/products')}`} onClick={toggleMobileMenu}>Products</Link>
        <Link to="/contact" className={`block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans ${getActiveClass('/contact')}`} onClick={toggleMobileMenu}>Contact</Link>
        {/* DarkModeToggle is already in desktop view, might need to decide if it should be in mobile too */}
      </div>
    </header>
  );
};

export default Header;
