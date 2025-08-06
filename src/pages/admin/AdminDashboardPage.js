import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import { FaChartBar, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

// TODO: Add styling for the admin dashboard
// TODO: Fetch and display actual stats from an API

const AdminDashboardPage = () => {
  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for Musibau AutoWorks. Manage services, customers, bookings, and products." />
      </Helmet>
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div>
          <h2><FaChartBar /> Total Customers</h2>
          <p>123</p>
        </div>
        <div>
          <h2><FaChartBar /> Total Bookings</h2>
          <p>456</p>
        </div>
        <div>
          <h2><FaChartBar /> Total Products</h2>
          <p>78</p>
        </div>
      </div>

      <div className="admin-management">
        <h2>Manage Data</h2>

        <div className="manage-section">
          <h3>Customers</h3>
          <div className="actions">
            <button><FaPlus /> Add Customer</button>
            <button><FaEdit /> Edit Customer</button>
            <button><FaTrash /> Delete Customer</button>
          </div>
        </div>

        <div className="manage-section">
          <h3>Bookings</h3>
          <div className="actions">
            <button><FaPlus /> Add Booking</button>
            <button><FaEdit /> Edit Booking</button>
            <button><FaTrash /> Delete Booking</button>
          </div>
        </div>

        <div className="manage-section">
          <h3>Products</h3>
          <div className="actions">
            <button><FaPlus /> Add Product</button>
            <button><FaEdit /> Edit Product</button>
            <button><FaTrash /> Delete Product</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
