import React, { useState, useMemo } from 'react';

import { EyeIcon, ArrowDownTrayIcon, StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid'; // Assuming Heroicons v24
import UserPortalLayout from '../../components/UserPortalLayout';

const OrganizationServiceHistoryPage = () => {
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [teamMember, setTeamMember] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Placeholder for team members - in a real app, this would come from an API or context
  const teamMembers = ['Mechanic A', 'Mechanic B', 'Technician C', 'Service Advisor D'];

  // Placeholder for service types - in a real app, this would come from an API or context
  const serviceTypes = ['Oil Change', 'Tire Rotation', 'Brake Repair', 'Engine Diagnostics'];

  // Placeholder for service history data
  const serviceHistory = [
    { id: 1, serviceName: 'Oil Change', mechanic: 'Mechanic A', date: '2023-10-26', type: 'Maintenance', status: 'Completed', cost: '$50.00', bookedBy: 'Alice', vehicleAsset: 'Sedan XYZ', rating: '★★★★☆' },
    { id: 2, serviceName: 'Brake Repair', mechanic: 'Technician C', date: '2023-10-25', type: 'Repair', status: 'Pending', cost: '$250.00', bookedBy: 'Bob', vehicleAsset: 'Truck ABC', rating: null },
    { id: 3, serviceName: 'Tire Rotation', mechanic: 'Mechanic B', date: '2023-10-24', type: 'Maintenance', status: 'Completed', cost: '$75.00', bookedBy: 'Charlie', vehicleAsset: 'SUV 123', rating: '★★★★★' },
  ];

  // Filtered service history based on state
  const filteredHistory = serviceHistory.filter(item => {
    const matchesSearch = item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.bookedBy.toLowerCase().includes(searchQuery.toLowerCase()); // Added bookedBy to search
    const matchesServiceType = serviceType === '' || item.type === serviceType;
    const matchesDateFrom = dateFrom === '' || new Date(item.date) >= new Date(dateFrom);
    const matchesDateTo = dateTo === '' || new Date(item.date) <= new Date(dateTo);
    const matchesTeamMember = teamMember === '' || item.mechanic === teamMember;

    return matchesSearch && matchesServiceType && matchesDateFrom && matchesDateTo && matchesTeamMember;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Responsive table adjustments
  const tableHeaders = [
    { key: 'serviceName', label: 'Service Name' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' },
    { key: 'cost', label: 'Cost' },
    { key: 'mechanic', label: 'Mechanic' },
    { key: 'bookedBy', label: 'Booked By' },
    { key: 'vehicleAsset', label: 'Vehicle/Asset' },
    { key: 'rating', label: 'Rating' },
    { key: 'actions', label: 'Actions' },
  ];

  const handleChat = (mechanic) => {
    alert(`Starting chat with ${mechanic}...`);
  };

  return (
    <UserPortalLayout>
      <h1 className="text-3xl font-bold mb-6 text-primary">Organization Service History</h1>

      {/* Search/Filter Section */}
      <div className="mb-6 p-5 bg-gray-700 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-lightGray">Filter Services</h2>
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search Input */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-lightGray">Search</label>
            <input
              type="text"
              id="search"
              className="mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-500 text-lightGray"
              placeholder="Service name, mechanic, or team member"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Service Type Dropdown */}
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-lightGray">Service Type</label>
            <select
              id="serviceType"
              className="mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-500 text-lightGray"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">All Types</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date Range Pickers */}
          <div>
            <label htmlFor="dateFrom" className="block text-sm font-medium text-lightGray">From</label>
            <input
              type="date"
              id="dateFrom"
              className="mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-500 text-lightGray"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dateTo" className="block text-sm font-medium text-lightGray">To</label>
            <input
              type="date"
              id="dateTo"
              className="mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-500 text-lightGray"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>

          {/* Team Member Filter */}
          <div>
            <label htmlFor="teamMember" className="block text-sm font-medium text-lightGray">Team Member</label>
            <select
              id="teamMember"
              className="mt-1 p-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-gray-500 text-lightGray"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
            >
              <option value="">All Members</option>
              {teamMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Service History Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full service-history-table divide-y bg-gray-500 border border-gray-700">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Service Name</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Date</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Status</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Cost</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Mechanic</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Booked By</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Vehicle/Asset</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Rating</th>
              <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className={`hover:bg-gray-300 ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-550'} text-gray-800`}>
                <td className="py-3 px-4 border-b border-gray-700">{item.serviceName}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.date}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.status}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.cost}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.mechanic}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.bookedBy}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.vehicleAsset}</td>
                <td className="py-3 px-4 border-b border-gray-700">{item.rating || 'N/A'}</td>
                <td className="py-3 px-4 flex flex-wrap gap-1 items-center border-b">
                  <button title="View Details"><EyeIcon className="h-5 w-5 text-blue-600" /></button>
                  <button title="Download Receipt"><ArrowDownTrayIcon className="h-5 w-5 text-green-600" /></button>
                  <button title="Rate Service"><StarIcon className="h-5 w-5 text-primary" /></button>
                  <button onClick={() => handleChat(item.mechanic)} title="Contact"><ChatBubbleLeftIcon className="h-5 w-5 text-white" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-6 flex justify-center">
        <nav>
          <ul className="inline-flex items-center -space-x-px">
            {Array.from({ length: Math.ceil(filteredHistory.length / itemsPerPage) }, (_, i) => (
              <li key={i}>
                <button
                  onClick={() => paginate(i + 1)}
                  className={`py-2 px-3 leading-tight text-lightGray bg-dark border border-gray-700 hover:bg-darkGray hover:text-primary ${currentPage === i + 1 ? 'bg-primary text-dark' : ''}`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div> */}
      <footer className="bg-dark text-primary text-center py-4 text-sm fixed bottom-0 left-0 w-full">
         &copy; {new Date().getFullYear()} Musibau AutoWorks. All rights reserved.
      </footer>
    </UserPortalLayout>
  );
};

export default OrganizationServiceHistoryPage;
