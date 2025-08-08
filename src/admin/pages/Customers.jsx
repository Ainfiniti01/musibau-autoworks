import React from 'react';

const Customers = () => {
  // Mock data for customers
  const customers = [
    { id: 1, name: 'John Doe', type: 'Individual', history: '3 services' },
    { id: 2, name: 'Jane Smith', type: 'Corporate', history: '5 services' },
    { id: 3, name: 'Acme Corp', type: 'Corporate', history: '10 services' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service History</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{customer.type}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{customer.history}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  <button className="bg-[#ECBE07] hover:bg-[#d1a906] text-gray-800 font-bold py-1 px-2 rounded mr-2">View/Edit</button>
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

export default Customers;
