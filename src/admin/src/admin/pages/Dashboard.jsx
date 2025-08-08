import React, { useState } from 'react';
import AdminLayout from '../layout/AdminLayout'; // Import AdminLayout

const Dashboard = () => {
  // Mock data for dashboard stats, now using useState
  const [stats, setStats] = useState({
    bookings: 150,
    customers: 75,
    revenue: '$15,000',
  });

  // TODO: Replace dashboard metrics with dynamic values

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#ECBE07] mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded p-6 text-center">
          <h2 className="text-[#ECBE07] font-semibold text-lg">Total </h2>
          <p className="text-3xl font-bold text-[#004040]">{stats.bookings}</p>
        </div>
        <div className="bg-white rounded p-6 text-center">
          <h2 className="text-[#ECBE07] font-semibold text-lg">Total Customers</h2>
          <p className="text-3xl font-bold text-[#004040]">{stats.customers}</p>
        </div>
        <div className="bg-white rounded p-6 text-center">
          <h2 className="text-[#ECBE07] font-semibold text-lg">Total Revenue</h2>
          <p className="text-3xl font-bold text-[#004040]">{stats.revenue}</p>
        </div>
      </div>
      {/* Optional: Add charts here */}
    </AdminLayout>
  );
};

export default Dashboard;
