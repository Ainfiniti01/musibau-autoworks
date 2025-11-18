import React from 'react';
import BookingForm from '../components/BookingForm'; // Import the existing BookingForm component

const NewBooking = () => {
  return (
    <div>
      {/* The BookingForm component already includes the title and breadcrumb */}
      <BookingForm />
    </div>
  );
};

export default NewBooking;
