import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ProductCard = ({ imageUrl, title, description, buttonText, link, price }) => {
  return (
    <Link to={link} className="block transform transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div
        className="bg-dark text-white rounded shadow-md p-4 overflow-hidden"
        data-aos="fade-up"
      >
<img src={imageUrl} alt={title} className="w-full object-contain scale-100 transition duration-300" />
        <div className="p-4">
          <h3 className="text-primary">{title}</h3>
          <p className="text-gray-600 mb-2">
            {description.length > 100 ? description.slice(0, 100) + '...' : description}
          </p>
          <p className="text-2xl font-bold">{price}</p>
          <button
            className="w-full px-4 py-2 bg-primary text-dark font-bold rounded-lg hover:bg-yellow-400 transition"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
