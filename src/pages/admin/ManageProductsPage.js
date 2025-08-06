import React from 'react';

// TODO: Add styling for the manage products page
// TODO: Fetch products data from an API
// TODO: Implement add, edit, and delete functionality

const ManageProductsPage = () => {
  return (
    <div>
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
