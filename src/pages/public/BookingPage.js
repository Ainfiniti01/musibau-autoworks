import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'; // Import Helmet
import LoadingSpinner from '../../components/LoadingSpinner';
import SectionWrapper from '../../components/SectionWrapper';
import ToastPlaceholder from '../../components/ToastPlaceholder'; // Import ToastPlaceholder
import { FaCalendarAlt, FaCheckCircle, FaWrench } from 'react-icons/fa';

const BookingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a successful booking submission
    setToast({ message: 'Booking successful!', type: 'success' });
    // In a real app, you would handle actual booking submission logic here
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SectionWrapper>
      <Helmet>
        <title>Musibau AutoWorks - Book a Service</title>
        <meta name="description" content="Book your next automotive service with Musibau AutoWorks. Easy online booking." />
      </Helmet>
      <h1>Book a Service</h1>
      <div className="booking-steps">
        <div className="step">
          <FaCalendarAlt />
          <span>Select Service/Date</span>
        </div>
        <div className="step">
          <FaCheckCircle />
          <span>Provide Details</span>
        </div>
        <div className="step">
          <FaWrench />
          <span>Complete Booking</span>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" aria-label="Your Name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" aria-label="Your Email Address" />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" aria-label="Your Phone Number" />
        </div>
        <div>
          <label htmlFor="service">Service:</label>
          <select id="service" name="service" aria-label="Select Service">
            <option value="">--Please choose a service--</option>
            <option value="painting">Painting</option>
            <option value="mechanic">Mechanic</option>
            <option value="panel-beating">Panel Beating</option>
            <option value="rewiring">Rewiring</option>
            <option value="emergency-pickup">Emergency Pickup</option>
            <option value="home-service">Home Service</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" aria-label="Your Message"></textarea>
        </div>
        <button type="submit" aria-label="Submit Booking">Submit</button>
      </form>
      <ToastPlaceholder message={toast.message} type={toast.type} />
    </SectionWrapper>
  );
};

export default BookingPage;
