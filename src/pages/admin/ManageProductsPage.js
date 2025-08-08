import React from 'react';
import { Helmet } from 'react-helmet';
import { formatCurrency } from '../utils/formatCurrency'; // Import formatCurrency

// TODO: Add styling for the manage products page
// TODO: Fetch products data from an API
// TODO: Implement add, edit, and delete functionality

const ManageProductsPage = () => {
  // Placeholder for product data - in a real app, this would come from an API
  const products = [
    { id: 1, name: 'Product 1', price: 15000 },
    { id: 2, name: 'Product 2', price: 10000 },
  ];

  return (
    <main className="container mx-auto p-4"> {/* Added container and padding */}
      <Helmet>
        <title>Musibau AutoWorks - Manage Products</title>
        <meta name="description" content="Manage products offered by Musibau AutoWorks. Add, edit, or delete products." />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1> {/* Added Tailwind classes */}
      <button aria-label="Add New Product" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">Add Product</button> {/* Added Tailwind classes */}
      <table className="min-w-full table-auto"> {/* Added Tailwind classes */}
        <thead>
          <tr>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Price</th> {/* Added Price header */}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{formatCurrency(product.price)}</td> {/* Applied formatCurrency */}
              <td className="px-4 py-2">
                <button aria-label={`Edit ${product.name}`} className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Edit</button> {/* Added Tailwind classes */}
                <button aria-label={`Delete ${product.name}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button> {/* Added Tailwind classes */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ManageProductsPage;
