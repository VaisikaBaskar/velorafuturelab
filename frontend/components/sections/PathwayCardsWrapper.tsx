'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PathwayCardsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PathwayCardsWrapper
 *
 * Client observer for the "Grade-Wise Learning Pathways" 2x2 section cards.
 * Triggers opposite-direction entrance animations (left cards from left, right cards from right)
 * once when the section enters the viewport.
 * Progressively enhances: cards remain fully visible without JS or when reduced motion is preferred.
 */
export default function PathwayCardsWrapper({
  children,
  className = '',
}: PathwayCardsWrapperProps) {
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

  const readyClass = isReady ? 'pathway-anim-ready' : '';
  const visibleClass = isVisible ? 'pathway-visible' : '';

  return (
    <div
      ref={containerRef}
      className={`pathway-cards-grid ${readyClass} ${visibleClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
