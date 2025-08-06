import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// TODO: Add styling for the footer
// TODO: Add social media links

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
        </ul>
      </div>
      <div className="footer-social-icons">
        <Link to="#"><FaFacebook /></Link>
        <Link to="#"><FaInstagram /></Link>
        <Link to="tel:+1234567890"><FaPhone /></Link>
        <Link to="mailto:info@musibauautoworks.com"><FaEnvelope /></Link>
        <Link to="#"><FaMapMarkerAlt /></Link>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Musibau AutoWorks. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
