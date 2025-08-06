import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet

// TODO: Add styling for the reviews page
// TODO: Fetch reviews data from an API

const reviews = [
  { id: 1, author: 'John Doe', rating: 5, comment: 'Great service!' },
  { id: 2, author: 'Jane Smith', rating: 4, comment: 'Very professional.' },
  { id: 3, author: 'Peter Jones', rating: 5, comment: 'Highly recommended!' },
];

const ReviewsPage = () => {
  return (
    <div>
      <h1>Customer Reviews</h1>
      <Helmet>
        <title>Musibau AutoWorks - Customer Reviews</title>
        <meta name="description" content="Read what our satisfied customers have to say about Musibau AutoWorks." />
      </Helmet>
      <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <h3>{review.author}</h3>
            <div>Rating: {'★'.repeat(review.rating)}</div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
