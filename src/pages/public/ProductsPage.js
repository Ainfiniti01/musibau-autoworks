import React from 'react';
import { Helmet } from 'react-helmet-async';
import FeaturedProducts from '../../components/FeaturedProducts'; // Import the new component
import LoadingSpinner from '../../components/LoadingSpinner'; // Keep LoadingSpinner in case it's needed for future API calls

const ProductsPage = () => {
  // The FeaturedProducts component handles its own loading and data for now.
  // If we were fetching data here, we would manage isLoading and pass products as props.

  return (
    <>
      <Helmet>
        <title>Musibau AutoWorks - Our Products</title>
        <meta name="description" content="Browse our selection of high-quality automotive products at Musibau AutoWorks." />
      </Helmet>
      {/* The FeaturedProducts component already includes its own section styling and AOS */}
      <FeaturedProducts />
    </>
  );
};

export default ProductsPage;
