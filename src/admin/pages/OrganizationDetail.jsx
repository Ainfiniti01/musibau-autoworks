import { get } from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For linking to customer details
import LoadingSpinner from '../components/LoadingSpinner'; // Assuming LoadingSpinner is available
import { FiEye, FiDownload, FiMessageCircle, FiEdit, FiUser, FiUserPlus } from 'react-icons/fi'; // Icons for actions

const OrganizationDetail = () => {
  const [organization, setOrganization] = useState(null);
  const [organizationBookings, setOrganizationBookings] = useState([]);
  const [organizationServices, setOrganizationServices] = useState([]);
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, you'd get the ID from the URL params: const { id } = useParams();
  // For this example, we'll use a hardcoded ID or assume it's passed as a prop.
  // Let's assume we're fetching data for organization ID 1 for demonstration.
  const organizationId = 1; // Replace with actual ID from URL params

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API calls

      // Mock Organization Data
      const mockOrganization = {
        id: 1,
        name: 'Global Solutions',
        email: 'contact@globalsolutions.com',
        phone: '444-555-6666',
        address: '456 Business Ave, Metro City, USA',
        industry: 'Technology',
        joinedDate: '2022-05-10',
        notes: 'Key client. Interested in enterprise solutions.',
      };
      setOrganization(mockOrganization);

      // Mock Members List for this organization
      const mockMembers = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Primary Contact' },
        { id: 5, name: 'Global Solutions Contact', email: 'info@globalsolutions.com', role: 'Billing Contact' },
      ];
      setOrganizationMembers(mockMembers);

      // Mock Booking Data for this organization
      const mockBookings = [
        { id: 5, customer: 'Global Solutions', service: 'Wheel Alignment', mechanic: 'Sarah', status: 'Completed', date: '2023-10-30', hasReceipt: true },
        { id: 9, customer: 'Future Enterprises', organization: 'Future Enterprises', service: 'Transmission Fluid Change', mechanic: 'Mike', status: 'Completed', date: '2023-11-04', hasReceipt: true },
      ];
      setOrganizationBookings(mockBookings);

      // Mock Service History Data for this organization
      const mockServices = [
        { id: 5, serviceType: 'Wheel Alignment', mechanic: 'Sarah', status: 'Completed', date: '2023-10-30' },
        { id: 9, serviceType: 'Transmission Fluid Change', mechanic: 'Mike', status: 'Completed', date: '2023-11-04' },
      ];
      setOrganizationServices(mockServices);

      setIsLoading(false);
    };
    fetchData();
  }, [organizationId]); // Re-fetch if organizationId changes

  if (isLoading || !organization) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">{organization.name} Details</h1>
        <Link to={`/admin/organizations/edit/${organization.id}`} className="text-blue-600 hover:text-blue-800" title="Edit Organization">
          <FiEdit className="inline-block mr-1" /> Edit
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Organization Info Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Organization Information</h2>
            <button className="text-blue-600 hover:text-blue-800" title="Edit Organization">
              <FiEdit className="inline-block mr-1" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Organization Name</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{organization.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Industry</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{organization.industry}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Email</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{organization.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Phone</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{organization.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Address</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{organization.address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Joined Date</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{organization.joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Members List Section */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Members</h2>
            <button className="text-blue-600 hover:text-blue-800" title="Add Member">
              <FiUserPlus className="inline-block mr-1" /> Add Member
            </button>
          </div>
          {organizationMembers.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No members found for this organization.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-600">
              {organizationMembers.map(member => (
                <li key={member.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center flex-1">
                    <FiUser className="text-gray-500 dark:text-gray-400 mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <Link to={`/admin/customers/${member.id}`} className="text-blue-600 hover:underline">
                          {member.name}
                        </Link>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Booking History Section */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Booking History</h2>
        {organizationBookings.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No bookings found for this organization.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {organizationBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link to={`/admin/customers/${booking.customer.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-600 hover:underline">
                      {booking.customer}
                    </Link>
                  </td>
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
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Service History</h2>
        {organizationServices.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No service history found for this organization.</p>
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
              {organizationServices.map((service) => (
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

      {/* Revenue Summary Section */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Revenue Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$15,000</p> {/* Mock data */}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Revenue from this Org</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">$5,000</p> {/* Mock data */}
          </div>
        </div>
      </div>

      
    </>
  );
};

export default OrganizationDetail;
