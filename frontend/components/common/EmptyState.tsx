import React from 'react';
import Link from 'next/link';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = 'No Information Found',
  description = 'There are currently no items available in this section.',
  actionHref,
  actionLabel,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 max-w-xl mx-auto my-8">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200">
        {icon || (
          <svg
            className="w-6 h-6 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {actionHref && actionLabel && (
        <div className="mt-6">
          <Link
            href={actionHref}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            {actionLabel} &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
