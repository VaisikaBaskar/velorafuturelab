'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/common/Logo';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative z-20 border-t border-slate-200/80 bg-slate-950 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="VELORA Future Lab Home">
              <Logo variant="horizontal" theme="dark" height={42} />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering young minds through hands-on learning in Artificial Intelligence, Robotics, and emerging technologies. Where young ideas become real innovations.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Velora Future Lab &middot; Innovation Hub</span>
            </div>
          </div>

          {/* Navigation Column 1: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/our-services/robotics-technologies" className="hover:text-white transition">
                  Robotics & Emerging Tech
                </Link>
              </li>
              <li>
                <Link href="/our-services/workshops-events" className="hover:text-white transition">
                  Workshops & Events
                </Link>
              </li>
              <li>
                <Link href="/our-services/early-innovators" className="hover:text-white transition">
                  Early Innovators Program
                </Link>
              </li>
              <li>
                <Link href="/our-services/lab-setup" className="hover:text-white transition">
                  Lab Setup & Partnerships
                </Link>
              </li>
              <li>
                <Link href="/our-services" className="hover:text-blue-400 transition font-medium">
                  All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Column 2: Programs & Organization */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Programs & Lab
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/school-programs" className="hover:text-white transition">
                  School Programs
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  Student Projects Gallery
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition">
                  About Velora
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Inquiries Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              School Demos
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Schedule a demonstration or lab consultation for your institution with our academic coordinators.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us?purpose=demo"
                className="inline-flex items-center text-xs font-bold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
              >
                Book a School Demo &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} VELORA Future Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 transition cursor-default">
              Architecture & Research Specifications
            </span>
            <span className="hover:text-slate-400 transition cursor-default">
              Privacy & Data Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
