import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the manage customers page
// TODO: Fetch customers data from an API
// TODO: Implement view, edit, and delete functionality

const ManageCustomersPage = () => {
  return (
    <main> {/* Use main for semantic HTML */}
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
              <button aria-label="View John Doe details">View</button>
              <button aria-label="Edit John Doe details">Edit</button>
              <button aria-label="Delete John Doe details">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane.smith@example.com</td>
            <td>
              <button aria-label="View Jane Smith details">View</button>
              <button aria-label="Edit Jane Smith details">Edit</button>
              <button aria-label="Delete Jane Smith details">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default ManageCustomersPage;
