"use client";

import { useEffect } from "react";

export default function ScrollController() {
  useEffect(() => {
    // Prevent scrolling past the content
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollTop >= maxScroll) {
        window.scrollTo(0, maxScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null; // This component doesn't render anything
} 