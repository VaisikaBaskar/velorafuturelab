'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroFloatingRobot from '@/components/sections/HeroFloatingRobot';

export default function AboutBanner() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-900/5">
      {/* ========================================================= */}
      {/* SOFT BRAND AMBIENT CURVES & BACKGROUND EFFECTS            */}
      {/* ========================================================= */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 85% at 15% 115%, rgba(0, 71, 186, 0.08) 0%, rgba(2, 132, 199, 0.04) 50%, transparent 80%), radial-gradient(ellipse 55% 65% at 85% 105%, rgba(22, 163, 74, 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative dot matrix pattern on bottom-left */}
      <div
        className="absolute bottom-6 left-8 sm:left-12 w-28 h-20 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#0047ba 1.5px, transparent 1.5px)',
          backgroundSize: '12px 12px',
        }}
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* UPPER-LEFT BANNER AREA: SUBTLE DOTTED MATRIX & ACCENT     */}
      {/* ========================================================= */}
      <div
        className="absolute top-6 sm:top-7 left-8 sm:left-12 pointer-events-none select-none hidden sm:block z-10"
        aria-hidden="true"
      >
        <svg
          width="96"
          height="42"
          viewBox="0 0 96 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Evenly spaced 4x3 micro dot grid */}
          <circle cx="6" cy="6" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="18" cy="6" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="30" cy="6" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="42" cy="6" r="1.2" fill="#0047ba" fillOpacity="0.25" />

          <circle cx="6" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="18" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="30" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="42" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />

          <circle cx="6" cy="30" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="18" cy="30" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="30" cy="30" r="1.2" fill="#0047ba" fillOpacity="0.25" />
          <circle cx="42" cy="30" r="1.2" fill="#0047ba" fillOpacity="0.25" />

          {/* Fine horizontal circuit trace extending right */}
          <path
            d="M 42 18 L 62 18 L 70 26 L 86 26"
            stroke="#0047ba"
            strokeWidth="1.2"
            strokeOpacity="0.24"
            strokeLinecap="round"
          />

          {/* Connected small terminal node */}
          <circle cx="86" cy="26" r="2.2" fill="none" stroke="#0047ba" strokeWidth="1" strokeOpacity="0.35" />
          <circle cx="86" cy="26" r="1" fill="#0047ba" fillOpacity="0.45" />

          {/* Subtle cyan accent micro node */}
          <circle cx="70" cy="26" r="1.5" fill="#0284c7" fillOpacity="0.4" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* MAIN BANNER GRID CONTAINER                                */}
      {/* ========================================================= */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ===================================================== */}
          {/* LEFT: HEADING & BREADCRUMB                            */}
          {/* ===================================================== */}
          <div className="lg:col-span-5 relative flex flex-col items-start justify-center space-y-3 sm:space-y-4">
            {/* Subtle Robotics Circuit, Dotted Paths & Connected Nodes Accent */}
            <div className="pointer-events-none select-none pb-0.5" aria-hidden="true">
              <svg
                className="w-36 sm:w-44 h-7 sm:h-8 overflow-visible"
                viewBox="0 0 160 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Micro-dot cluster (3x2 grid) */}
                <circle cx="6" cy="8" r="1.2" fill="#0047ba" fillOpacity="0.25" />
                <circle cx="16" cy="8" r="1.2" fill="#0047ba" fillOpacity="0.25" />
                <circle cx="26" cy="8" r="1.2" fill="#0047ba" fillOpacity="0.25" />
                <circle cx="6" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />
                <circle cx="16" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />
                <circle cx="26" cy="18" r="1.2" fill="#0047ba" fillOpacity="0.25" />

                {/* Primary Circuit Trace with 45-degree angled bend */}
                <path
                  d="M 38 18 L 65 18 L 76 26 L 118 26"
                  stroke="#0047ba"
                  strokeWidth="1.2"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                />

                {/* Fine dotted extension path */}
                <path
                  d="M 118 26 L 155 26"
                  stroke="#0047ba"
                  strokeWidth="1.2"
                  strokeDasharray="3 3"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                />

                {/* Secondary upper branch */}
                <path
                  d="M 65 18 L 72 10 L 98 10"
                  stroke="#0047ba"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  strokeOpacity="0.22"
                  strokeLinecap="round"
                />

                {/* Small Connected Nodes */}
                <circle cx="38" cy="18" r="3" fill="none" stroke="#0047ba" strokeWidth="1.2" strokeOpacity="0.45" />
                <circle cx="38" cy="18" r="1.3" fill="#0047ba" fillOpacity="0.55" />

                <circle cx="76" cy="26" r="2.5" fill="#0047ba" fillOpacity="0.6" />
                <circle cx="76" cy="26" r="1" fill="#ffffff" />

                <circle cx="98" cy="10" r="2.2" fill="#0284c7" fillOpacity="0.55" />

                <circle cx="118" cy="26" r="2.2" fill="#0047ba" fillOpacity="0.5" />

                <circle cx="155" cy="26" r="3" fill="none" stroke="#0047ba" strokeWidth="1" strokeOpacity="0.35" />
                <circle cx="155" cy="26" r="1.2" fill="#0047ba" fillOpacity="0.4" />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]">
              About <span className="text-[#0047ba]">Us</span>
            </h1>

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="pt-0.5">
              <ol className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
                <li>
                  <Link
                    href="/"
                    className="text-slate-600 hover:text-[#0047ba] transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <svg
                      className="w-4 h-4 text-[#0047ba]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    <span>Home</span>
                  </Link>
                </li>
                <li className="text-slate-400 select-none font-bold" aria-hidden="true">
                  &gt;
                </li>
                <li className="text-[#0047ba] font-bold" aria-current="page">
                  About Us
                </li>
              </ol>
            </nav>

            {/* Mobile & Tablet Floating Robot in available header area */}
            <HeroFloatingRobot className="lg:hidden absolute right-0 sm:right-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* ===================================================== */}
          {/* RIGHT: ORGANIC CURVED PHOTO & 3 FLOATING CARDS        */}
          {/* ===================================================== */}
          <div className="lg:col-span-7 relative flex items-center justify-end min-h-[300px] sm:min-h-[340px]">
            {/* Container for photo + decorations + cards */}
            <div className="relative w-full max-w-[620px] flex items-center justify-end">
              {/* SVG Definition of the organic clip-path */}
              <svg className="absolute w-0 h-0" aria-hidden="true">
                <defs>
                  <clipPath id="organic-photo-curve" clipPathUnits="objectBoundingBox">
                    <path d="M 0.35,0.02 C 0.22,0.05 0.12,0.22 0.10,0.42 C 0.08,0.56 0.12,0.64 0.08,0.74 C 0.04,0.84 0,0.92 0,0.98 C 0,1 0.02,1 0.06,1 L 0.94,1 C 0.98,1 1,0.98 1,0.94 L 1,0.06 C 1,0.02 0.98,0 0.94,0 L 0.40,0 C 0.37,0 0.36,0.01 0.35,0.02 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* Photo Frame Wrapper */}
              <div className="relative w-full sm:w-[500px] lg:w-[520px] h-[260px] sm:h-[300px] lg:h-[320px]">
                {/* 3D Futuristic Companion Robot floating in the empty center space */}
                <HeroFloatingRobot className="hidden lg:block absolute -left-36 lg:-left-40 xl:-left-44 top-1/2 -translate-y-1/2" />

                {/* Top Angled Flag / Ribbon Accent */}
                <div
                  className="absolute -top-1.5 right-10 sm:right-14 w-28 sm:w-36 h-7 sm:h-8 bg-gradient-to-r from-[#0047ba] to-[#1e3a8a] transform -skew-x-12 rounded-xs shadow-md pointer-events-none z-10"
                  aria-hidden="true"
                />

                {/* The Photo Container with Organic ClipPath */}
                <div
                  className="relative w-full h-full shadow-lg overflow-hidden bg-slate-100"
                  style={{
                    clipPath: 'url(#organic-photo-curve)',
                    WebkitClipPath: 'url(#organic-photo-curve)',
                  }}
                >
                  <Image
                    src="/images/about-banner-robot.jpg"
                    alt="STEM Educational robotics kit and laptop at Velora Future Lab"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 520px"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Subtle lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Subtle Robotics-Themed Circuit & Connection Nodes (Empty Horizontal Space) */}
                <div
                  className="absolute -left-40 lg:-left-44 xl:-left-52 top-1/2 -translate-y-1/2 w-36 lg:w-40 xl:w-48 pointer-events-none z-10 hidden lg:block"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 190 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto overflow-visible"
                  >
                    {/* Leftward Dotted Extension bridging towards left content */}
                    <path
                      d="M -28 50 L 10 50"
                      stroke="#0047ba"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />
                    <circle cx="-28" cy="50" r="2.2" fill="none" stroke="#0047ba" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx="-28" cy="50" r="1" fill="#0047ba" fillOpacity="0.5" />
                    <circle cx="-14" cy="38" r="1.2" fill="#0047ba" fillOpacity="0.2" />

                    {/* Main Horizontal Circuit Trace with 45-degree angled bend */}
                    <path
                      d="M 10 50 L 55 50 L 72 32 L 122 32 L 138 48 L 175 48"
                      stroke="#0047ba"
                      strokeWidth="1.5"
                      strokeOpacity="0.32"
                      strokeLinecap="round"
                    />

                    {/* Upper Branch: Fine dotted trace extending upward */}
                    <path
                      d="M 72 32 L 72 16 L 112 16"
                      stroke="#0047ba"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      strokeOpacity="0.28"
                      strokeLinecap="round"
                    />

                    {/* Lower Branch: Subtle secondary telemetry line */}
                    <path
                      d="M 55 50 L 70 65 L 118 65"
                      stroke="#0047ba"
                      strokeWidth="1.2"
                      strokeDasharray="2 3"
                      strokeOpacity="0.25"
                      strokeLinecap="round"
                    />

                    {/* Node 1: Leftmost connection node (dual ring) */}
                    <circle cx="10" cy="50" r="4" fill="none" stroke="#0047ba" strokeWidth="1.5" strokeOpacity="0.45" />
                    <circle cx="10" cy="50" r="1.8" fill="#0047ba" fillOpacity="0.55" />

                    {/* Node 2: Circuit junction node */}
                    <circle cx="72" cy="32" r="3" fill="#0047ba" fillOpacity="0.65" />
                    <circle cx="72" cy="32" r="1.2" fill="#ffffff" />

                    {/* Node 3: Upper terminal node (subtle emerald green accent) */}
                    <circle cx="112" cy="16" r="2.5" fill="#16a34a" fillOpacity="0.6" />

                    {/* Node 4: Lower terminal node */}
                    <circle cx="118" cy="65" r="2.5" fill="#0047ba" fillOpacity="0.4" />

                    {/* Node 5: Right connection point near guide path */}
                    <circle cx="175" cy="48" r="3.5" fill="none" stroke="#0047ba" strokeWidth="1.2" strokeOpacity="0.4" />
                    <circle cx="175" cy="48" r="1.5" fill="#0047ba" fillOpacity="0.5" />

                    {/* Micro-grid telemetry accent dots */}
                    <circle cx="40" cy="32" r="1.2" fill="#0047ba" fillOpacity="0.22" />
                    <circle cx="40" cy="68" r="1.2" fill="#0047ba" fillOpacity="0.22" />
                    <circle cx="98" cy="48" r="1.2" fill="#0047ba" fillOpacity="0.2" />
                    <circle cx="140" cy="26" r="1.2" fill="#16a34a" fillOpacity="0.25" />
                  </svg>
                </div>

                {/* Decorative Guide Curves & Connecting Node Dots (Left of Photo) */}
                <svg
                  className="absolute -left-6 sm:-left-8 top-0 w-24 h-full pointer-events-none z-20 hidden sm:block"
                  viewBox="0 0 90 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {/* Dotted Guide Path */}
                  <path
                    d="M 68 20 C 35 60 25 125 32 155 C 38 185 40 205 25 240 C 12 270 2 295 8 308"
                    stroke="#0047ba"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.45"
                  />
                  {/* Thick Accent Arc at bottom */}
                  <path
                    d="M 28 232 C 16 262 5 290 12 305"
                    stroke="#0047ba"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Node Dots */}
                  <circle cx="68" cy="20" r="5" fill="#0047ba" />
                  <circle cx="32" cy="155" r="7.5" fill="#0047ba" />
                  <circle cx="32" cy="155" r="3.5" fill="#ffffff" />
                  <circle cx="25" cy="240" r="4.5" fill="#16a34a" />
                </svg>

                {/* Decorative Circle Ring (Bottom Right) */}
                <div
                  className="absolute -bottom-3 right-24 sm:right-28 w-9 h-9 rounded-full border-2 border-blue-300/80 pointer-events-none hidden sm:block z-10"
                  aria-hidden="true"
                />

                {/* ============================================= */}
                {/* THREE FLOATING FEATURE CARDS                  */}
                {/* ============================================= */}
                <div className="absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 flex flex-col space-y-3 z-30 w-[165px] sm:w-[185px]">
                  {/* Card 1: AI Learning */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/10 p-3 sm:p-3.5 flex items-center gap-3 transition-transform duration-200 hover:-translate-x-1">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0047ba] shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="4" y="4" width="16" height="16" rx="3" />
                        <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" />
                        <path d="M1 9h3M1 15h3M20 9h3M20 15h3M9 1v3M15 1v3M9 20v3M15 20v3" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-slate-900 truncate">AI Learning</span>
                      <div className="mt-1 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#0047ba] to-blue-400 rounded-full w-[75%]" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Robotics */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/10 p-3 sm:p-3.5 flex items-center gap-3 transition-transform duration-200 hover:-translate-x-1 sm:translate-x-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#16a34a] shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <rect x="3" y="11" width="18" height="10" rx="3" />
                        <circle cx="8.5" cy="16" r="1.5" fill="currentColor" />
                        <circle cx="15.5" cy="16" r="1.5" fill="currentColor" />
                        <path d="M12 2v5M9 2h6M2 15h1M21 15h1" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-slate-900 truncate">Robotics</span>
                      <div className="mt-1 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#16a34a] to-emerald-400 rounded-full w-[85%]" />
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Future Innovators */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl shadow-slate-900/10 p-3 sm:p-3.5 flex items-center gap-3 transition-transform duration-200 hover:-translate-x-1">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                        <path d="M9 18h6M10 22h4M12 2a7 7 0 00-7 7c0 2.5 1.5 4.5 3 6h8c1.5-1.5 3-3.5 3-6a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs font-bold text-slate-900 truncate">Future Innovators</span>
                      <div className="mt-1 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-sky-500 to-[#0047ba] rounded-full w-[90%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
