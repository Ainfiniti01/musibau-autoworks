import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import UserTypeBadge from '../components/UserTypeBadge';
import { FiCheckCircle, FiXCircle, FiInfo, FiPlus } from 'react-icons/fi'; // Import FiPlus icon
import { get } from '../../utils/api';
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Bookings = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for confirmation modal
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [bookingToConfirm, setBookingToConfirm] = useState(null);
  const [actionToConfirm, setActionToConfirm] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = '/api/bookings.php';
        // Removed filterUserType from here as it was not defined in the scope
        // if (filterUserType !== 'all') {
        //   url += `?user_type=${filterUserType}`;
        // }
        // const data = await get('/api/bookings.php'); // Replaced with dummy data
        const data = { data: [
          { id: 1, customer: 'John Doe', service: 'Oil Change', date: '2024-08-21', status: 'Pending', userType: 'Registered' },
          { id: 2, customer: 'Jane Smith', service: 'Tire Rotation', date: '2024-08-22', status: 'Completed', userType: 'Guest' },
          { id: 3, customer: 'Mike Johnson', service: 'Brake Inspection', date: '2024-08-23', status: 'Cancelled', userType: 'Registered' },
        ]};
        setBookings(data.data);
       } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUserType, setFilterUserType] = useState('all'); // New state for user type filter
  const [filterService, setFilterService] = useState('all'); // New state for service type filter
  const [filterDateRange, setFilterDateRange] = useState('all'); // New state for date range filter
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Function to open confirmation modal
  const openConfirmationModal = (booking, action) => {
    setBookingToConfirm(booking);
    setActionToConfirm(action);
    setIsConfirmationModalOpen(true);
  };

  // Function to close confirmation modal
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setBookingToConfirm(null);
    setActionToConfirm('');
  };

  // Handler for confirming an action
  const handleConfirmAction = () => {
    if (!bookingToConfirm) return;

    if (actionToConfirm === 'complete') {
      handleMarkCompleted(bookingToConfirm.id);
    } else if (actionToConfirm === 'cancel') {
      handleCancelBooking(bookingToConfirm.id);
    }
    closeConfirmationModal();
  };

  const handleMarkCompleted = (bookingId) => {
    const updatePromise = new Promise(async (resolve, reject) => {
      try {
        await new Promise(res => setTimeout(res, 500)); // Simulate API call
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'Completed' } : booking
          )
        );
        resolve('Booking marked as completed!');
      } catch (error) {
        reject(error.message);
      }
    });

    toast.promise(updatePromise, {
      loading: 'Marking as completed...',
      success: (message) => message,
      error: 'Failed to mark as completed.',
    });
  };

  const handleCancelBooking = (bookingId) => {
    const updatePromise = new Promise(async (resolve, reject) => {
      try {
        await new Promise(res => setTimeout(res, 500)); // Simulate API call
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
          )
        );
        resolve('Booking cancelled successfully!');
      } catch (error) {
        reject(error.message);
      }
    });

    toast.promise(updatePromise, {
      loading: 'Cancelling booking...',
      success: (message) => message,
      error: 'Failed to cancel booking.',
    });
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedBooking(null);
  };

  // Get unique service types for the filter
  const uniqueServices = [...new Set(bookings.map(booking => booking.service))];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesUserType = filterUserType === 'all' || booking.userType === filterUserType; // Filter for user type
    const matchesService = filterService === 'all' || booking.service === filterService; // Filter for service type

    const bookingDate = new Date(booking.date);
    const today = new Date();
    const matchesDateRange = (() => {
      if (filterDateRange === 'all') return true;
      if (filterDateRange === 'today') {
        return bookingDate.toDateString() === today.toDateString();
      }
      if (filterDateRange === 'this_week') {
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        return bookingDate >= firstDayOfWeek && bookingDate <= lastDayOfWeek;
      }
      if (filterDateRange === 'this_month') {
        return bookingDate.getMonth() === today.getMonth() && bookingDate.getFullYear() === today.getFullYear();
      }
      return true;
    })();

    return matchesSearch && matchesStatus && matchesUserType && matchesService && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 dark:text-white">Manage Bookings</h1>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex flex-wrap items-center gap-4 mb-4 sm:mb-0">
            <div className="flex items-center">
              <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search bookings..."
              />
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <label htmlFor="statusFilter" className="mr-2 text-gray-700">Status:</label>
              <select
                id="statusFilter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {/* User Type Filter */}
              <label htmlFor="userTypeFilter" className="ml-4 mr-2 text-gray-700">User Type:</label>
              <select
                id="userTypeFilter"
                value={filterUserType}
                onChange={(e) => setFilterUserType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All User Types</option>
                <option value="Registered">Registered</option>
                <option value="Guest">Guest</option>
              </select>
              {/* Service Type Filter */}
              <label htmlFor="serviceFilter" className="ml-4 mr-2 text-gray-700">Service:</label>
              <select
                id="serviceFilter"
                value={filterService}
                onChange={(e) => setFilterService(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Services</option>
                {uniqueServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <label htmlFor="dateFilter" className="ml-4 mr-2 text-gray-700">Date:</label>
              <select
                id="dateFilter"
                value={filterDateRange}
                onChange={(e) => setFilterDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="this_month">This Month</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => navigate('/admin/bookings/new')}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 whitespace-nowrap"
          >
            <FiPlus className="mr-2" /> Book a Client
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {error ? (
              <p className="text-center text-red-500 py-8">{error}</p>
            ) : filteredBookings.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No bookings found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.customer}
                        <UserTypeBadge userType={booking.userType} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {/* Modified to use openConfirmationModal */}
                        <button onClick={() => openConfirmationModal(booking, 'complete')} className="bg-green-500 text-white px-2 py-1 rounded mr-2 inline-flex items-center">
                          <FiCheckCircle className="inline-block mr-1" />Complete
                        </button>
                        {/* Modified to use openConfirmationModal */}
                        <button onClick={() => openConfirmationModal(booking, 'cancel')} className="bg-red-500 text-white px-2 py-1 rounded mr-2 inline-flex items-center">
                          <FiXCircle className="inline-block mr-1" />Cancel
                        </button>
                        <button onClick={() => handleViewDetails(booking)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 inline-flex items-center">
                          <FiInfo className="inline-block mr-1" />Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded-md border text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-dark border-primary'
                        : 'border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Booking Details: {selectedBooking?.customer} - {selectedBooking?.service}
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p><strong>Customer:</strong> {selectedBooking?.customer}</p>
                  <p><strong>Service:</strong> {selectedBooking?.service}</p>
                  <p><strong>Date:</strong> {selectedBooking?.date}</p>
                  <p><strong>Status:</strong> {selectedBooking?.status}</p>
                  <p><strong>User Type:</strong> {selectedBooking?.userType}</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeDetailModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && bookingToConfirm && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleConfirmAction}
          title={actionToConfirm === 'complete' ? 'Confirm Completion' : 'Confirm Cancellation'}
          message={actionToConfirm === 'complete'
            ? `Are you sure you want to mark this booking as completed?`
            : `Cancel this booking? This action can’t be undone.`}
          confirmButtonText={actionToConfirm === 'complete' ? 'Mark as Complete' : 'Cancel Booking'}
        />
      )}
    </>
  );
}
export default Bookings;
