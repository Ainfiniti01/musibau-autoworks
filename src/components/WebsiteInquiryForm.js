import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast
import LoadingSpinner from './LoadingSpinner';

const WebsiteInquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    description: '',
    budget: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Removed submissionStatus as toast will handle feedback

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!formData.description) newErrors.description = 'Project Description is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { // Made async
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate an async API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay

      // TODO: Replace this with a real API call
      const isSuccess = Math.random() > 0.2; // 80% chance of success

      if (isSuccess) {
        toast.success('Thank you for your inquiry! We will get back to you shortly.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          description: '',
          budget: '',
        });
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error("Inquiry submission failed:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0D1F] py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center text-white mb-8 py-10">Build Your Website Inquiry</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col">
          <label htmlFor="fullName" className="text-white mb-2">Full Name *</label>
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
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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
            
            className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-white mb-2">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Project Description */}
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="description" className="text-white mb-2">Project Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
            className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none resize-none"
            placeholder="Describe your project needs"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Budget */}
        <div className="flex flex-col">
          <label htmlFor="budget" className="text-white mb-2">Preferred Budget</label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gold focus:border-gold-focus bg-transparent text-white placeholder-gray-400 focus:outline-none"
            placeholder="e.g., $500 - $1000"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gold text-yellow font-bold rounded-lg hover:bg-gold-hover transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
          </button>
        </div>
      </form>
      {isSubmitting && <LoadingSpinner />}
    </div>
  );
};

export default WebsiteInquiryForm;
