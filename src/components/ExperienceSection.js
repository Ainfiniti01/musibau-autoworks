import React from 'react';
const General_Maintenance = require('../assets/images/General_Maintenance.jpg');
const ExperienceSection = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Column */}
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-6 text-white font-montserrat">Years of Experience You Can Trust</h2>
            <p className="text-lg text-gray-300 mb-4 font-opensans">
            With over <span className="text-[#ECBE07] font-bold">20 years</span> of dedicated service in the automotive industry, Musibau Autoworks has built a reputation for <span className="text-white font-bold">reliability and excellence</span>. We understand the intricacies of vehicles and are committed to providing <span className="text-[#ECBE07] font-bold">top-notch service</span>.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-opensans">
              Our team continuously trains on the latest automotive technologies to ensure we can handle everything from classic cars to the newest models. Your satisfaction is our priority.
            </p>
            <a href="/services" className="inline-block mb-4">
              <button className="bg-[#ECBE07] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#ECBE07] transition duration-300 font-montserrat">
              View Our Services
            </button>
            </a>
          </div>

          {/* Image Column */}
          <div className="md:w-1/2" data-aos="fade-left">
            <img
              src={General_Maintenance} // Use imported image
              alt="Mechanic working on a car"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
