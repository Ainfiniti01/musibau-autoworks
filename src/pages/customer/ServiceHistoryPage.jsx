import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerPortalLayout from '../../components/CustomerPortalLayout';
import { EyeIcon, ArrowDownTrayIcon, StarIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import RateServiceModal from '../../components/RateServiceModal'; // Reusing the existing RateServiceModal
import ChatModal from '../../components/ChatModal'; // New modal for chat
import { toast } from 'react-toastify';

function ServiceHistoryPage() {
  const navigate = useNavigate();
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
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

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

  const handleViewDetails = (service) => {
    navigate(`/customer/service-history/${service.id}`, { state: service });
  };

  const handleDownloadReceipt = (service) => {
    // Simulate generating and downloading a PDF invoice
    const invoiceContent = `
      Invoice for Service ID: ${service.id}
      Service Name: ${service.serviceName}
      Date: ${service.date}
      Status: ${service.status}
      Cost: ${service.cost}
      Mechanic: ${service.mechanicName}
      Rating: ${service.rating || 'N/A'}

      Thank you for your business!
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice_service_${service.id}.txt`; // Changed to .txt for simple demo
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloading invoice for service ID: ${service.id}`);
  };

  const handleRateServiceClick = (service) => {
    if (service.status === 'Completed' && !service.rated) {
      setSelectedService(service);
      setIsRateModalOpen(true);
    } else if (service.rated) {
      toast.info('You have already rated this service.');
    } else {
      toast.info('Service can only be rated after completion.');
    }
  };

  const handleCloseRateModal = () => {
    setIsRateModalOpen(false);
    setSelectedService(null);
  };

  const handleSubmitRating = (serviceId, rating, comments) => {
    console.log(`Submitting rating for service ${serviceId}: ${rating} stars, comments: "${comments}"`);
    // Simulate API call to update rating
    setServices(prevServices =>
      prevServices.map(s =>
        s.id === serviceId ? { ...s, rating: '★'.repeat(rating) + '☆'.repeat(5 - rating), rated: true } : s
      )
    );
    toast.success(`Service ${serviceId} rated successfully!`);
    handleCloseRateModal();
  };

  const handleChatClick = (service) => {
    setSelectedService(service);
    setIsChatModalOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedService(null);
  };

  const handleSendChatMessage = (message) => {
    if (selectedService) {
      console.log(`Sending chat message for service ${selectedService.id}: "${message}"`);
      toast.success('Message sent to mechanic!');
    }
    handleCloseChatModal();
  };

  return (
    <CustomerPortalLayout>
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
          className="p-2 border border-gray-300 rounded-md flex items-center gap-1 bg-slate-50"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort: {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="table-wrapper">
        <table className="service-history-table bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Service Name</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Date</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Status</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Cost</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Mechanic</th>
              <th className="py-3 px-4 border-b text-gray-800 text-left">Rating</th>
              <th className="py-3 px-2 border-b text-gray-800 text-left">Actions</th>
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
                <td className="py-3 px-2 border-b flex gap-2">
                  <div className="flex space-x-2">
                    <button onClick={() => handleViewDetails(service)} title="View Details">
                      <EyeIcon className="h-5 w-5 text-blue-500 inline-block" />
                    </button>
                    <button
                      onClick={() => handleDownloadReceipt(service)}
                      title={service.status === 'Completed' ? 'Download Receipt' : 'Download unavailable for non-completed services'}
                      disabled={service.status !== 'Completed'}
                      className={`${service.status !== 'Completed' ? 'opacity-50 cursor-not-allowed' : 'text-green-500 hover:text-green-700'}`}
                    >
                      <ArrowDownTrayIcon className="h-5 w-5 inline-block" />
                    </button>
                    <button
                      onClick={() => handleRateServiceClick(service)}
                      title={service.status === 'Completed' && !service.rated ? 'Rate Service' : service.rated ? 'Service already rated' : 'Rate unavailable for non-completed services'}
                      disabled={service.status !== 'Completed' || service.rated}
                      className={`${service.status !== 'Completed' || service.rated ? 'opacity-50 cursor-not-allowed' : 'text-yellow-500 hover:text-yellow-700'}`}
                    >
                      <StarIcon className="h-5 w-5 inline-block" />
                    </button>
                    <button onClick={() => handleChatClick(service)} title="Chat with Mechanic">
                      <ChatBubbleLeftIcon className="h-5 w-5 text-gray-500 inline-block" />
                    </button>
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

      {selectedService && (
        <RateServiceModal
          isOpen={isRateModalOpen}
          onClose={handleCloseRateModal}
          onSubmit={handleSubmitRating}
          serviceId={selectedService.id}
        />
      )}

      {selectedService && (
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={handleCloseChatModal}
          onSend={handleSendChatMessage}
          serviceId={selectedService.id}
          mechanicName={selectedService.mechanicName}
        />
      )}
    </CustomerPortalLayout>
  );
}

export default ServiceHistoryPage;
