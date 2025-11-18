import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMenu } from 'react-icons/fi';
import Breadcrumb from './Breadcrumb';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <header className={`bg-white text-dark border-b p-4 flex items-center justify-between fixed top-0 left-0 right-0 h-16 z-50 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-dark mr-4">
          <FiMenu size={24} />
        </button>
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-[#004040] hidden md:block">Musibau Autoworks</span>
          <span className="text-xl font-bold text-[#004040] md:hidden">MA</span>
        </div>
        {/* Breadcrumbs */}
        <div className="hidden md:flex text-sm ml-4">
          <Breadcrumb />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Welcome Admin */}
        <span className="text-dark hidden sm:block">Welcome, Adam</span>
        {/* Avatar */}
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
          <FiUser size={18} />
        </div>
      </div>
    </header>
  );
};

export default Header;
