import React from 'react';

const MinimalFooter = () => {
  return (
    <footer className="bg-red-800 text-white py-4"> {/* Added some basic styling */}
      <div className="container mx-auto px-4 text-center"> {/* Added container for centering and padding */}
        {/* Minimal footer content: copyright info */}
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default MinimalFooter;
