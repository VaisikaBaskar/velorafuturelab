'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  staggerChildren?: boolean;
  staggerDelay?: number; // delay between cards in milliseconds
  threshold?: number;
  rootMargin?: string;
}

/**
 * ScrollReveal: A lightweight, accessible, progressive scroll-reveal component.
 *
 * Design & Accessibility Guarantees:
 * 1. Progressive Enhancement: Elements render fully visible during SSR and before client JS mounts.
 * 2. Reduced Motion: If user prefers reduced motion, animations are completely bypassed.
 * 3. Performance: Single IntersectionObserver trigger per element, unobserving immediately after reveal.
 * 4. Staggered Cascades: Child cards cascade sequentially with restrained, natural timing.
 */
export default function ScrollReveal({
  children,
  className = '',
  as: Component = 'div',
  staggerChildren = false,
  staggerDelay = 90,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
}: ScrollRevealProps) {
  const domRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // If the user prefers reduced motion, reveal immediately with zero motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    // Mark as ready to activate subtle CSS entrance states on client mount
    setIsReady(true);

    const node = domRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    // If staggered cascade is requested, assign progressive transition-delay to direct children
    if (staggerChildren && node.children) {
      Array.from(node.children).forEach((child, index) => {
        (child as HTMLElement).style.transitionDelay = `${index * staggerDelay}ms`;
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [staggerChildren, staggerDelay, threshold, rootMargin]);

  // Base and progressive reveal classes
  const baseClass = staggerChildren ? 'velora-stagger-container' : 'velora-reveal';
  const readyClass = isReady
    ? (staggerChildren ? 'velora-stagger-init' : 'velora-reveal-init')
    : '';
  const revealedClass = isRevealed ? 'velora-revealed' : '';

  return (
    <Component
      ref={domRef}
      className={`${baseClass} ${readyClass} ${revealedClass} ${className}`.trim()}
    >
      {children}
    </Component>
  );
}
