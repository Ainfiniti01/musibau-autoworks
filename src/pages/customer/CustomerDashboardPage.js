import React from 'react';
import { Helmet } from 'react-helmet';

const CustomerDashboardPage = () => {
  // Placeholder for customer data - in a real app, this would come from an API
  const customerData = {
    name: 'John Doe',
    recentBookings: [
      { id: 1, service: 'Oil Change', date: '2023-10-26' },
      { id: 2, service: 'Tire Rotation', date: '2023-11-15' },
    ],
    services: [
      { id: 101, name: 'Engine Diagnostics', status: 'Completed' },
      { id: 102, name: 'Brake Inspection', status: 'Pending' },
    ],
    accountDetails: {
      email: 'john.doe@example.com',
      memberSince: '2022-01-10',
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Musibau AutoWorks - Customer Dashboard</title>
        <meta name="description" content="Welcome to your Musibau AutoWorks customer dashboard." />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#004040] mb-6">Welcome, {customerData.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Account Details Card */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Account Details</h2>
            <p className="text-gray-600">Email: <span className="font-medium">{customerData.accountDetails.email}</span></p>
            <p className="text-gray-600">Member Since: <span className="font-medium">{customerData.accountDetails.memberSince}</span></p>
          </div>

          {/* Recent Bookings Card */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Recent Bookings</h2>
            {customerData.recentBookings.length > 0 ? (
              <ul className="space-y-3">
                {customerData.recentBookings.map((booking) => (
                  <li key={booking.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div>
                      <p className="text-gray-700 font-medium">{booking.service}</p>
                      <p className="text-sm text-gray-500">{booking.date}</p>
                    </div>
                    <button className="text-[#ECBE07] hover:text-[#d4a806] font-medium text-sm">View Details</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent bookings found.</p>
            )}
          </div>
        </div>

        {/* Services Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold text-[#004040] mb-4">Your Services</h2>
          {customerData.services.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customerData.services.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-[#ECBE07] hover:text-[#d4a806]">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No services found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
