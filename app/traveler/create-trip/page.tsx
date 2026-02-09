"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { MOCK_LOCATIONS } from "@/lib/mock-data";
import type { SupplierType } from "@/types";

export default function CreateTripPage() {
  const router = useRouter();
  const [stops, setStops] = useState<string[]>(["", ""]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [serviceType, setServiceType] = useState<SupplierType>("tour_guide");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<{ name: string; type: string }[]>([]);
  const [step, setStep] = useState(1);

  const addStop = () => setStops((prev) => [...prev, ""]);
  const updateStop = (i: number, v: string) => {
    setStops((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };
  const removeStop = (i: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, j) => j !== i));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Submit: go to review then redirect
      router.push("/traveler?created=1");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.back();
  };

  return (
    <>
      <Header
        title={step === 1 ? "Locations" : step === 2 ? "Date & service" : "Review"}
        backHref={step === 1 ? "/traveler" : undefined}
        onBackClick={step > 1 ? handleBack : undefined}
      />
      <main className="px-4 py-6">
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-slate-600 text-sm">Add one or more stops for your trip.</p>
            {stops.map((stop, i) => (
              <div key={i} className="flex gap-2 items-center">
                <select
                  value={stop}
                  onChange={(e) => updateStop(i, e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-base"
                >
                  <option value="">Select location</option>
                  {MOCK_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeStop(i)}
                  className="touch-target rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Remove stop"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
            <Button variant="ghost" onClick={addStop}>+ Add stop</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Input label="Start date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <Input label="Start time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <Input label="Duration (days)" type="number" min={0} placeholder="0" value={durationDays} onChange={(e) => setDurationDays(e.target.value)} />
            <Input label="Duration (hours)" type="number" min={0} placeholder="0" value={durationHours} onChange={(e) => setDurationHours(e.target.value)} />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Service type</label>
              <div className="flex gap-2 flex-wrap">
                {(["driver", "tour_guide", "tour_agency"] as SupplierType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setServiceType(t)}
                    className={`rounded-full px-4 py-2 text-sm font-medium ${
                      serviceType === t ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {t === "driver" ? "Driver" : t === "tour_guide" ? "Tour Guide" : "Tour Agency"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special requests, interests, group size…"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base resize-none h-24"
                maxLength={500}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Attachments (optional)</label>
              <p className="text-xs text-slate-500 mb-2">Upload photos or documents to help suppliers understand your request.</p>
              <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      setAttachments((prev) => [
                        ...prev,
                        ...Array.from(files).map((f) => ({ name: f.name, type: f.type.startsWith("image/") ? "photo" : "document" })),
                      ]);
                    }
                    e.target.value = "";
                  }}
                />
                <svg className="h-10 w-10 text-slate-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="text-sm font-medium text-slate-600">Tap to upload</span>
                <span className="text-xs text-slate-500 mt-1">Photos or PDF (demo)</span>
              </label>
              {attachments.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {attachments.map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="text-primary-600">{a.type === "photo" ? "📷" : "📄"}</span>
                      {a.name}
                      <button
                        type="button"
                        onClick={() => setAttachments((prev) => prev.filter((_, j) => j !== i))}
                        className="text-slate-400 hover:text-red-500 ml-auto"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-600"><strong>Stops:</strong> {stops.filter(Boolean).join(" → ") || "—"}</p>
            <p className="text-sm text-slate-600"><strong>Date & time:</strong> {startDate || "—"} {startTime || ""}</p>
            <p className="text-sm text-slate-600"><strong>Duration:</strong> {durationDays ? `${durationDays} days` : ""} {durationHours ? `${durationHours} hr` : ""} {!durationDays && !durationHours ? "—" : ""}</p>
            <p className="text-sm text-slate-600"><strong>Service:</strong> {serviceType === "driver" ? "Driver" : serviceType === "tour_guide" ? "Tour Guide" : "Tour Agency"}</p>
            {notes && <p className="text-sm text-slate-600"><strong>Notes:</strong> {notes}</p>}
            <p className="text-xs text-slate-500 mt-2">You don’t set a price. Suppliers will send you offers. {attachments.length > 0 && `(${attachments.length} file(s) attached)`}</p>
          </div>
        )}
        <div className="flex gap-3 mt-8">
          <Button variant="secondary" fullWidth onClick={handleBack}>Back</Button>
          <Button fullWidth onClick={handleNext}>{step === 3 ? "Submit request" : "Next"}</Button>
        </div>
      </main>
    </>
  );
}
