import React from 'react';
import "./Card.css";

export const Card =
  ({
    name, img, role, bio, socials, onSocialClick
  }) => {
    const placeholderImg = 'https://via.placeholder.com/150'; // Generic placeholder image
    const imageSrc = img && img !== 'broken' ? img : placeholderImg; // Use placeholder if img is broken or not provided


    return (
      <div className="card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center">
        {img && img !== 'broken' ? (
          <img
            src={imageSrc}
            alt={name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-primary"
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImg; }} // Fallback for broken images
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center mb-4 border-2 border-primary text-2xl font-bold text-gray-700">
            N/A
          </div>
        )}
        <div className="content w-full">
          <h2 className="text-xl font-semibold text-gray-800 mt-2 flex items-center justify-center">
            {name}
          </h2>
          <h3 className="text-md text-gray-600 mb-2">{role}</h3>
          <p className="text-sm text-gray-500 text-center mb-2">{bio}</p>
          <div className="flex justify-center gap-3 mb-4">
            {socials && socials.map(social => (
              <button
                key={social}
                onClick={() => onSocialClick(social)}
                className="text-gray-500 hover:text-primary transition-colors duration-200"
              >
                <i className={`fa-brands fa-${social} text-xl`}></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };
