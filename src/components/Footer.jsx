import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, 
  FaPhone, FaMapMarkerAlt, FaWhatsapp, FaEnvelope 
} from 'react-icons/fa';

const Footer = () => {
  const socialIconClasses = "text-gray-400 hover:text-yellow-300 transition duration-300 text-2xl mx-2";
  const aboutImage = require('../assets/images/logo.png');

  return (
    <footer className="bg-deepNavy text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">

          {/* Logo + Contact Info */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <img 
              src={aboutImage} 
              alt="Musibau Autoworks Logo" 
              className="h-10 mx-auto md:mx-0 mb-2" 
              loading="lazy" 
            />

            {/* <a href=""><p className="font-opensans text-sm">32/34 Alhaji Imam Raimi Street, Makoko, Sabo-Yaba, Lagos</p></a> */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=32%2F34+Alhaji+Imam+Raimi+Street+Makoko+Sabo-Yaba+Lagos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="font-opensans text-sm">
                32/34 Alhaji Imam Raimi Street, Makoko, Sabo-Yaba, Lagos
              </p>
            </a>

            <a href="tel:+2348033001735">
              <p className="font-opensans text-sm">
                Phone: +234 803 300 1735
              </p>
            </a>

            <a href="mailto:info@musibauautoworks.com">
              <p className="font-opensans text-sm">
                Email: info@musibauautoworks.com
              </p>
            </a>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 md:flex md:flex-row md:justify-between md:items-center">
            <div className="text-center mb-8 md:mb-0">
              <h4 className="text-xl font-bold mb-4 text-white font-montserrat">Quick Links</h4>
              <ul className="font-opensans">
                <li className="mb-2"><Link to="/" className="hover:text-yellow-300 duration-300">Home</Link></li>
                <li className="mb-2"><Link to="/services" className="hover:text-yellow-300 duration-300">Services</Link></li>
                <li className="mb-2"><Link to="/about" className="hover:text-yellow-300 duration-300">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-300 duration-300">Contact</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="text-center mb-8 md:mb-0">
              <h4 className="text-xl font-bold mb-4 text-white font-montserrat">Services</h4>
              <ul className="font-opensans">
                <li className="mb-2"><Link to="/services" className="hover:text-yellow-300 duration-300">Chassis Repair</Link></li>
                <li className="mb-2"><Link to="/services" className="hover:text-yellow-300 duration-300">Engine Overhaul</Link></li>
                <li className="mb-2"><Link to="/services" className="hover:text-yellow-300 duration-300">Electrical Diagnostics</Link></li>
                <li><Link to="/services" className="hover:text-yellow-300 duration-300">General Maintenance</Link></li>
              </ul>
            </div>
          </div>

          {/* Social + Contact Buttons */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4 text-white font-montserrat">Reach Out</h4>
            <div className="flex justify-center mb-4">
              <a href="mailto:info@musibauautoworks.com" className={socialIconClasses}><FaEnvelope /></a>
              <a href="https://wa.me/2349136865592" target="_blank" rel="noreferrer" className={socialIconClasses}><FaWhatsapp /></a>
              <a href="tel:+2349136865592" className={socialIconClasses}><FaPhone /></a>
              <a 
                href="https://www.google.com/maps?q=32+Alhaji+Imam+Raimi+Street+Makoko+Lagos" 
                target="_blank" 
                rel="noreferrer" 
                className={socialIconClasses}
              >
                <FaMapMarkerAlt />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center mt-12 text-gray-500 font-opensans">
          © 2025 Musibau Autoworks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
