import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import LoadingSpinner from '../../components/LoadingSpinner';

// TODO: Fetch products data from an API

const products = [
  { id: 1, name: 'Product 1', description: 'This is a great product.' },
  { id: 2, name: 'Product 2', description: 'This is another great product.' },
  { id: 3, name: 'Product 3', description: 'This is yet another great product.' },
];

const ProductsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a 2-second loading time
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Our Products</title>
        <meta name="description" content="Browse our selection of high-quality automotive products at Musibau AutoWorks." />
      </Helmet>
      <h1>Our Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <img src={('../../assets/logo/logo.jpg')} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <button>Contact to Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
