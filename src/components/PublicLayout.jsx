import React from 'react';
import Navbar from './Navbar.js'; // Assuming Navbar component exists
import Footer from './Footer.js'; // Assuming Footer component exists

const PublicLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
