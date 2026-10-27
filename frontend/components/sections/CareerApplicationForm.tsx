'use client';

import React, { useState } from 'react';
import { applyForCareer } from '@/lib/api/careers';
import { ApiError } from '@/lib/api/client';
import Button from '@/components/ui/Button';

interface CareerApplicationFormProps {
  careerId: string;
  jobTitle: string;
}

export default function CareerApplicationForm({
  careerId,
  jobTitle,
}: CareerApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume_url: '',
    cover_letter: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation matching backend
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please provide your full name (minimum 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    try {
      new URL(formData.resume_url.trim());
    } catch {
      setError('Please provide a valid resume URL (e.g. LinkedIn profile, Google Drive link, or portfolio).');
      return;
    }

    setLoading(true);
    try {
      await applyForCareer(careerId, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        resume_url: formData.resume_url.trim(),
        cover_letter: formData.cover_letter.trim() || undefined,
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        resume_url: '',
        cover_letter: '',
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to submit application. Please check your network and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-8 text-center shadow-sm">
        <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-bold text-emerald-950">Application Received</h4>
        <p className="mt-2 text-sm text-emerald-800 leading-relaxed">
          Thank you for applying for the <span className="font-semibold">{jobTitle}</span> opening. Our engineering talent team will review your qualifications and reach out.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-5 text-xs font-semibold text-emerald-900 underline hover:text-emerald-700 transition"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] sticky top-28">
      <div className="mb-5 pb-4 border-b border-slate-200/80">
        <h3 className="text-lg font-bold text-slate-950">Apply for this Role</h3>
        <p className="text-xs text-slate-500 mt-1">
          Review is conducted directly by our technical leadership.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-3.5 bg-red-50/90 border border-red-200 rounded-xl text-xs text-red-800 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Full Name <span className="text-blue-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g. Elena Vance"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Email Address <span className="text-blue-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="elena@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Phone <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="+1 555-0199"
          />
        </div>

        <div>
          <label htmlFor="resume_url" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Resume / Portfolio URL <span className="text-blue-600">*</span>
          </label>
          <input
            id="resume_url"
            type="url"
            required
            value={formData.resume_url}
            onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="https://linkedin.com/in/... or drive link"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Link to your public CV, LinkedIn profile, or portfolio site.
          </p>
        </div>

        <div>
          <label htmlFor="cover_letter" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
            Cover Letter / Motivation <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="cover_letter"
            rows={3}
            value={formData.cover_letter}
            onChange={(e) => setFormData({ ...formData, cover_letter: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
            placeholder="Briefly describe your interest in VELORA Future Lab..."
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="md"
            variant="primary"
            isLoading={loading}
            className="w-full"
          >
            {loading ? 'Submitting Application...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
}
