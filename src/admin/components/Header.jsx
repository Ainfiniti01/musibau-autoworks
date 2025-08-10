import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMenu } from 'react-icons/fi';
import Breadcrumb from './Breadcrumb';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <header className="bg-white text-dark border-b p-4 flex items-center justify-between sticky top-0 z-10 md:ml-0">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-dark md:hidden mr-4">
          <FiMenu size={24} />
        </button>
        {/* Logo */}
        <div className="flex items-center mr-4">
          <span className="text-xl font-bold text-[#004040] hidden md:block">Musibau Autoworks</span>
          <span className="text-xl font-bold text-[#004040] md:hidden">MA</span>
        </div>
        {/* Breadcrumbs */}
        <div className="hidden md:flex text-sm">
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
