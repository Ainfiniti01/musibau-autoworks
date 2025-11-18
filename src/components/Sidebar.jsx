import React from 'react';

const Sidebar = () => {
  return (
    <aside>
      {/* Sidebar content: navigation links for customer dashboard */}
      <ul>
        <li><a href="/customer/dashboard">Dashboard</a></li>
        <li><a href="/customer/bookings">My Bookings</a></li>
        <li><a href="/customer/profile">My Profile</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
