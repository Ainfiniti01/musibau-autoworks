import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../components/LoadingSpinner'; // Assuming you have a LoadingSpinner component

const BookingDetailPage = () => {
  const { id } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Simulate API call to fetch booking details
        // In a real application, you would make an actual API request here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

        const dummyBookings = [
          { id: '1', service: 'Engine Repair', date: '2025-09-15', status: 'Confirmed', customerName: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', message: 'Engine knocking sound.' },
          { id: '2', service: 'Oil Change', date: '2025-09-20', status: 'Pending', customerName: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', message: 'Standard oil change.' },
          { id: '3', service: 'Tire Rotation', date: '2025-09-25', status: 'Completed', customerName: 'Peter Jones', email: 'peter.jones@example.com', phone: '555-123-4567', message: 'Tire rotation and balance.' },
        ];

        const foundBooking = dummyBookings.find(b => b.id === id);

        if (foundBooking) {
          setBooking(foundBooking);
        } else {
          setError('Booking not found.');
        }
      } catch (err) {
        setError('Failed to fetch booking details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (!booking) {
    return <div className="text-center text-gray-500 py-10">No booking details available.</div>;
  }

  return (
    <>
      <Helmet>
        <title>Booking Details - {booking.service}</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Booking Details</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-700"><span className="font-semibold">Service:</span> {booking.service}</p>
          <p className="text-gray-700"><span className="font-semibold">Date:</span> {booking.date}</p>
          <p className="text-gray-700"><span className="font-semibold">Status:</span> {booking.status}</p>
          <p className="text-gray-700"><span className="font-semibold">Customer Name:</span> {booking.customerName}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {booking.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Phone:</span> {booking.phone}</p>
          <p className="text-gray-700 md:col-span-2"><span className="font-semibold">Message:</span> {booking.message}</p>
        </div>
        {/* Add more details or actions here */}
      </div>
    </>
  );
};

export default BookingDetailPage;
