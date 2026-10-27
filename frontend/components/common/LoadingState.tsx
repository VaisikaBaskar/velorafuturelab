import React from 'react';

export default function LoadingState({
  message = 'Loading telemetry & services...',
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute w-4 h-4 bg-blue-500/10 rounded-full animate-ping" />
      </div>
      <p className="mt-4 text-xs font-medium tracking-wide uppercase text-slate-500">
        {message}
      </p>
    </div>
  );
}
