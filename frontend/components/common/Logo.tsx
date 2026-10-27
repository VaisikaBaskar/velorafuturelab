'use client';

import React from 'react';
import Image from 'next/image';

export interface LogoProps {
  /**
   * Style variant:
   * - 'horizontal': V emblem + velora futurelab + tagline
   * - 'compact': V emblem + velora futurelab (no tagline)
   * - 'mark': Iconic V emblem only
   * - 'full': Square vertical lockup
   */
  variant?: 'horizontal' | 'compact' | 'mark' | 'full';
  /**
   * Theme mode:
   * - 'light': for light backgrounds (navbar, cards)
   * - 'dark': for dark backgrounds (footer, admin sidebar)
   */
  theme?: 'light' | 'dark';
  /**
   * Height in pixels (width is auto-calculated based on aspect ratio)
   */
  height?: number;
  /**
   * Additional classes
   */
  className?: string;
  /**
   * Priority loading for above-the-fold headers
   */
  priority?: boolean;
}

export default function Logo({
  variant = 'horizontal',
  theme = 'light',
  height = 42,
  className = '',
  priority = false,
}: LogoProps) {
  // Determine source image & aspect ratio
  let src = '/images/logo-horizontal.png';
  let aspectRatio = 3.31; // 1193 / 360

  if (variant === 'mark') {
    src = '/images/logo-mark.png';
    aspectRatio = 1.04; // 543 / 523
  } else if (variant === 'full') {
    src = '/images/logo-full.png';
    aspectRatio = 1.0;
  } else if (variant === 'compact') {
    src = theme === 'dark' 
      ? '/images/logo-horizontal-dark-compact.png' 
      : '/images/logo-horizontal-compact.png';
    aspectRatio = 2.92;
  } else {
    // horizontal with tagline
    src = theme === 'dark' 
      ? '/images/logo-horizontal-dark.png' 
      : '/images/logo-horizontal.png';
    aspectRatio = 3.31;
  }

  const width = Math.round(height * aspectRatio);

  return (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      style={{ height: `${height}px` }}
    >
      <Image
        src={src}
        alt="VELORA Future Lab"
        width={width}
        height={height}
        priority={priority}
        className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
        style={{ height: `${height}px`, width: 'auto' }}
      />
    </div>
  );
}
