import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string | null;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  id,
  label,
  required = false,
  error,
  helpText,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="block text-xs font-bold uppercase tracking-wider text-slate-700"
      >
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      {children}
      {helpText && !error && (
        <p className="text-xs text-slate-500 leading-normal">{helpText}</p>
      )}
      {error && (
        <p className="text-xs text-rose-600 font-medium leading-normal">{error}</p>
      )}
    </div>
  );
}
