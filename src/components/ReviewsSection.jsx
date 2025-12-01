import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ReviewsSection = () => {
  // Placeholder for reviews data. In a real app, this would come from an API or a data file.
  const reviews = [
    {
      id: 1,
      name: 'Ayomide Oyinloye (C&I Leasing Staff)',
      rating: 5,
      comment: "I have known Musibau enterprises since June 2016 and it's known for quality service delivery.\n\nMusibau Services is one of the best among all our vendors, and the quality of service rendered is excellent.",
    },
    {
      id: 2,
      name: 'Obumnemenwa Okolo (C&I Leasing Staff)',
      rating: 5,
      comment: "My experience at Musibau Ázeez Nigeria Enterprises Automobile workshop was an exceptional and commendable one.\nThe level of professionalism, detailed attention to every aspect of the job they did on my vehicles was very good, The fact that they are able to diagnose  and advice me on other things to be done on the vehicle to ensure optimum performance and my satisfaction to the things to be fixed on the vehicle was very good. \nThe M.D. himself was very personable with the way took he time to answer all of my calls and questions about the other jobs i needed him to do for me even before i took them to the workshop. \nThe entire process felt relaxed and low-pressure, which made the time they had to work on my cars so much more relaxing, unlike my experience with the Autoworkshop i was using before. \nIt’s clear that Musibau Ázeez Nigeria Enterprises Automobile workshop is a Customer satisfaction driven business that truly values customer’s patronage  which is clearly noticed in their professional, friendly, and welcoming workshop. \nI really appreciate the master touch experience i had on my cars they have so far worked on. \nI’ll highly and gladly recommend anyone that needs any form of Vehicle repair service to Musibau Ázeez Nigeria Enterprises Automobile workshop as you’ll be in great hands!",
    },
    {
      id: 3,
      name: 'Emmanuel Nwachukwu (C&I Leasing Staff)',
      rating: 5,
      comment: 'Musibau workshop Yaba, is one of the best motor mechanical workshop around Lagos. \nThey are fast, they are reliable and efficient. \nThis is the best known name in this industry.\nJust call, they are there.',
    },
  ];

  const [expandedReviews, setExpandedReviews] = useState({});
  const TRUNCATE_LENGTH = 150; // Adjust as needed

  const toggleExpanded = (id) => {
    setExpandedReviews(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<span key={i} className="text-[#ECBE07] text-xl">★</span>);
    }
    return stars;
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Clients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review, index) => {
          const isExpanded = expandedReviews[review.id];
          const displayComment = isExpanded ? review.comment : truncateText(review.comment, TRUNCATE_LENGTH);
          const needsTruncation = review.comment.length > TRUNCATE_LENGTH;

          return (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between transform transition duration-500 hover:scale-105 hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div>
                <div className="text-2xl mb-4">“</div>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">{displayComment}</p>
                {needsTruncation && (
                  <button
                    onClick={() => toggleExpanded(review.id)}
                    className="text-[#ECBE07] hover:underline text-sm font-semibold mb-2"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>
              <div className="mt-auto">
                <div className="flex items-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="font-semibold text-lg text-gray-900">{review.name}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-12">
        <Link to="/about#reviews" className="text-xl font-semibold text-[#ECBE07] hover:text-[#ECBE07] transition duration-300">
          Read More Testimonials →
        </Link>
      </div>
    </section>
  );
};

export default ReviewsSection;
