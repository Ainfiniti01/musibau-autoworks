import React, { useState } from 'react';
import Footer from '../../components/MinimalFooter.js';
import PageLayout from '../../components/ui/PageLayout'; // Import PageLayout
import { EyeIcon, ArrowDownTrayIcon, StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';

function ServiceHistoryPage() {
  const [services, setServices] = useState([
    { id: 1, serviceName: 'Oil Change', date: '2023-10-26', status: 'Completed', cost: '$50', mechanicName: 'John Doe', rating: '★★★★☆' },
    { id: 2, serviceName: 'Engine Diagnosis', date: '2023-11-15', status: 'Completed', cost: '$100', mechanicName: 'Jane Smith', rating: '★★★★★' },
    { id: 3, serviceName: 'Tire Rotation', date: '2023-12-01', status: 'In Progress', cost: '$30', mechanicName: 'John Doe', rating: null },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const serviceTypes = [...new Set(services.map(service => service.serviceName))];

  const filteredServices = services
    .filter(service => {
    const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.mechanicName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === '' || service.serviceName === filterType;
    const matchesDate = (filterDateRange.start === '' || service.date >= filterDateRange.start) &&
                        (filterDateRange.end === '' || service.date <= filterDateRange.end);
    return matchesSearch && matchesType && matchesDate;
  })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServices.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleViewDetails = (serviceId) => {
    alert(`Viewing details for service ID: ${serviceId}`);
    // Logic to navigate to a detailed view or open a modal
  };

  const handleDownloadReceipt = (serviceId) => {
    alert(`Downloading receipt for service ID: ${serviceId}`);
    // Logic to download receipt
  };

  const handleRateService = (serviceId) => {
    alert(`Rating service ID: ${serviceId}`);
    // Logic to rate service
  };

  const handleContactMechanic = (mechanicName) => {
    alert(`Contacting ${mechanicName}`);
    // Logic to contact mechanic
  };

  return (
    <PageLayout title="Musibau AutoWorks - Service History">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">My Service History</h1>

        <div className="mb-6 flex flex-wrap gap-4  text-gray-800">
          <input
            type="text"
            placeholder="Search by service or mechanic..."
            className="p-2 border border-gray-300 rounded-md flex-grow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Service Types</option>
            {serviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={filterDateRange.start}
              onChange={(e) => setFilterDateRange({ ...filterDateRange, start: e.target.value })}
            />
            <span>-</span>
            <input
              type="date"
              className="p-2 border border-gray-300 rounded-md"
              value={filterDateRange.end}
              onChange={(e) => setFilterDateRange({ ...filterDateRange, end: e.target.value })}
            />
          </div>
          <button
            className="p-2 border border-gray-300 rounded-md flex items-center gap-1"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            Sort: {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Service Name</th>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Date</th>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Status</th>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Cost</th>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Mechanic</th>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Rating</th>
                <th className="py-3 px-4 border-b  text-gray-800 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((service, index) => (
                <tr key={service.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                  <td className="py-3 px-4 border-b text-gray-800">{service.serviceName}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{service.date}</td>
                  <td className="py-3 px-4 border-b text-gray-800">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      service.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      service.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">{service.cost}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{service.mechanicName}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{service.rating || 'N/A'}</td>
                  <td className="py-3 px-4 border-b flex gap-2">
                    <div className="flex space-x-2">
                      <button title="View Details"><EyeIcon className="h-5 w-5 text-blue-500" /></button>
                      <button title="Download Receipt"><ArrowDownTrayIcon className="h-5 w-5 text-green-500" /></button>
                      <button title="Rate Service"><StarIcon className="h-5 w-5 text-yellow-500" /></button>
                      <button onClick={() => handleChat(item.mechanic)} title="Contact"><ChatBubbleLeftIcon className="h-5 w-5 text-gray-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-center">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {Array.from({ length: Math.ceil(filteredServices.length / itemsPerPage) }, (_, i) => (
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
    </PageLayout>
  );
}

export default ServiceHistoryPage;
