import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'System Telemetry Disconnected',
  message = 'An unexpected error occurred while communicating with the VELORA Future Lab services.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-red-200/80 bg-red-50/60 p-8 my-8 text-center max-w-lg mx-auto shadow-sm">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 className="text-base font-bold text-red-950">{title}</h3>
      <p className="mt-2 text-sm text-red-700 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          type="button"
          className="mt-5 inline-flex items-center px-4 py-2 border border-red-300 text-sm font-semibold rounded-lg text-red-800 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 transition cursor-pointer"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
