import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import BookingContactForm from '../../components/BookingContactForm';
import WebsiteInquiryForm from '../../components/WebsiteInquiryForm';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Musibau Autoworks</title>
      </Helmet>

      <div className="container mx-auto py-10 px-6 md:px-20 space-y-16">
        {/* Section 1: Booking Form + Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start" data-aos="fade-up">
          {/* Left: Booking Form */}
          <BookingContactForm />

          {/* Right: Contact Information */}
          <div className="space-y-6">
  {/* WhatsApp */}
  <div className="flex items-start p-5 bg-[#1a1a1a] rounded-lg">
    <div className="flex-shrink-0 text-yellow-400 text-2xl mr-4">
      <i className="fab fa-whatsapp"></i>
    </div>
    <div>
      <h4 className="text-white font-semibold">WhatsApp</h4>
      <p className="text-gray-300">+234 903 808 9899</p>
      <span className="text-sm text-gray-400">Get instant responses to your questions</span>
    </div>
  </div>

  {/* Email */}
  <div className="flex items-start p-5 bg-[#1a1a1a] rounded-lg">
    <div className="flex-shrink-0 text-yellow-400 text-2xl mr-4">
      <i className="fas fa-envelope"></i>
    </div>
    <div>
      <h4 className="text-white font-semibold">Email</h4>
      <p className="text-gray-300">abdulazeezadam09@gmail.com</p>
      <span className="text-sm text-gray-400">For detailed inquiries and collaborations</span>
    </div>
  </div>

  {/* Location */}
  <div className="flex items-start p-5 bg-[#1a1a1a] rounded-lg">
    <div className="flex-shrink-0 text-yellow-400 text-2xl mr-4">
      <i className="fas fa-map-marker-alt"></i>
    </div>
    <div>
      <h4 className="text-white font-semibold">Location</h4>
      <p className="text-gray-300">Lagos, Nigeria</p>
      <span className="text-sm text-gray-400">Anywhere in Lagos for now</span>
    </div>
  </div>

  {/* Phone */}
  <div className="flex items-start p-5 bg-[#1a1a1a] rounded-lg">
    <div className="flex-shrink-0 text-yellow-400 text-2xl mr-4">
      <i className="fas fa-phone-alt"></i>
    </div>
    <div>
      <h4 className="text-white font-semibold">Phone</h4>
      <p className="text-gray-300">09095707751 / 09032035143</p>
      <span className="text-sm text-gray-400">Business hours: 9AM - 6PM WAT</span>
    </div>
  </div>
</div>

        </div>

        {/* Section 2: Map + Inquiry Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start" data-aos="fade-up" data-aos-delay="200">
          {/* Left: Map */}
          <div className="contact-map-container">
            <h3 className="text-2xl font-bold text-white mb-6">Our Location</h3>
            <iframe
              src="https://www.google.com/maps/place/Makoko,+Lagos+101245,+Lagos/@0.8247176,88.7610255,3z/data=!4m6!3m5!1s0x103b8c8da642e481:0x42d33769d3ebadba!8m2!3d6.4990277!4d3.3880288!16s%2Fm%2F07s53sm?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>

          {/* Right: Inquiry Form */}
          <WebsiteInquiryForm />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
