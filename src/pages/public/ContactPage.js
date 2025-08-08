import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import BookingContactForm from '../../components/BookingContactForm'; // Import the new component

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="container mx-auto py-10 px-6 md:px-20">
          <div data-aos="fade-up">
            <BookingContactForm />
          </div>

        <div className="contact-map-container py-10" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-3xl font-bold text-white mb-8 text-center md:text-left">Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.8777777777777!2d3.456789!3d6.54321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0000000000%3A0x0000000000000000!5e0!3m2!1sen!2sng!4v1678886400000!5m2!1sen!2sng" // Placeholder URL - Replace with actual business location
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg">
          </iframe>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
