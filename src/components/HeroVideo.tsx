'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface HeroVideoProps {
  posterImage: string;
  posterAlt: string;
}

export default function HeroVideo({ posterImage, posterAlt }: HeroVideoProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check connection speed (basic heuristic)
    const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection;
    const isSlowConnection = connection && (
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' || 
      connection.effectiveType === '3g'
    );
    
    if (prefersReducedMotion || isSlowConnection) {
      setShouldLoadVideo(false);
      setIsVideoError(true);
    }
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    setIsVideoError(true);
  };

  const handleVideoCanPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, fall back to image
        setIsVideoError(true);
      });
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Video Element */}
      {shouldLoadVideo && !isVideoError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={posterImage}
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
        >
          {/* Desktop video (larger screens) */}
          <source 
            src="/GrandviewHome.mp4" 
            type="video/mp4" 
            media="(min-width: 768px)"
          />
          
          {/* Mobile video (smaller screens) */}
          <source 
            src="/GrandviewMobile.mp4" 
            type="video/mp4" 
            media="(max-width: 767px)"
          />
        </video>
      )}
      
      {/* Fallback image */}
      {(!shouldLoadVideo || isVideoError) && (
        <Image
          src={posterImage}
          alt={posterAlt}
          fill
          style={{ objectFit: "cover" }}
          priority
          quality={90}
        />
      )}
      
      {/* Loading overlay */}
      {shouldLoadVideo && !isVideoLoaded && !isVideoError && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-8 h-8 border-2 border-white/60 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
} 