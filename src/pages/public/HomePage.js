import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionWrapper from '../../components/SectionWrapper';

// Import all created components
import HeroSection from '../../components/HeroSection';
import ServicesOverview from '../../components/ServicesOverview';
import PremiumServicesCards from '../../components/PremiumServicesCards';
import WhyChooseUs from '../../components/WhyChooseUs';
import AboutSection from '../../components/AboutSection';
import ServicesFilter from '../../components/ServicesFilter';
import ExperienceSection from '../../components/ExperienceSection';
import TestimonialsOrMap from '../../components/TestimonialsOrMap';
import Footer from '../../components/Footer'; // Assuming Footer is also part of the page structure

const HomePage = () => {
  return (
    <main>
      <Helmet>
        <title>Musibau AutoWorks - Home</title>
        <meta name="description" content="Welcome to Musibau AutoWorks, your premier destination for reliable automotive services." />
      </Helmet>

      <HeroSection />
      <ServicesOverview />
      <PremiumServicesCards />
      <WhyChooseUs />
      <AboutSection />
      <ServicesFilter />
      <ExperienceSection />
      <TestimonialsOrMap />
      <Footer />

    </main>
  );
};

export default HomePage;
