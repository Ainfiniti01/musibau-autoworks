import React from 'react';

const OrganizationDashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Organization Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Account Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
          <p>Company Name: [Organization Name]</p>
          <p>Contact Person: [Contact Person Name]</p>
          <p>Total Team Members: [Number]</p>
          <p>Overall Bookings: [Number]</p>
          <p>Overall Services: [Number]</p>
          {/* Add more company-specific info */}
        </div>

        {/* Bookings & Services */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bookings & Services</h2>
          <p>Company-wide booking and service history.</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View All Bookings</button>
          <button className="mt-4 ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">View All Services</button>
          {/* Add filters for team member/department */}
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <ul className="list-disc pl-5">
            <li>Company-wide alert: System maintenance on [Date].</li>
            <li>New service update available.</li>
            <li>Reminder: Team meeting on [Date].</li>
          </ul>
          {/* Add multiple user notifications */}
        </div>

        {/* User Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Actions</h2>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mb-2">Manage Company Profile</button>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">Manage Team Accounts/Roles</button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboardPage;
