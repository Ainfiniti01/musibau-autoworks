import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet

// TODO: Add styling for the manage products page
// TODO: Fetch products data from an API
// TODO: Implement add, edit, and delete functionality

const ManageProductsPage = () => {
  return (
    <main> {/* Use main for semantic HTML */}
      <Helmet>
        <title>Musibau AutoWorks - Manage Products</title>
        <meta name="description" content="Manage products offered by Musibau AutoWorks. Add, edit, or delete products." />
      </Helmet>
      <h1>Manage Products</h1>
      <button aria-label="Add New Product">Add Product</button>
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
              <button aria-label="Edit Product 1">Edit</button>
              <button aria-label="Delete Product 1">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Product 2</td>
            <td>
              <button aria-label="Edit Product 2">Edit</button>
              <button aria-label="Delete Product 2">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default ManageProductsPage;
