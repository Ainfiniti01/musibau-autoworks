import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../Header'; // Assuming Header is in ../components
import Footer from '../MinimalFooter.js'; // Assuming Footer is in ../components

const PageLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Helmet>
        <title>{title || 'Musibau AutoWorks'}</title>
      </Helmet>
      <Header />
      <div className="max-w-7xl mx-auto py-10 px-6">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
