"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import type { TripStatus, PaymentStatus } from "@/types";

const tripStatusVariant: Record<TripStatus, "default" | "success" | "warning" | "danger" | "info"> = {
  draft: "default",
  published: "info",
  pending_offer: "warning",
  negotiating: "warning",
  price_locked: "info",
  booked: "success",
  ongoing: "info",
  completed: "success",
  cancelled: "danger",
};

const paymentStatusVariant: Record<PaymentStatus, "default" | "success" | "warning" | "danger"> = {
  pending: "warning",
  partial: "warning",
  paid: "success",
  failed: "danger",
  refunded: "default",
};

export function TripStatusBadge({ status }: { status: TripStatus }) {
  return (
    <Badge variant={tripStatusVariant[status]}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <Badge variant={paymentStatusVariant[status]}>
      {status}
    </Badge>
  );
}
