import React from 'react';

// TODO: Add styling for the manage services page
// TODO: Fetch services data from an API
// TODO: Implement add, edit, and delete functionality

const ManageServicesPage = () => {
  return (
    <div>
      <h1>Manage Services</h1>
      <button>Add Service</button>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Painting</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Mechanic</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ManageServicesPage;
