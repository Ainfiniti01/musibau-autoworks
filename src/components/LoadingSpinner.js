import React from 'react';
import './LoadingSpinner.css'; // Assuming a CSS file will be created

// A simple CSS-based loading spinner
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
