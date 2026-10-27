'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PartnerCardsWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PartnerCardsWrapper
 *
 * Client observer for the "Why Schools Partner with Velora" section cards.
 * Triggers smooth, opposite-direction scroll entrance animations once when the section enters the viewport.
 * Progressively enhances: cards remain fully visible without JS or when reduced motion is preferred.
 */
export default function PartnerCardsWrapper({
  children,
  className = '',
}: PartnerCardsWrapperProps) {
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
            // Run animation only once per page load
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

  const readyClass = isReady ? 'partner-anim-ready' : '';
  const visibleClass = isVisible ? 'partner-visible' : '';

  return (
    <div
      ref={containerRef}
      className={`partner-cards-grid ${readyClass} ${visibleClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
