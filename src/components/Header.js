import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { FaBars, FaUserCircle } from 'react-icons/fa';

// TODO: Add styling for the header
// TODO: Make the header responsive

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">Musibau AutoWorks</Link>
        <FaBars className="header-icon" /> {/* Added FaBars icon */}
      </div>
      <nav>
<ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/booking">Booking</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/services">Services</Link></li>
        </ul>
      </nav>
      <FaUserCircle className="header-icon" /> {/* Added FaUserCircle icon */}
      <DarkModeToggle />
    </header>
  );
};

export default Header;
