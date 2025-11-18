import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerPortalLayout from '../../components/CustomerPortalLayout';
import RateServiceModal from '../../components/RateServiceModal';

const CustomerBookingDetailPage = () => {
  const { bookingId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToRateId, setServiceToRateId] = useState(null);

  // Mock data for demonstration purposes
  const bookingDetails = {
    id: bookingId,
    serviceName: 'Oil Change',
    dateTime: '2025-08-25 10:00 AM',
    status: 'Completed',
    vehicleInfo: 'Toyota Camry, 2020, ABC-123',
    mechanicAssigned: 'John Doe',
    cost: '$75.00',
    paymentStatus: 'Paid',
    notes: 'Customer requested synthetic oil. Tires rotated as well.',
    serviceId: 'service-123', // Assuming a serviceId is available for rating
  };

  const handleRateServiceClick = () => {
    setServiceToRateId(bookingDetails.serviceId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setServiceToRateId(null);
  };

  const handleSubmitRating = (serviceId, rating, comments) => {
    console.log(`Submitting rating for service ${serviceId}: ${rating} stars, comments: "${comments}"`);
    // Here you would typically send this data to your backend API
    handleCloseModal();
  };

  return (
    <CustomerPortalLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Booking Details - #{bookingDetails.id}</h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><strong>Booking ID:</strong> {bookingDetails.id}</p>
              <p className="text-gray-600"><strong>Service Name:</strong> {bookingDetails.serviceName}</p>
              <p className="text-gray-600"><strong>Date/Time:</strong> {bookingDetails.dateTime}</p>
              <p className="text-gray-600"><strong>Status:</strong> {bookingDetails.status}</p>
              <p className="text-gray-600"><strong>Vehicle Info:</strong> {bookingDetails.vehicleInfo}</p>
            </div>
            <div>
              <p className="text-gray-600"><strong>Mechanic Assigned:</strong> {bookingDetails.mechanicAssigned}</p>
              <p className="text-gray-600"><strong>Cost:</strong> {bookingDetails.cost}</p>
              <p className="text-gray-600"><strong>Payment Status:</strong> {bookingDetails.paymentStatus}</p>
              <p className="text-gray-600"><strong>Notes / Comments:</strong> {bookingDetails.notes}</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Invoice
          </button>
          <button
            onClick={handleRateServiceClick}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Rate this service
          </button>
        </div>
      </div>

      <RateServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRating}
        serviceId={serviceToRateId}
      />
    </CustomerPortalLayout>
  );
};

export default CustomerBookingDetailPage;
