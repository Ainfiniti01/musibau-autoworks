import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative py-16 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/Autoshop_files/servicebg3_mryd4r.webp')" }}>
      {/* Hexagon background pattern overlay */}
      <div className="absolute inset-0 bg-repeat opacity-20" style={{ backgroundImage: "url('/assets/images/Autoshop_files/vt')" }}></div> {/* Assuming 'vt' is a path to a hexagon pattern */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Column */}
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-6 text-white font-montserrat">About Musibau Autoworks</h2>
            <p className="text-lg text-gray-300 mb-4 font-opensans">
              Established with a passion for automotive excellence, Musibau Autoworks has been serving the community with top-tier car repair and maintenance services. We pride ourselves on our honesty, expertise, and commitment to customer satisfaction.
            </p>
            <p className="text-lg text-gray-300 mb-6 font-opensans">
              Our team of certified technicians utilizes the latest diagnostic tools and quality parts to ensure your vehicle receives the best possible care. Whether it's routine maintenance or complex repairs, we've got you covered.
            </p>
            <a
              href="/about" // Link to the About page
              className="inline-block bg-[#ECBE07] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#ECBE07] transition duration-300 font-montserrat mr-4" // Adjusted styling and added margin
              data-aos="fade-up" // Added AOS animation
            >
              Learn More About Us
            </a>
            <a
              href="/services" // Link to the Services page
              className="inline-block bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 font-montserrat" // Adjusted styling
              data-aos="fade-up" // Added AOS animation
            >
              Discover Our Services
            </a>
          </div>

          {/* Image Column */}
          <div className="md:w-1/2" data-aos="fade-left">
            <img
              src="/assets/images/Autoshop_files/logomain_m1fbeg.jpg" // Example image path
              alt="Musibau Autoworks"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
