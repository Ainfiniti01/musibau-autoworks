import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import { Link } from 'react-router-dom';
import SectionWrapper from '../../components/SectionWrapper';

// Import components from HomePage
import ServicesFilter from '../../components/ServicesFilter';

// TODO: Fetch services data from an API



const ServicesPage = () => {
  return (
    <main> {/* Changed from SectionWrapper to main to allow individual SectionWrappers */}
      <Helmet>
        <title>Musibau AutoWorks - Our Services</title>
        <meta name="description" content="Explore the range of automotive services offered by Musibau AutoWorks." />
      </Helmet>
        {/* <h1>Our Services</h1> */}
      <SectionWrapper className="py-16"> {/* Added py-16 for spacing */}
        <ServicesFilter />
      </SectionWrapper>
    </main>
  );
};

export default ServicesPage;
