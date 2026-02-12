"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { getMessages, getSupplierById } from "@/lib/network-store";
import { useApp } from "@/lib/context";

export default function NetworkMessagesPage() {
  const { user } = useApp();
  if (!user?.id) return null;

  const conversations = [
    { otherId: "s3", name: "Ketut Driver" },
    { otherId: "s2", name: "PT Wisata Nusantara" },
  ];
  const withPreview = conversations.map((conv) => {
    const msgs = getMessages(user.id, conv.otherId);
    const last = msgs[msgs.length - 1];
    return { ...conv, lastMessage: last?.message, lastAt: last?.createdAt };
  });

  return (
    <>
      <Header title="Messages" backHref="/supplier/network" />
      <main className="px-4 py-4">
        <p className="text-slate-600 text-sm mb-4">Direct messages with your network connections.</p>
        {withPreview.length === 0 ? (
          <div className="empty-state">
            <p>No conversations yet.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {withPreview.map((c) => (
              <li key={c.otherId}>
                <Link
                  href={`/supplier/network/messages/${c.otherId}`}
                  className="block rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  {c.lastMessage && (
                    <p className="text-sm text-slate-600 truncate mt-1">{c.lastMessage}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
