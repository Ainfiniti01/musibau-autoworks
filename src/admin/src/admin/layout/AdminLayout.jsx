import React, { useState } from 'react';
import { FiMenu, FiHome, FiUsers, FiBox, FiSettings, FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
    { name: 'Services', path: '/admin/services', icon: <FiSettings /> },
    { name: 'Customers', path: '/admin/customers', icon: <FiUsers /> },
    { name: 'Bookings', path: '/admin/bookings', icon: <FiBox /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`bg-[#004040] text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} fixed md:relative z-20 h-full`}>
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className={`text-[#ECBE07] font-bold text-lg transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>Admin</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white md:hidden">
            <FiMenu />
          </button>
        </div>

        <nav className="mt-6 space-y-4 px-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 hover:text-[#ECBE07] ${
                  isActive ? 'text-[#ECBE07]' : ''
                }`
              }
            >
              {item.icon} {isOpen && item.name}
            </NavLink>
          ))}
          <NavLink
            to="/admin/logout"
            className="flex items-center gap-3 text-red-400 hover:text-red-600"
          >
            <FiLogOut /> {isOpen && 'Logout'}
          </NavLink>
        </nav>
      </aside>

      {/* Backdrop for mobile */}
      {!isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 md:hidden" onClick={() => setIsOpen(true)} />
      )}

      {/* Main Content */}
      <main className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'} md:ml-0`}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
