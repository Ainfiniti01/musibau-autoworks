import React from 'react';

const SectionWrapper = ({ children, className }) => {
  return (
    <section className={className}>
      {children}
    </section>
  );
};

export default SectionWrapper;
