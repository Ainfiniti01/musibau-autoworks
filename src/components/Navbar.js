import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/" className="text-white text-2xl font-bold font-montserrat">
          Musibau Auto Works
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {!isOpen ? (
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
        <div className="hidden md:flex space-x-6">
          <Link to="/services" className="text-white hover:text-[#ECBE07] transition duration-300 font-opensans">Services</Link>
          <Link to="/gallery" className="text-white hover:text-[#ECBE07] transition duration-300 font-opensans">Gallery</Link>
          <Link to="/about" className="text-white hover:text-[#ECBE07] transition duration-300 font-opensans">About Us</Link>
          <Link to="/contact" className="text-white hover:text-[#ECBE07] transition duration-300 font-opensans">Contact</Link>
          <Link to="/login" className="text-sm text-blue-600 hover:underline">Login</Link>
          <Link to="/register" className="ml-4 text-sm text-green-600 hover:underline">Register</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
        <Link to="/services" className="block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans" onClick={toggleMenu}>Services</Link>
        <Link to="/gallery" className="block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans" onClick={toggleMenu}>Gallery</Link>
        <Link to="/about" className="block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans" onClick={toggleMenu}>About Us</Link>
        <Link to="/contact" className="block text-white py-2 hover:text-[#ECBE07] transition duration-300 font-opensans" onClick={toggleMenu}>Contact</Link>
        <Link to="/login" className="block text-sm text-blue-600 hover:underline py-2" onClick={toggleMenu}>Login</Link>
        <Link to="/register" className="block text-sm text-green-600 hover:underline py-2" onClick={toggleMenu}>Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
