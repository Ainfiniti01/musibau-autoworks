import React from 'react';
import CustomerPortalLayout from '../../components/CustomerPortalLayout.jsx';
import { useNavigate } from 'react-router-dom';
import BookingContactForm from '../../components/BookingContactForm';
import { clearGuestActivities } from '../../utils/guestActivity';
import BookingCard from '../../components/BookingCard';
import SectionWrapper from '../../components/ui/SectionWrapper';
import ActionButton from '../../components/ui/ActionButton';

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

  const handleViewDetails = (service) => {
    navigate(`/customer/service-history/${service.id}`, { state: service });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout: clear any user session data
    console.log('User logged out.');
    clearGuestActivities(); // Clear any lingering guest activities on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <CustomerPortalLayout>
      <h1 className="text-3xl font-bold mb-6 text-primary">Personal Dashboard</h1>
      <p className="text-lg text-yellow-400 mb-8"><strong>Your hub for managing all your vehicle needs with Musibau AutoWorks.</strong></p>

      {/* Account Details Section */}
      <SectionWrapper title="Account Details">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2">
          <div className="md:col-span-1">
            <p className="text-gray-600">Email: <span className="font-medium">{customerData.accountDetails.email}</span></p>
            <p className="text-gray-600">Member Since: <span className="font-medium">{customerData.accountDetails.memberSince}</span></p>
          </div>
        </div>
      </SectionWrapper>

      {/* Recent Bookings Section */}
      <SectionWrapper title="Recent Bookings" className="mt-8">
        {customerData.recentBookings.length > 0 ? (
          <ul className="space-y-3">
            {customerData.recentBookings.slice(0, 3).map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </ul>
        ) : (
          <p className="text-black">No recent bookings found.</p>
        )}
      </SectionWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
        {/* Booking Form Section */}
        {/* <SectionWrapper title="Book a Service">
          <p className="text-black">Easily schedule your next vehicle service.</p>
          <div className="mt-4">
            <BookingContactForm isDashboard={true} />
          </div>
          <ActionButton
            label="Go to Booking Page"
            onClick={() => navigate('/booking')}
            className="mt-4 w-full"
          />
        </SectionWrapper> */}

        {/* Service List Section */}
        <SectionWrapper title="Your Services & History" className="lg:col-span-2">
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
                        <button onClick={() => handleViewDetails(service)} title="View Details" className="text-[#ECBE07] hover:text-[#d4a806]">View</button>
                                            {/* <button onClick={() => handleViewDetails(service)} title="View Details">
                                              <EyeIcon className="h-5 w-5 text-blue-500 inline-block" />
                                            </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No services found. Book your first service today!</p>
        )}
            <ActionButton
              label="View All Services"
              onClick={() => navigate('/customer/service-history')}
            />
          </SectionWrapper>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Product Catalog Section */}
          <SectionWrapper title="Explore Our Products">
            <p className="text-gray-600">Browse our catalog of quality auto parts and accessories.</p>
            <ActionButton
              label="View All Products"
              onClick={() => navigate('/products')}
              className="mt-4"
            />
          </SectionWrapper>

          {/* Contact Section */}
          <SectionWrapper title="Need Assistance?">
            <p className="text-gray-600">Contact us directly for any inquiries or support.</p>
            <ActionButton
              label="Contact Support"
              onClick={() => navigate('/contact')}
              className="mt-4"
            />
          </SectionWrapper>
        </div>
    </CustomerPortalLayout>
  );
};

export default CustomerDashboardPage;
