import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerPortalLayout from '../../components/CustomerPortalLayout';
import { toast } from 'react-toastify'; // Import toast
import { EyeIcon, XMarkIcon, ArrowPathRoundedSquareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid';
import RescheduleBookingModal from '../../components/RescheduleBookingModal'; // New modal for reschedule
import CancelBookingModal from '../../components/CancelBookingModal'; // New modal for cancel

function BookingHistoryPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([
    { id: 'B001', dateTime: '2023-10-20T10:00:00Z', serviceType: 'Oil Change', vehicleInfo: 'Toyota Camry', status: 'Completed', mechanic: 'John Doe' },
    { id: 'B002', dateTime: '2023-11-05T14:30:00Z', serviceType: 'Engine Diagnosis', vehicleInfo: 'Honda Civic', status: 'Completed', mechanic: 'Jane Smith' },
    { id: 'B003', dateTime: '2023-11-25T09:00:00Z', serviceType: 'Tire Rotation', vehicleInfo: 'Ford F-150', status: 'Pending', mechanic: 'John Doe' },
    { id: 'B004', dateTime: '2023-12-10T11:00:00Z', serviceType: 'Brake Inspection', vehicleInfo: 'Chevrolet Malibu', status: 'Cancelled', mechanic: null },
  ]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [error, setError] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const isWithinCancellationWindow = (bookingDateTime) => {
    const bookingDate = new Date(bookingDateTime);
    const now = new Date();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    return bookingDate.getTime() - now.getTime() > twentyFourHours;
  };

  const filteredAndSortedBookings = bookings
    .filter(booking => filterStatus === '' || booking.status === filterStatus)
    .sort((a, b) => {
      const dateA = new Date(a.dateTime);
      const dateB = new Date(b.dateTime);
      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

  const handleCancelBooking = (booking) => {
    if (!isWithinCancellationWindow(booking.dateTime)) {
      toast.error('Booking cannot be cancelled within 24 hours of the service time.');
      return;
    }
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleRescheduleBooking = (bookingId, bookingDateTime) => {
    if (!isWithinCancellationWindow(bookingDateTime)) {
      toast.error('Booking cannot be rescheduled within 24 hours of the service time.');
      return;
    }
    setSelectedBooking(bookings.find(b => b.id === bookingId));
    setShowRescheduleModal(true);
  };

  const handleConfirmCancel = (reason) => {
    if (selectedBooking) {
      // Simulate API call for cancellation
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === selectedBooking.id ? { ...booking, status: 'Cancelled' } : booking
        )
      );
      toast.success(`Booking ${selectedBooking.id} has been cancelled.`);
      console.log('Cancel Payload:', { bookingId: selectedBooking.id, reason });
    }
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  const handleConfirmReschedule = (reason) => {
    if (selectedBooking) {
      // Simulate API call for rescheduling
      toast.info(`Reschedule request for booking ${selectedBooking.id} submitted.`);
      console.log('Reschedule Payload:', { bookingId: selectedBooking.id, reason });
    }
    setShowRescheduleModal(false);
    setSelectedBooking(null);
  };

  const handleDownloadInvoice = (booking) => {
    if (booking.status === 'Completed') {
      toast.success(`Downloading invoice for Booking ID: ${booking.id}`);
      // In a real application, this would trigger a PDF generation and download
      console.log(`Simulating invoice download for booking ${booking.id}`);
    } else {
      toast.info('Invoice download is only available for completed bookings.');
    }
  };

  const handleViewBooking = (booking) => {
    navigate(`/customer/booking-history/${booking.id}`, { state: booking });
  };

  return (
    <CustomerPortalLayout>
      <h1 className="text-3xl font-bold mb-6">Upcoming & Recent Bookings</h1>

      <div className="mb-6 flex flex-wrap gap-4 items-center  text-gray-800">
        {error && <p className="text-red-500">{error}</p>}
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          className="p-2 border border-gray-300 rounded-md flex items-center gap-1 bg-white"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Date: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          {sortOrder === 'asc' ? ' ▲' : ' ▼'}
        </button>
      </div>

      <div className="table-wrapper">
        <table className="service-history-table bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Booking ID</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Date & Time</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Service Type</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Vehicle Info</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Mechanic Assigned</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Status</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBookings.map((booking, index) => (
              <tr key={booking.id} className={`hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`} onClick={() => handleViewBooking(booking)}>
                <td className="py-3 px-4 border-b text-gray-800">{booking.id}</td>
                <td className="py-3 px-4 border-b text-gray-800">{new Date(booking.dateTime).toLocaleString()}</td>
                <td className="py-3 px-4 border-b text-gray-800">{booking.serviceType}</td>
                <td className="py-3 px-4 border-b text-gray-800">{booking.vehicleInfo}</td>
                <td className="py-3 px-4 border-b text-gray-800">{booking.mechanic || 'N/A'}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-900' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-900' :
                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-900' : ''
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b flex gap-2 items-center">
                  <button onClick={() => handleViewBooking(booking)} title="View Booking Details">
                    <EyeIcon className="h-5 w-5 text-blue-500 inline-block" />
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(booking)}
                    title={booking.status === 'Completed' ? 'Download Invoice' : 'Download unavailable for non-completed bookings'}
                    disabled={booking.status !== 'Completed'}
                    className={`${booking.status !== 'Completed' ? 'opacity-50 cursor-not-allowed' : 'text-green-500 hover:text-green-700'}`}
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 inline-block" />
                  </button>
                  <button
                    onClick={() => handleCancelBooking(booking)}
                    title={booking.status === 'Pending' && isWithinCancellationWindow(booking.dateTime) ? 'Cancel Booking' : 'Cancel unavailable'}
                    disabled={booking.status !== 'Pending' || !isWithinCancellationWindow(booking.dateTime)}
                    className={`${booking.status !== 'Pending' || !isWithinCancellationWindow(booking.dateTime) ? 'opacity-50 cursor-not-allowed' : 'text-red-500 hover:text-red-700'}`}
                  >
                    <XMarkIcon className="h-5 w-5 inline-block" />
                  </button>
                  <button
                    onClick={() => handleRescheduleBooking(booking.id, booking.dateTime)}
                    title={booking.status === 'Pending' || booking.status === 'Completed' ? 'Reschedule Booking' : 'Reschedule unavailable for cancelled bookings'}
                    disabled={booking.status === 'Cancelled'}
                    className={`${booking.status === 'Cancelled' ? 'opacity-50 cursor-not-allowed' : 'text-purple-500 hover:text-purple-700'}`}
                  >
                    <ArrowPathRoundedSquareIcon className="h-5 w-5 inline-block" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <!-- Placeholder for Pagination --> */}
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Load More Bookings
        </button>
      </div>

      {selectedBooking && (
        <CancelBookingModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
          bookingId={selectedBooking.id}
        />
      )}

      {selectedBooking && (
        <RescheduleBookingModal
          isOpen={showRescheduleModal}
          onClose={() => setShowRescheduleModal(false)}
          onConfirm={handleConfirmReschedule}
          bookingId={selectedBooking.id}
        />
      )}
    </CustomerPortalLayout>
  );
}

export default BookingHistoryPage;
