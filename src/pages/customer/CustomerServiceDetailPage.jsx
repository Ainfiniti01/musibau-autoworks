import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CustomerPortalLayout from '../../components/CustomerPortalLayout';
import RateServiceModal from '../../components/RateServiceModal';

const CustomerServiceDetailPage = () => {
  const { serviceId } = useParams();
  const location = useLocation();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (location.state) {
      // Use data from React Router state
      setServiceDetails({
        id: location.state.id,
        serviceName: location.state.serviceName,
        mechanic: location.state.mechanicName,
        serviceDate: location.state.date,
        duration: 'N/A', // Placeholder, as duration is not in ServiceHistoryPage data
        totalCost: location.state.cost ? parseFloat(location.state.cost.replace('$', '')) : 0,
        status: location.state.status,
        ratingGiven: location.state.rating ? location.state.rating.length : 0, // Simple conversion for dummy rating
        serviceReport: 'No detailed report available (dummy data).',
      });
    } else {
      // Fallback to dummy data if no state is passed (e.g., direct access or refresh)
      setServiceDetails({
        id: serviceId,
        serviceName: 'Brake Inspection',
        mechanic: 'Jane Smith',
        serviceDate: '2025-08-15',
        duration: '2 hours',
        totalCost: 120.00,
        status: 'Completed',
        ratingGiven: 4, // 0 if not rated
        serviceReport: 'Front brakes inspected, pads at 50%, rotors good. Rear brakes cleaned and adjusted.',
      });
    }
  }, [serviceId, location.state]);

  if (!serviceDetails) {
    return <CustomerPortalLayout><div>Loading service details...</div></CustomerPortalLayout>;
  }

  const handleRateServiceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitRating = (id, rating, comments) => {
    console.log(`Service ${id} rated: ${rating} stars with comments: ${comments}`);
    // In a real application, you would send this data to your backend
    // and then update the serviceDetails state or refetch the data.
    handleCloseModal();
  };

  return (
    <CustomerPortalLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Service Details - #{serviceDetails.id}</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Service Name:</strong> {serviceDetails.serviceName}</p>
            <p><strong>Mechanic:</strong> {serviceDetails.mechanic}</p>
            <p><strong>Service Date:</strong> {serviceDetails.serviceDate}</p>
            <p><strong>Duration:</strong> {serviceDetails.duration}</p>
          </div>
          <div>
            <p><strong>Total Cost:</strong> ${serviceDetails.totalCost.toFixed(2)}</p>
            <p><strong>Status:</strong> {serviceDetails.status}</p>
            <p><strong>Rating Given:</strong> {serviceDetails.ratingGiven > 0 ? `${serviceDetails.ratingGiven} Stars` : 'Not yet rated'}</p>
            <p><strong>Service Report / Notes:</strong> {serviceDetails.serviceReport}</p>
            
          </div>
        </div>
        <div className="mt-4 space-x-2">
          {serviceDetails.status === 'Completed' && serviceDetails.ratingGiven === 0 && (
            <button
              onClick={handleRateServiceClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Rate Service
            </button>
          )}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Re-book Service
            </button>
          </div>
        </div>
        <RateServiceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitRating}
          serviceId={serviceDetails.id}
        />
    </CustomerPortalLayout>
  );
};

export default CustomerServiceDetailPage;
