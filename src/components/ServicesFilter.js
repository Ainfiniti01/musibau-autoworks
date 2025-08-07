import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ServiceItem = ({ icon, title, description, aosDelay, isVisible }) => {
  return (
    <div
      className={`bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/50 ${
        isVisible ? '' : 'hidden'
      }`}
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <div className="text-yellow-500 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 font-montserrat">{title}</h3>
      <p className="text-gray-300 font-opensans">{description}</p>
    </div>
  );
};

const ServicesFilter = () => {
  const allServices = [
    // Diagnostics & Repairs
    { category: 'Diagnostics', icon: '🔧', title: 'Engine Repair', description: 'Expert diagnosis and repair for all engine issues.' },
    { category: 'Diagnostics', icon: '⚡', title: 'Electrical Diagnostics', description: 'Troubleshooting and repair of vehicle electrical systems.' },
    { category: 'Diagnostics', icon: '⚙️', title: 'General Maintenance', description: 'Routine maintenance to keep your car in top condition.' },
    { category: 'Diagnostics', icon: '🔩', title: 'Mechanic (General Repair)', description: 'All-around mechanical repairs and servicing.' },
    { category: 'Diagnostics', icon: '🔗', title: 'Chassis Change / Repair', description: 'Structural integrity checks and repairs.' },
    { category: 'Diagnostics', icon: '🏠', title: 'Home Service', description: 'On-site service at your location.' },
    { category: 'Diagnostics', icon: '🔌', title: 'Rewiring', description: 'Expert electrical rewiring services.' },
    { category: 'Diagnostics', icon: '✏️', title: 'Custom Request', description: 'Tailored solutions for unique needs.' },
    { category: 'Diagnostics', icon: '❓', title: 'General Enquiry', description: 'General inquiries and consultations.' },
    // { category: 'Diagnostics', icon: '', title: 'Home Service', description: 'On-site service at your location.' },
    // { category: 'Diagnostics', icon: 'fa-plug', title: 'Rewiring', description: 'Expert electrical rewiring services.' },

    // Performance & Safety
    { category: 'Performance', icon: '🚗', title: 'Wheel Alignment', description: 'Ensuring proper tire wear and handling.' },
    { category: 'Performance', icon: '🛑', title: 'Brake Repair', description: 'Reliable brake services for your safety.' },
    { category: 'Performance', icon: '🔋', title: 'Battery Replacement', description: 'New battery installation and testing.' },
    { category: 'Performance', icon: '💨', title: 'AC Repair', description: 'Keeping your car cool and comfortable.' },

    // Body Work
    { category: 'Diagnostics', icon: '🔨', title: 'Panel Beating', description: 'Restoring your vehicle\'s body to its original condition.' },
    { category: 'Body Work', icon: '🖌️', title: 'Painting', description: 'Professional automotive painting services.' },

    // Convenience
    { category: 'Convenience', icon: '🚚', title: 'Towing', description: 'Reliable towing services when you need them most.' },
    { category: 'Convenience', icon: '🛢️', title: 'Oil Change', description: 'Quick and efficient oil changes.' },
    { category: 'Convenience', icon: '💧', title: 'Car Wash (Coming Soon)', description: 'Premium car wash services coming soon!' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Diagnostics', 'Performance', 'Body Work', 'Convenience'];

  const filteredServices = selectedCategory === 'All'
    ? allServices
    : allServices.filter(service => service.category === selectedCategory);

  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-4 text-white font-montserrat"
          data-aos="fade-down"
        >
          What Kind of Services Do We Offer?
        </h2>
        <p
          className="text-lg text-center mb-12 text-gray-300 font-opensans"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Choose from a range of trusted automotive solutions tailored for your car.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" data-aos="fade-up" data-aos-delay="200">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold transition duration-300 ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              } font-montserrat`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <Link
              to={`/contact?service=${encodeURIComponent(service.title)}`}
              key={index}
              className="block no-underline hover:no-underline" // Added no-underline classes
            >
              <ServiceItem
                icon={service.icon}
                title={service.title}
                description={service.description}
                aosDelay={index * 100} // Adjust delay for smoother animation
                isVisible={true} // All filtered services are visible
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesFilter;
