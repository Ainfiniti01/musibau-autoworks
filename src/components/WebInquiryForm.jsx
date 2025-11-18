// WARNING: Dummy data – replace with production API!
// TODO: Replace dummy endpoint with the real inquiry API URL from client/backend

import React, { useState, useEffect } from 'react';

const WebInquiryForm = () => {
  const [formData, setFormData] = useState({ company: '', email: '', inquiry: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

// WARNING: Dummy data – replace with production API!
const handleSubmit = (e) => {
  e.preventDefault();

  const name = formData.company; // Using company as name
  const email = formData.email;
  const enquiry = formData.inquiry;

  const message = `New enquiry from website:
Name: ${name}
Email: ${email}
Message: ${enquiry}`;

  const phoneNumber = '09095707751';
// WARNING: Dummy data – replace with production API!
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, '_blank');

  // Reset form after action
  setFormData({ company: '', email: '', inquiry: '' });
};

  return (
    <form onSubmit={handleSubmit}>
      <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
      <textarea name="inquiry" value={formData.inquiry} onChange={handleChange} placeholder="What do you need?" required />

      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {submitted && <p style={{ color: 'green' }}>Inquiry sent successfully!</p>}

      <button type="submit" disabled={loading}>Submit</button>
    </form>
  );
};

export default WebInquiryForm;
