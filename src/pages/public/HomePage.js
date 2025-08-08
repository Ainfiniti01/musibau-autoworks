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
import TestimonialsOrMap from '../../components/TestimonialsOrMap';
import ReviewsSection from '../../components/ReviewsSection'; // Import the new ReviewsSection
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <main>
      <Helmet>
        <title>Musibau AutoWorks - Home</title>
        <meta name="description" content="Welcome to Musibau AutoWorks, your premier destination for reliable automotive services." />
      </Helmet>

      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <HeroSlider />
      </SectionWrapper>
      <SectionWrapper className=""> {/* Added py-16 for spacing */}
        <ServicesOverview />
      </SectionWrapper>
      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <PremiumServicesCards />
      </SectionWrapper>
      <SectionWrapper className=""> {/* Added py-16 for spacing */}
        <ExperienceSection />
      </SectionWrapper>
      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <WhyChooseUs />
      </SectionWrapper>
<SectionWrapper className=""> {/* Added py-16 for spacing */}
  <section className="py-16 bg-[#0c0f1c] text-white text-center">
    <h2 className="text-3xl font-bold mb-2">OUR CLIENTS</h2>
    <p className="text-sm text-gray-400 mb-10">Trusted by top brands and partners</p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center justify-items-center">
      <img src="./frontend/src/assets/clients/APM.jpg" alt="Client 1" className="h-12 grayscale hover:grayscale-0 transition" />
      <img src="/assets/clients/logo2.png" alt="Client 2" className="h-12 grayscale hover:grayscale-0 transition" />
      <img src="/assets/clients/logo3.png" alt="Client 3" className="h-12 grayscale hover:grayscale-0 transition" />
      <img src="/assets/clients/logo4.png" alt="Client 4" className="h-12 grayscale hover:grayscale-0 transition" />
      {/* Add more as needed */}
    </div>
  </section>
</SectionWrapper>
      <SectionWrapper className=""> {/* Added py-16 for spacing */}
        <AboutSection />
      </SectionWrapper>
      <div className="text-center py-4">
        <Link to="/about" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Learn More About Us
        </Link>
      </div>
      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <TestimonialsOrMap />
      </SectionWrapper>
      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <ReviewsSection /> {/* Render the new ReviewsSection */}
      </SectionWrapper>

    </main>
  );
};

export default HomePage;
