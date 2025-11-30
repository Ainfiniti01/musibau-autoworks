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
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d65362411.61190957!2d88.7610255!3d0.8247176!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c8da642e481%3A0x42d33769d3ebadba!2sMakoko%2C%20Lagos%20101245%2C%20Lagos!5e0!3m2!1sen!2sng!4v1764278513935!5m2!1sen!2sng"
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
