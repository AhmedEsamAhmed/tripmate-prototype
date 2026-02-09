"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Trip, TripType, SupplierProfile } from "@/types";

interface TripCardProps {
  trip: Trip;
  href: string;
  showSupplier?: boolean;
}

function formatPrice(price?: number, negotiable?: boolean, currency = "IDR") {
  if (negotiable) return "Negotiable";
  if (price == null) return "—";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDuration(trip: Trip) {
  if (trip.durationDays) return `${trip.durationDays} day${trip.durationDays > 1 ? "s" : ""}`;
  if (trip.durationHours) return `${trip.durationHours} hr`;
  return "—";
}

function locationsText(trip: Trip) {
  return trip.locations.map((l) => l.name).join(" → ");
}

export function TripCard({ trip, href, showSupplier = true }: TripCardProps) {
  const typeLabel: Record<TripType, string> = {
    request: "Trip request",
    pre_designed: "Pre-designed trip",
  };

  return (
    <Link
      href={href}
      className="card card-interactive block"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge variant={trip.type === "pre_designed" ? "info" : "default"}>
          {typeLabel[trip.type]}
        </Badge>
        {trip.supplier?.verified && (
          <Badge variant="verified">Verified</Badge>
        )}
      </div>
      <h3 className="mt-2 text-base font-semibold text-slate-900 line-clamp-2">
        {trip.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 line-clamp-1">
        {locationsText(trip)}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600">
        <span>{formatDuration(trip)}</span>
        <span>•</span>
        <span className="font-medium text-slate-800">
          {formatPrice(trip.price, trip.priceNegotiable, trip.currency)}
        </span>
      </div>
      {showSupplier && trip.supplier && (
        <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-xs font-semibold">
            {trip.supplier.name.charAt(0)}
          </div>
          <span className="text-sm text-slate-600">{trip.supplier.name}</span>
          {trip.supplier.rating != null && (
            <span className="text-sm text-slate-500">
              ★ {trip.supplier.rating}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
