import React from 'react';

const ServiceCard = ({ icon, label, aosDelay }) => {
  return (
    <div
      className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <div className="text-yellow-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 font-montserrat">{label}</h3>
      <p className="text-gray-300 font-opensans">A brief description of the service goes here.</p>
    </div>
  );
};

const ServicesOverview = () => {
  const services = [
    { icon: '🔧', label: 'Engine Repair' },
    { icon: '⚡', label: 'Electrical Diagnostics' },
    { icon: '⚙️', label: 'General Maintenance' },
  ];

  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-12 text-white font-montserrat"
          data-aos="fade-down"
        >
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              label={service.label}
              aosDelay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
