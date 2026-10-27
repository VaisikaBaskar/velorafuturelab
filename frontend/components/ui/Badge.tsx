import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'tech' | 'success' | 'purple' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-semibold',
  }[size];

  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 border-slate-200/80',
    primary: 'bg-blue-50 text-blue-700 border-blue-200/80',
    secondary: 'bg-slate-900 text-slate-100 border-slate-800',
    tech: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    outline: 'bg-transparent text-slate-700 border-slate-300',
  }[variant];

  const dotColors = {
    default: 'bg-slate-400',
    primary: 'bg-blue-500',
    secondary: 'bg-cyan-400',
    tech: 'bg-cyan-500',
    success: 'bg-emerald-500',
    purple: 'bg-indigo-500',
    outline: 'bg-slate-400',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase ${sizeClasses} ${variantClasses} ${className}`}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColors}`}
          />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColors}`} />
        </span>
      )}
      {children}
    </span>
  );
}
