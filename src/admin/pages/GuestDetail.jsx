import { get } from '../../utils/api';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiChevronDown, FiUserPlus, FiEdit, FiTrash2 } from 'react-icons/fi'; // Added FiEdit and FiTrash2
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ConfirmationModal from '../components/ConfirmationModal'; // Import ConfirmationModal

const GuestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [guest, setGuest] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notes, setNotes] = useState('');
    const [guestBookings, setGuestBookings] = useState([]); // New state for guest bookings

    // State for confirmation modal
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [itemToConfirm, setItemToConfirm] = useState(null);
    const [actionToConfirm, setActionToConfirm] = useState('');

    useEffect(() => {
        const fetchGuestData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Fetch guest details
                const guestData = await get(`/api/guests.php?id=${id}`); // Assuming an API for guests
                setGuest(guestData.data);
                setNotes(guestData.data.notes || '');

                // Fetch guest bookings
                const bookingsData = await get(`/api/bookings.php?guest_id=${id}`); // Assuming bookings can be filtered by guest_id
                setGuestBookings(bookingsData.data);

            } catch (error) {
                setError(error.message || 'Failed to fetch guest details.');
                toast.error('Failed to fetch guest details.');
                console.error('Error fetching guest details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchGuestData();
        }
    }, [id]);

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

        if (actionToConfirm === 'edit-notes') {
            // Logic to save edited notes would go here
            setGuest({ ...guest, notes: notes }); // Update guest state with new notes
            toast.success('Notes saved successfully!');
            closeConfirmationModal();
        } else if (actionToConfirm === 'delete-guest') {
            // Logic to delete guest would go here
            toast.success('Guest deleted successfully (simulated).');
            navigate('/admin/guests'); // Navigate away after deletion
            closeConfirmationModal();
        } else if (actionToConfirm === 'convert-account') {
            // Logic to convert account type would go here
            toast.success(`Guest converted to ${itemToConfirm.newAccountType} account (simulated).`);
            // Navigate based on the new account type
            if (itemToConfirm.newAccountType === 'Individual') {
                navigate('/admin/customers');
            } else if (itemToConfirm.newAccountType === 'Organization') {
                navigate('/admin/organizations');
            }
            closeConfirmationModal();
        }
    };

    const handleEditNotes = () => {
        openConfirmationModal(guest, 'edit-notes');
    };

    const handleDeleteGuest = (guestId) => {
        openConfirmationModal({ id: guestId }, 'delete-guest');
    };

    const handleConvertAccountType = (guestId, newType) => {
        openConfirmationModal({ id: guestId, newAccountType: newType }, 'convert-account');
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!guest) return <p className="text-center">Guest not found.</p>;

    return (
        <div className="bg-teal-900 min-h-screen p-6">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-3xl font-bold text-white mb-2">Guest Details</h2>
                <nav className="text-gray-400" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link to="/admin/dashboard" className="hover:text-white">Admin</Link>
                            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                        </li>
                        <li className="flex items-center">
                            <Link to="/admin/guests" className="hover:text-white">Guests</Link>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                {/* Guest Information Card */}
                <div className="bg-[#2c3e50] rounded-lg shadow p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Guest Information</h3>
                    <p><strong className="text-gray-300">Full Name:</strong> {guest.name}</p>
                    <p><strong className="text-gray-300">Email:</strong> {guest.email}</p>
                    <p><strong className="text-gray-300">Phone:</strong> {guest.phone}</p>
                    <p><strong className="text-gray-300">Registered Date:</strong> {guest.registered_date ? new Date(guest.registered_date).toLocaleDateString() : 'N/A'}</p>
                    {/* Add a button for deleting the guest */}
                    <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        <FiTrash2 className="inline-block mr-1" /> Delete Guest
                    </button>
                </div>

                {/* Notes / Comments Card */}
                <div className="bg-[#2c3e50] rounded-lg shadow p-6 text-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Notes / Comments</h3>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black-700 leading-tight focus:outline-none focus:shadow-outline text-black"
                            rows="5"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        {/* Edit Notes Button - triggers confirmation modal */}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleEditNotes}
                        >
                            Save Notes
                        </button>
                    </div>
                </div>
            </div>

            {/* Guest Booking History Section */}
            <div className="bg-[#2c3e50] rounded-lg shadow p-6 mb-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Guest Bookings</h2>
                {guestBookings.length === 0 ? (
                    <p className="text-center text-gray-400 py-8">No bookings found for this guest.</p>
                ) : (
                    <table className="min-w-full divide-y divide-gray-600">
                        <thead className="bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Service</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-[#2c3e50] divide-y divide-gray-600">
                            {guestBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{booking.service}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{booking.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{booking.time}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => alert('View booking details not implemented for guest')}
                                            className="text-blue-400 hover:text-blue-600"
                                            title="View Details"
                                        >
                                            <FiEye className="inline-block" />
                                        </button>
                                        {/* Add delete/edit actions if applicable for guest bookings */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-6 flex justify-start items-center">
                {/* Edit Guest Info Button - triggers confirmation modal */}
                <button
                    onClick={() => openConfirmationModal(guest, 'edit-customer')} // Reusing 'edit-customer' action for consistency
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                    Edit Guest Info
                </button>
                <div className="relative">
                    <button
                        onClick={() => openConfirmationModal(guest, 'convert-account')} // Trigger confirmation modal for conversion
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                    >
                        <FiUserPlus className="inline-block mr-2" />
                        Convert Account <FiChevronDown className="ml-2" />
                    </button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {isConfirmationModalOpen && itemToConfirm && (
                <ConfirmationModal
                    isOpen={isConfirmationModalOpen}
                    onClose={closeConfirmationModal}
                    onConfirm={handleConfirmAction}
                    title={
                        actionToConfirm === 'edit-notes' ? 'Confirm Save Notes' :
                        actionToConfirm === 'delete-guest' ? 'Confirm Delete Guest' :
                        actionToConfirm === 'convert-account' ? 'Confirm Account Conversion' :
                        actionToConfirm === 'edit-customer' ? 'Confirm Edit Guest Info' : // Added for editing guest info
                        'Confirm Action'
                    }
                    message={
                        actionToConfirm === 'edit-notes' ? `Are you sure you want to save the changes to notes for ${guest.name}?` :
                        actionToConfirm === 'delete-guest' ? `This action is irreversible. Do you want to delete guest ${itemToConfirm.name}?` :
                        actionToConfirm === 'convert-account' ? `Convert this guest account to ${itemToConfirm.newAccountType}? This may affect how data is handled.` :
                        actionToConfirm === 'edit-customer' ? `Are you sure you want to edit the information for ${guest.name}?` :
                        'Are you sure you want to perform this action?'
                    }
                    confirmButtonText={
                        actionToConfirm === 'edit-notes' ? 'Save Notes' :
                        actionToConfirm === 'delete-guest' ? 'Delete Guest' :
                        actionToConfirm === 'convert-account' ? `Convert to ${itemToConfirm.newAccountType}` :
                        actionToConfirm === 'edit-customer' ? 'Edit Info' :
                        'Confirm'
                    }
                />
            )}
        </div>
    );
};

export default GuestDetail;
