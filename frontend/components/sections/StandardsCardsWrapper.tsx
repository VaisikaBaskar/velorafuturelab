'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StandardsCardsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * StandardsCardsWrapper
 *
 * Client observer for the "Built for Modern Educational Standards" section cards.
 * Triggers a sequential left-to-right entrance animation once when the section enters the viewport.
 * Progressively enhances: cards remain fully visible without JS or when reduced motion is preferred.
 */
export default function StandardsCardsWrapper({
  children,
  className = '',
}: StandardsCardsWrapperProps) {
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

    let observer: IntersectionObserver | null = null;
    const rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (observer) {
                observer.unobserve(entry.target);
                observer.disconnect();
              }
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      if (node) {
        observer.observe(node);
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const readyClass = isReady ? 'standards-anim-ready' : '';
  const visibleClass = isVisible ? 'standards-visible' : '';

  return (
    <div
      ref={containerRef}
      className={`standards-cards-grid ${readyClass} ${visibleClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
