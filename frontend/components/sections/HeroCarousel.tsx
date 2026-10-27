'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  id: number;
  src: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    src: '/images/hero-slide-1.jpg',
    alt: 'Child learning robotics and coding with a laptop and a robot car at Velora Future Lab',
  },
  {
    id: 2,
    src: '/images/hero-slide-2.jpg',
    alt: 'Group of children learning robotics and collaborating on projects at Velora Future Lab',
  },
  {
    id: 3,
    src: '/images/hero-slide-3.jpg',
    alt: 'Trainer teaching children robotics in the Velora Future Lab learning environment',
  },
];

// Append clone of slide 1 for continuous, glitch-free infinite right-to-left loop
const trackSlides = [...slides, { ...slides[0], id: 999 }];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    // Respect reduced motion preference by avoiding auto-advancing slides
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 1. If reaching the clone slide at index 3, wait 700ms for slide animation to complete,
    // then silently reset to index 0 with transition disabled.
    if (currentIndex === slides.length) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700);

      return () => clearTimeout(resetTimer);
    }

    // 2. If transition was disabled after reset to index 0, re-enable it for subsequent slides.
    if (!isTransitioning && currentIndex === 0) {
      const enableTimer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);

      return () => clearTimeout(enableTimer);
    }

    // 3. Automatic slide progression every 4.5 seconds (4–5 seconds requirement)
    const slideTimer = setTimeout(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 4500);

    return () => clearTimeout(slideTimer);
  }, [currentIndex, isTransitioning]);

  // Active indicator dot index (0, 1, or 2)
  const activeDot = currentIndex === slides.length ? 0 : currentIndex;

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Decorative ambient glow matching Velora brand palette */}
      <div
        className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/20 via-emerald-500/15 to-blue-600/20 opacity-70 blur-xl pointer-events-none velora-ambient-glow"
        aria-hidden="true"
      />

      {/* Main Carousel Frame */}
      <div className="relative rounded-3xl bg-white p-2.5 sm:p-3 shadow-xl shadow-slate-900/10 border border-slate-200/90 overflow-hidden">
        {/* Sliding Viewport */}
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl bg-slate-100">
          <div
            className="absolute inset-0 flex h-full will-change-transform"
            style={{
              width: '400%',
              transform: `translateX(-${currentIndex * 25}%)`,
              transition: isTransitioning
                ? 'transform 700ms cubic-bezier(0.25, 1, 0.5, 1)'
                : 'none',
            }}
          >
            {trackSlides.map((slide, idx) => (
              <div
                key={`${slide.id}-${idx}`}
                className="relative h-full flex-shrink-0 overflow-hidden"
                style={{ width: '25%' }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 650px"
                  className="object-cover object-center transition-transform duration-700 ease-out"
                  priority
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="pt-3 pb-1 flex items-center justify-center gap-2" aria-hidden="true">
          {slides.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeDot === dotIdx
                  ? 'w-6 bg-blue-600'
                  : 'w-1.5 bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
