import React from 'react';
import ProductCard from './ProductCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedProducts = () => {
  // Initialize AOS on component mount
  React.useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Placeholder product data
  const products = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/300x200/FFD700/000000?text=Part+1',
      title: 'High-Performance Spark Plugs',
      description: 'Enhance your engine’s efficiency and power.',
      buttonText: 'Request Part',
      onButtonClick: () => alert('Requesting Part 1...'),
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300x200/DAA520/FFFFFF?text=Part+2',
      title: 'Premium Brake Pads',
      description: 'Ensure safety with superior stopping power.',
      buttonText: 'Contact for Purchase',
      onButtonClick: () => alert('Contacting for Part 2...'),
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/300x200/B8860B/000000?text=Part+3',
      title: 'All-Season Tires',
      description: 'Reliable grip in all weather conditions.',
      buttonText: 'Request Part',
      onButtonClick: () => alert('Requesting Part 3...'),
    },
    {
      id: 4,
      imageUrl: 'https://via.placeholder.com/300x200/D4AF37/000000?text=Part+4',
      title: 'Synthetic Engine Oil',
      description: 'Protect your engine with advanced lubrication.',
      buttonText: 'Request Part',
      onButtonClick: () => alert('Requesting Part 4...'),
    },
    {
      id: 5,
      imageUrl: 'https://via.placeholder.com/300x200/C4A484/000000?text=Part+5',
      title: 'Custom Exhaust System',
      description: 'Improve performance and sound with a custom fit.',
      buttonText: 'Contact for Purchase',
      onButtonClick: () => alert('Contacting for Part 5...'),
    },
    {
      id: 6,
      imageUrl: 'https://via.placeholder.com/300x200/A0522D/FFFFFF?text=Part+6',
      title: 'LED Headlight Bulbs',
      description: 'Brighter, clearer vision for safer night driving.',
      buttonText: 'Request Part',
      onButtonClick: () => alert('Requesting Part 6...'),
    },
  ];

  return (
    <section className="bg-white py-10 px-6 md:px-20" data-aos="fade-up">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Auto Parts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              buttonText={product.buttonText}
              onButtonClick={product.onButtonClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
