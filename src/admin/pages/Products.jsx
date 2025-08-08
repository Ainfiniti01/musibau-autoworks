import React from 'react';

const Products = () => {
  // Mock data for products
  const products = [
    { id: 1, name: 'Engine Oil', price: '$15', image: 'oil.jpg' },
    { id: 2, name: 'Tire', price: '$100', image: 'tire.jpg' },
    { id: 3, name: 'Brake Pads', price: '$50', image: 'brakes.jpg' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-end mb-4">
          <button className="bg-[#ECBE07] hover:bg-[#d1a906] text-gray-800 font-bold py-2 px-4 rounded">
            Add New Product
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 whitespace-nowrap">
                  {/* Placeholder for image - in a real app, you'd use an img tag */}
                  <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center text-xs">{product.image}</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  <button className="bg-[#ECBE07] hover:bg-[#d1a906] text-gray-800 font-bold py-1 px-2 rounded mr-2">Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
