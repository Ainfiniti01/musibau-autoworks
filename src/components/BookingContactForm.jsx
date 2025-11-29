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
    carMakeModel: '', // New field
    serviceType: '',
    bookingDate: '', // Renamed from preferredDate
    message: '',
    plateNumber: '', // New optional field
    issueUrgency: '', // New field
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
      !formData.carMakeModel || // New required field
      !formData.serviceType ||
      !formData.bookingDate || // Renamed field
      !formData.message ||
      !formData.issueUrgency // New required field
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const {
        fullName,
        email,
        phoneNumber,
        carMakeModel,
        serviceType,
        bookingDate,
        message,
        plateNumber,
        issueUrgency,
      } = formData;

      const whatsappMessage = `Hello, I’d like to book a vehicle service
      Full Name: ${fullName}
      Email: ${email}
      Phone Number: ${phoneNumber}
      Car Make & Model: ${carMakeModel}
      Service Type: ${serviceType}
      Preferred Date: ${bookingDate}
      ${plateNumber ? `Plate Number: ${plateNumber}` : ''}
      Urgency: ${issueUrgency}
      Message: ${message}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/2349136865592?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

      toast.success('Redirecting to WhatsApp with your request!');

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        carMakeModel: '',
        serviceType: '',
        bookingDate: '',
        message: '',
        plateNumber: '',
        issueUrgency: '',
      });
    } catch (error) {
      console.error("Booking submission failed:", error);
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  const serviceOptions = [
    'Custom Request',
    'Technical Support',
    'Home Service',
    'Engine Repair',
    'Electrical Diagnostics',
    'General Maintenance',
    'Mechanic (General Repair)',
    'Chassis Change / Repair',
    'Rewiring',
    'Wheel Alignment',
    'Brake Repair',
    'Battery Replacement',
    'AC Repair',
    'Panel Beating',
    'Painting',
    'Towing',
    'Oil Change',
    'Car Wash (Coming Soon)',
  ];

  const urgencyOptions = [
    { label: 'Not urgent', value: 'Not urgent' },
    { label: 'Moderate', value: 'Moderate' },
    { label: 'Very urgent', value: 'Very urgent' },
  ];

  const isMessageAutofilled = formData.message.startsWith('Request: ');

  return (
    <div className="bg-[#0B0D1F] py-16 px-6 md:px-10">
      <div className="container ">
        <h2 className="text-3xl font-bold text-center text-white mb-3">Book Your Service or Contact Us</h2>
        <p className='text-yellow-500 text-center'>Use this form to contact or Book an appointment</p>
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

          {/* Car Make & Model */}
          <div className="flex flex-col">
            <label htmlFor="carMakeModel" className="text-white mb-2">Car Make & Model</label>
            <input
              type="text"
              id="carMakeModel"
              name="carMakeModel"
              value={formData.carMakeModel}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="e.g., Toyota Camry 2018"
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
          {/* Service Type (Dropdown) */}
          <div className="flex flex-col">
            <label htmlFor="serviceType" className="text-white mb-2">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-gray-700 text-white focus:outline-none appearance-none"
            >
              <option disabled className="bg-gray-700 text-white">Select a service type</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          {/* Preferred Date */}
          <div className="flex flex-col">
            <label htmlFor="bookingDate" className="text-white mb-2">Preferred Date</label>
            <input
              type="date"
              id="bookingDate"
              name="bookingDate"
              value={formData.bookingDate}
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

          {/* Plate Number (Optional) */}
          <div className="flex flex-col">
            <label htmlFor="plateNumber" className="text-white mb-2">Plate Number (Optional)</label>
            <input
              type="text"
              id="plateNumber"
              name="plateNumber"
              value={formData.plateNumber}
              onChange={handleChange}
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your vehicle registration number"
            />
          </div>

          {/* Issue Urgency (Radio Buttons) */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-white mb-2">How urgent is the issue?</label>
            <div className="flex flex-wrap gap-4">
              {urgencyOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`urgency-${option.value}`}
                    name="issueUrgency"
                    value={option.value}
                    checked={formData.issueUrgency === option.value}
                    onChange={handleChange}
                    required
                    className="mr-2"
                  />
                  <label htmlFor={`urgency-${option.value}`} className="text-white">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="text-white mb-2">Message / Describe the issue</label>
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
              placeholder="Describe the issue"
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
