import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      imageUrl: 'https://via.placeholder.com/300x200/#ECBE07/000000?text=Part+1',
      title: 'High-Performance Spark Plugs',
      description: 'Enhance your engine’s efficiency and power.',
      category: 'Ignition',
      price: 25.99,
      buttonText: 'Inquire Now',
      link: '/contact?service=High-Performance%20Spark%20Plugs',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/300x200/#ECBE07/FFFFFF?text=Part+2',
      title: 'Premium Brake Pads',
      description: 'Ensure safety with superior stopping power.',
      category: 'Braking',
      price: 75.50,
      buttonText: 'Inquire Now',
      link: '/contact?service=Premium%20Brake%20Pads',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/300x200/#ECBE07/000000?text=Part+3',
      title: 'All-Season Tires',
      description: 'Reliable grip in all weather conditions.',
      category: 'Tires',
      price: 150.00,
      buttonText: 'Inquire Now',
      link: '/contact?service=All-Season%20Tires',
    },
    {
      id: 4,
      imageUrl: 'https://via.placeholder.com/300x200/#ECBE07/000000?text=Part+4',
      title: 'Synthetic Engine Oil',
      description: 'Protect your engine with advanced lubrication.',
      category: 'Maintenance',
      price: 15.99,
      buttonText: 'Inquire Now',
      link: '/contact?service=Synthetic%20Engine%20Oil',
    },
    {
      id: 5,
      imageUrl: 'https://via.placeholder.com/300x200/#ECBE07/000000?text=Part+5',
      title: 'Custom Exhaust System',
      description: 'Improve performance and sound with a custom fit.',
      category: 'Performance',
      price: 300.00,
      buttonText: 'Inquire Now', // Changed from 'Contact for Purchase'
      link: '/contact?service=Custom%20Exhaust%20System',
    },
    {
      id: 6,
      imageUrl: 'https://via.placeholder.com/300x200/#ECBE07/FFFFFF?text=Part+6',
      title: 'LED Headlight Bulbs',
      description: 'Brighter, clearer vision for safer night driving.',
      category: 'Lighting',
      price: 45.00,
      buttonText: 'Inquire Now',
      link: '/contact?service=LED%20Headlight%20Bulbs',
    },
  ];

  // State for filters
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  // Extract unique categories for the filter dropdown
  const uniqueCategories = [...new Set(products.map(product => product.category))];

  // Filter logic
  const filteredProducts = products.filter(product => {
    const categoryMatch = filterCategory === '' || product.category === filterCategory;
    const priceMatch = filterPrice === '' || product.price <= parseFloat(filterPrice); // Simple price filter: less than or equal to
    return categoryMatch && priceMatch;
  });

  return (
    <section className="bg-white py-10 px-6 md:px-20" data-aos="fade-up">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Auto Parts</h2>
        {/* Filtering UI will be added here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              buttonText={product.buttonText}
              link={product.link} // Pass the link prop
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
