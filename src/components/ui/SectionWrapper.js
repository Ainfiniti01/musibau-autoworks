import React from 'react';

const SectionWrapper = ({ title, children, className }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      {title && <h2 className="text-2xl font-semibold text-[#004040] mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default SectionWrapper;
