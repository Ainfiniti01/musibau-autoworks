import React from 'react';
import './LoadingSpinner.css'; // Assuming a CSS file will be created

// A simple CSS-based loading spinner with a car wheel animation
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <div className="spinner">
        {/* SVG for a car wheel */}
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>
          <circle cx="50" cy="50" r="5" fill="var(--color-black)" /> {/* Hub */}
          {/* Spokes */}
          <line x1="50" y1="5" x2="50" y2="15" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="50" y1="85" x2="50" y2="95" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="5" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="85" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="21.21" y1="21.21" x2="28.28" y2="28.28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="78.79" y1="78.79" x2="71.72" y2="71.72" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="21.21" y1="78.79" x2="28.28" y2="71.72" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <line x1="78.79" y1="21.21" x2="71.72" y2="28.28" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
