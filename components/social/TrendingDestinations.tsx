"use client";

import { TRENDING_DESTINATIONS } from "@/lib/social-store";

interface TrendingDestinationsProps {
  selected?: string;
  onSelect?: (tag: string) => void;
}

export function TrendingDestinations({ selected, onSelect }: TrendingDestinationsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      {TRENDING_DESTINATIONS.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onSelect?.(tag)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selected === tag ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
