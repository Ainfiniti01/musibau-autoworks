import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customer/bookings/${booking.id}`);
  };

  return (
    <li className="flex justify-between items-center py-2 border-b border-gray-200">
      <div>
        <p className="text-gray-700 font-medium">{booking.service}</p>
        <p className="text-sm text-gray-500">{booking.date}</p>
      </div>
      <button
        onClick={handleViewDetails}
        className="text-[#ECBE07] hover:text-[#d4a806] font-medium text-sm"
      >
        View Details
      </button>
    </li>
  );
};

export default BookingCard;
