"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { SupplierProfile } from "@/types";

interface ProfileCardProps {
  profile: SupplierProfile;
  href?: string;
  subtitle?: string;
}

function typeLabel(type: SupplierProfile["type"]) {
  const labels = {
    driver: "Driver",
    tour_guide: "Tour Guide",
    tour_agency: "Tour Agency",
  };
  return labels[type];
}

export function ProfileCard({ profile, href, subtitle }: ProfileCardProps) {
  const content = (
    <>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-lg font-semibold">
          {profile.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900 truncate">
              {profile.name}
            </span>
            {profile.verified && <Badge variant="verified">Verified</Badge>}
          </div>
          <p className="text-sm text-slate-500">{typeLabel(profile.type)}</p>
          {subtitle && (
            <p className="text-sm text-slate-600 mt-0.5">{subtitle}</p>
          )}
        </div>
        {profile.rating != null && (
          <div className="flex items-center gap-1 text-sm">
            <span className="font-medium text-slate-800">★ {profile.rating}</span>
            {profile.reviewCount != null && (
              <span className="text-slate-500">({profile.reviewCount})</span>
            )}
          </div>
        )}
      </div>
      {profile.languages && profile.languages.length > 0 && (
        <p className="mt-2 text-xs text-slate-500">
          Languages: {profile.languages.join(", ")}
        </p>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block card card-interactive p-4"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="card p-4">
      {content}
    </div>
  );
}
