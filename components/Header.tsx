"use client";

import React from "react";
import Link from "next/link";

interface HeaderProps {
  title: string;
  backHref?: string;
  onBackClick?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export function Header({
  title,
  backHref,
  onBackClick,
  rightAction,
  transparent = false,
}: HeaderProps) {
  const backButton = (
    <span className="touch-target -ml-1 flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </span>
  );

  return (
    <header
      className={`
        sticky top-0 z-40 flex items-center justify-between px-4 py-3.5 safe-top
        ${transparent ? "bg-transparent" : "bg-white/95 backdrop-blur-sm border-b border-slate-200/80"}
      `}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {backHref ? (
          <Link href={backHref} className="inline-flex" aria-label="Go back">
            {backButton}
          </Link>
        ) : onBackClick ? (
          <button type="button" onClick={onBackClick} className="inline-flex" aria-label="Go back">
            {backButton}
          </button>
        ) : (
          <div className="w-10" />
        )}
        <h1 className="truncate text-lg font-semibold text-slate-900 tracking-tight">{title}</h1>
      </div>
      {rightAction && <div className="flex-shrink-0">{rightAction}</div>}
    </header>
  );
}
