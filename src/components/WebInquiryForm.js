import React, { useState } from 'react';

const WebInquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    alert('Inquiry submitted! We will contact you soon.');
  };

  return (
    <div>
      <h1>Website Inquiry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="projectType">Project Type:</label>
          <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} required>
            <option value="">--Select Project Type--</option>
            <option value="new-website">New Website</option>
            <option value="redesign">Website Redesign</option>
            <option value="maintenance">Website Maintenance</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send Inquiry</button>
      </form>
    </div>
  );
};

export default WebInquiryForm;
