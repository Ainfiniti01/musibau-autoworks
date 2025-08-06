import React from 'react';
import { Link } from 'react-router-dom';

// TODO: Add styling for the admin panel layout
// TODO: Implement proper navigation for the admin panel

const AdminLayout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/services">Manage Services</Link></li>
          <li><Link to="/admin/customers">Manage Customers</Link></li>
          <li><Link to="/admin/bookings">Manage Bookings</Link></li>
          <li><Link to="/admin/products">Manage Products</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
