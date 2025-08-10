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
    <div>
      <h2>Build Your Website Inquiry</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            aria-label="Full Name"
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-label="Email Address"
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            aria-label="Phone Number"
          />
        </div>
        <div>
          <label htmlFor="description">Project Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            aria-label="Project Description"
          ></textarea>
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="budget">Preferred Budget</label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            aria-label="Preferred Budget"
          />
        </div>
        <button type="submit" disabled={isSubmitting} aria-label="Submit Inquiry"
          className="px-8 py-3 bg-gold text-yellow font-bold rounded-lg hover:bg-gold-hover transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
      {isSubmitting && <LoadingSpinner />}
    </div>
  );
};

export default WebsiteInquiryForm;
