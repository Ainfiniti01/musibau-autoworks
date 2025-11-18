import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import { get, post } from '../../utils/api';

const GuestBookingPage = () => {
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service_id: '',
        booking_date: ''
    });

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            try {
                const data = await get('/api/services.php');
                setServices(data);
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bookingPromise = new Promise(async (resolve, reject) => {
            try {
                await post('/api/guest_booking.php', formData);
                resolve('Booking successful!');
                setFormData({ name: '', email: '', phone: '', service_id: '', booking_date: '' });
            } catch (error) {
                reject(error.message);
            }
        });

        toast.promise(bookingPromise, {
            loading: 'Creating booking...',
            success: (message) => message,
            error: (message) => message,
        });
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            
                
                    Book a Service as a Guest
                
            

            
                {error && (
                    
                        {error}
                    
                )}
            

            
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md"
                >
                    
                        <label className="block text-gray-700" htmlFor="name">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    

                    
                        <label className="block text-gray-700" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    

                    
                        <label className="block text-gray-700" htmlFor="phone">
                            Phone:
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    

                    
                        <label className="block text-gray-700" htmlFor="service_id">
                            Service:
                        </label>
                        <select
                            id="service_id"
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Select a service</option>
                            {services && services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name}
                                </option>
                            ))}
                        </select>
                    

                    
                        <label className="block text-gray-700" htmlFor="booking_date">
                            Booking Date:
                        </label>
                        <input
                            type="date"
                            id="booking_date"
                            name="booking_date"
                            value={formData.booking_date}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    

                    
                        Book Now
                    
                </form>
            
        </>
    );
}

export default GuestBookingPage;