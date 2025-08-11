import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import BookingContactForm from '../../components/BookingContactForm';
// import WebsiteInquiryForm from '../../components/WebsiteInquiryForm';
import { clearGuestActivities } from '../../utils/guestActivity';
import BookingCard from '../../components/BookingCard';
// Import Header and Footer components
import Header from '../../components/Header';
import Footer from '../../components/MinimalFooter.js';

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

  const navigate = useNavigate();

  const handleLogout = () => {
    // Simulate logout: clear any user session data
    // In a real app, you would clear tokens, user info from context/state management
    console.log('User logged out.');
    clearGuestActivities(); // Clear any lingering guest activities on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Musibau AutoWorks - Customer Dashboard</title>
        <meta name="description" content="Welcome to your Musibau AutoWorks customer dashboard." />
      </Helmet>

      {/* Header Component */}
      <Header />

      <div className="max-w-7xl mx-auto py-10 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-[#004040]">Welcome, {customerData.name}!</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        <p className="text-lg text-gray-700 mb-8">Your hub for managing all your vehicle needs with Musibau AutoWorks.</p>

        {/* Account Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Account Details</h2>
            <p className="text-gray-600">Email: <span className="font-medium">{customerData.accountDetails.email}</span></p>
            <p className="text-gray-600">Member Since: <span className="font-medium">{customerData.accountDetails.memberSince}</span></p>
          </div>

          {/* Recent Bookings Section */}
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Recent Bookings</h2>
            {customerData.recentBookings.length > 0 ? (
              <ul className="space-y-3">
                {customerData.recentBookings.slice(0, 3).map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No recent bookings found.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-10">
          {/* Booking Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Book a Service</h2>
            <p className="text-gray-600">Easily schedule your next vehicle service.</p>
            <div className="mt-4">
              <BookingContactForm isDashboard={true} />
            </div>
            <button
              onClick={() => navigate('/booking')}
              className="mt-4 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
            >
              Go to Booking Page
            </button>
          </div>

          {/* Service List Section */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-3xl font-bold text-[#004040] mb-4">Your Services & History</h2>
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
              <p className="text-gray-500">No services found. Book your first service today!</p>
            )}
            <button
              onClick={() => navigate('/services')}
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
            >
              View All Services
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Product Catalog Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Explore Our Products</h2>
            <p className="text-gray-600">Browse our catalog of quality auto parts and accessories.</p>
            <div className="mt-4">
            </div>
            <button
              onClick={() => navigate('/products')}
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
            >
              View All Products
            </button>
          </div>

          {/* Contact Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-semibold text-[#004040] mb-4">Need Assistance?</h2>
            <p className="text-gray-600">Contact us directly for any inquiries or support.</p>
          <div className="mt-4">
            {/* WebsiteInquiryForm removed from dashboard */}
          </div>
            <button
              onClick={() => navigate('/contact')}
              className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#ECBE07] hover:bg-[#d4a806] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ECBE07]"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default CustomerDashboardPage;
