import { get } from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import LoadingSpinner from '../components/LoadingSpinner';
import { FiEye, FiDownload, FiMessageCircle, FiEdit, FiTrash2 } from 'react-icons/fi'; // Added FiTrash2 for delete
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal
import { useParams } from 'react-router-dom'; // Import useParams

const CustomerDetail = () => {
  const { id: customerId } = useParams(); // Get customerId from route params
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [customerBookings, setCustomerBookings] = useState([]);
  const [customerServices, setCustomerServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  // State for confirmation modal
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [itemToConfirm, setItemToConfirm] = useState(null);
  const [actionToConfirm, setActionToConfirm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors
      try {
        // Fetch customer details
        const customerData = await get(`/api/customers.php?id=${customerId}`);
        setCustomer(customerData.data); // Assuming API returns { data: customerObject }

        // Fetch customer bookings
        const bookingsData = await get(`/api/bookings.php?customer_id=${customerId}`);
        setCustomerBookings(bookingsData.data); // Assuming API returns { data: arrayOfBookings }

        // Fetch customer services (if different from bookings or a separate concept)
        // For now, let's assume services are derived from bookings or a separate endpoint
        // If services are distinct, you'd fetch from a different endpoint:
        // const servicesData = await get(`/api/services_history.php?customer_id=${customerId}`);
        // setCustomerServices(servicesData.data);
        // For now, using bookings as services for demonstration if no separate service history API
        setCustomerServices(bookingsData.data.map(booking => ({
          id: booking.id,
          serviceType: booking.service, // Assuming 'service' field in booking
          mechanic: booking.mechanic || 'N/A', // Assuming 'mechanic' field or default
          status: booking.status,
          date: booking.date,
        })));

      } catch (err) {
        setError(err.message || 'Failed to fetch customer details.');
        console.error('Error fetching customer details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (customerId) {
      fetchData();
    }
  }, [customerId]);

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

    if (actionToConfirm === 'edit-customer') {
      navigate(`/admin/customers/edit/${itemToConfirm.id}`);
    } else if (actionToConfirm === 'edit-notes') {
      // Logic to save edited notes would go here
      alert('Saving edited notes...');
      closeConfirmationModal();
    } else if (actionToConfirm === 'delete-customer') {
      // Logic to delete customer would go here
      alert('Deleting customer...');
      closeConfirmationModal();
    } else if (actionToConfirm === 'convert-account') {
      // Logic to convert account type would go here
      alert(`Converting account to ${itemToConfirm.newAccountType}...`);
      closeConfirmationModal();
    }
    // else if (actionToConfirm === 'delete-booking') {
    //   // Logic to delete booking would go here
    //   alert('Deleting booking...');
    //   closeConfirmationModal();
    // }
  };

  const handleEditNotes = () => {
    // This function would typically open an editable field or a modal for notes
    // For now, we'll trigger the confirmation modal to simulate the edit process
    openConfirmationModal(customer, 'edit-notes');
  };

  const handleDeleteCustomer = (customerId) => {
    openConfirmationModal(customerId, 'delete-customer');
  };

  const handleConvertAccountType = (customerId, newType) => {
    // For demonstration, we'll pass the new type along with the customer ID
    openConfirmationModal({ id: customerId, newAccountType: newType }, 'convert-account');
  };

  if (isLoading || !customer) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          {customer.name} Details
        </h1>
        {/* Edit Customer Button - triggers confirmation modal */}
        <button onClick={() => openConfirmationModal(customer, 'edit-customer')} className="text-blue-600 hover:text-blue-800" title="Edit Customer">
          <FiEdit className="inline-block mr-1" /> Edit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Customer Info Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Customer Information</h2>
            {/* Edit Customer Button - triggers confirmation modal */}
            <button onClick={() => openConfirmationModal(customer, 'edit-customer')} className="text-blue-600 hover:text-blue-800" title="Edit Customer">
              <FiEdit className="inline-block mr-1" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Full Name</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Email</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Phone</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Address</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.address}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Joined Date</p>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.joinedDate}</p>
            </div>
            {customer.organization && (
              <div>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Organization</p>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  <Link to={`/admin/organizations/${customer.organizationId}`} className="text-blue-600 hover:underline">
                    {customer.organization}
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notes</h2>
            {/* Edit Notes Button - triggers confirmation modal */}
            <button onClick={handleEditNotes} className="text-blue-600 hover:text-blue-800" title="Edit Notes">
              <FiEdit className="inline-block mr-1" /> Edit
            </button>
          </div>
          <p className="text-lg font-medium text-gray-900 dark:text-white">{customer.notes || 'No notes available.'}</p>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 mb-8 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Recent Bookings</h2>
        {customerBookings.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No bookings found for this customer.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.mechanic}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => alert('View booking details not implemented')}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FiEye className="inline-block" />
                    </button>
                    {booking.hasReceipt && (
                      <button
                        onClick={() => alert('Download receipt not implemented')}
                        className="text-green-600 hover:text-green-800"
                        title="Download Receipt"
                      >
                        <FiDownload className="inline-block" />
                      </button>
                    )}
                    {/* Delete Booking Button - triggers confirmation modal */}
                    <button
                      onClick={() => openConfirmationModal(booking, 'delete-booking')}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Booking"
                    >
                      <FiTrash2 className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Service History Section */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Service History</h2>
        {customerServices.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No service history found for this customer.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerServices.map((service) => (
                <tr key={service.id}>
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
                    {/* Delete Service Button - triggers confirmation modal */}
                    <button
                      onClick={() => openConfirmationModal(service, 'delete-service')}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Service"
                    >
                      <FiTrash2 className="inline-block" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirmationModalOpen && itemToConfirm && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleConfirmAction}
          title={
            actionToConfirm === 'edit-customer' ? 'Confirm Edit Customer' :
            actionToConfirm === 'edit-notes' ? 'Confirm Edit Notes' :
            actionToConfirm === 'delete-customer' ? 'Confirm Delete Customer' :
            actionToConfirm === 'delete-booking' ? 'Confirm Delete Booking' :
            actionToConfirm === 'delete-service' ? 'Confirm Delete Service' :
            actionToConfirm === 'convert-account' ? 'Confirm Account Conversion' :
            'Confirm Action'
          }
          message={
            actionToConfirm === 'edit-customer' ? `Are you sure you want to edit ${itemToConfirm.name}'s information?` :
            actionToConfirm === 'edit-notes' ? `Are you sure you want to edit ${customer.name}'s notes?` :
            actionToConfirm === 'delete-customer' ? `This action is irreversible. Do you want to delete customer ${itemToConfirm.name}?` :
            actionToConfirm === 'delete-booking' ? `This action is irreversible. Do you want to delete this booking?` :
            actionToConfirm === 'delete-service' ? `This action is irreversible. Do you want to delete this service record?` :
            actionToConfirm === 'convert-account' ? `Convert this account to ${itemToConfirm.newAccountType}? This may affect how data is handled.` :
            'Are you sure you want to perform this action?'
          }
          confirmButtonText={
            actionToConfirm === 'edit-customer' ? 'Edit Customer' :
            actionToConfirm === 'edit-notes' ? 'Save Notes' :
            actionToConfirm === 'delete-customer' ? 'Delete Customer' :
            actionToConfirm === 'delete-booking' ? 'Delete Booking' :
            actionToConfirm === 'delete-service' ? 'Delete Service' :
            actionToConfirm === 'convert-account' ? `Convert to ${itemToConfirm.newAccountType}` :
            'Confirm'
          }
        />
      )}
    </>
  );
};

export default CustomerDetail;
