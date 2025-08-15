import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiEye, FiDownload, FiMessageCircle, FiEdit } from 'react-icons/fi';

const CustomerDetail = () => {
  const [customer, setCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [customerServices, setCustomerServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const customerId = 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockCustomer = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        organization: 'Global Solutions',
        organizationId: 1,
        notes: 'Prefers morning appointments. Needs follow-up on the new tires.',
        joinedDate: '2023-01-15',
      };
      setCustomer(mockCustomer);

      const mockBookings = [
        { id: 1, service: 'Oil Change', mechanic: 'Mike', status: 'Completed', date: '2023-10-20', hasReceipt: true },
        { id: 5, service: 'Wheel Alignment', mechanic: 'Sarah', status: 'Completed', date: '2023-10-30', hasReceipt: true },
        { id: 9, service: 'Transmission Fluid Change', mechanic: 'Mike', status: 'Completed', date: '2023-11-04', hasReceipt: true },
      ];
      setCustomerBookings(mockBookings);

      const mockServices = [
        { id: 1, serviceType: 'Oil Change', mechanic: 'Mike', status: 'Completed', date: '2023-10-20' },
        { id: 5, serviceType: 'Wheel Alignment', mechanic: 'Sarah', status: 'Completed', date: '2023-10-30' },
        { id: 9, serviceType: 'Transmission Fluid Change', mechanic: 'Mike', status: 'Completed', date: '2023-11-04' },
      ];
      setCustomerServices(mockServices);

      setIsLoading(false);
    };
    fetchData();
  }, [customerId]);

  if (isLoading || !customer) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          {customer.name} Details
        </h1>
        <Link to={`/admin/customers/edit/${customer.id}`} className="text-blue-600 hover:text-blue-800" title="Edit Customer">
          <FiEdit className="inline-block mr-1" /> Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Customer Info Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Information</h2>
            <button className="text-blue-600 hover:text-blue-800" title="Edit Customer">
              <FiEdit className="inline-block mr-1" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Full Name</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Email</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Phone</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Address</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Joined Date</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.joinedDate}</p>
            </div>
            {customer.organization && (
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Organization</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  <Link to={`/admin/organizations/${customer.organizationId}`} className="text-blue-600 hover:underline">
                    {customer.organization}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notes</h2>
            <button className="text-blue-600 hover:text-blue-800" title="Edit Notes">
              <FiEdit className="inline-block mr-1" /> Edit
            </button>
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.notes || 'No notes available.'}</p>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Recent Bookings</h2>
        {customerBookings.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No bookings found for this customer.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.mechanic}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => alert('View booking details not implemented')}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FiEye className="inline-block" />
                    </button>
                    {booking.hasReceipt && (
                      <button
                        onClick={() => alert('Download receipt not implemented')}
                        className="text-green-600 hover:text-green-800"
                        title="Download Receipt"
                      >
                        <FiDownload className="inline-block" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Service History Section */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Service History</h2>
        {customerServices.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No service history found for this customer.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerServices.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.mechanic}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      service.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CustomerDetail;
