import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For drill-down links
import LoadingSpinner from '../components/LoadingSpinner'; // Assuming LoadingSpinner is available
import { FiEye, FiDownload, FiMessageCircle, FiFilter, FiSearch, FiCalendar, FiUser, FiTool, FiUsers, FiDollarSign, FiClock, FiActivity, FiTrendingUp, FiAward, FiBriefcase, FiUserPlus } from 'react-icons/fi'; // Import icons for actions and filters

const ServiceHistory = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setServices([
        { id: 1, customer: 'John Doe', organization: 'Global Solutions', serviceType: 'Oil Change', mechanic: 'Mike', status: 'Completed', date: '2023-10-20', hasReceipt: true },
        { id: 2, customer: 'Jane Smith', organization: null, serviceType: 'Tire Rotation', mechanic: 'Sarah', status: 'Completed', date: '2023-10-25', hasReceipt: true },
        { id: 3, customer: 'Acme Corp', organization: 'Acme Corp', serviceType: 'Brake Inspection', mechanic: 'Mike', status: 'Cancelled', date: '2023-10-28', hasReceipt: false },
        { id: 4, customer: 'Bob Johnson', organization: null, serviceType: 'Engine Tune-up', mechanic: 'John', status: 'Pending', date: '2023-10-29', hasReceipt: false },
        { id: 5, customer: 'Global Solutions', organization: 'Global Solutions', serviceType: 'Wheel Alignment', mechanic: 'Sarah', status: 'Completed', date: '2023-10-30', hasReceipt: true },
        { id: 6, customer: 'Alice Brown', organization: null, serviceType: 'Exhaust Repair', mechanic: 'Mike', status: 'Pending', date: '2023-11-01', hasReceipt: false },
        { id: 7, customer: 'Tech Innovations', organization: 'Tech Innovations', serviceType: 'Battery Check', mechanic: 'John', status: 'Completed', date: '2023-11-02', hasReceipt: true },
        { id: 8, customer: 'Charlie Davis', organization: null, serviceType: 'AC Service', mechanic: 'Sarah', status: 'Cancelled', date: '2023-11-03', hasReceipt: false },
        { id: 9, customer: 'Future Enterprises', organization: 'Future Enterprises', serviceType: 'Transmission Fluid Change', mechanic: 'Mike', status: 'Completed', date: '2023-11-04', hasReceipt: true },
        { id: 10, customer: 'Diana Miller', organization: null, serviceType: 'Brake Pad Replacement', mechanic: 'John', status: 'Pending', date: '2023-11-05', hasReceipt: false },
      ]);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCustomer, setFilterCustomer] = useState('all');
  const [filterServiceType, setFilterServiceType] = useState('all');
  const [filterMechanic, setFilterMechanic] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Extract unique values for filters
  const uniqueCustomers = [...new Set(services.map(s => s.customer))];
  const uniqueOrganizations = [...new Set(services.map(s => s.organization).filter(Boolean))]; // Filter out nulls
  const uniqueServiceTypes = [...new Set(services.map(s => s.serviceType))];
  const uniqueMechanics = [...new Set(services.map(s => s.mechanic))];
  const uniqueStatuses = ['Pending', 'Completed', 'Cancelled'];

  const filteredServices = services.filter(service => {
    const matchesSearch =
      service.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.organization && service.organization.toLowerCase().includes(searchTerm.toLowerCase())) ||
      service.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.mechanic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCustomerOrOrg = filterCustomer === 'all' ||
      (filterCustomer !== 'all' && (
        (filterCustomer === 'Individual' && !service.organization) ||
        (filterCustomer === 'Organization' && service.organization) ||
        (service.organization && service.organization === filterCustomer) || // For specific org filter
        (!service.organization && filterCustomer === service.customer) // For specific customer filter
      ));

    const matchesServiceType = filterServiceType === 'all' || service.serviceType === filterServiceType;
    const matchesMechanic = filterMechanic === 'all' || service.mechanic === filterMechanic;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;

    const serviceDate = new Date(service.date);
    const today = new Date();
    const matchesDateRange = (() => {
      if (filterDateRange === 'all') return true;
      if (filterDateRange === 'today') {
        return serviceDate.toDateString() === today.toDateString();
      }
      if (filterDateRange === 'this_week') {
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDayOfWeek = new Date(firstDayOfWeek);
        lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
        return serviceDate >= firstDayOfWeek && serviceDate <= lastDayOfWeek;
      }
      if (filterDateRange === 'this_month') {
        return serviceDate.getMonth() === today.getMonth() && serviceDate.getFullYear() === today.getFullYear();
      }
      return true;
    })();

    return matchesSearch && matchesCustomerOrOrg && matchesServiceType && matchesMechanic && matchesStatus && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 dark:text-white">Service History</h1>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          {/* Search */}
          <div className="flex items-center flex-grow min-w-[200px]">
            <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm w-full"
              placeholder="Search services..."
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Customer/Organization Filter */}
            <select
              id="customerFilter"
              value={filterCustomer}
              onChange={(e) => setFilterCustomer(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Customers/Orgs</option>
              <option value="Individual">Individuals</option>
              {uniqueOrganizations.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>

            {/* Service Type Filter */}
            <select
              id="serviceTypeFilter"
              value={filterServiceType}
              onChange={(e) => setFilterServiceType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Service Types</option>
              {uniqueServiceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Mechanic Filter */}
            <select
              id="mechanicFilter"
              value={filterMechanic}
              onChange={(e) => setFilterMechanic(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Mechanics</option>
              {uniqueMechanics.map(mechanic => (
                <option key={mechanic} value={mechanic}>{mechanic}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {/* Date Range Filter */}
            <select
              id="dateFilter"
              value={filterDateRange}
              onChange={(e) => setFilterDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredServices.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No services found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer/Org</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentServices.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {service.organization ? (
                          <Link to={`/admin/organizations/${service.organization.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-600 hover:underline">
                            {service.organization}
                          </Link>
                        ) : (
                          <Link to={`/admin/customers/${service.customer.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-600 hover:underline">
                            {service.customer}
                          </Link>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.serviceType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.mechanic}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          service.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          service.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        {/* Actions with Icons and Tooltips */}
                        <button
                          onClick={() => alert('View functionality not yet implemented')}
                          className="text-blue-600 hover:text-blue-800"
                          title="View Details"
                        >
                          <FiEye className="inline-block" />
                        </button>
                        {service.hasReceipt && (
                          <button
                            onClick={() => alert('Download PDF functionality not yet implemented')}
                            className="text-green-600 hover:text-green-800"
                            title="Download Receipt"
                          >
                            <FiDownload className="inline-block" />
                          </button>
                        )}
                        {/* Placeholder for Chat icon */}
                        <button
                          onClick={() => alert('Chat functionality not yet implemented')}
                          className="text-gray-600 hover:text-gray-800"
                          title="Chat with Customer"
                        >
                          <FiMessageCircle className="inline-block" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded-md border text-sm font-medium ${
                      currentPage === page
                        ? 'bg-primary text-dark border-primary'
                        : 'border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md border border-gray-300 bg-primary text-dark hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ServiceHistory;
