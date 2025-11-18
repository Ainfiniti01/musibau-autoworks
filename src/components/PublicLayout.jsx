import React from 'react';
import Navbar from './Navbar.jsx'; // Assuming Navbar component exists
import Footer from './Footer.jsx'; // Assuming Footer component exists

const PublicLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="pb-16">
        {children}
      </main>
      <Footer className="sm:hidden fixed bottom-0 left-0 w-full" />
    </div>
  );
};

export default PublicLayout;
