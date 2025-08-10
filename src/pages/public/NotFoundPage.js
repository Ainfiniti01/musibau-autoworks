import React from 'react';
import { Link } from 'react-router-dom';
import SectionWrapper from '../../components/SectionWrapper';

const NotFoundPage = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 py-16">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <img
          src="https://via.placeholder.com/300" // Replace with a relevant illustration
          alt="Not Found Illustration"
          className="mx-auto mb-8"
          loading="lazy"
        />
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default NotFoundPage;
