import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the manage bookings page
// TODO: Fetch bookings data from an API
// TODO: Implement view and delete functionality

const ManageBookingsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Manage Bookings</title>
        <meta name="description" content="Manage all bookings made with Musibau AutoWorks. View and delete bookings." />
      </Helmet>
      <h1>Manage Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Painting</td>
            <td>2023-10-27</td>
            <td>
              <button>View</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>Mechanic</td>
            <td>2023-10-28</td>
            <td>
              <button>View</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookingsPage;
