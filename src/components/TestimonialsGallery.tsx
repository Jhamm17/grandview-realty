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

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial Card */}
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-300 relative border border-white/20">
        <div className="absolute -top-6 left-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-gray-800 mb-8 leading-relaxed italic text-lg md:text-xl font-medium">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-6 shadow-lg">
              <span className="text-white font-bold text-xl">{currentTestimonial.initial}</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-lg">{currentTestimonial.author}</p>
              <p className="text-blue-600 font-medium">{currentTestimonial.role}</p>
            </div>
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
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-blue-600 shadow-lg' : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 