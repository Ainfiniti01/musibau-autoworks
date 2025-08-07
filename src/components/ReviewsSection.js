import React from 'react';

const ReviewsSection = () => {
  // Placeholder for reviews data. In a real app, this would come from an API or a data file.
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      rating: 5,
      comment: 'The service was exceptional! They fixed my car quickly and efficiently. Highly recommend.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rating: 4,
      comment: 'Great customer service and fair prices. My car runs like new.',
    },
    {
      id: 3,
      name: 'Peter Jones',
      rating: 5,
      comment: 'Very professional and knowledgeable staff. They went above and beyond to help me.',
    },
  ];

  // Function to render star ratings
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-yellow-400 text-xl">★</span>);
    }
    return stars;
  };

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform transition duration-500 hover:scale-105 hover:shadow-xl"
            data-aos="fade-up"
            data-aos-delay={index * 100} // Staggered delay
          >
            <div>
              <div className="text-2xl mb-4">“</div> {/* Optional quotation icon */}
              <p className="text-gray-700 mb-4">{review.comment}</p>
            </div>
            <div className="mt-auto"> {/* Pushes content to the bottom */}
              <div className="flex items-center mb-2">
                {renderStars(review.rating)}
              </div>
              <p className="font-semibold text-lg text-gray-900">{review.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <a
          href="/reviews" // Link to reviews page or About/Services page as per suggestion
          className="text-xl font-semibold text-gold-500 hover:text-gold-700 transition duration-300"
        >
          Read More Testimonials →
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;
