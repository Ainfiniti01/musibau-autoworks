import React from 'react';

const ActionButton = ({ label, onClick, variant = 'primary', className = '' }) => {
  const baseStyles = 'py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-[#ECBE07] hover:bg-[#d4a806] focus:ring-[#ECBE07]',
    danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    // Add other variants as needed
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {label}
    </button>
  );
};

export default ActionButton;
