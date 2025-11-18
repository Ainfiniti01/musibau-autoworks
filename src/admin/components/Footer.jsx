import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 text-center text-gray-600 text-sm fixed bottom-0 left-0 right-0 z-40">
      © {new Date().getFullYear()} Musibau Autoworks Admin Panel
    </footer>
  );
};

export default Footer;
