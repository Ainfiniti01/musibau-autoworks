import React from 'react';

const Services = () => {
  // Mock data for services
  const services = [
    { id: 1, title: 'Oil Change', description: 'Standard oil and filter change', category: 'Maintenance' },
    { id: 2, title: 'Tire Rotation', description: 'Rotate and balance tires', category: 'Maintenance' },
    { id: 3, title: 'Brake Inspection', description: 'Inspect brake pads and rotors', category: 'Inspection' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-end mb-4">
          <button className="bg-[#ECBE07] hover:bg-[#d1a906] text-gray-800 font-bold py-2 px-4 rounded">
            Add New Service
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{service.description}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{service.category}</td>
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

export default Services;
