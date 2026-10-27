'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export interface AboutSectionProps {
  className?: string;
}

export default function AboutSection({ className = '' }: AboutSectionProps) {
  return (
    <section
      className={`w-full max-w-5xl xl:max-w-6xl mx-auto py-2 sm:py-4 ${className}`}
      aria-labelledby="about-section-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
        {/* Left Side: Proportional image */}
        <div className="lg:col-span-5 relative w-full">
          <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md border border-slate-100">
            <Image
              src="/images/about-innovation-lab.jpg"
              alt="Students collaborating on robotics and AI at Velora Future Lab"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Right Side: Content hierarchy */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center space-y-4 sm:space-y-5">
          {/* Main heading */}
          <h2
            id="about-section-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight"
          >
            Velora Future Lab
          </h2>

          {/* 3. Description */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            At Velora Future Lab, we believe every young mind has the potential to innovate and create. Through hands-on learning in Artificial Intelligence, Robotics, and emerging technologies, we inspire students to think critically, solve real-world problems, and turn their ideas into reality.
          </p>

          {/* 4. Consult Now button */}
          <div className="pt-2">
            <Button
              href="/contact-us"
              size="md"
              variant="primary"
              className="group rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <span>Consult Now</span>
              <svg
                className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
