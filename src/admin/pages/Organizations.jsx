import { get } from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation
import LoadingSpinner from '../components/LoadingSpinner'; // Assuming LoadingSpinner is available
import { FiPlus, FiEdit, FiTrash2, FiEye, FiUserPlus} from 'react-icons/fi';

const Organizations = () => {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setError(null);
        setOrganizations([
          { id: 1, name: 'Global Solutions', totalBookings: 7, activeCustomers: 5, lastServiceDate: '2023-10-18' },
          { id: 2, name: 'Acme Corp', totalBookings: 10, activeCustomers: 8, lastServiceDate: '2023-10-15' },
          { id: 3, name: 'Tech Innovations', totalBookings: 12, activeCustomers: 10, lastServiceDate: '2023-10-10' },
          { id: 4, name: 'Future Enterprises', totalBookings: 8, activeCustomers: 6, lastServiceDate: '2023-10-05' },
        ]);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchOrganizations();
  }, []);

  // Placeholder for search and filter functionality if needed later
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrganizations.length / itemsPerPage);
  const currentOrganizations = filteredOrganizations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [organizationToDeleteId, setOrganizationToDeleteId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteOrganization = (organizationId) => {
    setOrganizationToDeleteId(organizationId);
    setDeleteConfirmOpen(true);
  };

  const handleEditOrganization = (organization) => {
    navigate(`/admin/organizations/edit/${organization.id}`);
  };

  const confirmDelete = () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500)); // Simulate API call
      setOrganizations(prevOrganizations => prevOrganizations.filter(org => org.id !== organizationToDeleteId));
      setDeleteConfirmOpen(false);
      setOrganizationToDeleteId(null);
      resolve('Organization deleted successfully!');
    });

    toast.promise(deletePromise, {
      loading: 'Deleting organization...',
      success: (message) => message,
      error: 'Failed to delete organization.',
    });
  };

    //         } catch (error) {
    //             reject('Failed to delete guest.');
    //         }
    //     });

    //     toast.promise(deletePromise, {
    //         loading: 'Deleting guest...',
    //         success: (message) => message,
    //         error: (message) => message,
    //     });
    // };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 dark:text-white">Manage Organizations</h1>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <label htmlFor="search" className="mr-2 text-gray-700">Search:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search organizations..."
            />
          </div>
          {/* Add more filters here if needed */}
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {filteredOrganizations.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No organizations found.</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary text-dark font-semibold">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Customers</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Service Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentOrganizations.map((org) => (
                    <tr key={org.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link to={`/admin/organizations/${org.id}`} className="text-blue-600 hover:underline">
                          {org.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.totalBookings}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.activeCustomers}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{org.lastServiceDate || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/admin/organizations/${org.id}`} className="bg-blue-500 text-white px-2 py-1 rounded mr-2 inline-flex items-center">
                            <FiEye className="inline-block mr-1" /> Details
                        </Link>
                        {/* Edit Organization Button - triggers confirmation modal */}
                        <button onClick={() => handleEditOrganization(org)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                          <FiEdit className="inline-block mr-1" /> Edit
                        </button>
                        <button onClick={() => handleDeleteOrganization(org.id)} className="bg-red-500 text-white px-2 py-1 rounded inline-flex items-center">
                            <FiTrash2 className="inline-block mr-1" /> Delete
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
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this organization? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Organizations;
