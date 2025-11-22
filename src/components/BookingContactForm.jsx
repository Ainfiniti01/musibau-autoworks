import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
const BookingContactForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceFromQuery = searchParams.get('service');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    serviceType: '',
    preferredDate: '',
    message: '',
  });

  useEffect(() => {
    if (serviceFromQuery) {
      const decodedService = decodeURIComponent(serviceFromQuery);
      setFormData((prevData) => ({
        ...prevData,
        message: `Request: ${decodedService}`,
        serviceType: decodedService,
      }));
    }
  }, [serviceFromQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.serviceType ||
      !formData.preferredDate ||
      !formData.message
    ) {
      toast.error('Please fill in all required fields.'); // Use toast for error
      return;
    }

    try {
      console.log('Form submitted:', formData);
      toast.success('Your request has been submitted successfully! We will contact you shortly.'); // Use toast for success

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        serviceType: '',
        preferredDate: '',
        message: '',
      });
    } catch (error) {
      console.error("Booking submission failed:", error);
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  const serviceOptions = [
    'Other',
    'Engine Repair',
    'Painting',
    'Tire Rotation',
    'Brake Service',
    'Oil Change',
  ];

  const isMessageAutofilled = formData.message.startsWith('Request: ');

  return (
    <div className="bg-[#0B0D1F] py-10 px-6 md:px-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8 py-10">Book Your Service or Contact Us</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-white mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your email address"
            />
          </div>
          {/* Preferred Date */}
          <div className="flex flex-col">
            <label htmlFor="preferredDate" className="text-white mb-2">Preferred Date</label>
            <input
              type="date"
              id="preferredDate"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="text-white mb-2">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className={`p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none ${
                isMessageAutofilled ? 'border-yellow-500' : ''
              }`}
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-gold text-yellow font-bold rounded-lg hover:bg-gold-hover transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingContactForm;
