import React from 'react';
import { Link } from 'react-router-dom';

const ServiceButtons = () => {
  const services = [
    { name: 'General Enquiry', icon: 'fa-question-circle', query: 'General Enquiry' },
    { name: 'Home Service', icon: 'fa-house', query: 'Home Service' },
    { name: 'Rewiring', icon: 'fa-plug', query: 'Rewiring' },
    { name: 'Panel Beating', icon: 'fa-hammer', query: 'Panel Beating' },
    { name: 'Custom Request', icon: 'fa-pen-to-square', query: 'Custom Request' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {services.map((service) => (
        <Link
          key={service.name}
          to={`/contact?service=${encodeURIComponent(service.query)}`}
          className="flex flex-col items-center p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
        >
          <i className={`fas ${service.icon} text-4xl mb-4 text-blue-600`}></i>
          <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default ServiceButtons;
