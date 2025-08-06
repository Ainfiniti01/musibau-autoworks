import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the customer dashboard
// TODO: Fetch customer data from an API

const CustomerDashboardPage = () => {
  return (
    <main> {/* Use main for semantic HTML */}
      <Helmet>
        <title>Musibau AutoWorks - Customer Dashboard</title>
        <meta name="description" content="Welcome to your Musibau AutoWorks customer dashboard." />
      </Helmet>
      <h1>Welcome, [Customer Name]</h1>
      <p>This is your dashboard.</p>
    </main>
  );
};

export default CustomerDashboardPage;
