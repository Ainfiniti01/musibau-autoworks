import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast

const Bookings = () => {
  // Mock data for bookings, now using useState
  const [bookings, setBookings] = useState([
    { id: 1, customer: 'John Doe', service: 'Oil Change', date: '2023-10-26', status: 'Pending' },
    { id: 2, customer: 'Jane Smith', service: 'Tire Rotation', date: '2023-10-27', status: 'Approved' },
    { id: 3, customer: 'Acme Corp', service: 'Brake Inspection', date: '2023-10-28', status: 'Cancelled' },
    { id: 4, customer: 'Bob Johnson', service: 'Engine Tune-up', date: '2023-10-29', status: 'Pending' },
    { id: 5, customer: 'Global Solutions', service: 'Wheel Alignment', date: '2023-10-30', status: 'Approved' },
    { id: 6, customer: 'Alice Brown', service: 'Exhaust Repair', date: '2023-11-01', status: 'Pending' },
    { id: 7, customer: 'Tech Innovations', service: 'Battery Check', date: '2023-11-02', status: 'Approved' },
    { id: 8, customer: 'Charlie Davis', service: 'AC Service', date: '2023-11-03', status: 'Cancelled' },
    { id: 9, customer: 'Future Enterprises', service: 'Transmission Fluid Change', date: '2023-11-04', status: 'Approved' },
    { id: 10, customer: 'Diana Miller', service: 'Brake Pad Replacement', date: '2023-11-05', status: 'Pending' },
    { id: 11, customer: 'Eve White', service: 'Suspension Check', date: '2023-11-06', status: 'Approved' },
    { id: 12, customer: 'Frank Green', service: 'Headlight Restoration', date: '2023-11-07', status: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Number of items per page

  // Mock states for modals
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleUpdateStatus = (booking) => {
    setSelectedBooking(booking);
    setIsStatusModalOpen(true);
    toast.info(`Updating status for booking: ${booking.customer} - ${booking.service}`);
  };

  const handleReschedule = (booking) => {
    setSelectedBooking(booking);
    setIsRescheduleModalOpen(true);
    toast.info(`Rescheduling booking: ${booking.customer} - ${booking.service}`);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedBooking(null);
  };

  const closeRescheduleModal = () => {
    setIsRescheduleModalOpen(false);
    setSelectedBooking(null);
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking =>
    booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // TODO: Replace with real bookings fetched from backend
  // TODO: Implement actual status update and reschedule logic

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
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
        </div>

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
            {currentBookings.map((booking) => ( // Use currentBookings for pagination
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* Status badge */}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleUpdateStatus(booking)} className="text-indigo-600 hover:text-indigo-900 mr-2">Update Status</button>
                  <button onClick={() => handleReschedule(booking)} className="text-blue-600 hover:text-blue-900">Reschedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 rounded-md border text-sm font-medium ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Mock Modal for Update Status */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Update Status for Booking: {selectedBooking?.customer} - {selectedBooking?.service}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This is a mock modal for updating booking status.
                    <br />
                    Current Status: {selectedBooking?.status}
                  </p>
                  {/* Add status selection dropdown here */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeStatusModal}
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

      {/* Mock Modal for Reschedule */}
      {isRescheduleModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Reschedule Booking for: {selectedBooking?.customer} - {selectedBooking?.service}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This is a mock modal for rescheduling a booking.
                    <br />
                    Current Date: {selectedBooking?.date}
                  </p>
                  {/* Add date picker/input for rescheduling here */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeRescheduleModal}
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
    </div>
  );
};

export default Bookings;
