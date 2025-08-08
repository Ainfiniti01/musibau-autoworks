import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionWrapper from '../../components/SectionWrapper';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import images
import bgImage from '../../assets/images/background.png'; // Not for gallery
import chassisRepair from '../../assets/images/Chassis_Repair.jpg';
import electricalRepair from '../../assets/images/elect.jpg';
import engineRepair from '../../assets/images/engine.jpg';
import generalMaintenance from '../../assets/images/General_Maintenance.jpg';
import logo from '../../assets/images/logo.jpg'; // Not for gallery
import serviceBg from '../../assets/images/servicebg.webp'; // Not for gallery

// Define image categories
const imagesWithCategories = [
  { src: chassisRepair, alt: 'Chassis Repair', category: 'Repairs' },
  { src: electricalRepair, alt: 'Electrical Repair', category: 'Repairs' },
  { src: engineRepair, alt: 'Engine Repair', category: 'Repairs' },
  { src: generalMaintenance, alt: 'General Maintenance', category: 'Paint' }, // Assuming Maintenance falls under Paint for filtering
];

const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [filteredImages, setFilteredImages] = useState(imagesWithCategories);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredImages(imagesWithCategories);
    } else {
      setFilteredImages(imagesWithCategories.filter(img => img.category === filter));
    }
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <main>
      <Helmet>
        <title>Musibau AutoWorks - Gallery</title>
        <meta name="description" content="View our gallery of automotive work at Musibau AutoWorks." />
      </Helmet>

      <SectionWrapper className="py-16">
        <h2
          className="text-4xl font-bold text-center mb-12 text-gray-800 py-9"
          data-aos="fade-down"
        >
          Our Work in Pictures
        </h2>

        {/* Filters */}
        <div className="flex justify-center mb-8 space-x-4">
          {['All', 'Paint', 'Repairs', 'Wash', 'Others'].map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-4 py-2 rounded-md font-semibold transition duration-300
                ${filter === cat
                  ? 'bg-[#ECBE07] text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={image.alt} // Using alt text as key, assuming it's unique for gallery items
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition duration-500 hover:scale-105 hover:brightness-110"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h3 className="text-lg font-bold mb-1">{image.alt}</h3>
                  <p className="text-sm">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
};

export default GalleryPage;
