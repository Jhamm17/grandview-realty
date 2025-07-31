"use client";

import { useEffect } from "react";

export default function ScrollController() {
  useEffect(() => {
    // Get the navigation height (h-24 = 96px)
    const navHeight = 96;
    
    // Prevent scrolling past the footer and prevent scrolling up past nav
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Prevent scrolling past the footer
      if (scrollTop >= maxScroll) {
        window.scrollTo(0, maxScroll);
      }
      
      // Prevent scrolling up past the navigation bar
      if (scrollTop < navHeight) {
        window.scrollTo(0, navHeight);
      }
    };

    // Also handle wheel events to prevent scrolling beyond bounds
    const handleWheel = (e: WheelEvent) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Prevent scrolling down past footer
      if (e.deltaY > 0 && scrollTop >= maxScroll) {
        e.preventDefault();
      }
      
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