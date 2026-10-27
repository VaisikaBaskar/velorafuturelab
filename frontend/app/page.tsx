import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getServices } from '@/lib/api/services';
import { getBlogPosts } from '@/lib/api/blog';
import { Service, BlogListResponse } from '@/types/api';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import HeroCarousel from '@/components/sections/HeroCarousel';
import ScrollReveal from '@/components/common/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let services: Service[] = [];
  let servicesError = false;
  let blogData: BlogListResponse = {
    posts: [],
    pagination: { page: 1, limit: 3, total: 0, totalPages: 1 },
  };
  let blogError = false;

  try {
    services = await getServices();
  } catch {
    servicesError = true;
  }

  try {
    blogData = await getBlogPosts({ limit: 3 });
  } catch {
    blogError = true;
  }

  return (
    <div className="flex flex-col w-full velora-tech-dotted-bg">
      {/* ========================================================= */}
      {/* SECTION 1 — HERO: Where Young Ideas Become Real Innovations */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white pt-10 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 lg:pb-12 border-b border-slate-200/80">
        {/* Professional Robotics Innovation Lab Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
          <Image
            src="/images/robotics-lab-arm-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-right-top opacity-[0.22] mix-blend-multiply"
          />
          {/* Soft gradient washes ensuring 100% text contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 via-transparent to-white" />
        </div>


        <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Headline and CTAs */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-left">
              <h1 className="velora-hero-headline text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-950 leading-[1.12]">
                Where Young Ideas Become{' '}
                <span className="bg-gradient-to-r from-blue-600 via-[#0047ba] to-emerald-600 bg-clip-text text-transparent">
                  Real Innovations.
                </span>
              </h1>

              <p className="velora-hero-desc text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                At Velora Future Lab, we turn curiosity into creation through structured robotics curriculums, school lab setups, and experiential technology learning in AI, IoT, and STEAM.
              </p>

              <div className="velora-hero-ctas pt-1 flex flex-wrap gap-3.5 items-center">
                <Button href="/contact-us?purpose=demo" size="lg" variant="primary">
                  Book a School Demo
                </Button>
                <Button href="/school-programs" size="lg" variant="outline">
                  Explore School Programs &rarr;
                </Button>
              </div>

              {/* Pillars Highlight */}
              <div className="velora-hero-pillars pt-4 sm:pt-5 border-t border-slate-200/80 flex flex-wrap gap-5 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>School Robotics Curriculum</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Turnkey Lab Setup & Kits</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>NEP-Aligned Experiential STEAM</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image Carousel */}
            <div className="lg:col-span-6 relative w-full velora-hero-carousel">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2 — INTRODUCTION: The Velora Future Lab Model      */}
      {/* ========================================================= */}
      <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Soft Ambient Tech Grid & Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
          <div className="absolute -top-32 right-1/4 w-96 h-96 bg-blue-100/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeader
              align="left"
              className="max-w-none"
              title="Inspiring Young Minds to Build What's Next"
              titleClassName="sm:whitespace-nowrap"
              description={
                <>
                  Velora Future Lab collaborates with schools to deliver structured technology education that sparks critical thinking, creative problem solving,
                  <br className="hidden sm:inline" /> and technological confidence.
                </>
              }
              descriptionClassName="max-w-none"
            />
          </ScrollReveal>

          <ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <Card hover={false} className="velora-kpi-card group p-5 sm:p-6 rounded-2xl">
              <CardHeader className="p-0">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-emerald-50/70 group-hover:text-[#1764FF] group-hover:shadow-[0_2px_8px_rgba(23,100,255,0.15)]">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Structured Curriculum</CardTitle>
                <CardDescription className="text-slate-600 mt-2 text-sm leading-relaxed">
                  Mapped to school syllabi and national education frameworks, giving students a sequential progression from visual blocks to advanced engineering code.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover={false} className="velora-kpi-card group p-5 sm:p-6 rounded-2xl">
              <CardHeader className="p-0">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-blue-50/70 group-hover:to-emerald-50 group-hover:text-[#00A878] group-hover:shadow-[0_2px_8px_rgba(0,168,120,0.15)]">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Experiential STEAM Labs</CardTitle>
                <CardDescription className="text-slate-600 mt-2 text-sm leading-relaxed">
                  Turnkey laboratory setup equipped with robotic hardware, sensors, microcontrollers, and activity workbenches that make discovery tangible.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card hover={false} className="velora-kpi-card group p-5 sm:p-6 rounded-2xl">
              <CardHeader className="p-0">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-emerald-50 group-hover:text-[#1764FF] group-hover:shadow-[0_2px_8px_rgba(23,100,255,0.15)]">
                  <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Project-Based Learning</CardTitle>
                <CardDescription className="text-slate-600 mt-2 text-sm leading-relaxed">
                  Students build working prototypes—from autonomous rovers to smart irrigation—transforming theoretical ideas into tangible student achievements.
                </CardDescription>
              </CardHeader>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 — SCHOOL PROGRAMS & SERVICES PREVIEW             */}
      {/* ========================================================= */}
      <section className="py-10 sm:py-12 lg:py-14 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <ScrollReveal>
            <div className="mb-7 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                School Programs &amp; Services
              </h2>
              <p className="mt-2 text-sm sm:text-[15px] text-slate-500 max-w-3xl sm:whitespace-nowrap">
                Comprehensive technology education programs designed for every stage of school learning.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* ── Card 1: Robotics & Emerging Tech ── */}
            <Link
              href="/our-services/robotics-technologies"
              className="velora-service-card p-5 sm:p-6 cursor-pointer no-underline"
              style={{ textDecoration: "none" }}
            >
              {/* Icon badge */}
              <div className="velora-svc-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0 transition-shadow duration-260"
                style={{ background: "linear-gradient(135deg, #e8f0ff 0%, #dbeafe 100%)" }}>
                <svg className="w-5 h-5 text-[#1764FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-2">
                Robotics &amp; Emerging Tech
              </h3>
              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Sensors, automation, Arduino, IoT smart systems, artificial intelligence, and Python programming.
              </p>
              {/* Divider */}
              <div className="mt-4 pt-3.5 border-t border-slate-100/80">
                <span className="velora-svc-cta inline-flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: "#1764FF" }}>
                  Explore Tech
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* ── Card 2: Workshops & Events ── */}
            <Link
              href="/our-services/workshops-events"
              className="velora-service-card p-5 sm:p-6 cursor-pointer no-underline"
              style={{ textDecoration: "none" }}
            >
              {/* Icon badge */}
              <div className="velora-svc-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0 transition-shadow duration-260"
                style={{ background: "linear-gradient(135deg, #d1fae5 0%, #ecfdf5 100%)" }}>
                <svg className="w-5 h-5 text-[#00A878]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-2">
                Workshops &amp; Events
              </h3>
              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                School innovation days, robotics bootcamps, project exhibitions, and inter-school hackathons.
              </p>
              {/* Divider */}
              <div className="mt-4 pt-3.5 border-t border-slate-100/80">
                <span className="velora-svc-cta inline-flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: "#00A878" }}>
                  View Workshops
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* ── Card 3: Early Innovators Program ── */}
            <Link
              href="/our-services/early-innovators"
              className="velora-service-card p-5 sm:p-6 cursor-pointer no-underline"
              style={{ textDecoration: "none" }}
            >
              {/* Icon badge */}
              <div className="velora-svc-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0 transition-shadow duration-260"
                style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)" }}>
                <svg className="w-5 h-5 text-[#1764FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-2">
                Early Innovators Program
              </h3>
              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Age-appropriate STEAM exploration for Grades 1 to 4 with simple machines, basic electronics, and playful coding.
              </p>
              {/* Divider */}
              <div className="mt-4 pt-3.5 border-t border-slate-100/80">
                <span className="velora-svc-cta inline-flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: "#1764FF" }}>
                  Early STEAM
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* ── Card 4: Lab Setup & Partnerships ── */}
            <Link
              href="/our-services/lab-setup"
              className="velora-service-card p-5 sm:p-6 cursor-pointer no-underline"
              style={{ textDecoration: "none" }}
            >
              {/* Icon badge */}
              <div className="velora-svc-icon w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0 transition-shadow duration-260"
                style={{ background: "linear-gradient(135deg, #e8f5f0 0%, #d1fae5 100%)" }}>
                <svg className="w-5 h-5 text-[#00A878]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              {/* Title */}
              <h3 className="text-[15px] font-bold text-slate-900 leading-snug mb-2">
                Lab Setup &amp; Partnerships
              </h3>
              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed flex-1">
                Complete composite skill labs, robotics kits, teacher training, and ongoing academic support.
              </p>
              {/* Divider */}
              <div className="mt-4 pt-3.5 border-t border-slate-100/80">
                <span className="velora-svc-cta inline-flex items-center gap-1.5 text-xs font-bold"
                  style={{ color: "#00A878" }}>
                  Lab Setup
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>

          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 — STUDENT PROJECTS SHOWCASE                     */}
      {/* ========================================================= */}
      <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Subtle STEM Robotics Rover & Circuit Blueprint Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
          <Image
            src="/images/robotics-rover-circuit-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.15] mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-white/90" />
        </div>

        <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section header */}
          <ScrollReveal>
            <div className="mb-7 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Student Projects Gallery
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl sm:whitespace-nowrap">
                Demonstrating what students design, build, and learn through project-based technology challenges.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* Project 1: Mars Mission Rover */}
            <div className="velora-project-card p-5 sm:p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="inline-flex items-center text-[11px] font-bold tracking-wide text-[#1764FF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Grades 6–9
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                    ROBOTICS
                  </span>
                </div>
                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug mb-2">
                  Mars Mission Rover
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Autonomous terrain-navigating rover equipped with ultrasonic distance sensors, DC motor drivers, and obstacle-avoidance logic.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Arduino
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Ultrasonic Sensor
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Autonomous Logic
                </span>
              </div>
            </div>

            {/* Project 2: AI Waste Sorting */}
            <div className="velora-project-card p-5 sm:p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="inline-flex items-center text-[11px] font-bold tracking-wide text-[#00A878] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    Grades 8–12
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                    AI &amp; COMPUTER VISION
                  </span>
                </div>
                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug mb-2">
                  AI Waste Sorting
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Vision-guided classification model trained to distinguish recyclable and organic items with automated servo segregation.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Computer Vision
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Servo Motor
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Python ML
                </span>
              </div>
            </div>

            {/* Project 3: Smart Home Automation */}
            <div className="velora-project-card p-5 sm:p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="inline-flex items-center text-[11px] font-bold tracking-wide text-[#1764FF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Grades 7–10
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider font-mono uppercase">
                    IOT &amp; EMBEDDED
                  </span>
                </div>
                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug mb-2">
                  Smart Home Automation
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  Wireless microcontroller prototype managing energy-saving smart lighting, temperature regulation, and automated security alerts.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  ESP32 / IoT
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Relay Modules
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200/80">
                  Telemetry
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 — WHY SCHOOLS CHOOSE VELORA                     */}
      {/* ========================================================= */}
      <section className="py-10 sm:py-12 lg:py-14 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeader
              align="left"
              className="mb-7 sm:mb-9 max-w-none"
              title="Building Confident Innovators for the Future"
              description="Our academic partnerships deliver comprehensive equipment, curriculum, and mentorship that integrate seamlessly into the school calendar."
              descriptionClassName="max-w-none sm:whitespace-nowrap"
            />
          </ScrollReveal>

          <ScrollReveal staggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 01 */}
            <div className="velora-innovator-card p-5 sm:p-5.5 lg:p-6 h-full flex flex-col">
              <div className="velora-innovator-num w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-[#1764FF] bg-blue-50/90 border border-blue-100 mb-3.5 shrink-0 transition-all duration-260">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-[17px] leading-snug mb-2">
                Hands-On Discovery
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed flex-1">
                Moving past theoretical lectures to tangible hardware tinkering where students learn through iteration and prototyping.
              </p>
            </div>

            {/* Card 02 */}
            <div className="velora-innovator-card p-5 sm:p-5.5 lg:p-6 h-full flex flex-col">
              <div className="velora-innovator-num w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-[#00A878] bg-emerald-50/90 border border-emerald-100 mb-3.5 shrink-0 transition-all duration-260">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-[17px] leading-snug mb-2">
                Curriculum Mapping
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed flex-1">
                Skill progressions mapped closely to school science and computing curricula, aligned with modern experiential NEP goals.
              </p>
            </div>

            {/* Card 03 */}
            <div className="velora-innovator-card p-5 sm:p-5.5 lg:p-6 h-full flex flex-col">
              <div className="velora-innovator-num w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-[#0284c7] bg-sky-50/90 border border-sky-100 mb-3.5 shrink-0 transition-all duration-260">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-[17px] leading-snug mb-2">
                Educator Training
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed flex-1">
                Continuous professional development for school teachers, supported by complete activity guides and lesson plans.
              </p>
            </div>

            {/* Card 04 */}
            <div className="velora-innovator-card p-5 sm:p-5.5 lg:p-6 h-full flex flex-col">
              <div className="velora-innovator-num w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black tracking-wider text-[#00A878] bg-emerald-50/90 border border-emerald-100 mb-3.5 shrink-0 transition-all duration-260">
                04
              </div>
              <h3 className="font-bold text-slate-900 text-base sm:text-[17px] leading-snug mb-2">
                Student Portfolios
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed flex-1">
                Learners build documented project portfolios, gain competition exposure, and demonstrate authentic problem-solving skills.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6 — AUDIENCE-FOCUSED PATHWAYS                     */}
      {/* ========================================================= */}
      <section className="py-10 sm:py-12 lg:py-14 bg-white border-b border-slate-200/80 relative overflow-hidden">
        {/* Soft Ambient Glow & Tech Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
          <div className="absolute -top-24 left-1/3 w-80 h-80 bg-blue-100/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/3 w-80 h-80 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-7xl xl:max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <SectionHeader
              align="left"
              className="mb-8 sm:mb-10 max-w-none"
              title="Tailored Value for Schools, Students & Parents"
              description={
                <>
                  <span className="sm:whitespace-nowrap">
                    Whether you are an institution administrator, an aspiring young maker, or a parent seeking future-ready skills, Velora Future Lab provides a clear,
                  </span>{' '}
                  <br className="hidden sm:inline" />
                  <span>supportive pathway.</span>
                </>
              }
              descriptionClassName="max-w-none"
            />
          </ScrollReveal>

          <ScrollReveal staggerChildren className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
            {/* For Schools */}
            <div className="velora-pathway-card p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="velora-pathway-icon w-11 h-11 rounded-xl bg-blue-50 text-[#1764FF] border border-blue-100/80 flex items-center justify-center font-bold transition-all duration-260">
                    <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1764FF] bg-blue-50/90 px-2.5 py-1 rounded-full border border-blue-100">
                    For Schools
                  </span>
                </div>

                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug mb-2">
                  Principals, Trustees &amp; Coordinators
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                  Establish a signature technology lab and curriculum on your campus without administrative overhead.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 mb-5 sm:mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Turnkey STEAM and robotics lab setup with safe hardware kits</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Curriculum mapped to academic syllabi and national NEP mandates</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Educator training bootcamps and ongoing co-teaching mentorship</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>School innovation expos and inter-school competition guidance</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3.5 border-t border-slate-100">
                <Link
                  href="/our-services/lab-setup"
                  className="group text-xs sm:text-[13px] font-bold text-[#1764FF] hover:text-[#0f4bca] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Lab Partnerships</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* For Students */}
            <div className="velora-pathway-card p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="velora-pathway-icon w-11 h-11 rounded-xl bg-emerald-50 text-[#00A878] border border-emerald-100/80 flex items-center justify-center font-bold transition-all duration-260">
                    <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#00A878] bg-emerald-50/90 px-2.5 py-1 rounded-full border border-emerald-100">
                    For Students
                  </span>
                </div>

                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug mb-2">
                  Curious Makers &amp; Young Engineers
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                  Turn ideas in your head into moving robots, smart IoT devices, and artificial intelligence programs.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 mb-5 sm:mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-[#00A878] border border-emerald-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Hands-on robotics, motor chassis, sensors, and breadboarding</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-[#00A878] border border-emerald-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Coding from Scratch blocks to Python algorithms and computer vision</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-[#00A878] border border-emerald-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Exciting hackathons, robotic races, and innovation challenges</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-[#00A878] border border-emerald-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Real project models to showcase in personal portfolios</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3.5 border-t border-slate-100">
                <Link
                  href="/projects"
                  className="group text-xs sm:text-[13px] font-bold text-[#00A878] hover:text-[#008f66] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View Student Project Models</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* For Parents */}
            <div className="velora-pathway-card p-6 sm:p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="velora-pathway-icon w-11 h-11 rounded-xl bg-blue-50 text-[#1764FF] border border-blue-100/80 flex items-center justify-center font-bold transition-all duration-260">
                    <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1764FF] bg-blue-50/90 px-2.5 py-1 rounded-full border border-blue-100">
                    For Parents
                  </span>
                </div>

                <h3 className="text-lg sm:text-[19px] font-bold text-slate-900 leading-snug mb-2">
                  Parents &amp; Guardians
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
                  Prepare your child for a technology-driven future through constructive screen-time and creative confidence.
                </p>

                <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-700 mb-5 sm:mb-6">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Age-appropriate pathways designed from early primary to Grade 12</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Cultivates critical thinking, analytical reasoning, and resilience</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Safety-certified hardware kits tested for child-friendly use</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-[#1764FF] border border-blue-100/90 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span>Transparent learning outcomes and progress milestone tracking</span>
                  </li>
                </ul>
              </div>

              <div className="pt-3.5 border-t border-slate-100">
                <Link
                  href="/school-programs"
                  className="group text-xs sm:text-[13px] font-bold text-[#1764FF] hover:text-[#0f4bca] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>View Learning Pathways</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — FINAL CTA: Book a School Demo                 */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-14 lg:py-16 bg-slate-950 text-white relative overflow-hidden">
        {/* Futuristic Glowing Robotics Motherboard & Robotic Arm */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
          <Image
            src="/images/robotics-dark-circuit-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30 mix-blend-screen"
          />
          {/* Subtle gradient vignette to keep text ultra-crisp */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950" />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(circle at center, transparent 30%, rgba(2, 6, 23, 0.75) 100%)' }}
          />
        </div>

        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#0047ba 1.5px, transparent 1.5px)',
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />
        <ScrollReveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4 sm:space-y-5">
          <Badge variant="secondary" size="md">
            Partner With Velora Future Lab
          </Badge>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bring Future Technologies into Your School.
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Schedule an interactive school demonstration or consult with our academic coordinators to design a robotics and STEAM program tailored to your students.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3.5">
            <Button href="/contact-us?purpose=demo" size="lg" variant="primary">
              Book a School Demo
            </Button>
            <Button href="/about-us" size="lg" variant="outline-dark" className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white hover:border-slate-600">
              About Velora &rarr;
            </Button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
