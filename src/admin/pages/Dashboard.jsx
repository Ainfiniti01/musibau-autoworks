import React, { useState, useEffect } from 'react';
import BookingForm from '../components/BookingForm';
import BookingsChart from '../components/BookingsChart';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiCalendar, FiUsers, FiDollarSign, FiClock, FiActivity } from 'react-icons/fi'; // Import icons

const Dashboard = () => {
  const [stats, setStats] = useState({
    bookings: 0,
    customers: 0,
    revenue: '$0',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStats({
        bookings: 150,
        customers: 75,
        revenue: '$15,000',
      });
      setIsLoading(false);
    };
    fetchStats();
  }, []);

  const recentActivities = [
    { id: 1, type: 'Booking', description: 'New booking from John Doe for Oil Change', timestamp: '2 mins ago' },
    { id: 2, type: 'Service Edit', description: 'Updated "Tire Rotation" service details', timestamp: '1 hour ago' },
    { id: 3, type: 'Customer', description: 'New customer registered: Jane Smith', timestamp: '3 hours ago' },
    { id: 4, type: 'Booking', description: 'Booking #1024 marked as completed', timestamp: 'Yesterday' },
    { id: 5, type: 'Product Add', description: 'Added "Synthetic Oil 5W-30" to products', timestamp: '2 days ago' },
  ];

  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 dark:text-white">Dashboard Overview</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-600 flex flex-col items-center">
            <FiCalendar size={30} className="text-[#004040] dark:text-[#ECBE07] mb-3" />
            <h2 className="text-gray-600 dark:text-gray-300 font-semibold text-lg mb-2">Total Bookings</h2>
            <p className="text-4xl font-bold text-[#004040] dark:text-[#ECBE07]">{stats.bookings}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-600 flex flex-col items-center">
            <FiUsers size={30} className="text-[#004040] dark:text-[#ECBE07] mb-3" />
            <h2 className="text-gray-600 dark:text-gray-300 font-semibold text-lg mb-2">Total Customers</h2>
            <p className="text-4xl font-bold text-[#004040] dark:text-[#ECBE07]">{stats.customers}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 text-center border border-gray-200 dark:border-gray-600 flex flex-col items-center">
            <FiDollarSign size={30} className="text-[#004040] dark:text-[#ECBE07] mb-3" />
            <h2 className="text-gray-600 dark:text-gray-300 font-semibold text-lg mb-2">Total Revenue</h2>
            <p className="text-4xl font-bold text-[#004040] dark:text-[#ECBE07]">{stats.revenue}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="w-full overflow-x-auto bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
          <BookingsChart />
        </div>
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">Recent Activity</h3>
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            {recentActivities.map(activity => (
              <li key={activity.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center flex-1">
                  <FiActivity className="text-gray-500 dark:text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0 flex items-center">
                  <FiClock className="mr-1" /> {activity.timestamp}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 dark:text-white">New Booking</h2>
        <BookingForm />
      </div>
    </>
  );
};

export default Dashboard;
