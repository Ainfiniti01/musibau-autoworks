import { get } from '../../utils/api';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiUserPlus, FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GuestList = () => {
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [guestToDeleteId, setGuestToDeleteId] = useState(null);
    const [guestToConvertId, setGuestToConvertId] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [convertConfirmOpen, setConvertConfirmOpen] = useState(false);

    useEffect(() => {
        const fetchGuests = async () => {
            setIsLoading(true);
            try {
                // Assuming you have an endpoint to fetch only guests
                // const data = await get('/api/customers.php?user_type=Guest'); // Replaced with dummy data
                const data = [
                  { id: 1, name: 'Guest User', email: 'guest@example.com', phone: '111-222-3333', bookingReference: 'REF001', dateRegistered: '2023-01-15', status: 'New' },
                  { id: 2, name: 'Another Guest', email: 'another.guest@example.com', phone: '444-555-6666', bookingReference: 'REF002', dateRegistered: '2023-02-20', status: 'Converted' },
                  { id: 3, name: 'Third Guest', email: 'third.guest@example.com', phone: '777-888-9999', bookingReference: 'N/A', dateRegistered: '2023-03-10', status: 'Inactive' },
                ];
                setGuests(data);
            } catch (error) {
                setError(error.message);
                toast.error('Failed to fetch guests.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchGuests();
    }, []);

    const handleConvertToCustomer = (guestId) => {
        setGuestToConvertId(guestId);
        setConvertConfirmOpen(true);
    };

    const confirmConvertToCustomer = () => {
        const convertPromise = new Promise(async (resolve, reject) => {
            try {
                // Simulate API call to convert guest
                await new Promise(res => setTimeout(res, 500));
                setGuests(prevGuests => {
                    return prevGuests.filter(guest => guest.id !== guestToConvertId)
                });
                setConvertConfirmOpen(false);
                setGuestToConvertId(null);
                resolve('Guest converted to customer!');
            } catch (error) {
                reject('Failed to convert guest.');
            }
        });

        toast.promise(convertPromise, {
            loading: 'Converting guest...',
            success: (message) => message,
            error: (message) => message,
        });
    };

    const handleDeleteGuest = (guestId) => {
        setGuestToDeleteId(guestId);
        setDeleteConfirmOpen(true);
    };

    const confirmDeleteGuest = () => {
        const deletePromise = new Promise(async (resolve, reject) => {
            try {
                // Simulate API call to delete guest
                await new Promise(res => setTimeout(res, 500));
                setGuests(prevGuests => prevGuests.filter(guest => guest.id !== guestToDeleteId));
                setDeleteConfirmOpen(false);
                setGuestToDeleteId(null);
                resolve('Guest deleted successfully!');
            } catch (error) {
                reject('Failed to delete guest.');
            }
        });

        toast.promise(deletePromise, {
            loading: 'Deleting guest...',
            success: (message) => message,
            error: (message) => message,
        });
    };

    if (isLoading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Manage Guests</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking Reference</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Registered</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {guests.map(guest => (
                        <tr key={guest.id}>
                            <td className="px-6 py-4">{guest.name}</td>
                            <td className="px-6 py-4">{guest.email}</td>
                            <td className="px-6 py-4">{guest.phone}</td>
                            <td className="px-6 py-4">{guest.bookingReference || 'N/A'}</td>
                            <td className="px-6 py-4">{guest.dateRegistered || 'N/A'}</td>
                            <td className="px-6 py-4">{guest.status}</td>
                            <td className="px-6 py-4">
                                 <Link to={`/admin/guests/${guest.id}`}  className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                                    <FiEye className="inline-block mr-1" /> Details
                                </Link>
                                <button onClick={() => handleConvertToCustomer(guest.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                    <FiUserPlus className="inline-block mr-1" /> Convert
                                </button>
                                <button onClick={() => handleDeleteGuest(guest.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                    <FiTrash2 className="inline-block mr-1" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {deleteConfirmOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
                        <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                        <p className="mb-6">Are you sure you want to delete this guest? This action cannot be undone.</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setDeleteConfirmOpen(false)}
                                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteGuest}
                                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {convertConfirmOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">Confirm Convert</h3>
            <p className="mb-6">Are you sure you want to convert this guest to a customer?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConvertConfirmOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmConvertToCustomer}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Convert
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default GuestList;
