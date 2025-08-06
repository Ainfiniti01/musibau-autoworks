import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionWrapper from '../../components/SectionWrapper';

// Import all created components
import HeroSection from '../../components/HeroSection';
import ServicesOverview from '../../components/ServicesOverview';
import PremiumServicesCards from '../../components/PremiumServicesCards';
import WhyChooseUs from '../../components/WhyChooseUs';
import AboutSection from '../../components/AboutSection';
import ExperienceSection from '../../components/ExperienceSection';
import TestimonialsOrMap from '../../components/TestimonialsOrMap';
import ReviewsSection from '../../components/ReviewsSection'; // Import the new ReviewsSection

const HomePage = () => {
  return (
    <main>
      <Helmet>
        <title>Musibau AutoWorks - Home</title>
        <meta name="description" content="Welcome to Musibau AutoWorks, your premier destination for reliable automotive services." />
      </Helmet>

      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <HeroSection />
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
        <AboutSection />
      </SectionWrapper>
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
