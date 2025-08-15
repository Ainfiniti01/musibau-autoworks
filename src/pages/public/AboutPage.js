import React from 'react';
import SectionWrapper from '../../components/SectionWrapper'; // Assuming SectionWrapper is a common layout component
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'; // Example icons for testimonials
const aboutImage = require('../../assets/images/logo.png');

// Import client logos from HomePage
const APM = require('../../assets/clients/APM.jpg');
const logo2 = require('../../assets/clients/OIP.webp');
const logo3 = require('../../assets/clients/OIP1.webp');
const logo4 = require('../../assets/clients/OIP.webp');

const AboutPage = () => {
  return (
    <SectionWrapper>
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-4xl font-bold text-center mb-8 py-11">About Us</h1>

        <div className="grid md:grid-cols-2 items-center">
          {/* Image Column */}
          <div className="md:w-1/2" data-aos="fade-left">
            <img
              src={aboutImage} // Use imported image
              alt="Musibau Autoworks"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
            <p className="text-lg mb-4">
              Musibau AutoWorks was founded with a passion for automotive excellence and a commitment to customer satisfaction. We believe in providing honest, reliable, and high-quality services to keep your vehicle running smoothly.
            </p>
            <p className="text-lg">
              Our team of experienced technicians is dedicated to using the latest diagnostic tools and techniques to ensure your car receives the best possible care. From routine maintenance to complex repairs, we've got you covered.
            </p>
          </div>
        </div>

        {/* Inserted Client Section */}
        <SectionWrapper className="py-10">
          <section className="py-10 bg-[#1c265756] text-white text-center">
            <h2 className="text-3xl font-bold mb-2">OUR CLIENTS</h2>
            <p className="text-sm text-gray-400 mb-10">Trusted by top brands and partners</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
              <img src={APM} alt="Client 1" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo2} alt="Client 2" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo3} alt="Client 3" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo4} alt="Client 4" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={APM} alt="Client 1" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo2} alt="Client 2" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo3} alt="Client 3" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo4} alt="Client 4" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={APM} alt="Client 1" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo2} alt="Client 2" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo3} alt="Client 3" className="h-12 grayscale hover:grayscale-0 transition" />
              <img src={logo4} alt="Client 4" className="h-12 grayscale hover:grayscale-0 transition" />
              {/* Add more as needed */}
            </div>
          </section>
        </SectionWrapper>

        <div className="mt-16 text-center py-10" data-aos="fade-up">
          <h2 className="text-3xl font-semibold mb-6">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Example Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img src="/assets/images/customer1.jpg" alt="Customer 1" className="w-16 h-16 rounded-full mr-4 object-cover"/>
                <div>
                  <h3 className="text-xl font-bold">John Doe</h3>
                  <p className="text-gray-600">Satisfied Customer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                <FaQuoteLeft className="inline-block mr-1 text-blue-500" />
                "The service at Musibau AutoWorks was exceptional! They were quick, efficient, and very professional. Highly recommended!"
                <FaQuoteRight className="inline-block ml-1 text-blue-500" />
              </p>
            </div>

            {/* Example Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <img src="/assets/images/customer2.jpg" alt="Customer 2" className="w-16 h-16 rounded-full mr-4 object-cover"/>
                <div>
                  <h3 className="text-xl font-bold">Jane Smith</h3>
                  <p className="text-gray-600">Repeat Client</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                <FaQuoteLeft className="inline-block mr-1 text-blue-500" />
                "I've been bringing my car here for years and always receive top-notch service. They are trustworthy and fair."
                <FaQuoteRight className="inline-block ml-1 text-blue-500" />
              </p>
            </div>

            {/* Example Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4 py">
                <img src="/assets/images/customer3.jpg" alt="Customer 3" className="w-16 h-16 rounded-full mr-4 object-cover"/>
                <div>
                  <h3 className="text-xl font-bold">Peter Jones</h3>
                  <p className="text-gray-600">New Customer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                <FaQuoteLeft className="inline-block mr-1 text-blue-500" />
                "Great experience! The team explained everything clearly and the work was done perfectly. Will definitely return."
                <FaQuoteRight className="inline-block ml-1 text-blue-500" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutPage;
