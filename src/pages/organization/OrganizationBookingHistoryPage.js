import React, { useState, useMemo } from 'react';
import { EyeIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/solid'; // Import necessary icons

const OrganizationBookingHistoryPage = () => {
  // Placeholder for booking data - in a real application, this would come from an API
  const initialBookingHistory = [
    {
      bookingId: 'BKG001',
      dateTime: '2023-10-26 10:00 AM',
      serviceType: 'Oil ',
      vehicleInfo: 'Toyota Camry - ABC 123',
      bookedBy: 'John Doe (john.doe@example.com)',
      status: 'Completed',
    },
    {
      bookingId: 'BKG002',
      dateTime: '2023-10-27 02:30 PM',
      serviceType: 'Tire Rotation',
      vehicleInfo: 'Honda Civic - XYZ 789',
      bookedBy: 'Jane Smith (jane.smith@example.com)',
      status: 'Pending',
    },
    {
      bookingId: 'BKG003',
      dateTime: '2023-10-28 09:00 AM',
      serviceType: 'Brake Inspection',
      vehicleInfo: 'Ford F-150 - LMN 456',
      bookedBy: 'Peter Jones (peter.jones@example.com)',
      status: 'Cancelled',
    },
    {
      bookingId: 'BKG004',
      dateTime: '2023-10-25 11:00 AM',
      serviceType: 'Oil Change',
      vehicleInfo: 'BMW X5 - GHI 012',
      bookedBy: 'John Doe (john.doe@example.com)',
      status: 'Completed',
    },
    {
      bookingId: 'BKG005',
      dateTime: '2023-10-29 03:00 PM',
      serviceType: 'Engine Check',
      vehicleInfo: 'Audi A4 - JKL 345',
      bookedBy: 'Alice Brown (alice.brown@example.com)',
      status: 'Pending',
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('none'); // 'none', 'asc', 'desc'
  const [teamMemberFilter, setTeamMemberFilter] = useState('');

  // Calculate summary counts
  const totalBookings = initialBookingHistory.length;
  const pendingBookings = initialBookingHistory.filter(booking => booking.status === 'Pending').length;
  const completedBookings = initialBookingHistory.filter(booking => booking.status === 'Completed').length;
  const canceledBookings = initialBookingHistory.filter(booking => booking.status === 'Cancelled').length;

  // Extract unique team members for the filter
  const teamMembers = useMemo(() => {
    const members = new Set(initialBookingHistory.map(booking => booking.bookedBy.split(' (')[0]));
    return Array.from(members);
  }, [initialBookingHistory]);

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleTeamMemberChange = (event) => {
    setTeamMemberFilter(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(prevOrder => {
      if (prevOrder === 'none') return 'asc';
      if (prevOrder === 'asc') return 'desc';
      return 'none'; // Reset to none after desc
    });
  };

  const filteredAndSortedBookings = useMemo(() => {
    let processedBookings = [...initialBookingHistory];

    // Apply status filter
    if (selectedStatus !== 'All') {
      processedBookings = processedBookings.filter(booking => booking.status === selectedStatus);
    }

    // Apply team member filter
    if (teamMemberFilter) {
      processedBookings = processedBookings.filter(booking =>
        booking.bookedBy.toLowerCase().includes(teamMemberFilter.toLowerCase())
      );
    }

    // Apply date sort
    if (sortOrder !== 'none') {
      processedBookings.sort((a, b) => {
        // Basic date parsing - assumes consistent format. For robust parsing, use a library like date-fns or moment.js
        const dateA = new Date(a.dateTime.replace(' AM', '').replace(' PM', '')); // Simplified parsing
        const dateB = new Date(b.dateTime.replace(' AM', '').replace(' PM', '')); // Simplified parsing

        if (sortOrder === 'asc') {
          return dateA - dateB;
        } else { // desc
          return dateB - dateA;
        }
      });
    }

    return processedBookings;
  }, [selectedStatus, teamMemberFilter, sortOrder, initialBookingHistory]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Organization Booking History</h1>

      {/* Summary Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">Total Bookings</p>
          <p className="text-2xl font-bold">{totalBookings}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">Pending Bookings</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">Completed Bookings</p>
          <p className="text-2xl font-bold text-green-600">{completedBookings}</p>
        </div>
        {/* Canceled Bookings */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">Canceled Bookings</p>
          <p className="text-2xl font-bold text-red-600">{canceledBookings}</p>
        </div>
      </div>

      {/* Filters and Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-100 rounded-lg shadow-sm">
        {/* Status Filter */}
        <div>
          <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status:</label>
          <select
            id="statusFilter"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="p-2 border border-gray-300 rounded-md w-40  text-gray-800"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Team Member Filter */}
        <div>
          <label htmlFor="teamMemberFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Team Member:</label>
          <select
            id="teamMemberFilter"
            value={teamMemberFilter}
            onChange={handleTeamMemberChange}
            className="p-2 border border-gray-300 rounded-md w-56  text-gray-800"
          >
            <option value="">All Team Members</option>
            {teamMembers.map((member, index) => (
              <option key={index} value={member}>{member}</option>
            ))}
          </select>
        </div>

        {/* Date Sort */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort by Date:</label>
          <button
            onClick={handleSortOrderChange}
            className="p-2 border  text-gray-800 border-gray-300 rounded-md w-40 bg-white hover:bg-gray-50 flex items-center justify-center"
          >
            {sortOrder === 'none' && 'Sort by Date'}
            {sortOrder === 'asc' && 'Date: Oldest First ↑'}
            {sortOrder === 'desc' && 'Date: Newest First ↓'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Booking ID</th>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Date & Time</th>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Service Type</th>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Vehicle Info</th>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Booked By</th>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Status</th>
              <th className="py-2 px-4 border-b  text-gray-800 block md:table-cell md:w-auto">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBookings.length > 0 ? (
              filteredAndSortedBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100 flex flex-col md:flex-row md:table-row mb-4 md:mb-0">
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Booking ID">{booking.bookingId}</td>
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Date & Time">{booking.dateTime}</td>
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Service Type">{booking.serviceType}</td>
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Vehicle Info">{booking.vehicleInfo}</td>
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Booked By">{booking.bookedBy}</td>
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Status">{booking.status}</td>
                  <td className="py-2 px-4 border-b block md:table-cell" data-label="Actions">
                  <td className="py-3 px-4 border-b flex gap-2 items-center">
                    <button title="View Booking Details"><EyeIcon className="h-5 w-5 text-blue-500" /></button>
                    <button title="Cancel Booking"><XMarkIcon className="h-5 w-5 text-red-500" /></button>
                    <button title="Reschedule Booking"><CalendarIcon className="h-5 w-5 text-purple-500" /></button>
                </td>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-4 text-center">No booking history found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationBookingHistoryPage;
