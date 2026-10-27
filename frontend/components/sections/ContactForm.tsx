'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitContact } from '@/lib/api/contact';
import { ApiError } from '@/lib/api/client';
import Button from '@/components/ui/Button';

function ContactFormInner() {
  const searchParams = useSearchParams();
  const initialPurposeParam = searchParams.get('purpose');

  const getInitialPurpose = (param: string | null) => {
    if (param === 'demo') return 'Request a School Demo';
    if (param === 'workshop') return 'Enquire about Workshops';
    if (param === 'proposal') return 'Request a Lab Proposal';
    return 'General Contact Enquiry';
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolOrOrg: '',
    role: 'Principal / School Leader',
    purpose: getInitialPurpose(initialPurposeParam),
    message: '',
  });

  useEffect(() => {
    if (initialPurposeParam) {
      setFormData((prev) => ({
        ...prev,
        purpose: getInitialPurpose(initialPurposeParam),
      }));
    }
  }, [initialPurposeParam]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation matching backend
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Full name must be at least 2 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      setError('Please provide a valid phone number (at least 7 digits).');
      return;
    }

    if (!formData.schoolOrOrg.trim() || formData.schoolOrOrg.trim().length < 2) {
      setError('School or organization name must be at least 2 characters.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setError('Message must be at least 5 characters.');
      return;
    }

    setLoading(true);
    try {
      const trimmedSchoolOrOrg = formData.schoolOrOrg.trim();
      const trimmedRole = formData.role.trim();

      let companyWithRole: string | undefined = trimmedSchoolOrOrg
        ? (trimmedRole ? `${trimmedSchoolOrOrg} (${trimmedRole})` : trimmedSchoolOrOrg)
        : (trimmedRole || undefined);

      if (companyWithRole && companyWithRole.length > 195) {
        companyWithRole = companyWithRole.slice(0, 195).trim();
      }

      await submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: companyWithRole || formData.schoolOrOrg.trim(),
        subject: formData.purpose,
        message: formData.message.trim(),
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        schoolOrOrg: '',
        role: 'Principal / School Leader',
        purpose: 'Request a School Demo',
        message: '',
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to dispatch inquiry. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-white border border-emerald-200/90 p-8 sm:p-10 text-center shadow-xl shadow-emerald-950/5">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-[#16a34a]" />
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shadow-xs">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Inquiry Confirmed
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900">Inquiry Received Successfully</h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          Thank you for reaching out to VELORA Future Lab. Our educational coordinators will review your requirements and get in touch within 24 to 48 business hours.
        </p>
        <div className="mt-7">
          <Button
            variant="outline"
            size="md"
            onClick={() => setSuccess(false)}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="inquiry-form" className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 lg:p-11 shadow-[0_24px_70px_-15px_rgba(0,71,186,0.09),0_0_0_1px_rgba(226,232,240,0.8)] overflow-hidden">
      {/* Precision brand gradient accent line on top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0047ba] via-blue-500 to-[#16a34a]" />
      
      {/* Ambient background glows inside card */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/8 to-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-gradient-to-tr from-emerald-500/6 to-blue-500/4 blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="mb-8 relative z-10">
        <h3 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-slate-950 leading-tight">
          Book a School Demo &amp; Inquiries
        </h3>
        <p className="text-sm sm:text-base text-slate-500 mt-2 leading-relaxed max-w-xl">
          Connect with our academic team to schedule an interactive school demo, discuss workshops, or request lab setups.
        </p>
      </div>

      {error && (
        <div className="mb-8 p-4.5 bg-red-50/90 border border-red-200 rounded-2xl text-sm text-red-800 flex items-start gap-3.5 shadow-2xs relative z-10 animate-shake">
          <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex-1 font-medium leading-relaxed">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-5.5 relative z-10">
        {/* Purpose of Inquiry Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="contact-purpose" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Purpose of Inquiry <span className="text-[#0047ba] font-bold">*</span>
            </label>
            <span className="text-[11px] font-semibold text-slate-400">Select consultation type</span>
          </div>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <select
              id="contact-purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full appearance-none pl-11.5 pr-11 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs cursor-pointer"
            >
              <option value="Request a School Demo">Request a School Demo</option>
              <option value="Enquire about Workshops">Enquire about Workshops &amp; Events</option>
              <option value="Request a Lab Proposal">Request a Lab Proposal &amp; Partnership</option>
              <option value="General Contact Enquiry">General Contact Enquiry</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
              Full Name <span className="text-[#0047ba] font-bold">*</span>
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-11.5 pr-4 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs"
                placeholder="e.g. Dr. Priya Sharma"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-[#0047ba] font-bold">*</span>
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-11.5 pr-4 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs"
                placeholder="name@school.edu"
              />
            </div>
          </div>
        </div>

        {/* Phone and School/Organization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-phone" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
              Phone Number <span className="text-[#0047ba] font-bold">*</span>
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                id="contact-phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-11.5 pr-4 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-company" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
              School / Organization <span className="text-[#0047ba] font-bold">*</span>
            </label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <input
                id="contact-company"
                type="text"
                required
                maxLength={160}
                value={formData.schoolOrOrg}
                onChange={(e) => setFormData({ ...formData, schoolOrOrg: e.target.value })}
                className="w-full pl-11.5 pr-4 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs"
                placeholder="e.g. National Public School"
              />
            </div>
          </div>
        </div>

        {/* Role / Designation */}
        <div>
          <label htmlFor="contact-role" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2">
            Your Role / Designation
          </label>
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2H9.17A3.001 3.001 0 0112 14z" />
              </svg>
            </div>
            <select
              id="contact-role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full appearance-none pl-11.5 pr-11 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs cursor-pointer"
            >
              <option value="Principal / School Leader">Principal / School Leader</option>
              <option value="STEM / Science Coordinator">STEM / Science Coordinator</option>
              <option value="Teacher / Educator">Teacher / Educator</option>
              <option value="Trustee / Management">Trustee / Management</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Inquiry Details */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="contact-message" className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Inquiry Details <span className="text-[#0047ba] font-bold">*</span>
            </label>
            <span className="text-[11px] font-semibold text-slate-400">Min. 5 characters</span>
          </div>
          <div className="relative group">
            <div className="pointer-events-none absolute top-3.5 left-4 text-slate-400 group-focus-within:text-[#0047ba] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full pl-11.5 pr-4 py-3.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl sm:rounded-2xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#0047ba] transition-all shadow-2xs resize-y"
              placeholder="Tell us about your student batch size, preferred demo dates, or specific curriculum interests..."
            />
          </div>
        </div>

        {/* Action Button & Trust Verification */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="relative w-full py-4 px-8 rounded-xl sm:rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#0047ba] via-blue-600 to-[#003ea8] hover:from-[#003ca0] hover:via-blue-700 hover:to-[#002f85] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border border-blue-400/30 overflow-hidden"
          >
            {/* Shimmer sweep effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting Inquiry...</span>
              </>
            ) : (
              <>
                <span className="tracking-wide">Submit Inquiry</span>
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>

          {/* Trust verification pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-5 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Direct Coordinator Routing</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <svg className="w-4 h-4 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>24–48h SLA Response</span>
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <svg className="w-4 h-4 text-[#0047ba] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Confidential &amp; Secure</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function ContactForm() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-sm">Loading form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
