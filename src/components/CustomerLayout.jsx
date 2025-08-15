import React from 'react';

import MinimalFooter from './MinimalFooter.js'; // Assuming MinimalFooter component exists

const CustomerLayout = ({ children }) => {
  return (
    <div className="customer-layout">
      <div className="customer-content px-4"> {/* Added px-4 for side padding */}
        <main>
          {children}
        </main>
      </div>
      <MinimalFooter />
    </div>
  );
};

export default CustomerLayout;
