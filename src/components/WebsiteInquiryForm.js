import React, { useState } from 'react';
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
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulate an async API call
    setTimeout(() => {
      // TODO: Replace this with a real API call
      const isSuccess = Math.random() > 0.2; // 80% chance of success

      if (isSuccess) {
        setSubmissionStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          description: '',
          budget: '',
        });
      } else {
        setSubmissionStatus('error');
      }
      setIsSubmitting(false);
    }, 2000);
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
          />
        </div>
        <div>
          <label htmlFor="description">Project Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
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
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
        </button>
      </form>
      {isSubmitting && <LoadingSpinner />}
      {submissionStatus === 'success' && (
        <p>Thank you for your inquiry! We will get back to you shortly.</p>
      )}
      {submissionStatus === 'error' && (
        <p>Something went wrong. Please try again later.</p>
      )}
    </div>
  );
};

export default WebsiteInquiryForm;
