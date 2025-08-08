import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Customers', path: '/admin/customers' },
    { name: 'Bookings', path: '/admin/bookings' },
    { name: 'Products', path: '/admin/products' },
  ];

  return (
    <div className="w-64 bg-[#004040] text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Musibau AutoWorks</h2>
      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                isActive ? 'bg-[#ECBE07]' : 'hover:bg-[#003030]'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
