import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
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

  const location = useLocation(); // Get current location

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <header className="container h-20 py-4"> {/* Added container class for responsiveness, increased height and padding */}
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
          <li><Link to="/about" className={location.pathname === '/about' ? 'active-link' : ''}>About</Link></li>
          <li><Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</Link></li>
          <li><Link to="/services" className={location.pathname === '/services' ? 'active-link' : ''}>Services</Link></li>
          <li><Link to="/gallery" className={location.pathname === '/gallery' ? 'active-link' : ''}>Gallery</Link></li>
          <li><Link to="/booking" className={location.pathname === '/booking' ? 'active-link' : ''}>Booking</Link></li>
          <li><Link to="/products" className={location.pathname === '/products' ? 'active-link' : ''}>Products</Link></li>
          <li><Link to="/contact" className={location.pathname === '/contact' ? 'active-link' : ''}>Contact</Link></li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;
