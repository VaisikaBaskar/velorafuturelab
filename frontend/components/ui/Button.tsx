import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'outline-dark' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-lg gap-2',
    lg: 'text-base px-6 py-3.5 rounded-xl gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white hover:text-white font-medium shadow-sm hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.99] border border-blue-500/30',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white hover:text-white font-medium shadow-sm hover:shadow active:scale-[0.99] border border-slate-700 hover:border-slate-600',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium border border-slate-200 hover:border-slate-300 shadow-sm active:scale-[0.99]',
    'outline-dark':
      'bg-slate-900 hover:bg-slate-800 text-white hover:text-white font-medium shadow-sm hover:shadow active:scale-[0.99] border border-slate-700 hover:border-slate-600',
    ghost:
      'bg-transparent hover:bg-slate-100/80 text-slate-700 hover:text-slate-950 font-medium active:scale-[0.99]',
    glow:
      'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white hover:text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.99] border border-blue-400/30',
  }[variant];

  // Resolve conflicts when custom background, text, or border classes are passed via className
  let resolvedVariantClasses = variantClasses;
  if (className) {
    const tokens = className.split(/\s+/).filter(Boolean);
    const hasBg = tokens.some((t) => /^bg-/.test(t));
    const hasHoverBg = tokens.some((t) => /^hover:bg-/.test(t));
    const hasText = tokens.some((t) => /^text-/.test(t));
    const hasHoverText = tokens.some((t) => /^hover:text-/.test(t));
    const hasBorderColor = tokens.some((t) => /^border-(white|black|slate|blue|emerald|gray|zinc|neutral)/.test(t));
    const hasHoverBorder = tokens.some((t) => /^hover:border-/.test(t));

    resolvedVariantClasses = variantClasses
      .split(/\s+/)
      .filter((cls) => {
        if (hasBg && /^bg-/.test(cls)) return false;
        if (hasHoverBg && /^hover:bg-/.test(cls)) return false;
        if (hasText && /^text-/.test(cls)) return false;
        if ((hasText || hasBg) && /^hover:text-/.test(cls) && !hasHoverText) return false;
        if (hasHoverText && /^hover:text-/.test(cls)) return false;
        if (hasBorderColor && /^border-(white|black|slate|blue|emerald|gray|zinc|neutral)/.test(cls)) return false;
        if ((hasBorderColor || hasBg) && /^hover:border-/.test(cls) && !hasHoverBorder) return false;
        if (hasHoverBorder && /^hover:border-/.test(cls)) return false;
        return true;
      })
      .join(' ');
  }

  const baseClasses =
    'inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const combinedClasses = `${baseClasses} ${sizeClasses} ${resolvedVariantClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={combinedClasses}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
