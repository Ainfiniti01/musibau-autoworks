import React from 'react';
import { Helmet } from 'react-helmet-async';
import BookingContactForm from '../../components/BookingContactForm'; // Import the new component

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="container mx-auto py-10 px-6 md:px-20">
        {/* The BookingContactForm component already has its own section and styling */}
        <BookingContactForm />
      </div>
    </>
  );
};

export default ContactPage;
