import React from 'react';
import { Helmet } from 'react-helmet-async';

const OrganizationDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Helmet>
        <title>Musibau AutoWorks - Organization Dashboard</title>
        <meta name="description" content="Organization dashboard for Musibau AutoWorks." />
      </Helmet>
      <h1 className="text-3xl font-bold text-[#004040] mb-6">Organization Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Company Info Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Company Overview</h2>
          <p className="text-gray-700">View and manage your company's information, team members, and overall service summaries.</p>
          {/* Placeholder for company info */}
          <div className="mt-4 text-gray-600">
            <p><strong>Company Name:</strong> [Your Company Name]</p>
            <p><strong>Contact Person:</strong> [Contact Person Name]</p>
            <p><strong>Total Bookings:</strong> 150</p>
            <p><strong>Active Services:</strong> 12</p>
          </div>
        </div>

        {/* Company-wide Bookings & Services */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Bookings & Services</h2>
          <p className="text-gray-700">Access company-wide booking and service history. Filter by team member or department.</p>
          {/* Placeholder for bookings/services list */}
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>Service A - Completed (Team Member X)</li>
            <li>Booking B - Pending (Department Y)</li>
            <li>Service C - In Progress (Team Member Z)</li>
          </ul>
          <button className="mt-4 bg-[#004040] text-white py-2 px-4 rounded-md hover:bg-[#002020]">View All</button>
        </div>

        {/* Company-wide Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">Notifications</h2>
          <p className="text-gray-700">Receive company-wide alerts and notifications for multiple users.</p>
          {/* Placeholder for notifications */}
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>New service update available for all team members.</li>
            <li>Upcoming maintenance scheduled for fleet vehicles.</li>
            <li>Invoice #12345 is due.</li>
          </ul>
        </div>

        {/* User Actions - Manage Company Profile & Team */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#ECBE07] mb-4">User Actions</h2>
          <p className="text-gray-700">Manage your company profile and team accounts/roles.</p>
          <div className="mt-4 space-y-2">
            <button className="w-full bg-[#ECBE07] text-[#004040] py-2 px-4 rounded-md hover:bg-[#d4a806]">Manage Company Profile</button>
            <button className="w-full bg-[#ECBE07] text-[#004040] py-2 px-4 rounded-md hover:bg-[#d4a806]">Manage Team Accounts</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboardPage;
