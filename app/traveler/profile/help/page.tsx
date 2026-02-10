"use client";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/Button";

export default function HelpPage() {
  return (
    <>
      <Header title="Help & support" backHref="/traveler/profile" />
      <main className="px-4 py-6 space-y-6">
        <p className="text-slate-600 text-sm">
          Need help? Contact us or browse FAQs.
        </p>
        <div className="space-y-3">
          <a href="mailto:support@tripulike.com" className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
            Email: support@tripulike.com
          </a>
          <a href="tel:+62123456789" className="block rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800">
            Phone: +62 123 456 789
          </a>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">FAQs</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>• How do I cancel a trip? Go to My Trips → Trip detail → Cancel trip.</li>
            <li>• Refund policy: ≥24h full refund, 10–24h 50%, &lt;10h no refund.</li>
            <li>• Chat is in-app only. Phone/email are not shared.</li>
          </ul>
        </div>
      </main>
    </>
  );
}
