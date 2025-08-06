import React from 'react';
import { Helmet } from 'react-helmet-async';
import WebsiteInquiryForm from '../../components/WebsiteInquiryForm';
import SectionWrapper from '../../components/SectionWrapper';
import { FaPhone, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div>
      <Helmet>
        <title>Musibau AutoWorks - Contact Us</title>
        <meta name="description" content="Get in touch with Musibau AutoWorks for all your automotive needs." />
      </Helmet>
      <SectionWrapper>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you!</p>
        <div>
          <h2>Get in Touch</h2>
          <p>
            <strong>Phone:</strong> <FaPhone /> +1 (123) 456-7890
          </p>
          <p>
            <strong>Email:</strong> <FaEnvelope /> info@musibauautoworks.com
          </p>
          <p>
            <strong>Address:</strong> <FaMapMarkedAlt /> 123 Auto Lane, Car City, CA 90210
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <h2>Send us a message</h2>
        <WebsiteInquiryForm />
      </SectionWrapper>
    </div>
  );
};

export default ContactPage;
