import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiSettings, FiLogOut, FiCalendar, FiTool } from 'react-icons/fi'; // Added FiCalendar and FiTool

const Sidebar = ({ isOpen, onLinkClick }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: <FiCalendar /> }, // Changed icon to FiCalendar
    { name: 'Manage Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Manage Services', path: '/admin/services', icon: <FiTool /> }, // Changed icon to FiTool
    { name: 'Customers', path: '/admin/customers', icon: <FiUsers /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> }, // Added Settings
  ];

return (
    <aside className={`bg-[#004040] text-white transition-all duration-300 w-64 fixed md:relative z-20 h-full ${isOpen ? 'block' : 'hidden'} md:block`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className={`text-[#ECBE07] font-bold text-lg transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Admin</h1>
        {/* The hamburger menu button will be moved to the Header component for mobile */}
      </div>

      <nav className="mt-6 space-y-4 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={item.name}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 py-2 px-4 rounded overflow-hidden text-ellipsis whitespace-nowrap hover:bg-yellow-400 hover:text-dark transition ${
                isActive ? 'bg-[#ECBE07] text-[#004040]' : ''
              }`
            }
          >
            {item.icon} {isOpen && item.name}
          </NavLink>
        ))}
        <NavLink
          to="/admin/login" // Changed to login for consistency with logout action in Header
          title="Logout"
          className="flex items-center gap-3 py-2 px-4 rounded overflow-hidden text-ellipsis whitespace-nowrap text-red-400 hover:bg-yellow-400 hover:text-red-600 transition"
          onClick={() => localStorage.removeItem("adminLoggedIn")} // Added logout action
        >
          <FiLogOut /> {isOpen && 'Logout'}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
