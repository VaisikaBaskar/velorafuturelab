'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/common/Logo';

export const serviceNavItems = [
  {
    label: 'Robotics & Emerging Technologies',
    href: '/our-services/robotics-technologies',
    description: 'Electronics, Arduino, IoT, AI & block coding',
  },
  {
    label: 'Workshops & Innovation Events',
    href: '/our-services/workshops-events',
    description: 'Bootcamps, hackathons & innovation days',
  },
  {
    label: 'Early Innovators Program',
    href: '/our-services/early-innovators',
    description: 'Grades 1-4 hands-on STEAM discovery',
  },
  {
    label: 'Lab Setup & School Partnerships',
    href: '/our-services/lab-setup',
    description: 'Composite labs, kits, teacher training & curriculum',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isServicesActive = pathname.startsWith('/our-services') || pathname.startsWith('/what-we-do');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/80 transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg py-1 pl-0 pr-1.5"
            aria-label="VELORA Future Lab Home"
          >
            <Logo variant="horizontal" height={44} priority />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {/* Home */}
            <Link
              href="/"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                pathname === '/'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/about-us"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                pathname.startsWith('/about-us')
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              About Us
            </Link>

            {/* School Programs */}
            <Link
              href="/school-programs"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                pathname.startsWith('/school-programs')
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              School Programs
            </Link>

            {/* Our Services (with dropdown) */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/our-services"
                className={`text-sm font-medium px-3.5 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all duration-200 ${
                  isServicesActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
                }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Our Services</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 rounded-2xl bg-white shadow-xl shadow-slate-900/10 border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Service Offerings
                    </span>
                  </div>
                  {serviceNavItems.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block p-2.5 rounded-xl hover:bg-blue-50/60 transition group"
                    >
                      <span className="block text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition">
                        {service.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {service.description}
                      </span>
                    </Link>
                  ))}
                  <div className="mt-1 pt-1 border-t border-slate-100">
                    <Link
                      href="/our-services"
                      className="block px-3 py-2 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-lg text-center"
                    >
                      View All Services Overview &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Projects */}
            <Link
              href="/projects"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                pathname.startsWith('/projects')
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Projects
            </Link>

            {/* Contact */}
            <Link
              href="/contact-us"
              className={`text-sm font-medium px-3.5 py-2 rounded-lg transition-all duration-200 ${
                pathname.startsWith('/contact-us')
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/70'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Primary CTA: Book a School Demo */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact-us?purpose=demo"
              className="inline-flex items-center justify-center text-sm font-bold px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 active:scale-[0.98] border border-blue-500/40"
            >
              Book a School Demo
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1 sm:px-6">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                pathname === '/' ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                pathname.startsWith('/about-us') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/school-programs"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                pathname.startsWith('/school-programs') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              School Programs
            </Link>

            <div className="pt-1 pb-1">
              <div className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                Our Services
              </div>
              {serviceNavItems.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-2 rounded-lg text-sm text-slate-700 hover:text-blue-600 hover:bg-blue-50/50"
                >
                  {service.label}
                </Link>
              ))}
            </div>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                pathname.startsWith('/projects') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Projects
            </Link>

            <Link
              href="/contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-base font-medium ${
                pathname.startsWith('/contact-us') ? 'text-blue-600 bg-blue-50/80 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-slate-100 mt-2 px-2">
              <Link
                href="/contact-us?purpose=demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center py-3.5 px-4 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
              >
                Book a School Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
