import React from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import { Link } from 'react-router-dom';
import SectionWrapper from '../../components/SectionWrapper';

// TODO: Fetch services data from an API

const services = [
  { id: 'painting', name: 'Painting' },
  { id: 'mechanic', name: 'Mechanic' },
  { id: 'panel-beating', name: 'Panel Beating' },
  { id: 'rewiring', name: 'Rewiring' },
  { id: 'emergency-pickup', name: 'Emergency Pickup' },
  { id: 'home-service', name: 'Home Service' },
  { id: 'car-wash', name: 'Car Wash (Coming Soon)' },
  { id: 'general-enquiry', name: 'General Enquiry' },
];

const ServicesPage = () => {
  return (
    <SectionWrapper>
      <Helmet>
        <title>Musibau AutoWorks - Our Services</title>
        <meta name="description" content="Explore the range of automotive services offered by Musibau AutoWorks." />
      </Helmet>
      <h1>Our Services</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <Link to={`/services/${service.id}`}>{service.name}</Link>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default ServicesPage;
