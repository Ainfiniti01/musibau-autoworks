import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import WebsiteInquiryForm from '../../components/WebsiteInquiryForm';
import SectionWrapper from '../../components/SectionWrapper'; // Assuming SectionWrapper will be created next
import { FaTools, FaClock, FaSmile } from 'react-icons/fa';

const HomePage = () => {
  return (
    <main> {/* Use main for semantic HTML */}
      <Helmet>
        <title>Musibau AutoWorks - Home</title>
        <meta name="description" content="Welcome to Musibau AutoWorks, your premier destination for reliable automotive services." />
      </Helmet>
      <SectionWrapper>
        <h1>Welcome to Musibau AutoWorks</h1>
        <p>Your premier destination for reliable automotive services.</p>
        {/* Hero text block */}
        <div>
          <h2>Expert Car Care You Can Trust</h2>
          <p>
            From routine maintenance to complex repairs, our certified technicians
            are dedicated to keeping your vehicle running smoothly and safely.
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {/* Why Choose Us Section */}
        <h2>Why Choose Musibau AutoWorks?</h2>
        <div>
          <h3>Experienced Technicians</h3>
          <p>Our team consists of highly skilled and certified professionals with years of experience.</p>
        </div>
        <div>
          <h3>Quality Service</h3>
          <p><FaTools /> We use state-of-the-art equipment and genuine parts to ensure the highest quality repairs.</p>
        </div>
        <div>
          <h3>Customer Satisfaction</h3>
          <p><FaSmile /> Your satisfaction is our top priority. We strive to provide transparent and friendly service.</p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {/* Fast & Efficient Section */}
        <h2>Fast & Efficient</h2>
        <div>
          <h3><FaClock /> Fast & Efficient</h3>
          <p>We value your time. Enjoy quick turnarounds without compromising quality.</p>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        {/* Call to Action */}
        <h2>Ready to get your car serviced?</h2>
        <p>Contact us today to schedule an appointment or get a quote.</p>
        <button onClick={() => window.location.href='/booking'}>Book a Service</button>
        <button onClick={() => window.location.href='/web-inquiry'}>Want a Website? Contact Us</button>
      </SectionWrapper>

      {/* Removed the embedded WebsiteInquiryForm as it will have its own route */}
    </main>
  );
};

export default HomePage;
