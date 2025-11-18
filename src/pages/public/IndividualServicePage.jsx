import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import { useParams } from 'react-router-dom';

// TODO: Add styling for the individual service page
// TODO: Fetch service details from an API based on the serviceId

const IndividualServicePage = () => {
  const { serviceId } = useParams();

  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - {serviceId.charAt(0).toUpperCase() + serviceId.slice(1)} Service</title>
        <meta name="description" content={`Details about the ${serviceId} service offered by Musibau AutoWorks.`} />
      </Helmet>
      <h1>Service Details: {serviceId}</h1>
      <p>This is where the details for the {serviceId} service will be displayed.</p>
    </div>
  );
};

export default IndividualServicePage;
