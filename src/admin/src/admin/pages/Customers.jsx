import React, { useState } from 'react';
import AdminLayout from '../layout/AdminLayout';
import { toast } from 'react-toastify'; // Import toast

const Customers = () => {
  // Mock data for customers, now using useState
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', type: 'Individual', history: '3 services' },
    { id: 2, name: 'Jane Smith', type: 'Corporate', history: '5 services' },
    { id: 3, name: 'Acme Corp', type: 'Corporate', history: '10 services' },
    { id: 4, name: 'Bob Johnson', type: 'Individual', history: '1 service' },
    { id: 5, name: 'Global Solutions', type: 'Corporate', history: '7 services' },
    { id: 6, name: 'Alice Brown', type: 'Individual', history: '2 services' },
    { id: 7, name: 'Tech Innovations', type: 'Corporate', history: '12 services' },
    { id: 8, name: 'Charlie Davis', type: 'Individual', history: '4 services' },
    { id: 9, name: 'Future Enterprises', type: 'Corporate', history: '8 services' },
    { id: 10, name: 'Diana Miller', type: 'Individual', history: '6 services' },
  ]);

  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const itemsPerPage = 5; // Number of items per page

  // Mock states for modal/delete confirmation (no actual forms yet)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [customerToDeleteId, setCustomerToDeleteId] = useState(null);

  const handleEditCustomer = (customerToEdit) => {
    setEditingCustomer(customerToEdit);
    setIsModalOpen(true); // Open a mock modal
    console.log('Editing customer:', customerToEdit);
    toast.info(`Editing customer: ${customerToEdit.name}`);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomerToDeleteId(customerId);
    setDeleteConfirmOpen(true); // Open delete confirmation modal
  };

  const confirmDelete = () => {
    setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerToDeleteId));
    setDeleteConfirmOpen(false);
    toast.success('Customer deleted successfully!');
    setCustomerToDeleteId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmOpen(false);
    setCustomerToDeleteId(null);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.history.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // TODO: Populate customer table with real data
  // TODO: Implement actual customer view/edit form

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Manage Customers</h2>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search customers..."
            />
          </div>
          {/* Add New Customer button - optional for this page based on prompt */}
          {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Customer
          </button> */}
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service History</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentCustomers.map((customer) => ( // Use currentCustomers for pagination
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.history}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleEditCustomer(customer)} className="text-indigo-600 hover:text-indigo-900 mr-2">View/Edit</button>
                  <button onClick={() => handleDeleteCustomer(customer.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 mx-1 rounded-md border text-sm font-medium ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Mock Modal for View/Edit Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {editingCustomer ? `View/Edit Customer: ${editingCustomer.name}` : 'Customer Details'}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    This is a mock modal for viewing/editing customer details.
                    <br />
                    Customer ID: {editingCustomer?.id}
                    <br />
                    Name: {editingCustomer?.name}
                    <br />
                    Type: {editingCustomer?.type}
                    <br />
                    History: {editingCustomer?.history}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.364 3.357l-1.094.364a1 1 0 00-.893.893l-1.094 3.636c-.15.501.106 1.02.653 1.215l.773.193c.47.117.97.175 1.47.175h10.002c.5.001.999-.058 1.47-.175l.773-.193c.547-.195.803-.714.653-1.215l-1.094-.364a1 1 0 00-.893-.893l-1.094-.364zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Delete Customer
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this customer? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={confirmDelete}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  onClick={closeDeleteConfirmModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Customers;
