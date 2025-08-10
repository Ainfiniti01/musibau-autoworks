import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBookings([
        { id: 1, customer: 'John Doe', service: 'Oil Change', date: '2023-10-26', status: 'Pending', userType: 'Registered', converted: true },
        { id: 2, customer: 'Jane Smith', service: 'Tire Rotation', date: '2023-10-27', status: 'Completed', userType: 'Guest', converted: false },
        { id: 3, customer: 'Acme Corp', service: 'Brake Inspection', date: '2023-10-28', status: 'Cancelled', userType: 'Registered', converted: true },
        { id: 4, customer: 'Bob Johnson', service: 'Engine Tune-up', date: '2023-10-29', status: 'Pending', userType: 'Guest', converted: false },
        { id: 5, customer: 'Global Solutions', service: 'Wheel Alignment', date: '2023-10-30', status: 'Completed', userType: 'Registered', converted: true },
        { id: 6, customer: 'Alice Brown', service: 'Exhaust Repair', date: '2023-11-01', status: 'Pending', userType: 'Guest', converted: false },
        { id: 7, customer: 'Tech Innovations', service: 'Battery Check', date: '2023-11-02', status: 'Completed', userType: 'Registered', converted: true },
        { id: 8, customer: 'Charlie Davis', service: 'AC Service', date: '2023-11-03', status: 'Cancelled', userType: 'Guest', converted: false },
        { id: 9, customer: 'Future Enterprises', service: 'Transmission Fluid Change', date: '2023-11-04', status: 'Completed', userType: 'Registered', converted: true },
        { id: 10, customer: 'Diana Miller', service: 'Brake Pad Replacement', date: '2023-11-05', status: 'Pending', userType: 'Guest', converted: false },
        { id: 11, customer: 'Eve White', service: 'Suspension Check', date: '2023-11-06', status: 'Completed', userType: 'Registered', converted: true },
        { id: 12, customer: 'Frank Green', service: 'Headlight Restoration', date: '2023-11-07', status: 'Pending', userType: 'Guest', converted: false },
      ]);
      setIsLoading(false);
    };
    fetchBookings();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleMarkCompleted = (bookingId) => {
    const updatePromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500));
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'Completed' } : booking
        )
      );
      resolve('Booking marked as completed!');
    });

    toast.promise(updatePromise, {
      loading: 'Marking as completed...',
      success: (message) => message,
      error: 'Failed to mark as completed.',
    });
  };

  const handleCancelBooking = (bookingId) => {
    const updatePromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500));
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'Cancelled' } : booking
        )
      );
      resolve('Booking cancelled successfully!');
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

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;

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

    return matchesSearch && matchesStatus && matchesDateRange;
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
        <div className="flex justify-between items-center mb-4">
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
          <div className="flex items-center gap-2">
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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredBookings.length === 0 ? (
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
                        {booking.userType === 'Registered' && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                            Registered User
                          </span>
                        )}
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
                        <button onClick={() => handleMarkCompleted(booking.id)} className="bg-primary text-dark hover:bg-yellow-400 transition mr-2">
                          <FiCheckCircle className="inline-block mr-1" />Complete
                        </button>
                        <button onClick={() => handleCancelBooking(booking.id)} className="bg-primary text-dark hover:bg-yellow-400 transition mr-2">
                          <FiXCircle className="inline-block mr-1" />Cancel
                        </button>
                        <button onClick={() => handleViewDetails(booking)} className="bg-primary text-dark hover:bg-yellow-400 transition">
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
    </>
  );
}
export default Bookings;
