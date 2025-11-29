import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionWrapper from '../../components/SectionWrapper';

// Import all created components
import HeroSlider from '../../components/HeroSlider';
import ServicesOverview from '../../components/ServicesOverview';
import PremiumServicesCards from '../../components/PremiumServicesCards';
import WhyChooseUs from '../../components/WhyChooseUs';
import AboutSection from '../../components/AboutSection';
import ExperienceSection from '../../components/ExperienceSection';
import TestimonialsOrMap from '../../components/Map';
import ReviewsSection from '../../components/ReviewsSection'; // Import the new ReviewsSection
import { Link } from 'react-router-dom';

// Import client logos
const APM = require('../../assets/clients/APM.jpg');
const logo2 = require('../../assets/clients/OIP.webp');
const logo3 = require('../../assets/clients/OIP1.webp');
const logo4 = require('../../assets/clients/OIP.webp');


const HomePage = () => {
  return (
    <main>
      <Helmet>
        <title>Musibau AutoWorks - Home</title>
        <meta name="description" content="Welcome to Musibau AutoWorks, your premier destination for reliable automotive services." />
      </Helmet>

      <SectionWrapper className=""> {/* Added py-16 for spacing */}
        <HeroSlider />
      </SectionWrapper>
<SectionWrapper className="py-12">
        <ServicesOverview />
      </SectionWrapper>
      <SectionWrapper className=""> {/* Added py-16 for spacing */}
        <PremiumServicesCards />
      </SectionWrapper>
      <SectionWrapper className="py-"> {/* Added py-16 for spacing */}
        <WhyChooseUs />
      </SectionWrapper>
<SectionWrapper className="py-12">
  <section className="py-10 px-6 bg-[#0c0f1c] text-white text-center">
    <h2 className="text-3xl font-bold mb-2">OUR CLIENTS</h2>
    <p className="text-sm text-gray-400 mb-10">Trusted by top brands and partners</p>

    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
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
      <SectionWrapper className="py-10"> {/* Added py-16 for spacing */}
        <TestimonialsOrMap />
      </SectionWrapper>
      <SectionWrapper className="py-10"> {/* Added py-16 for spacing */}
        <ReviewsSection /> {/* Render the new ReviewsSection */}
      </SectionWrapper>

    </main>
  );
};

export default HomePage;
