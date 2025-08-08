import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Import images from the assets/images folder
import slide1 from '../assets/images/background.png';
import slide2 from '../assets/images/Chassis_Repair.jpg';
import slide3 from '../assets/images/bg.jpg';
// import others as needed

const slides = [
  {
    image: slide1, // Use imported variable
    heading: "Welcome to Musubi Autoworld",
    subheading: "Premium auto care with trusted hands",
    ctaText: "Book a Service",
    ctaLink: "/booking",
  },
  {
    image: slide2, // Use imported variable
    heading: "Reliable Repairs, Every Time",
    subheading: "We treat your car like our own.",
    ctaText: "Explore Services",
    ctaLink: "/service",
  },
  {
    image: slide3, // Use imported variable
    heading: "On-Demand Auto Solutions",
    subheading: "Wherever you are, we’ve got you covered.",
    ctaText: "Contact Us",
    ctaLink: "/contact",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      effect="fade"
      loop
      className="h-screen"
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="min-h-screen bg-cover bg-center flex items-center justify-center md:min-h-[70vh]"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="bg-black/60 w-full h-full flex flex-col justify-center items-center text-white px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.heading}</h1>
            <p className="text-lg md:text-2xl mb-6">{slide.subheading}</p>
            <a
              href={slide.ctaLink}
              className="bg-black text-yellow-500 py-2 px-5 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              {slide.ctaText}
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
