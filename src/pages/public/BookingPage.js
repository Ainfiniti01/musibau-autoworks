// TODO: This form currently submits to a dummy API URL (jsonplaceholder). Replace with the real booking API provided by the client.

import { useState } from 'react';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // TODO: Replace with real API endpoint from client
      const API_URL = 'https://jsonplaceholder.typicode.com/posts';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Booking submission failed');
      setSuccess(true);
setFormData({ name: '', email: '', service: '', date: '' });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <select name="service" value={formData.service} onChange={handleChange} required>
        <option value="">Select a service</option>
        <option value="Service 1">Service 1</option>
        <option value="Service 2">Service 2</option>
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      {loading && <p>Submitting...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Booking successful!</p>}

      <button type="submit" disabled={loading}>Submit Booking</button>
    </form>
  );
};

export default BookingPage;
