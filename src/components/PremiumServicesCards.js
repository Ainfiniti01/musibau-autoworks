import React from 'react';
import { Link } from 'react-router-dom';

const PremiumServiceCard = ({ image, title, description, aosDelay }) => {
  return (
    <div
      className="bg-yellow-500 text-black p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      data-aos="zoom-in"
      data-aos-delay={aosDelay}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg mb-4" loading="lazy" />
      <h3 className="text-2xl font-bold mb-2 font-montserrat">{title}</h3>
      <p className="text-black mb-4 font-opensans">{description}</p>
      <button className="bg-black text-yellow-500 py-2 px-5 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
        Learn More
      </button>
    </div>
  );
};

const PremiumServicesCards = () => {
  const premiumServices = [
    {
      image: '/assets/images/engine.jpg',
      title: 'Engine Overhaul',
      description: 'Comprehensive engine services to keep your vehicle running smoothly.',
    },
    {
      image: '/assets/images/Chassis_Repair.jpg',
      title: 'Chassis Repair',
      description: 'Expert repair and maintenance for your vehicle\'s chassis.',
    },
    {
      image: '/assets/images/elect.jpg',
      title: 'Electrical Diagnostics',
      description: 'Advanced diagnostics for all your vehicle\'s electrical systems.',
    },
    {
      image: '/assets/images/elect.jpg',
      title: 'General Maintenace',
      description: 'Advanced diagnostics for all your vehicle\'s electrical systems.',
    },
  ];

  return (
    <section className="bg-yellow-500 py-16">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-12 text-black font-montserrat"
          data-aos="fade-down"
        >
          Premium Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {premiumServices.map((service, index) => (
            <PremiumServiceCard
              key={index}
              image={service.image}
              title={service.title}
              description={service.description}
              aosDelay={index * 200}
              link={`/contact?service=${encodeURIComponent(service.title)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumServicesCards;
