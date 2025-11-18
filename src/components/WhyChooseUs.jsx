import React from 'react';

const FeatureItem = ({ icon, title, description, aosDelay }) => {
  return (
    <div
      className="flex flex-col items-center text-center"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <div className="text-[#ECBE07] text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white font-montserrat">{title}</h3>
      <p className="text-gray-300 font-opensans">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  const features = [
    { icon: '⭐', title: 'Expert Technicians', description: 'Our certified mechanics have years of experience.' },
    { icon: '🛠️', title: 'Quality Parts', description: 'We use only the highest quality parts for repairs.' },
    { icon: '⏱️', title: 'Fast Service', description: 'Get back on the road quickly with our efficient service.' },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl font-bold text-center mb-12 text-white font-montserrat"
          data-aos="fade-down"
        >
          Why Choose Us
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              aosDelay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
