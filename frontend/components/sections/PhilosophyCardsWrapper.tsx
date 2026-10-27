'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PhilosophyCardsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PhilosophyCardsWrapper
 *
 * Lightweight, accessible client observer for the "Our Learning Philosophy & Approach to Innovation"
 * section cards. Triggers the scroll-entrance animation only once when the section enters the viewport.
 * Progressively enhances: cards remain fully visible if JavaScript fails or reduced motion is preferred.
 */
export default function PhilosophyCardsWrapper({
  children,
  className = '',
}: PhilosophyCardsWrapperProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's reduced-motion preference immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    // Enable animation initial states on client mount
    setIsReady(true);

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Run animation only once per page load, then clean up
            observer.unobserve(entry.target);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const readyClass = isReady ? 'philosophy-anim-ready' : '';
  const visibleClass = isVisible ? 'philosophy-visible' : '';

  return (
    <div
      ref={containerRef}
      className={`philosophy-cards-grid ${readyClass} ${visibleClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
