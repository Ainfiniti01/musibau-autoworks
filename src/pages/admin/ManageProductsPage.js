import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the manage products page
// TODO: Fetch products data from an API
// TODO: Implement add, edit, and delete functionality

const ManageProductsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Manage Products</title>
        <meta name="description" content="Manage products offered by Musibau AutoWorks. Add, edit, or delete products." />
      </Helmet>
      <h1>Manage Products</h1>
      <button>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Product 1</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Product 2</td>
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

export default ManageProductsPage;
