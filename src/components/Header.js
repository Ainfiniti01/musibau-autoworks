import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { FaBars, FaUserCircle, FaFacebook, FaYoutube, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; // Import social and contact icons
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import backgroundImage from '../assets/images/logo.jpg'; 

// TODO: Add styling for the header
// TODO: Make the header responsive

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <header className="container"> {/* Added container class for responsiveness */}
      <div className="logo">
        <Link to="/">
          <img src="..assets/images/logo.jpg" alt="Logo" className="logo-image" /> {/* Added logo image */}
        </Link>
        <Link to="/">Musibau AutoWorks</Link>
        {/* Use FaBars as the mobile menu icon, apply mobile-menu-icon class from CSS */}
        <FaBars className="header-icon mobile-menu-icon" onClick={toggleMobileMenu} /> {/* Added mobile-menu-icon class and onClick handler */}
      </div>
      {/* Conditionally apply 'nav-active' class based on state */}
      <nav className={isMobileMenuOpen ? 'nav-active' : ''}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/web-inquiry">Web Inquiry</Link></li>
        </ul>
      </nav>
      <div className="header-right"> {/* Grouping icons and toggle */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="header-icon"><FaFacebook /></a> {/* Social icon */}
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="header-icon"><FaYoutube /></a> {/* Social icon */}
        <a href="tel:+1234567890" className="header-icon"><FaPhone /></a> {/* Contact icon */}
        <a href="#" className="header-icon"><FaMapMarkerAlt /></a> {/* Contact icon */}
        <FaUserCircle className="header-icon" /> {/* Added FaUserCircle icon */}
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
