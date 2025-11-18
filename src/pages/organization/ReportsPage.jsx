import React, { useState } from 'react';
import UserPortalLayout from '../../components/UserPortalLayout';
import { OrganizationHeader } from '../../components/OrganizationHeader';

const ReportsPage = () => {
  const [filters, setFilters] = useState({
    dateRange: '',
    serviceType: '',
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <UserPortalLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-primary">Reports</h1>

        {/* Date Range Picker & Filters */}
        <div className="mb-4 text-lightGray">
          <label htmlFor="dateRange" className="mr-2">Date Range:</label>
          <input
            type="text"
            id="dateRange"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="p-2 border border-gray-700 rounded-md w-56 bg-gray-500 text-lightGray"
          />

          <label htmlFor="serviceType" className="mr-2">Service Type:</label>
          <select
            id="serviceType"
            name="serviceType"
            value={filters.serviceType}
            onChange={handleFilterChange}
            className="p-2 border border-gray-700 rounded-md w-56 bg-gray-500 text-lightGray"
          >
            <option value="">All</option>
            <option value="oilChange">Oil Change</option>
            <option value="brakeRepair">Brake Repair</option>
          </select>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-darkGray rounded shadow-md p-4 text-lightGray">
            <h2 className="text-lg font-bold mb-2 text-primary">Total Revenue (Month)</h2>
            <p className="text-mediumGray">$10,000</p>
          </div>
          <div className="bg-darkGray rounded shadow-md p-4 text-lightGray">
            <h2 className="text-lg font-bold mb-2 text-primary">Total Services Completed</h2>
            <p className="text-mediumGray">50</p>
          </div>
          <div className="bg-darkGray rounded shadow-md p-4 text-lightGray">
            <h2 className="text-lg font-bold mb-2 text-primary">Average Customer Rating</h2>
            <p className="text-mediumGray">4.5</p>
          </div>
          <div className="bg-darkGray rounded shadow-md p-4 text-lightGray">
            <h2 className="text-lg font-bold mb-2 text-primary">Pending Invoices</h2>
            <p className="text-mediumGray">5</p>
          </div>
        </div>

        {/* Charts/Graphs */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-primary">Revenue Trends</h2>
          {/* Add line chart here */}
          <div className="h-40  rounded border border-gray-700 bg-gray-500 text-lightGray"></div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-primary">Services per Category</h2>
          {/* Add bar/pie chart here */}
          <div className="h-40  rounded border border-gray-700 bg-gray-500 text-lightGray"></div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-primary">Booking Volume</h2>
          {/* Add calendar heatmap here */}
          <div className="h-40  rounded border border-gray-700 bg-gray-500 text-lightGray"></div>
        </div>

        {/* Table of Recent Activity */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-primary">Recent Activity</h2>
          <table className="w-full border-collapse h-40  rounded border border-gray-700 bg-gray-500 text-lightGray">
            <thead>
              <tr>
                <th className="border border-gray-700 p-2 text-primary">Service</th>
                <th className="border border-gray-700 p-2 text-primary">Technician</th>
                <th className="border border-gray-700 p-2 text-primary">Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-700 p-2">Oil Change</td>
                <td className="border border-gray-700 p-2">John Doe</td>
                <td className="border border-gray-700 p-2">5</td>
              </tr>
              <tr>
                <td className="border border-gray-700 p-2">Brake Repair</td>
                <td className="border border-gray-700 p-2">Jane Smith</td>
                <td className="border border-gray-700 p-2">4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer className="bg-dark text-primary text-center py-4 text-sm fixed bottom-0 left-0 w-full">
        <strong>© {new Date().getFullYear()} Musibau AutoWorks. All rights reserved.</strong>
      </footer>
    </UserPortalLayout>
  );
};

export default ReportsPage;
