import React from 'react';
import OrganizationHeader from './OrganizationHeader'; // Import the specific OrganizationHeader
import Footer from './MinimalFooter'; // Assuming a shared Footer component

const OrganizationLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <OrganizationHeader /> {/* Use the specific OrganizationHeader */}
      <div className="flex flex-1">
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
      <Footer /> {/* Or a specific OrganizationFooter if needed */}
    </div>
  );
};

export default OrganizationLayout;
