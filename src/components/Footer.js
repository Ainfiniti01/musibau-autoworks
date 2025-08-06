import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // Example social icons

const Footer = () => {
  const socialIconClasses = "text-gray-400 hover:text-yellow-500 transition duration-300 text-2xl mx-2";

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Contact Info */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <img src="/assets/logo/logo.jpg" alt="Musibau Autoworks Logo" className="h-16 mx-auto md:mx-0 mb-4" />
            <p className="font-opensans">123 Automotive Lane, Car City, CA 90210</p>
            <p className="font-opensans">Phone: (123) 456-7890</p>
            <p className="font-opensans">Email: info@musibauautoworks.com</p>
          </div>

          {/* Quick Links */}
          <div className="text-center mb-8 md:mb-0">
            <h4 className="text-xl font-bold mb-4 text-white font-montserrat">Quick Links</h4>
            <ul className="font-opensans">
              <li className="mb-2"><a href="#home" className="hover:text-yellow-500 transition duration-300">Home</a></li>
              <li className="mb-2"><a href="#services" className="hover:text-yellow-500 transition duration-300">Services</a></li>
              <li className="mb-2"><a href="#about" className="hover:text-yellow-500 transition duration-300">About Us</a></li>
              <li><a href="#contact" className="hover:text-yellow-500 transition duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4 text-white font-montserrat">Follow Us</h4>
            <div className="flex justify-center">
              <a href="#" className={socialIconClasses} aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className={socialIconClasses} aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className={socialIconClasses} aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className={socialIconClasses} aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-12 text-gray-500 font-opensans">
          &copy; 2025 Musibau Autoworks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
