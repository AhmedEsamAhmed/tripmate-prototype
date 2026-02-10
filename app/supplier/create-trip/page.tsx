"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useApp } from "@/lib/context";
import { MOCK_LOCATIONS } from "@/lib/mock-data";
import { addTrip } from "@/lib/demo-store";
import type { Trip } from "@/types";

const PACKAGE_TEMPLATES = [
  { id: "airport", title: "Airport Transfer", from: "Ngurah Rai Airport", to: "Any hotel in Bali", duration: 2, price: 250000 },
  { id: "day_tour", title: "Day Tour Package", from: "Hotel pickup", to: "Multiple stops", duration: 8, price: 500000 },
  { id: "custom", title: "Custom Package", from: "", to: "", duration: 0, price: 0 },
];

function SupplierPackageTripForm() {
  const router = useRouter();
  const { user } = useApp();
  const [template, setTemplate] = useState<string>("");
  const [title, setTitle] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("4");

  const selectedTpl = PACKAGE_TEMPLATES.find((t) => t.id === template);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tpl = selectedTpl || { from: "", to: "", duration: 0, price: 0 };
    const fromLoc = template ? tpl.from : from;
    const toLoc = template ? tpl.to : to;
    const dur = template ? tpl.duration : parseInt(duration, 10) || 0;
    const amt = template ? tpl.price : parseInt(price.replace(/\D/g, ""), 10) || 0;
    if (!title.trim() || !fromLoc || !toLoc || !amt) return;
    addTrip({
      id: "t-" + Date.now(),
      type: "pre_designed",
      title,
      locations: [
        { id: "l1", name: fromLoc },
        { id: "l2", name: toLoc },
      ],
      startDate: new Date().toISOString().slice(0, 10),
      durationHours: dur,
      price: amt,
      priceNegotiable: false,
      currency: "IDR",
      status: "published",
      supplierId: user?.id ?? "s3",
      serviceType: "driver",
      capacity: parseInt(capacity, 10) || 4,
      itinerary: [`Pickup: ${fromLoc}`, `Drop-off: ${toLoc}`],
      isPackageTrip: true,
    } as Trip);
    router.push("/supplier/my-trips");
  };

  return (
    <>
      <Header title="Create package trip" backHref="/supplier/my-trips" />
      <main className="px-4 py-6">
        <p className="text-slate-600 text-sm mb-4">
          As a driver, you can create fixed-route package trips (e.g. airport transfers, day tours).
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Package template</label>
            <div className="space-y-2">
              {PACKAGE_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setTemplate(t.id);
                    if (t.id !== "custom") {
                      setTitle(t.title);
                      setFrom(t.from);
                      setTo(t.to);
                      setDuration(t.duration.toString());
                      setPrice(t.price.toString());
                    }
                  }}
                  className={`w-full rounded-xl border-2 p-4 text-left text-sm ${
                    template === t.id ? "border-primary-600 bg-primary-50/50" : "border-slate-200"
                  }`}
                >
                  <span className="font-medium">{t.title}</span>
                  {t.from && <p className="text-slate-500 mt-1">{t.from} → {t.to}</p>}
                  {t.price > 0 && <p className="text-primary-600 mt-1">IDR {t.price.toLocaleString()} • {t.duration}h</p>}
                </button>
              ))}
            </div>
          </div>
          <Input label="Trip title" placeholder="e.g. Airport Transfer – Bali" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Input label="From" placeholder="Pickup location" value={from} onChange={(e) => setFrom(e.target.value)} required />
          <Input label="To" placeholder="Drop-off location" value={to} onChange={(e) => setTo(e.target.value)} required />
          <Input label="Duration (hours)" type="number" min={1} value={duration} onChange={(e) => setDuration(e.target.value)} required />
          <Input label="Price (IDR)" type="text" inputMode="numeric" placeholder="e.g. 250000" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} required />
          <Input label="Capacity (max passengers)" type="number" min={1} value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <Button type="submit" fullWidth>Publish package trip</Button>
        </form>
      </main>
    </>
  );
}

export default function SupplierCreateTripPage() {
  const router = useRouter();
  const { user } = useApp();
  const isDriver = user?.supplierType === "driver";
  const [title, setTitle] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [price, setPrice] = useState("");
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [locations, setLocations] = useState<string[]>([]);

  const toggleLocation = (loc: string) => {
    setLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  if (isDriver) {
    return (
      <SupplierPackageTripForm />
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/supplier/my-trips");
  };

  return (
    <>
      <Header title="Create trip" backHref="/supplier/my-trips" />
      <main className="px-4 py-6">
        <p className="text-slate-600 text-sm mb-4">
          Publish a pre-designed trip. Travelers can book directly or contact you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Trip title" placeholder="e.g. Bali Highlights – 2 Days" value={title} onChange={(e) => setTitle(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Locations</label>
            <div className="flex flex-wrap gap-2">
              {MOCK_LOCATIONS.slice(0, 8).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`rounded-full px-3 py-1.5 text-sm ${
                    locations.includes(loc) ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
          <Input label="Duration (days)" type="number" min={0} placeholder="0" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} />
          <Input label="Duration (hours)" type="number" min={0} placeholder="0" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} />
          <Input label="Price (IDR)" type="text" inputMode="numeric" placeholder="e.g. 850000" value={price} onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))} />
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={priceNegotiable}
              onChange={(e) => setPriceNegotiable(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-primary-600"
            />
            <span className="text-sm text-slate-700">Price negotiable</span>
          </label>
          <Input label="Capacity (max travelers)" type="number" min={1} placeholder="e.g. 6" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Itinerary (one line per day)</label>
            <textarea
              value={itinerary}
              onChange={(e) => setItinerary(e.target.value)}
              placeholder="Day 1: Ubud & Rice Terraces&#10;Day 2: Tanah Lot"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base resize-none h-24"
              maxLength={1000}
            />
          </div>
          <Button type="submit" fullWidth>Publish trip</Button>
        </form>
      </main>
    </>
  );
}
