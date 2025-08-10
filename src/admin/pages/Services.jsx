import React, { useState, useEffect } from 'react';
import ServiceForm from '../components/ServiceForm'; // Import ServiceForm
import toast from 'react-hot-toast'; // Import toast from react-hot-toast
import LoadingSpinner from '../components/LoadingSpinner'; // Import LoadingSpinner
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Import icons

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    // Simulate fetching data
    const fetchServices = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setServices([
        { id: 1, title: 'Oil Change', description: 'Standard oil and filter change', category: 'Maintenance' },
        { id: 2, title: 'Tire Rotation', description: 'Rotate and balance tires', category: 'Maintenance' },
        { id: 3, title: 'Brake Inspection', description: 'Inspect brake pads and rotors', category: 'Inspection' },
        { id: 4, title: 'Engine Tune-up', description: 'Comprehensive engine check and adjustment', category: 'Maintenance' },
        { id: 5, title: 'Wheel Alignment', description: 'Align wheels for optimal tire wear', category: 'Suspension' },
        { id: 6, title: 'Exhaust Repair', description: 'Fix or replace damaged exhaust components', category: 'Exhaust' },
        { id: 7, title: 'Battery Check', description: 'Test battery health and charge', category: 'Electrical' },
        { id: 8, title: 'AC Service', description: 'Recharge and inspect air conditioning system', category: 'HVAC' },
        { id: 9, title: 'Transmission Fluid Change', description: 'Flush and replace transmission fluid', category: 'Drivetrain' },
        { id: 10, title: 'Brake Pad Replacement', description: 'Replace worn brake pads', category: 'Brakes' },
        { id: 11, title: 'Suspension Check', description: 'Inspect suspension components for wear', category: 'Suspension' },
        { id: 12, title: 'Headlight Restoration', description: 'Restore clarity to faded headlights', category: 'Electrical' },
      ]);
      setIsLoading(false);
    };
    fetchServices();
  }, []); // Empty dependency array means this effect runs once on mount

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [serviceToDeleteId, setServiceToDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddService = (newService) => {
    const actionPromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500)); // Simulate API call
      if (editingService) {
        setServices(prevServices =>
          prevServices.map(service =>
            service.id === editingService.id ? { ...newService, id: service.id } : service
          )
        );
        resolve('Service updated successfully!');
      } else {
        const serviceWithId = { ...newService, id: services.length + 1 };
        setServices(prevServices => [...prevServices, serviceWithId]);
        resolve('Service added successfully!');
      }
      setIsModalOpen(false);
      setEditingService(null);
    });

    toast.promise(actionPromise, {
      loading: editingService ? 'Updating service...' : 'Adding service...',
      success: (message) => message,
      error: 'Failed to perform action.',
    });
  };

  const handleEditService = (serviceToEdit) => {
    setEditingService(serviceToEdit); // Set the service to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleDeleteService = (serviceId) => {
    setServiceToDeleteId(serviceId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      await new Promise(res => setTimeout(res, 500)); // Simulate API call
      setServices(prevServices => prevServices.filter(service => service.id !== serviceToDeleteId));
      setDeleteConfirmOpen(false);
      setServiceToDeleteId(null);
      resolve('Service deleted successfully!');
    });

    toast.promise(deletePromise, {
      loading: 'Deleting service...',
      success: (message) => message,
      error: 'Failed to delete service.',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null); // Clear editing service when closing modal
  };

  const closeDeleteConfirmModal = () => {
    setDeleteConfirmOpen(false);
    setServiceToDeleteId(null);
  };

  // Filter services based on search term
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
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
      <h2 className="text-2xl font-bold mb-4">Manage Services</h2>

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
              placeholder="Search services..."
            />
          </div>
          <button
            onClick={() => {
              setEditingService(null);
              setIsModalOpen(true);
            }}
            className="bg-primary text-dark hover:bg-yellow-400 transition font-bold py-2 px-4 rounded"
          >
            Add New Service
          </button>
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentServices.map((service) => (
                    <tr key={service.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {service.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleEditService(service)} className="bg-primary text-dark hover:bg-yellow-400 transition mr-2">
                          <FiEdit className="inline-block mr-1" />Edit
                        </button>
                        <button onClick={() => handleDeleteService(service.id)} className="bg-primary text-dark hover:bg-yellow-400 transition">
                          <FiTrash2 className="inline-block mr-1" />Delete
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

      {/* Modal for Service Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      {editingService ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    <div className="mt-2">
                      <ServiceForm onSubmit={handleAddService} initialData={editingService} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
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
                      Delete Service
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this service? This action cannot be undone.
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

export default Services;
