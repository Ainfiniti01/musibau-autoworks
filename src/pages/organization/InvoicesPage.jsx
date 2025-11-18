import React, { useState } from 'react';
import UserPortalLayout from '../../components/UserPortalLayout';
import { EyeIcon, XMarkIcon, CalendarIcon } from '@heroicons/react/24/solid'; // Import necessary icons
import { FiEye, FiDownload, FiMessageCircle, FiFilter, FiSearch, FiCalendar, FiUser, FiTool, FiUsers, FiDollarSign, FiClock, FiActivity, FiTrendingUp, FiAward, FiBriefcase, FiUserPlus } from 'react-icons/fi'; 

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([
    { id: 1, date: '2025-08-01', customer: 'John Doe', service: 'Oil Change', amount: 50, status: 'Paid' },
    { id: 2, date: '2025-08-08', customer: 'Jane Smith', service: 'Brake Repair', amount: 150, status: 'Unpaid' },
  ]);

  const [filters, setFilters] = useState({
    dateRange: '',
    status: '',
    customer: '',
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [downloadedInvoice, setDownloadedInvoice] = useState(null);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
  };

  const handleDownloadInvoice = (invoice) => {
    setDownloadedInvoice(invoice);
  };

  const handleCloseDownloadModal = () => {
    setDownloadedInvoice(null);
  };

  return (
    <UserPortalLayout>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-primary">Invoices</h1>

        {/* Filters */}
        <div className="mb-6 p-5 bg-gray-600 rounded-lg flex flex-wrap gap-4 items-center text-lightGray">
          <label htmlFor="dateRange" className="mr-2">Date Range:</label>
          <input
            type="text"
            id="dateRange"
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            className="p-2 border border-gray-700 rounded-md w-40 bg-gray-500 text-lightGray"
          />

          <label htmlFor="status" className="mr-2">Status:</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border border-gray-700 rounded-md w-40 bg-gray-500 text-lightGray"
          >
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>

          <label htmlFor="customer" className="mr-2">Customer:</label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={filters.customer}
            onChange={handleFilterChange}
            className="p-2 border border-gray-700 rounded-md w-40 bg-gray-500 text-lightGray"
          />
        </div>

        {/* Invoice List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full booking-history-table bg-gray-500 border border-gray-700 table-wrapper">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Invoice ID</th>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Date</th>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Customer</th>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Service</th>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Amount</th>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Status</th>
                <th className="py-3 px-4 border-b border-gray-700 text-white text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={invoice.id} className={`hover:bg-gray-300 ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-550'} text-gray-800`}>
                  <td className="py-3 px-4 border-b border-gray-700">{invoice.id}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{invoice.date}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{invoice.customer}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{invoice.service}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{invoice.amount}</td>
                  <td className="py-3 px-4 border-b border-gray-700">{invoice.status}</td>
                  <td className="border border-gray-300 p-2 py-3 px-3 flex flex-wrap gap-1 items-center border-b">
                      <button onClick={() => handleViewInvoice(invoice)} title="View Invoice Details"><EyeIcon className="h-5 w-5 text-blue-600" /></button>
                      <button onClick={() => handleDownloadInvoice(invoice)} title="Download Invoice"><FiDownload className="h-5 w-5 text-green-600" /></button>
                    {invoice.status === 'Unpaid' && (
                      <button className="bg-green-600 hover:bg-primary-dark text-dark font-bold py-1 px-2 rounded text-sm">Pay</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Detail Modal */}
        {selectedInvoice && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="bg-darkGray rounded shadow-lg p-8 w-96 text-lightGray">
              <h2 className="text-xl font-bold mb-4 text-primary">Invoice Details</h2>

              {/* Company Info & Logo */}
              <div className="mb-4">
                <img src="/assets/logo/logo.png" alt="Musibau AutoWorks Logo" className="h-8" />
                <p className="text-sm text-mediumGray">Musibau AutoWorks</p>
                <p className="text-sm text-mediumGray">123 Main Street, Anytown, USA</p>
              </div>

              {/* Invoice Breakdown */}
              <div className="mb-4 text-mediumGray">
                <p>Invoice ID: {selectedInvoice.id}</p>
                <p>Date: {selectedInvoice.date}</p>
                <p>Customer: {selectedInvoice.customer}</p>
                <p>Service: {selectedInvoice.service}</p>
                <p>Parts: $20</p>
                <p>Taxes: $5</p>
                <p>Amount: {selectedInvoice.amount}</p>
              </div>

              {/* Payment Status & Method */}
              <div className="mb-4 text-mediumGray">
                <p>Status: {selectedInvoice.status}</p>
                <p>Payment Method: Credit Card</p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {downloadedInvoice && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="bg-darkGray rounded shadow-lg p-8 w-96 text-lightGray">
              <h2 className="text-xl font-bold mb-4 text-primary">Invoice Summary Report</h2>

              {/* Company Info & Logo */}
              <div className="mb-4">
                <img src="/assets/logo/logo.png" alt="Musibau AutoWorks Logo" className="h-8" />
                <p className="text-sm text-mediumGray">Musibau AutoWorks</p>
                <p className="text-sm text-mediumGray">123 Main Street, Anytown, USA</p>
              </div>

              {/* Invoice Breakdown */}
              <div className="mb-4 text-mediumGray">
                <p>Invoice ID: {downloadedInvoice.id}</p>
                <p>Date: {downloadedInvoice.date}</p>
                <p>Customer: {downloadedInvoice.customer}</p>
                <p>Service: {downloadedInvoice.service}</p>
                <p>Parts: $20</p>
                <p>Taxes: $5</p>
                <p>Amount: {downloadedInvoice.amount}</p>
              </div>

              {/* Payment Status & Method */}
              <div className="mb-4 text-mediumGray">
                <p>Status: {downloadedInvoice.status}</p>
                <p>Payment Method: Credit Card</p>
              </div>

              <div className="flex justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseDownloadModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-dark text-primary text-center py-4 text-sm fixed bottom-0 left-0 w-full">
        <strong>© {new Date().getFullYear()} Musibau AutoWorks. All rights reserved.</strong>
      </footer>
    </UserPortalLayout>
  );
};

export default InvoicesPage;
