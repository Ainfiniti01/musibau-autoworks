import React, { useState } from 'react';
import "./Card.css";
import { getInitials } from '../utils/guestActivity'; // Corrected import path

export const Card =
  ({
    name, img, role, bio, socials, onSocialClick, availability, onToggleAvailability, onAssignTaskClick
  }) => {
    const placeholderImg = 'https://via.placeholder.com/150'; // Generic placeholder image
    const imageSrc = img && img !== 'broken' ? img : placeholderImg; // Use placeholder if img is broken or not provided

    const [currentAvailability, setCurrentAvailability] = useState(availability);
    const availabilityColor = currentAvailability === 'Available' ? 'bg-green-500' : 'bg-red-500';
    const availabilityText = currentAvailability === 'Available' ? 'Available' : 'Busy';

    const handleToggle = () => {
      const newAvailability = currentAvailability === 'Available' ? 'Busy' : 'Available';
      setCurrentAvailability(newAvailability);
      if (onToggleAvailability) {
        onToggleAvailability(newAvailability);
      }
    };

    const initials = getInitials(name); // Get initials from name

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
            {initials}
          </div>
        )}
        <div className="content w-full">
          <h2 className="text-xl font-semibold text-gray-800 mt-2 flex items-center justify-center">
            {name}
            <span className={`ml-2 px-2 py-1 rounded-full text-xs text-white ${availabilityColor}`}>
              {availabilityText}
            </span>
          </h2>
          <h3 className="text-md text-gray-600 mb-2">{role}</h3>
          <p className="text-sm text-gray-500 text-center mb-2">{bio}</p>
          <p className="text-xs text-gray-400 mb-4">Tasks today: {Math.floor(Math.random() * 5)}</p> {/* Placeholder for tasks today */}
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
          <div className="flex flex-col gap-2">
            <button
              onClick={() => alert(`Viewing profile for ${name}`)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              View Profile
            </button>
            <button
              onClick={handleToggle}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${currentAvailability === 'Available' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
            >
              Toggle Availability ({currentAvailability})
            </button>
            <button
              onClick={onAssignTaskClick}
              className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-secondary-dark transition-colors duration-200"
            >
              Assign Task
            </button>
          </div>
        </div>
      </div>
    );
  };
