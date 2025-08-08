import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ProductCard = ({ imageUrl, title, description, buttonText, link, price }) => {
  return (
    <Link to={link} className="block transform transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        data-aos="fade-up"
      >
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover scale-100 transition duration-300" />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-2">{description}</p>
          <p className="text-gray-800 font-bold text-lg mb-4">{price}</p>
          <button
            className="w-full px-4 py-2 bg-[#ECBE07] text-black font-bold rounded-lg hover:bg-[#ECBE07] transition duration-300 ease-in-out"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
