import React, { useState, useEffect } from 'react';
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
      <h1>Our Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <img src="https://via.placeholder.com/150" alt={product.name} />
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
