'use client';

import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "Their team genuinely enjoyed and appreciated my one of a kind house... Not only were the agents knowledgeable about the mechanics and design of the house, they were patient and perseverant, employing various sales tactics. Additionally, I had an absolutely amazing video of the house which really advertised its one of a kind features and amazing architectural structure.",
    author: "Kristina R.",
    role: "Satisfied Seller",
    initial: "K"
  },
  {
    id: 2,
    quote: "As a seller, if you want a team who is willing to put the time and effort into really knowing your house, especially if you have a difficult house to sell, Grandview Realty is the company to use!",
    author: "Chris P.",
    role: "Happy Seller",
    initial: "C"
  },
  {
    id: 3,
    quote: "We experienced the utmost professionalism, upfront communication, honesty and integrity throughout the entire process. We highly recommend the services of the team at Grandview Realty!",
    author: "Edward G.",
    role: "Delighted Client",
    initial: "E"
  }
];

export default function TestimonialsGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial Content */}
      <div className={`text-center transition-all duration-500 ease-in-out ${
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        {/* Quote Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        </div>
        
        {/* Quote Text */}
        <div className="mb-12">
          <p className="text-white leading-relaxed italic text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>
        </div>
        
        {/* Author Info */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg border border-white/30">
            <span className="text-white font-bold text-2xl">{currentTestimonial.initial}</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-white text-xl mb-1">{currentTestimonial.author}</p>
            <p className="text-white/80 font-medium">{currentTestimonial.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevTestimonial}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-200 z-10 border border-white/20"
        aria-label="Previous testimonial"
      >
        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-200 z-10 border border-white/20"
        aria-label="Next testimonial"
      >
        <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTestimonial(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-white shadow-lg' : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 