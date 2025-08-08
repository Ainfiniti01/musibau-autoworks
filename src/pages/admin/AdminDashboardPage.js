import React from 'react';
import { Helmet } from 'react-helmet';
import { FaChartBar, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { formatCurrency } from '../utils/formatCurrency'; // Import formatCurrency

// TODO: Add styling for the admin dashboard
// TODO: Fetch and display actual stats from an API

const AdminDashboardPage = () => {
  // Placeholder for total revenue - in a real app, this would come from an API
  const totalRevenue = 15000;

  return (
    <main className="container mx-auto p-4"> {/* Added container and padding */}
      <Helmet>
        <title>Musibau AutoWorks - Admin Dashboard</title>
        <meta name="description" content="Admin dashboard for Musibau AutoWorks. Manage services, customers, bookings, and products." />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-[#004040]">Admin Dashboard</h1> {/* Updated header color */}
      <div className="stats grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"> {/* Added grid for stats */}
        <div className="bg-white rounded p-6 text-center shadow-md"> {/* Added Tailwind classes */}
          <h2 className="text-[#004040] font-semibold text-lg mb-2">Total Customers</h2> {/* Updated header color */}
          <p className="text-3xl font-bold text-gray-800">123</p> {/* Added Tailwind classes */}
        </div>
        <div className="bg-white rounded p-6 text-center shadow-md"> {/* Added Tailwind classes */}
          <h2 className="text-[#004040] font-semibold text-lg mb-2">Total Bookings</h2> {/* Updated header color */}
          <p className="text-3xl font-bold text-gray-800">456</p> {/* Added Tailwind classes */}
        </div>
        <div className="bg-white rounded p-6 text-center shadow-md"> {/* Added Tailwind classes */}
          <h2 className="text-[#ECBE07] font-semibold text-lg mb-2">Total Revenue</h2> {/* Added gold color for highlight */}
          <p className="text-3xl font-bold text-[#004040]">{formatCurrency(totalRevenue)}</p> {/* Applied formatCurrency and dark teal color */}
        </div>
      </div>

      <div className="admin-management">
        <h2 className="text-2xl font-bold mb-4 text-[#004040]">Manage Data</h2> {/* Updated header color */}

        <div className="manage-section mb-6 p-6 bg-white rounded-lg shadow-md"> {/* Added Tailwind classes */}
          <h3 className="text-xl font-semibold text-[#004040] mb-3">Customers</h3> {/* Updated header color */}
          <div className="actions flex flex-wrap gap-2"> {/* Added flex and gap for actions */}
            <button aria-label="Add Customer" className="flex items-center bg-[#ECBE07] hover:bg-[#d4a806] text-white font-bold py-2 px-4 rounded">
              <FaPlus className="mr-2" /> Add Customer
            </button>
            <button aria-label="Edit Customer" className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              <FaEdit className="mr-2" /> Edit Customer
            </button>
            <button aria-label="Delete Customer" className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <FaTrash className="mr-2" /> Delete Customer
            </button>
          </div>
        </div>

        <div className="manage-section mb-6 p-6 bg-white rounded-lg shadow-md"> {/* Added Tailwind classes */}
          <h3 className="text-xl font-semibold text-[#004040] mb-3">Bookings</h3> {/* Updated header color */}
          <div className="actions flex flex-wrap gap-2"> {/* Added flex and gap for actions */}
            <button aria-label="Add Booking" className="flex items-center bg-[#ECBE07] hover:bg-[#d4a806] text-white font-bold py-2 px-4 rounded">
              <FaPlus className="mr-2" /> Add Booking
            </button>
            <button aria-label="Edit Booking" className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              <FaEdit className="mr-2" /> Edit Booking
            </button>
            <button aria-label="Delete Booking" className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <FaTrash className="mr-2" /> Delete Booking
            </button>
          </div>
        </div>

        <div className="manage-section mb-6 p-6 bg-white rounded-lg shadow-md"> {/* Added Tailwind classes */}
          <h3 className="text-xl font-semibold text-[#004040] mb-3">Products</h3> {/* Updated header color */}
          <div className="actions flex flex-wrap gap-2"> {/* Added flex and gap for actions */}
            <button aria-label="Add Product" className="flex items-center bg-[#ECBE07] hover:bg-[#d4a806] text-white font-bold py-2 px-4 rounded">
              <FaPlus className="mr-2" /> Add Product
            </button>
            <button aria-label="Edit Product" className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
              <FaEdit className="mr-2" /> Edit Product
            </button>
            <button aria-label="Delete Product" className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              <FaTrash className="mr-2" /> Delete Product
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;
