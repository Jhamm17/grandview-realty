"use client";

import { useEffect } from "react";

export default function ScrollController() {
  useEffect(() => {
    // Get the navigation height (h-24 = 96px)
    const navHeight = 96;
    
    // Only prevent scrolling up past the navigation bar
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Prevent scrolling up past the navigation bar
      if (scrollTop < navHeight) {
        window.scrollTo(0, navHeight);
      }
    };

    // Handle wheel events to prevent scrolling up past navigation
    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Prevent scrolling up past navigation
      if (e.deltaY < 0 && scrollTop <= navHeight) {
        e.preventDefault();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null; // This component doesn't render anything
} 