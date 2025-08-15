import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // Import toast from react-hot-toast
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Import icons
import { Link } from 'react-router-dom'; // Import Link for navigation

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setCustomers([
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', totalBookings: 3, lastServiceDate: '2023-10-20', organization: 'Global Solutions' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '098-765-4321', totalBookings: 5, lastServiceDate: '2023-10-25', organization: null },
        { id: 3, name: 'Acme Corp', email: 'contact@acmecorp.com', phone: '555-123-4567', totalBookings: 10, lastServiceDate: '2023-10-15', organization: 'Acme Corp' },
        { id: 4, name: 'Bob Johnson', email: 'bob.j@example.com', phone: '111-222-3333', totalBookings: 1, lastServiceDate: '2023-11-01', organization: null },
        { id: 5, name: 'Global Solutions', email: 'info@globalsolutions.com', phone: '444-555-6666', totalBookings: 7, lastServiceDate: '2023-10-18', organization: 'Global Solutions' },
        { id: 6, name: 'Alice Brown', email: 'alice.b@example.com', phone: '777-888-9999', totalBookings: 2, lastServiceDate: '2023-10-22', organization: null },
        { id: 7, name: 'Tech Innovations', email: 'support@techinnovations.com', phone: '222-333-4444', totalBookings: 12, lastServiceDate: '2023-10-10', organization: 'Tech Innovations' },
        { id: 8, name: 'Charlie Davis', email: 'charlie.d@example.com', phone: '999-000-1111', totalBookings: 4, lastServiceDate: '2023-10-28', organization: null },
        { id: 9, name: 'Future Enterprises', email: 'sales@futureent.com', phone: '333-444-5555', totalBookings: 8, lastServiceDate: '2023-10-05', organization: 'Future Enterprises' },
        { id: 10, name: 'Diana Miller', email: 'diana.m@example.com', phone: '666-777-8888', totalBookings: 6, lastServiceDate: '2023-10-29', organization: null },
      ]);
      setIsLoading(false);
    };
    fetchCustomers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'new', 'frequent', 'organization'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [customerToDeleteId, setCustomerToDeleteId] = useState(null);

  const handleViewEditCustomer = (customerToEdit) => {
    setEditingCustomer(customerToEdit);
    setIsModalOpen(true);
    toast.success(`Viewing/Editing customer: ${customerToEdit.name}`);
  };

  const handleDeleteCustomer = (customerId) => {
    setCustomerToDeleteId(customerId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500)); // Simulate API call
      setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerToDeleteId));
      setDeleteConfirmOpen(false);
      setCustomerToDeleteId(null);
      resolve('Customer deleted successfully!');
    });

    toast.promise(deletePromise, {
      loading: 'Deleting customer...',
      success: (message) => message,
      error: 'Failed to delete customer.',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmOpen(false);
    setCustomerToDeleteId(null);
  };

  // Filter customers based on search term and filter type
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = (() => {
      if (filterType === 'all') return true;
      if (filterType === 'new') return customer.totalBookings === 1; // Example: "New" if 1 booking
      if (filterType === 'frequent') return customer.totalBookings >= 5; // Example: "Frequent" if 5 or more bookings
      if (filterType === 'organization') return customer.organization !== null && customer.organization !== undefined; // Filter for customers associated with an organization
      return true;
    })();

    return matchesSearch && matchesFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
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
          <div className="flex items-center gap-2">
            <label htmlFor="filter" className="mr-2 text-gray-700">Filter:</label>
            <select
              id="filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="all">All Customers</option>
              <option value="new">New Customers</option>
              <option value="frequent">Frequent Bookers</option>
              <option value="organization">By Organization</option> {/* Added Organization filter */}
            </select>
          </div>
          <button
            onClick={() => toast.info('CSV Export functionality coming soon!')}
            className="bg-primary text-dark hover:bg-yellow-400 transition font-bold py-2 px-4 rounded"
          >
            Export to CSV
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredCustomers.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No customers found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-dark font-semibold">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</th>
                    {/* New Columns */}
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentCustomers.map((customer, index) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link to={`/admin/customers/${customer.id}?userType=admin`} className="text-blue-600 hover:underline">
                        {customer.name}
                      </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.totalBookings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastServiceDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.organization || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {/* Add actions like Edit/Delete if needed */}
                        <Link to={`/admin/customers/${customer.id}?userType=admin`} className="bg-primary text-dark hover:bg-yellow-400 transition px-3 py-1 rounded flex items-center gap-1">View Details</Link>
                        <button onClick={() => handleDeleteCustomer(customer.id)} className="bg-red text-dark hover:bg-red-500 transition px-3 py-1 rounded flex items-center gap-1">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination Controls */}
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
                    Email: {editingCustomer?.email}
                    <br />
                    Phone: {editingCustomer?.phone}
                    <br />
                    Total Bookings: {editingCustomer?.totalBookings}
                    {/* Display new fields in modal */}
                    <br />
                    Last Service Date: {editingCustomer?.lastServiceDate || 'N/A'}
                    <br />
                    Organization: {editingCustomer?.organization || 'N/A'}
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
    </>
  );
};

export default Customers;
