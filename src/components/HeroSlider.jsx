import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      backgroundImage:
        "https://images.unsplash.com/photo-1539799139339-50c5fe1e2b1b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Mechanic working on a car engine in garage",
      category: "Welcome",
      headline: "Musibau Autoworks",
      subtext:
        "Trusted automobile repair & maintenance services with decades of experience. Your car is in safe hands.",
      ctaText: "Book a Service",
      ctaLink: "/booking#/booking",
      textPosition: "left",
      accentColor: "yellow",
      seoKeywords:
        "auto repair Nigeria, car service Lagos, mechanic shop, Musibau Autoworks, trusted auto repair",
    },
    {
      id: 2,
      backgroundImage:
        "https://images.unsplash.com/photo-1630028930946-61c629fa9f56?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Mechanic performing routine car maintenance",
      category: "General Maintenance",
      headline: "Keep Your Car in Top Shape",
      subtext:
        "From oil changes to full servicing, we ensure smooth and safe rides every time.",
      ctaText: "Book Maintenance",
      ctaLink: "/service#/services",
      textPosition: "left",
      accentColor: "yellow",
      seoKeywords:
        "car servicing, auto maintenance Nigeria, oil change, Musibau Autoworks",
    },
    {
      id: 3,
      backgroundImage:
        "https://images.unsplash.com/photo-1587121892719-1711ec9cc798?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Car AC vents being checked by mechanic",
      category: "AC Repair",
      headline: "Stay Cool on the Road",
      subtext:
        "Expert air conditioning repair and gas refills to keep your drives comfortable.",
      ctaText: "Fix AC",
      ctaLink: "/service#/services",
      textPosition: "right",
      accentColor: "blue",
      seoKeywords:
        "car AC repair, auto air conditioning, AC gas refill Nigeria, Musibau Autoworks",
    },
    {
      id: 4,
      backgroundImage:
        "https://images.unsplash.com/photo-1730514784243-f0e7f09c9f50?q=80&w=1614&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Tow truck assisting stranded vehicle",
      category: "Emergency Rescue",
      headline: "24/7 Towing & Rescue",
      subtext:
        "Stuck on the road? Our emergency towing and rescue team has your back anytime, anywhere.",
      ctaText: "Get Help Now",
      ctaLink: "/towing",
      textPosition: "center",
      accentColor: "red",
      seoKeywords:
        "towing service, roadside rescue, emergency car breakdown, Musibau Autoworks towing",
    },
    {
      id: 5,
      backgroundImage:
        "https://plus.unsplash.com/premium_photo-1682142358040-cc602ecb0366?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Car being spray-painted in workshop",
      category: "Painting",
      headline: "Give Your Car a Fresh Look",
      subtext:
        "Professional auto painting with precision and durable finishes to restore beauty.",
      ctaText: "Paint My Car",
      ctaLink: "/painting",
      textPosition: "left",
      accentColor: "green",
      seoKeywords:
        "car painting Nigeria, auto body paint, spray paint car workshop, Musibau Autoworks",
    },
    {
      id: 6,
      backgroundImage:
        "https://plus.unsplash.com/premium_photo-1661964211810-f078c3f9e111?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Mechanic repairing car body panel",
      category: "Panel Beating",
      headline: "Restore Your Car’s Bodywork",
      subtext:
        "Expert panel beating and body repairs to fix dents, crashes, and restore shape.",
      ctaText: "Fix Bodywork",
      ctaLink: "/panel-beating",
      textPosition: "right",
      accentColor: "amber",
      seoKeywords:
        "panel beating Nigeria, car body repair, dent fixing, Musibau Autoworks",
    },
    {
      id: 7,
      backgroundImage:
        "https://plus.unsplash.com/premium_photo-1682126117799-064f3f7a034e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      backgroundAlt: "Mechanic testing car electrical wiring",
      category: "Electrical & Rewiring",
      headline: "Expert Auto Electrical Solutions",
      subtext:
        "From rewiring to advanced electrical diagnostics, we keep your car powered up.",
      ctaText: "Check Electricals",
      ctaLink: "/electrical",
      textPosition: "center",
      accentColor: "purple",
      seoKeywords:
        "car rewiring Nigeria, auto electrical repair, car diagnostics, Musibau Autoworks electrical",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const currentSlideData = slides[currentSlide];

  const colors = {
    yellow: "#FFD700",
    amber: "#FFB000",
    red: "#FF3333",
    black: "#000000",
    white: "#FFFFFF",
  };

  const getAccentColor = (accent) => colors[accent] || colors.yellow;

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.8 },
        scale: { duration: 1.2, ease: "easeOut" },
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
      },
    }),
  };

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      role="banner"
      aria-label="Musibau Autoworks Hero Slider"
    >
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            name: "Musibau Autoworks",
            description:
              "Trusted automobile repair, maintenance, and roadside assistance services in Nigeria.",
            url: "https://musibauautoworks.com",
            sameAs: [
              "https://instagram.com/musibauautoworks",
              "https://facebook.com/musibauautoworks",
            ],
          }),
        }}
      />

      {/* Background + Overlay */}
      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={currentSlide}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
          role="img"
          aria-label={currentSlideData.backgroundAlt}
        >
          <motion.div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentSlideData.backgroundImage})`,
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
          />
          <motion.div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {currentSlideData.headline}
          </h1>
          <p className="text-lg md:text-2xl mb-6">
            {currentSlideData.subtext}
          </p>
          <a
            href={currentSlideData.ctaLink}
            className="bg-yellow-500 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300 shadow-lg"
          >
            {currentSlideData.ctaText}
          </a>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 p-3 rounded-full text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 p-3 rounded-full text-white"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
