import React from 'react';
import { Link } from 'react-router-dom';

// TODO: Add styling for the customer dashboard layout
// TODO: Implement proper navigation for the customer dashboard

const CustomerLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/customer/dashboard">Dashboard</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default CustomerLayout;
