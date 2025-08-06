import React from 'react';

const ProductCard = ({ imageUrl, title, description, buttonText, onButtonClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:scale-105"
      data-aos="fade-up"
    >
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover scale-100 hover:scale-105 transition duration-300" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
          onClick={onButtonClick}
          className="w-full px-4 py-2 bg-gold text-black font-bold rounded-lg hover:bg-gold-hover transition duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
