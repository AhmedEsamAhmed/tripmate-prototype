"use client";

import React from "react";

type Variant = "primary" | "secondary" | "danger" | "ghost" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md transition-all duration-200",
  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 border border-slate-200",
  danger:
    "bg-trust-red text-white hover:bg-red-600 active:bg-red-700 shadow-sm",
  ghost:
    "bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200",
  outline:
    "border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 active:bg-primary-100 transition-colors",
};

export function Button({
  variant = "primary",
  fullWidth,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        touch-target inline-flex items-center justify-center rounded-xl px-5 py-3
        text-base font-semibold transition-colors
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
