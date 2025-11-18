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
      {children}
    </div>
  );
};

export default PageLayout;
