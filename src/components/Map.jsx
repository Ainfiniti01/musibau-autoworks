import React from 'react';

const Map = () => {
  return (
    <section className="py- bg-gray-800">
      <div className="container mx-auto px-4 py-10">
        {/* <h2
          className="text-4xl font-bold text-center mb-12 text-white font-montserrat"
          data-aos="fade-down"
        >
          Location
        </h2> */}
        <div className="flex flex-col md:flex-row gap-12">
          {/* Google Maps Iframe */}
          <div className="md:w-full" data-aos="fade-right">
        <div className="contact-map-container py-10" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8777777777777!2d3.456789!3d6.54321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0000000000%3A0x0000000000000000!5e0!3m2!1sen!2sng!4v1678886400000!5m2!1sen!2sng" // Placeholder URL - Replace with actual business location
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg">
          </iframe>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
