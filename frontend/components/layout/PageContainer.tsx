import React from 'react';

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageContainer({
  title,
  subtitle,
  eyebrow,
  children,
  className = '',
}: PageContainerProps) {
  const hasCustomPadding = /\b(p[ytb]?-|p-)/.test(className);
  const defaultPadding = hasCustomPadding ? '' : 'py-10 sm:py-14';

  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${defaultPadding} w-full flex-1 ${className}`.trim()}>
      {(title || subtitle) && (
        <header className="mb-10 sm:mb-14 max-w-3xl">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              {eyebrow}
            </div>
          )}
          {title && (
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </main>
  );
}
