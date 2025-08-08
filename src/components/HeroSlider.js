import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: "/assets/images/slide1.jpg",
    heading: "Welcome to Musubi Autoworld",
    subheading: "Premium auto care with trusted hands",
    ctaText: "Book a Service",
    ctaLink: "/booking",
  },
  {
    image: "/assets/images/slide2.jpg",
    heading: "Reliable Repairs, Every Time",
    subheading: "We treat your car like our own.",
    ctaText: "Explore Services",
    ctaLink: "/service",
  },
  {
    image: "/assets/images/slide3.jpg",
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
        <SwiperSlide key={index}>
          <div
            className="h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-black/60 w-full h-full flex flex-col justify-center items-center text-white px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.heading}</h1>
              <p className="text-lg md:text-2xl mb-6">{slide.subheading}</p>
              <a
                href={slide.ctaLink}
                className="bg-gold hover:bg-yellow-500 text-black px-6 py-3 rounded shadow transition"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
