import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#004040] shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
      <div class="text-white">
        {/* Placeholder for user info, logout button, etc. */}
        <span>Welcome, Admin!</span>
      </div>
    </header>
  );
};

export default Header;
