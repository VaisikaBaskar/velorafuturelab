import React from 'react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  as: Component = 'h2',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const descAlignClass = align === 'center' ? 'mx-auto' : '';
  const maxWidthClass = className.includes('max-w-') ? '' : 'max-w-5xl xl:max-w-6xl';

  return (
    <div className={`${maxWidthClass} mb-6 sm:mb-8 ${alignClass} ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 mb-2.5 text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50/80 px-3 py-1 rounded-full border border-blue-100 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          {eyebrow}
        </div>
      )}
      <Component className={`text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight text-slate-900 leading-tight ${titleClassName}`}>
        {title}
      </Component>
      {description && (
        <p className={`mt-2.5 sm:mt-3 text-base sm:text-lg text-slate-600 leading-relaxed ${descriptionClassName || 'max-w-3xl'} ${descAlignClass}`}>
          {description}
        </p>
      )}
    </div>
  );
}
