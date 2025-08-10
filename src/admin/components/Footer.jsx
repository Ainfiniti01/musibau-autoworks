import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 text-center text-gray-600 mt-auto text-sm">
      © {new Date().getFullYear()} Musibau Autoworks Admin Panel
    </footer>
  );
};

export default Footer;
