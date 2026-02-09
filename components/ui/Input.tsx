"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full rounded-xl border border-slate-300 bg-white px-4 py-3
          text-base text-slate-900 placeholder-slate-400
          focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
          disabled:bg-slate-100 disabled:text-slate-500
          ${error ? "border-trust-red focus:border-trust-red focus:ring-trust-red/20" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-trust-red">{error}</p>
      )}
      {hint && !error && (
        <p className="mt-1 text-sm text-slate-500">{hint}</p>
      )}
    </div>
  );
}
