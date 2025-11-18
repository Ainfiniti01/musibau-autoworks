import { get } from '../../utils/api';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // Import toast from react-hot-toast
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi'; // Import icons
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for confirmation modal
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [itemToConfirm, setItemToConfirm] = useState(null);
  const [actionToConfirm, setActionToConfirm] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const data = await get('/api/customers.php'); // Replaced with dummy data
        const data = { data: [
          { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890', totalBookings: 5, lastServiceDate: '2024-08-15', organization: 'Acme Corp', userType: 'Admin' },
          { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210', totalBookings: 2, lastServiceDate: '2024-08-10', organization: null, userType: 'Guest' },
          { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', phone: '111-222-3333', totalBookings: 1, lastServiceDate: '2024-08-01', organization: null, userType: 'Guest' },
          { id: 4, name: 'Alice Wonderland', email: 'alice.w@example.com', phone: '444-555-6666', totalBookings: 10, lastServiceDate: '2024-08-18', organization: 'Wonderland Inc.', userType: 'Organization' },
        ]};
        setCustomers(data.data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally{
        setIsLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'new', 'frequent', 'organization', 'guest'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // State for the mock edit modal (will be replaced by confirmation modal)
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingCustomer, setEditingCustomer] = useState(null);

  // State for delete confirmation modal
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [customerToDeleteId, setCustomerToDeleteId] = useState(null);

  // Function to open confirmation modal
  const openConfirmationModal = (item, action) => {
    setItemToConfirm(item);
    setActionToConfirm(action);
    setIsConfirmationModalOpen(true);
  };

  // Function to close confirmation modal
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setItemToConfirm(null);
    setActionToConfirm('');
  };

  // Handler for confirming an action
  const handleConfirmAction = () => {
    if (!itemToConfirm) return;

    if (actionToConfirm === 'delete-customer') {
      confirmDeleteCustomer(itemToConfirm.id); // Call the actual delete function
    } else if (actionToConfirm === 'convert-account') {
      // Placeholder for account conversion logic
      alert(`Converting account to ${itemToConfirm.newAccountType}...`);
      closeConfirmationModal();
    }
    // Add other actions here if needed
  };

  // Function to handle editing a customer (now directly navigates)
  const handleEditCustomer = (customerToEdit) => {
    navigate(`/admin/customers/edit/${customerToEdit.id}`);
  };

  // Function to handle deleting a customer (triggers confirmation modal)
  const handleDeleteCustomer = (customerId) => {
    openConfirmationModal({ id: customerId }, 'delete-customer'); // Pass customer ID to modal
  };

  // Actual deletion logic (called after confirmation)
  const confirmDeleteCustomer = (customerId) => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        await new Promise(res => setTimeout(res, 500)); // Simulate API call
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== customerId));
        resolve('Customer deleted successfully!');
      } catch (error) {
        reject(error.message);
      } finally {
        closeConfirmationModal(); // Close modal after action
      }
    });

    toast.promise(deletePromise, {
      loading: 'Deleting customer...',
      success: (message) => message,
      error: 'Failed to delete customer.',
    });
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
      if (filterType === 'guest') return customer.userType === 'Guest'; // Filter for guest customers
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
              <option value="guest">Guest Customers</option> {/* Added Guest filter */}
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
            {error ? (
              <p className="text-center text-red-500 py-8">{error}</p>
            ) : filteredCustomers.length === 0 ? (
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
                        {customer.userType === 'Guest' && (
                          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-semibold">
                            Guest
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.totalBookings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastServiceDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.organization || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/admin/customers/${customer.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 inline-flex items-center">
                          <FiEye className="inline-block mr-1" /> Details
                        </Link>
                        {/* Edit Customer Button - triggers confirmation modal */}
                        <button onClick={() => handleEditCustomer(customer)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                          <FiEdit className="inline-block mr-1" /> Edit
                        </button>
                        {/* Delete Customer Button - triggers confirmation modal */}
                        <button onClick={() => handleDeleteCustomer(customer.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                          <FiTrash2 className="inline-block mr-1" /> Delete
                        </button>
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

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && itemToConfirm && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleConfirmAction}
          title={
            actionToConfirm === 'delete-customer' ? 'Confirm Delete Customer' :
            actionToConfirm === 'convert-account' ? 'Confirm Account Conversion' :
            'Confirm Action'
          }
          message={
            actionToConfirm === 'delete-customer' ? `This action is irreversible. Do you want to delete customer ${itemToConfirm.name}?` :
            actionToConfirm === 'convert-account' ? `Convert this account to ${itemToConfirm.newAccountType}? This may affect how data is handled.` :
            'Are you sure you want to perform this action?'
          }
          confirmButtonText={
            actionToConfirm === 'delete-customer' ? 'Delete Customer' :
            actionToConfirm === 'convert-account' ? `Convert to ${itemToConfirm.newAccountType}` :
            'Confirm'
          }
        />
      )}
    </>
  );
};

export default Customers;
