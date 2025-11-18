import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiSettings, FiLogOut, FiCalendar, FiTool, FiChevronDown } from 'react-icons/fi'; // Added FiCalendar and FiTool

const Sidebar = ({ isOpen, onLinkClick }) => {
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false);
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome />, title: "Dashboard" },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: <FiCalendar />, title: "Manage Bookings" },
    { name: 'Manage Products', path: '/admin/products', icon: <FiBox />, title: "Manage Products" },
    { name: 'Manage Services', path: '/admin/services', icon: <FiTool />, title: "Manage Services" },
    { name: 'Booking History', path: '/admin/booking-history', icon: <FiCalendar />, title: "Booking History" },
    { name: 'Service History', path: '/admin/service-history', icon: <FiTool />, title: "Service History" },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings />, title: "Settings" },
  ];

  return (
    <aside className={`bg-[#1a1a2e] text-white h-screen flex-shrink-0 fixed md:static z-30 ${isOpen ? 'w-64 md:w-64' : 'w-0 md:w-20'} transition-all duration-300 overflow-hidden`}>
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className={`text-[#ECBE07] font-bold text-lg transition-all duration-300 ${isOpen ? 'block' : 'hidden'} md:block`}>Admin</h1>
      </div>

      <nav className="mt-6 space-y-4 px-4 flex flex-col h-[calc(100%-80px)]"> {/* Added flex-col and h-[calc(100%-80px)] */}
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
        {/* Customers Dropdown */}
        <div
          onClick={() => setCustomerMenuOpen(!customerMenuOpen)}
          className={`font-bold text-lg transition-all duration-300 ${isOpen ? 'block' : 'hidden'} md:block flex items-center justify-between cursor-pointer px-4 py-2 hover:bg-yellow-400 hover:text-dark transition`}
        >
          <span className="flex items-center gap-3" >
            <FiUsers />
            {isOpen && 'Customers'}
          </span>
          <FiChevronDown className={`${customerMenuOpen ? 'rotate-180' : ''} transition`} />
        </div>
        {customerMenuOpen && (
          <div className="ml-8 mt-2 space-y-2 text-sm pl-4"> {/* Added pl-4 for padding */}
            <NavLink to="/admin/guest-list" className="block hover:text-yellow-500 py-1" onClick={onLinkClick}>Guest List</NavLink>
            <NavLink to="/admin/customers/Individual" className="block hover:text-yellow-500 py-1" onClick={onLinkClick}>Individual</NavLink>
            <NavLink to="/admin/Organizations" className="block hover:text-yellow-500 py-1" onClick={onLinkClick}>Organizations</NavLink>
          </div>
        )}
        <div className="mt-auto"> {/* Wrapper for logout to push it to the bottom */}
          <NavLink
            to="/admin/login"
            title="Logout"
            className="flex items-center gap-3 py-2 px-4 rounded overflow-hidden text-ellipsis whitespace-nowrap text-red-400 hover:bg-yellow-400 hover:text-red-600 transition"
            onClick={() => localStorage.removeItem("adminLoggedIn")}
          >
            <FiLogOut /> {isOpen && 'Logout'}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
