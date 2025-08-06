import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the manage customers page
// TODO: Fetch customers data from an API
// TODO: Implement view, edit, and delete functionality

const ManageCustomersPage = () => {
  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Manage Customers</title>
        <meta name="description" content="Manage customers of Musibau AutoWorks. View, edit, or delete customer accounts." />
      </Helmet>
      <h1>Manage Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>
              <button>View</button>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane.smith@example.com</td>
            <td>
              <button>View</button>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageCustomersPage;
