'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const ExperienceInnovation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Luxurious Travel",
      description: "Enjoy the perfect blend of comfort and elegance at our luxurious Travel. From cozy rooms to world-class amenities, we ensure an unforgettable stay.",
      features: [
        "Spacious and Modern Rooms",
        "24/7 Room Service",
        "Complimentary Wi-Fi",
        "Infinity Pool with Scenic",
        "Multi-cuisine Restaurant",
        "Exclusive Spa"
      ]
    },
    {
      title: "Unmatched Travel ",
      description: "Experience hospitality like never before. Our dedicated staff ensures every moment of your stay is filled with warmth and personalized service.",
      features: [
        "Dedicated Concierge Service",
        "Customized Travel Itineraries",
        "Daily Housekeeping",
        "Conference and Banquet ",
        "Luxury Airport Transfers",
        "Special Packages"
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full bg-white">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Left Content */}
          <div className="p-6 facility-content flex flex-col justify-center">
            <div className="relative">
              <div className="mb-12">
                <div className="flex items-center gap-2 text-[#b0191e] font-secound mb-3">
                  <span className="text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="#b0191e">
                      <path d="M1.92556 7.69046..."></path>
                    </svg>
                  </span>
                  <span>Our Facility</span>
                  <span className="text-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="#b0191e">
                      <path d="M13.0744 8.30954..."></path>
                    </svg>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:max-w-[350px] leading-tight">
                  {slides[currentSlide].title}
                </h2>
                <p className="text-[#787878] text-base sm:text-lg mb-8 lg:max-w-[480px] font-normal">
                  {slides[currentSlide].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {slides[currentSlide].features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#b0191e] rounded-full" />
                      <span className="text-xs sm:text-sm font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <button onClick={prevSlide} className="group">
                  <div className="flex items-center gap-2 text-3xl text-[#fbb03b] group-hover:text-[#fbb03b]">
                    <span className="text-3xl">←</span>
                  </div>
                </button>

                <span className="text-3xl font-light">
                  <span className="text-[#b0191e] text-3xl">{currentSlide + 1}</span>
                  <span className="mx-2 text-3xl">/</span>
                  <span className="text-[#fbb03b] text-3xl">{slides.length}</span>
                </span>

                <button onClick={nextSlide} className="group">
                  <div className="flex items-center gap-2 text-[#fbb03b] group-hover:text-[#fbb03b]">
                    <span className="text-3xl">→</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative flex items-center">
            <Image
              src="/home/facility-img.webp"
              alt="Luxurious Travel"
              className="w-full h-full object-cover"
              width={1000}
              height={1000}
            />

            {/* Rating Card */}
            <div className="absolute -left-10 sm:-left-36 bg-white hidden lg:block rounded-lg shadow-lg p-4 sm:p-6 w-60 sm:w-72 rating-wraper">
              <div>
                <Image
                  src="/home/rating-img1.png"
                  alt="Facility"
                  className="w-full h-auto object-cover mb-4"
                  width={1000}
                  height={1000}
                />
                <Image
                  src="/home/rating-img2.png"
                  alt="Facility"
                  className="w-full h-auto object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceInnovation;
