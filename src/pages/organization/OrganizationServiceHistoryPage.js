import React, { useState, useMemo } from 'react';
import { EyeIcon, ArrowDownTrayIcon, StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid'; // Assuming Heroicons v24

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
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Organization Service History</h1>

        {/* Search/Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search</label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Service name, mechanic, or team member"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Service Type Dropdown */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
              <select
                id="serviceType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">From</label>
              <input
                type="date"
                id="dateFrom"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">To</label>
              <input
                type="date"
                id="dateTo"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            {/* Team Member Filter */}
            <div>
              <label htmlFor="teamMember" className="block text-sm font-medium text-gray-700">Team Member</label>
              <select
                id="teamMember"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Service Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="hidden md:table-row">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle/Asset</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.length > 0 ? (
                  currentItems.map(item => (
                    <tr key={item.id} className="flex flex-col md:table-row mb-4 md:mb-0">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Service Name">{item.serviceName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Date">{item.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Status">{item.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Cost">{item.cost}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Mechanic">{item.mechanic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Booked By">{item.bookedBy}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Vehicle/Asset">{item.vehicleAsset}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Rating">{item.rating || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 block md:table-cell" data-label="Actions">
                        <div className="flex space-x-2">
                          <button title="View Details"><EyeIcon className="h-5 w-5 text-blue-500" /></button>
                          <button title="Download Receipt"><ArrowDownTrayIcon className="h-5 w-5 text-green-500" /></button>
                          <button title="Rate Service"><StarIcon className="h-5 w-5 text-yellow-500" /></button>
                          <button onClick={() => handleChat(item.mechanic)} title="Contact"><ChatBubbleLeftIcon className="h-5 w-5 text-gray-500" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">No service records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <nav>
              <ul className="inline-flex items-center -space-x-px">
                {Array.from({ length: Math.ceil(filteredHistory.length / itemsPerPage) }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === i + 1 ? 'bg-blue-50 text-blue-600' : ''}`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationServiceHistoryPage;
