import React from 'react';
import backgroundImage from '../assets/images/background.png'; // Corrected import path

const HeroSection = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Use the imported image variable
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 p-5">
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 font-montserrat"
            data-aos="fade-down" // Changed to fade-down
          >
            Welcome to Musibau Autoworks
          </h1>
          <p
            className="text-lg md:text-xl text-white mb-8 font-opensans"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Your trusted partner for premium automotive solutions.
          </p>
            <div className="flex justify-center gap-4" data-aos="fade-up" data-aos-delay="400"> {/* Button animation is already fade-up */}
              <button className="bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                Get a Quote
              </button>
              <button className="bg-transparent text-white py-3 px-6 rounded-lg border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50">
                Learn More
              </button>
            </div>
      </div>
    </section>
  );
};

export default HeroSection;
