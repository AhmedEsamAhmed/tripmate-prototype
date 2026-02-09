"use client";

import React from "react";

type Variant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "verified";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  default: "bg-slate-200 text-slate-700",
  success: "bg-emerald-100 text-trust-green",
  warning: "bg-amber-100 text-trust-amber",
  danger: "bg-red-100 text-trust-red",
  info: "bg-primary-100 text-primary-700",
  verified: "bg-emerald-100 text-trust-green font-medium",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
