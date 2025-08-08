import React from 'react';

const Dashboard = () => {
  // Mock data for dashboard stats
  const stats = {
    bookings: 150,
    customers: 75,
    revenue: '$15,000',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-[#ECBE07] font-semibold text-lg">Total Bookings</h2>
          <p className="text-2xl font-bold text-[#004040]">{stats.bookings}</p>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-[#ECBE07] font-semibold text-lg">Total Customers</h2>
          <p className="text-2xl font-bold text-[#004040]">{stats.customers}</p>
        </div>
        <div className="bg-white rounded shadow p-6 text-center">
          <h2 className="text-[#ECBE07] font-semibold text-lg">Total Revenue</h2>
          <p className="text-2xl font-bold text-[#004040]">{stats.revenue}</p>
        </div>
      </div>
      {/* Optional: Add charts here */}
    </div>
  );
};

export default Dashboard;
