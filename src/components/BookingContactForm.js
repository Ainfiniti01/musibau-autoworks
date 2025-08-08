import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  // Initialize message and serviceType state based on query parameter
  useEffect(() => {
    if (serviceFromQuery) {
      const decodedService = decodeURIComponent(serviceFromQuery);
      setFormData((prevData) => ({
        ...prevData,
        message: `Request: ${decodedService}`,
        serviceType: decodedService, // Set serviceType to the decoded service name
      }));
    }
  }, [serviceFromQuery]);


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation check for all fields
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.serviceType ||
      !formData.preferredDate ||
      !formData.message
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Simulate successful submission
    console.log('Form submitted:', formData);
    alert('Your request has been submitted successfully! We will contact you shortly.');

    // Clear the form after submission
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      serviceType: '',
      preferredDate: '',
      message: '',
    });
  };

  const serviceOptions = [
    'Engine Repair',
    'Painting',
    'Tire Rotation',
    'Brake Service',
    'Oil Change',
    'Other',
  ];

  // Determine if the message field was autofilled for styling
  const isMessageAutofilled = formData.message.startsWith('Request: ');

  return (
    <section className="bg-[#0B0D1F] py-10 px-6 md:px-20" data-aos="fade-up">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Book Your Service or Contact Us</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col" data-aos="fade-up" data-aos-delay="100">
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
          <div className="flex flex-col" data-aos="fade-up" data-aos-delay="200">
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

          {/* Phone Number */}
          <div className="flex flex-col" data-aos="fade-up" data-aos-delay="300">
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

          {/* Service Type */}
          <div className="flex flex-col" data-aos="fade-up" data-aos-delay="400">
            <label htmlFor="serviceType" className="text-white mb-2">Service Type</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none appearance-none"
            >
              <option value="" disabled className="bg-gray-800 text-gray-400">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-gray-800 text-white">
                  {option}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current text-gray-400" viewBox="0 0 20 20"><path d="M7 10l3 3 3-3z"/></svg>
            </div>
          </div>

          {/* Preferred Date */}
          <div className="flex flex-col" data-aos="fade-up" data-aos-delay="500">
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

          {/* Message */}
          <div className="flex flex-col md:col-span-2" data-aos="fade-up" data-aos-delay="600">
            <label htmlFor="message" className="text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
              className={`p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none ${
                isMessageAutofilled ? 'border-yellow-500' : '' // Highlight if autofilled
              }`}
              placeholder="Enter your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center" data-aos="fade-up" data-aos-delay="700">
            <button
              type="submit"
              className="px-8 py-3 bg-gold text-black font-bold rounded-lg hover:bg-gold-hover transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingContactForm;
