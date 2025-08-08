import React from 'react';

const Bookings = () => {
  // Mock data for bookings
  const bookings = [
    { id: 1, customer: 'John Doe', service: 'Oil Change', date: '2023-10-26', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', service: 'Tire Rotation', date: '2023-10-27', status: 'Approved' },
    { id: 3, customer: 'Acme Corp', service: 'Brake Inspection', date: '2023-10-28', status: 'Cancelled' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customer}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                <td className="px-4 py-2 whitespace-nowrap text-sm">
                  {/* Status badge */}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                  <button className="bg-[#ECBE07] hover:bg-[#d1a906] text-gray-800 font-bold py-1 px-2 rounded mr-2">Update Status</button>
                  <button className="bg-[#ECBE07] hover:bg-[#d1a906] text-gray-800 font-bold py-1 px-2 rounded">Reschedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
