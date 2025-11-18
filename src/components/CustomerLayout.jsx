import React from 'react';
import CustomerNavbar from './CustomerNavbar.jsx'; // Assuming CustomerNavbar component exists

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <CustomerNavbar />
      <div className="customer-content px-4"> {/* Added px-4 for side padding */}
        <main>
          {children}
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;
