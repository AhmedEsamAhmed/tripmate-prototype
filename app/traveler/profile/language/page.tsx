"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";

const LANGUAGES = ["English", "Indonesian", "Japanese", "Mandarin"];

export default function LanguageSettingsPage() {
  const [selected, setSelected] = useState("English");

  return (
    <>
      <Header title="Language settings" backHref="/traveler/profile" />
      <main className="px-4 py-6">
        <p className="text-slate-600 text-sm mb-4">Choose your preferred app language.</p>
        <div className="space-y-2">
          {LANGUAGES.map((lang) => (
            <label
              key={lang}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50"
            >
              <input
                type="radio"
                name="lang"
                checked={selected === lang}
                onChange={() => setSelected(lang)}
                className="h-4 w-4 text-primary-600"
              />
              <span>{lang}</span>
            </label>
          ))}
        </div>
        <Button fullWidth className="mt-6">Save</Button>
      </main>
    </>
  );
}
