import React from 'react';

const TestimonialsOrMap = () => {
  // Function to render star ratings
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-[#ECBE07] text-xl">★</span>);
    }
    return stars;
  };

  // Limited testimonials for homepage display
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      comment: 'Exceptional service! Fixed my car quickly.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      comment: 'Great customer service and fair prices.',
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-12 text-white font-montserrat"
          data-aos="fade-down"
        >
          Location
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Google Maps Iframe */}
          <div className="md:w-1/2" data-aos="fade-right">
          <div className="contact-map-container py-10" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Our Location</h3>
            {/* Replace with your actual Google Maps embed code */}
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

            {/* <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.404010111111!2d3.375007774819331!3d6.527631621777777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x103bf4b0a0000001%3A0x1234567890abcdef!5e0!3m2!1sen!2sng!4v1678886400000!5m2!1sen!2sng" // Example embed URL
                width="100%;"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsOrMap;
