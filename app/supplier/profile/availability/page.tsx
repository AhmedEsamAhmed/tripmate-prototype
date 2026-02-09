"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function SupplierAvailabilityPage() {
  const [availability, setAvailability] = useState("Mon–Sat, 8AM–6PM");
  const [notes, setNotes] = useState("");

  return (
    <>
      <Header title="Availability" backHref="/supplier/profile" />
      <main className="px-4 py-6">
        <p className="text-slate-600 text-sm mb-4">
          When you’re available for trips. Travelers see this when requesting.
        </p>
        <form className="space-y-4">
          <Input
            label="Availability (e.g. Mon–Sat, 8AM–6PM)"
            placeholder="Mon–Sat, 8AM–6PM"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Holidays, blackout dates…"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base resize-none h-20"
              maxLength={300}
            />
          </div>
          <Button fullWidth>Save</Button>
        </form>
      </main>
    </>
  );
}
