import React from 'react';
import CustomerNavbar from './CustomerNavbar.jsx'; // Assuming CustomerNavbar component exists
import Sidebar from './Sidebar.jsx'; // Assuming Sidebar component exists (optional)
import MinimalFooter from './MinimalFooter.js'; // Assuming MinimalFooter component exists

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <CustomerNavbar />
      <div className="customer-content px-4"> {/* Added px-4 for side padding */}
        {/* Sidebar is optional, so it might be conditionally rendered or always present */}
        <Sidebar />
        <main>
          {children}
        </main>
      </div>
      <MinimalFooter />
    </div>
  );
};

export default CustomerLayout;
