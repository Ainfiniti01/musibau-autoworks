import React, { useState } from 'react';
import SectionWrapper from '../../components/SectionWrapper'; // Assuming SectionWrapper is a common layout component
import ReviewsSection from '../../components/ReviewsSection';
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

        {/* Our Story Section with Image */}
        <div className="grid md:grid-cols-2 items-center gap-10 py-10">
          {/* Image Column with custom styling */}
          <div className="relative md:w-full flex justify-center items-center" data-aos="fade-left">
            <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[550px] rounded-lg shadow-xl overflow-hidden
                        transform -rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out
                        bg-gradient-to-br from-yellow-500 to-black p-1"> {/* This provides the slanted card effect */}
              <img
                src={aboutImage} // Use imported image, assuming it's appropriate
                alt="Musibau Autoworks Founder"
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Text Overlays for the image */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3">
                <p className="font-bold text-lg">Engineer Abdulazeez Musibau</p>
                <p className="text-sm">Founder & Lead Technician</p>
              </div>
              <span className="absolute top-5 right-5 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">Est. 2010</span>
            </div>
          </div>

          {/* Our Story Text Column */}
          <div data-aos="fade-right">
            <h2 className="text-3xl font-semibold mb-4 text-white">Our Story</h2>
            <ReadMoreLess
              text={`Musibau Autoworks began with a simple mission - to bring honesty, expertise, and reliability back into automobile repair services. What started as a small workshop in Makoko, Sabo-Yaba, has grown into a trusted auto service brand known for quality workmanship and professional service.

              Founded by Engineer Abdulazeez Musibau, a passionate automotive engineer, Musibau Autoworks was built on the belief that every car owner deserves transparent repairs, fair pricing, and top-tier mechanical care. Over the years, our dedication to excellence has allowed us to expand from routine car fixes to full-scale services, including chassis repair, engine overhaul, electrical diagnostics, preventive maintenance, and home service support.

              Our journey has been shaped by continuous learning, modern equipment upgrades, and the belief that customer satisfaction is the most important part of our work. Today, Musibau Autoworks stands as a reliable partner for drivers across Lagos - delivering fast, dependable, and professional automotive solutions.

              As we grow, our vision remains the same: to become Nigeria’s most trusted automobile workshop by combining technical expertise with genuine care for our customers and their vehicles. From routine maintenance to complex repairs, we’ve got you covered.`}
              maxLength={300}
            />
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mt-20 py-10">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Our Journey</h2>
          <p className="text-lg text-center mb-12 text-gray-300">
            Key milestones that have shaped Musibau Autoworks and our long-standing vision.
          </p>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-yellow-500 h-full"></div>

            {/* Timeline Items */}
            {/* Milestone 1: The Foundation */}
            <div className="flex items-center w-full mb-8">
              <div className="w-1/2 pr-8 flex justify-end">
                <div className="text-right" data-aos="fade-right">
                  <h3 className="text-xl font-bold text-white">2005 - The Foundation</h3>
                  <p className="text-gray-300">
                    Musibau Autoworks began its journey in 2005, registered with a mission to deliver honest, dependable, and high-quality automotive repair services. What started as a humble operation laid the groundwork for the trusted brand we are today.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-gray-900"></div>
              <div className="w-1/2 pl-8"></div>
            </div>

            {/* Milestone 2: The Beginning of Operations Growth */}
            <div className="flex items-center w-full mb-8">
              <div className="w-1/2 pr-8"></div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-gray-900"></div>
              <div className="w-1/2 pl-8 flex justify-start">
                <div className="text-left" data-aos="fade-left">
                  <h3 className="text-xl font-bold text-white">2010 - The Beginning of Operations Growth</h3>
                  <p className="text-gray-300">
                    By 2010, our workshop had grown significantly, serving more customers and gaining a reputation for reliability, transparency, and skilful workmanship.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone 3: Expansion of Services */}
            <div className="flex items-center w-full mb-8">
              <div className="w-1/2 pr-8 flex justify-end">
                <div className="text-right" data-aos="fade-right">
                  <h3 className="text-xl font-bold text-white">2015 – Expansion of Services</h3>
                  <p className="text-gray-300">
                    We expanded our service offerings to include full mechanical repairs, engine overhauls, advanced electrical diagnostics, chassis repairs, and preventive maintenance—broadening our ability to meet customers’ diverse automotive needs.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-gray-900"></div>
              <div className="w-1/2 pl-8"></div>
            </div>

            {/* Milestone 4: Modernization */}
            <div className="flex items-center w-full mb-8">
              <div className="w-1/2 pr-8"></div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-gray-900"></div>
              <div className="w-1/2 pl-8 flex justify-start">
                <div className="text-left" data-aos="fade-left">
                  <h3 className="text-xl font-bold text-white">2020 – Modernization</h3>
                  <p className="text-gray-300">
                    We adopted modern diagnostic equipment and up-to-date repair techniques, improving service speed, accuracy, and overall customer experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Milestone 5: Strengthening Customer Trust */}
            <div className="flex items-center w-full mb-8">
              <div className="w-1/2 pr-8 flex justify-end">
                <div className="text-right" data-aos="fade-right">
                  <h3 className="text-xl font-bold text-white">2023 – Strengthening Customer Trust</h3>
                  <p className="text-gray-300">
                    Through consistent quality and professional service delivery, Musibau Autoworks became recognised as a trusted automotive workshop in Lagos, with a growing customer base and strong community reputation.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-gray-900"></div>
              <div className="w-1/2 pl-8"></div>
            </div>

            {/* Milestone 6: Future Vision */}
            <div className="flex items-center w-full">
              <div className="w-1/2 pr-8"></div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-gray-900"></div>
              <div className="w-1/2 pl-8 flex justify-start">
                <div className="text-left" data-aos="fade-left">
                  <h3 className="text-xl font-bold text-white">Future - National Reach</h3>
                  <p className="text-gray-300">
                    Our vision is to expand services beyond Lagos and become Nigeria’s most trusted automobile workshop, delivering excellence, transparency, and customer-first service nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mt-20 py-10">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Our Values</h2>
          <p className="text-lg text-center mb-12 text-gray-300">
            The principles that guide everything we do and shape every decision we make.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Value Card 1: Quality Craftsmanship */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-start" data-aos="fade-up">
              <div className="bg-purple-600 rounded-full p-4 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Craftsmanship</h3>
              <p className="text-gray-300">
                Every repair and service we provide is carried out with meticulous attention to detail and a commitment to excellence, ensuring your vehicle performs at its best.
              </p>
            </div>

            {/* Value Card 2: Ethical Sourcing */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-start" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-pink-500 rounded-full p-4 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM21 12c0 1.233-.526 2.378-1.378 3.23S17.233 17 16 17c-1.233 0-2.378-.526-3.23-1.378S11 13.233 11 12c0-1.233.526-2.378 1.378-3.23S14.767 7 16 7c1.233 0 2.378.526 3.23 1.378S21 10.767 21 12zM5 12c0 1.233-.526 2.378-1.378 3.23S2.767 17 4 17c1.233 0 2.378-.526 3.23-1.378S9 13.233 9 12c0-1.233-.526-2.378-1.378-3.23S5.767 7 4 7c-1.233 0-2.378.526-3.23 1.378S0 10.767 0 12z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ethical Practices</h3>
              <p className="text-gray-300">
                We operate with transparency, honesty, and integrity in all our dealings — from pricing to repair recommendations — ensuring fair treatment for every customer.
              </p>
            </div>

            {/* Value Card 3: Customer-Centric Care */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-start" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-blue-600 rounded-full p-4 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a4 4 0 014-4h12.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.586"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Customer-Centric Care</h3>
              <p className="text-gray-300">
                Your satisfaction is our top priority. We listen to your needs, provide personalized solutions, and deliver a smooth, hassle-free service experience.
              </p>
            </div>

            {/* Value Card 4: Continuous Innovation */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-start" data-aos="fade-up" data-aos-delay="300">
              <div className="bg-green-500 rounded-full p-4 mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Continuous Innovation</h3>
              <p className="text-gray-300">
                We stay updated with the latest automotive technologies and repair techniques, offering cutting-edge solutions and superior service quality.
              </p>
            </div>
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

        <ReviewsSection />
      </div>
      </SectionWrapper>
    );
  };

  const ReadMoreLess = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMoreLess = () => setIsExpanded(!isExpanded);

    if (text.length <= maxLength) {
      return <p className="text-lg text-white mb-4 whitespace-pre-wrap">{text}</p>;
    }

    const displayedText = isExpanded ? text : `${text.substring(0, maxLength)}...`;

    return (
      <div>
        <p className="text-lg text-white mb-4 whitespace-pre-wrap">{displayedText}</p>
        <button
          onClick={toggleReadMoreLess}
          className="text-yellow-500 hover:text-yellow-600 font-bold focus:outline-none"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    );
  };

export default AboutPage;
