import React from 'react';

const TestimonialsOrMap = () => {
  // Function to render star ratings
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
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
          Testimonials & Location
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Google Maps Iframe */}
          <div className="md:w-1/2" data-aos="fade-right">
            <h3 className="text-2xl font-bold mb-4 text-white font-montserrat">Our Location</h3>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              {/* Replace with your actual Google Maps embed code */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.404010111111!2d3.375007774819331!3d6.527631621777777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x103bf4b0a0000001%3A0x1234567890abcdef!5e0!3m2!1sen!2sng!4v1678886400000!5m2!1sen!2sng" // Example embed URL
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Testimonials */}
          <div className="md:w-1/2" data-aos="fade-left">
            <h3 className="text-2xl font-bold mb-4 text-white font-montserrat">What Our Clients Say</h3>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg h-96 flex flex-col justify-between">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="mb-4">
                  <div className="flex items-center mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-300 font-opensans italic mb-2">{testimonial.comment}</p>
                  <p className="font-semibold text-lg text-white">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsOrMap;
