import React, { useState } from 'react';
import { EyeIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/solid'; // Import necessary icons
import Footer from '../../components/MinimalFooter.js';
import PageLayout from '../../components/ui/PageLayout'; // Import PageLayout

function BookingHistoryPage() {
  const [bookings, setBookings] = useState([
    { id: 'B001', dateTime: '2023-10-20T10:00:00Z', serviceType: 'Oil Change', vehicleInfo: 'Toyota Camry', status: 'Completed', mechanic: 'John Doe' },
    { id: 'B002', dateTime: '2023-11-05T14:30:00Z', serviceType: 'Engine Diagnosis', vehicleInfo: 'Honda Civic', status: 'Completed', mechanic: 'Jane Smith' },
    { id: 'B003', dateTime: '2023-11-25T09:00:00Z', serviceType: 'Tire Rotation', vehicleInfo: 'Ford F-150', status: 'Pending', mechanic: 'John Doe' },
    { id: 'B004', dateTime: '2023-12-10T11:00:00Z', serviceType: 'Brake Inspection', vehicleInfo: 'Chevrolet Malibu', status: 'Cancelled', mechanic: null },
  ]);
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

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

  const handleCancelBooking = (bookingId) => {
    alert(`Cancelling booking ID: ${bookingId}`);
    // Logic to cancel booking
  };

  const handleRescheduleBooking = (bookingId) => {
    alert(`Rescheduling booking ID: ${bookingId}`);
    // Logic to reschedule booking
  };

  const handleViewBooking = (bookingId) => {
    alert(`Viewing details for booking ID: ${bookingId}`);
    // Logic to view booking details
  };

  return (
    <PageLayout title="Musibau AutoWorks - Booking History">
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming & Recent Bookings</h1>

      <div className="mb-6 flex flex-wrap gap-4 items-center  text-gray-800">
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
          className="p-2 border border-gray-300 rounded-md flex items-center gap-1"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Date: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          {sortOrder === 'asc' ? ' ▲' : ' ▼'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Booking ID</th>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Date & Time</th>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Service Type</th>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Vehicle Info</th>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Mechanic Assigned</th>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Status</th>
              <th className="py-3 px-4 border-b  text-gray-800 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBookings.map((booking, index) => (
              <tr key={booking.id} className={`hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`} onClick={() => handleViewBooking(booking.id)}>
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
                  <button title="View Booking Details"><EyeIcon className="h-5 w-5 text-blue-500" /></button>
                  <button title="Cancel Booking"><XMarkIcon className="h-5 w-5 text-red-500" /></button>
                  <button title="Reschedule Booking"><CalendarIcon className="h-5 w-5 text-purple-500" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder for Pagination */}
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Load More Bookings
        </button>
      </div>
    </div>
    </PageLayout>
  );
}

export default BookingHistoryPage;
