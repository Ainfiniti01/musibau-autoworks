// TODO: Replace dummy endpoint with the real inquiry API URL from client/backend

import { useState } from 'react';

const WebInquiryForm = () => {
  const [formData, setFormData] = useState({ company: '', email: '', inquiry: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      // TODO: Replace with real API endpoint from client
      const API_URL = 'https://jsonplaceholder.typicode.com/posts';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Inquiry failed');
      setSubmitted(true);
      setFormData({ company: '', email: '', inquiry: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
