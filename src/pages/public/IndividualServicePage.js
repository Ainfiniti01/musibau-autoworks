import React from 'react';
import { useParams } from 'react-router-dom';

// TODO: Add styling for the individual service page
// TODO: Fetch service details from an API based on the serviceId

const IndividualServicePage = () => {
  const { serviceId } = useParams();

  return (
    <div>
      <h1>Service Details: {serviceId}</h1>
      <p>This is where the details for the {serviceId} service will be displayed.</p>
    </div>
  );
};

export default IndividualServicePage;
